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

        // Adjust the text based on whether the value is 1 or not
        const hoursText = hours === 1 ? 'hour' : 'hours';
        const minutesText = remainingMinutes === 1 ? 'minute' : 'minutes';
        const secondsText = remainingSeconds === 1 ? 'second' : 'seconds';

        return `${hours} ${hoursText}, ${remainingMinutes} ${minutesText}, and ${remainingSeconds.toFixed(2)} ${secondsText}`;
    } else if (seconds > 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Adjust the text based on whether the value is 1 or not
        const minutesText = minutes === 1 ? 'minute' : 'minutes';
        const secondsText = remainingSeconds === 1 ? 'second' : 'seconds';

        return `${minutes} ${minutesText} and ${remainingSeconds.toFixed(2)} ${secondsText}`;
    } else {
        // Adjust the text based on whether the value is 1 or not
        const secondsText = seconds === 1 ? 'second' : 'seconds';

        return `${seconds.toFixed(2)} ${secondsText}`;
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

    for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        const doorStatus = door.status;

        // Choose the color based on the door status
        const textColor = doorStatus === 'open' ? 'green' : 'red';

        // Use inline styles to set the color
        doorsStatus += `<span style="color: ${textColor};">Door between ${door.roomId} and ${door.targetRoomId} is currently ${doorStatus}.</span><br>`;
    }

    doorsStatus += '<br>';

    return doorsStatus;
}

export { showOptionsMenu, hideOptionsMenu, tabContent, updateTabContent };
