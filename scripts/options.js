// options.js
// Stores info in, and manages, the options menu
import { pauseUntilButtonClick, createButton, displayMessage, showPopup } from './storyController.js';


async function showOptionsMenu() {
    console.log("Showing options menu.");

    const messages = ["This is the options menu!"];

    let currentMessageIndex = 0;

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    overlay.style.display = 'block';
    popup.style.display = 'block';
    displayMessage();

    // Check if close button already exists
    const closeButton = document.querySelector('.popup-button');
    if (!closeButton) {
        const newCloseButton = createButton('Close', hideOptionsMenu());
        popup.appendChild(newCloseButton);
    }

    if (currentMessageIndex < messages.length) {
        showPopup();
        setUpdateStatus(false);
        await pauseUntilButtonClick();
    } else if (currentMessageIndex === messages.length) {
        hideOptionsMenu();
    }
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");
    console.log('Close button clicked');

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);
    currentMessageIndex = 0;
}




export { showOptionsMenu, hideOptionsMenu}