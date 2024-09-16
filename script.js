const BIG_WINNER_NUMBER = ['3', '1', '4']

const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const spinButton = document.getElementById('spin');

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function resetSlots() {
    slot1.innerText = '0';
    slot2.innerText = '0';
    slot3.innerText = '0';
}

function spin(slot, duration, callback) {
    return new Promise((resolve) => {
        let intervalTime = 100;
        let iterations = duration / intervalTime;
        let i = 0;
        let interval = setInterval(() => {
            slot.innerText = numbers[Math.floor(Math.random() * numbers.length)];
            i++;
            if (i >= iterations) {
                clearInterval(interval);
                resolve();
                if (callback) callback();
            }
        }, intervalTime);
    });
}

function getSlotValue(slot) {
    return slot.innerText;
}

function checkWin() {
    return getSlotValue(slot1) === BIG_WINNER_NUMBER[0] && getSlotValue(slot2) === BIG_WINNER_NUMBER[1] && getSlotValue(slot3) === BIG_WINNER_NUMBER[2];
}

function doCelebration() {
    let soundEffect = new Audio('Celebration Sound Effect.mp3');
    soundEffect.play();
}

function play3Sound() {
    let soundEffect = new Audio('3.wav');
    soundEffect.play();
}

function play1Sound() {
    let soundEffect = new Audio('1.wav');
    soundEffect.play();
}

function play4Sound() {
    let soundEffect = new Audio('4.wav');
    soundEffect.play();
}

async function spinSlots() {
    spinButton.disabled = true;

    let win1 = false;
    let win2 = false;
    let win3 = false;
    await Promise.all([
        spin(slot1, 500, () => {
            if (getSlotValue(slot1) == 3) {
                win1 = true;
                play3Sound();
            }
        }),
        spin(slot2, 1000, () => {
            if (getSlotValue(slot2) == 1 && win1) {
                win2 = true;
                play1Sound();
            }
        }),
        spin(slot3, 1500, () => {
            if (getSlotValue(slot3) == 4 && win1 && win2) {
                win3 = true;
                play4Sound();
            }
        })
    ]);
    const won = checkWin();
    if (won) {
        doCelebration();
    }
    spinButton.disabled = false;
}
spinButton.addEventListener('click', () => {
    resetSlots()
    // spin(slot1, 500);
    // spin(slot2, 1000);
    // spin(slot3, 1500);
    spinSlots();
});