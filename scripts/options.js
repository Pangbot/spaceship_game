// options.js
import { doors, oxygenRate, foodRate } from './common.js';

const initialTabContent = [
    'This is the content of Statistics.<br><br>',
    'This is the content of Tasks.<br><br>Task 1: Get some bitches.',
    'This is the content of Sound.<br><br>There is no sound. :(',
    'This is the content of Options.<br><br>Save/Load/Reset game I guess?'
];

let tabContent = initialTabContent;

function showOptionsMenu() {
    updateTabContent();
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');

    overlay.style.display = 'block';
    popup.style.display = 'block';
}

function hideOptionsMenu() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');
    overlay.style.display = 'none';
    popup.style.display = 'none';
}

function updateTabContent() {
    for (let i = 0; i < tabContent.length; i++) {
        updateTabNumber(i);
    }
}

function updateTabNumber(index) {
    let extraContent = '';
    switch (index) {
        case 0:
            extraContent += getBarsStatus();
            extraContent += getDoorsStatus();
        case 1:
            extraContent += str(index);
        case 2:
            extraContent += str(index);
        case 3:
            extraContent += str(index);
    }
    tabContent[index] = initialTabContent[index] + extraContent;
}

function getBarsStatus() {
    let barsStatus = '';

    let oxygenValue = document.getElementById('oxygen_bar').getAttribute('data-fill');
    let foodValue = document.getElementById('food_bar').getAttribute('data-fill');

    let remainingTimeOxygen = (oxygenValue / oxygenRate).toFixed(1);
    let remainingTimeFood = (foodValue / foodRate).toFixed(1);

    barsStatus += `Oxygen bar is ${oxygenValue}% full. Remaining time: ${remainingTimeOxygen} seconds.<br>`
    barsStatus += `Food bar is ${foodValue}% full. Remaining time: ${remainingTimeFood} seconds.<br>`

    return barsStatus;
}

function getDoorsStatus() {
    let doorsStatus = '';

    for(let i = 0; i < doors.length; i++ ) {
        doorsStatus += `Door between ${doors[i].roomId} and ${doors[i].targetRoomId} is currently ${doors[i].status}.<br>`
    }

    doorsStatus += '<br>';

    return doorsStatus;
}

export { showOptionsMenu, hideOptionsMenu, tabContent, updateTabContent };
