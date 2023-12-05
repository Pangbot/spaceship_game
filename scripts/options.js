// options.js
import { setUpdateStatus, setGamePause } from './common.js';

let keyDownListener; // Variable to store the event listener reference

async function showOptionsMenu() {
    console.log("Showing options menu.");

    const messages = ["This is the options menu!"];
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    // Reset currentMessageIndex to 0
    let currentMessageIndex = 0;

    overlay.style.display = 'block';
    popup.style.display = 'block';
    const messageElement = document.getElementById('message');
    messageElement.innerText = messages[currentMessageIndex];

    if (currentMessageIndex < messages.length) {
        setUpdateStatus(false);
    } else if (currentMessageIndex === messages.length) {
        hideOptionsMenu();
    }
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);
}

export { showOptionsMenu, hideOptionsMenu };
