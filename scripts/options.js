// options.js
// Stores info in, and manages, the options menu
import { setUpdateStatus } from './common.js';

let currentMessageIndex = 0; // Declare currentMessageIndex in a scope accessible to both functions

async function showOptionsMenu() {
    console.log("Showing options menu.");

    const messages = ["This is the options menu!"];
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    overlay.style.display = 'block';
    popup.style.display = 'block';
    const messageElement = document.getElementById('message');
    messageElement.innerText = messages[currentMessageIndex];

    // Check if close button already exists
    const closeButton = document.querySelector('.popup-button');
    if (!closeButton) {
        const newCloseButton = createButton('Close', hideOptionsMenu);
        popup.appendChild(newCloseButton);
    }

    if (currentMessageIndex < messages.length) {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup');

        overlay.style.display = 'block';
        popup.style.display = 'block';
        const messageElement = document.getElementById('message');
        messageElement.innerText = messages[currentMessageIndex];

        // Check if close button already exists
        const closeButton = document.querySelector('.popup-button');
        if (!closeButton) {
            const newCloseButton = createButton('Close', hideOptionsMenu);
            popup.appendChild(newCloseButton);
        }
        setUpdateStatus(false);
        await pauseUntilButtonClick();
    } else if (currentMessageIndex === messages.length) {
        hideOptionsMenu();
    }
}

function pauseUntilButtonClick() {
    return new Promise(resolve => {
        const popup = document.getElementById('popup');
        
        // Create a click handler function
        function clickHandler() {
            resolve();
            // Remove the event listener after the button is clicked
            popup.removeEventListener('click', clickHandler);
        }

        // Add the click handler to the popup
        popup.addEventListener('click', clickHandler);
    });
}

function hideOptionsMenu() {
    console.log('Close button clicked');
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.popup-button');

    // Remove the button from the popup
    if (closeButton) {
        popup.removeChild(closeButton);
    }

    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.innerText = text;
    button.className = 'popup-button';
    button.addEventListener('click', clickHandler);
    return button;
}

export { showOptionsMenu, hideOptionsMenu}