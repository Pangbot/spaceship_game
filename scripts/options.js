// options.js
import { doors, oxygenRate, foodRate } from './common.js';

const initialTabContent = [
    'This is the content of Statistics.<br><br>',
    'This is the content of Tasks.<br><br>Task 1: Get some bitches.',
    'This is the content of Sound.<br><br>There is no sound. :(',
    'This is the content of Options.<br><br>Save/Load/Reset game I guess?'
];

let tabContent = initialTabContent.slice();

function showOptionsMenu(tabNumber) {
    updateTabContent();
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');

    overlay.style.display = 'block';
    popup.style.display = 'block';
    window.changeTab(tabNumber);
}

function hideOptionsMenu() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');
    overlay.style.display = 'none';
    popup.style.display = 'none';
}

function updateTabContent() {
    tabContent = initialTabContent.slice();
    console.log(tabContent);
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
            break;
        case 1:
            extraContent += (index).toString();
            break;
        case 2:
            extraContent += (index).toString();
            break;
        case 3:
            extraContent += (index).toString();
            break;
    }
    tabContent[index] = initialTabContent[index] + extraContent;
}

function formatTime(seconds) {
    if (seconds > 3600) {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours} hours, ${remainingMinutes} minutes, and ${remainingSeconds.toFixed(2)} seconds`;
    } else if (seconds > 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minutes and ${remainingSeconds.toFixed(2)} seconds`;
    } else {
        return `${seconds.toFixed(2)} seconds`;
    }
}

function getBarsStatus() {
    let barsStatus = '';

    let oxygenValue = parseFloat(document.getElementById('oxygen_bar').getAttribute('data-fill'));
    let foodValue = parseFloat(document.getElementById('food_bar').getAttribute('data-fill'));

    let remainingTimeOxygen = oxygenValue / oxygenRate;
    let remainingTimeFood = foodValue / foodRate;

    barsStatus += `Oxygen bar is ${oxygenValue.toFixed(2)}% full. Remaining time: ${formatTime(remainingTimeOxygen)}<br>`;
    barsStatus += `Food bar is ${foodValue.toFixed(2)}% full. Remaining time: ${formatTime(remainingTimeFood)}<br>`;

    barsStatus += '<br>';

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
