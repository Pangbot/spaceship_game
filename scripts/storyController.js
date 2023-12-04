// storyController.js
import { setUpdateStatus, setStoryStatus, setLastMessageClicked, storyMessages } from './common.js';

const messages = storyMessages[0].message_content;

let currentMessageIndex = 0;

function showPopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    overlay.style.display = 'block';
    popup.style.display = 'block';
    displayMessage();

    // Check if close button already exists
    const closeButton = document.querySelector('.popup-button');
    if (!closeButton) {
        const newCloseButton = createButton('Close', handleCloseButtonClick);
        popup.appendChild(newCloseButton);
    }
}


function displayMessage() {
    const messageElement = document.getElementById('message');
    messageElement.innerText = messages[currentMessageIndex];
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.innerText = text;
    button.className = 'popup-button';
    button.addEventListener('click', clickHandler);
    return button;
}

function handleCloseButtonClick() {
    console.log('Close button clicked');

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);
    setStoryStatus(false);
    setLastMessageClicked(true);
    currentMessageIndex = 0;
}

async function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();
        setUpdateStatus(false);
        await pauseUntilButtonClick();
    } else if (currentMessageIndex === messages.length) {
        handleCloseButtonClick();
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
            storyMessages[0].message_shown = true;
        }

        // Add the click handler to the popup
        popup.addEventListener('click', clickHandler);
    });
}

export { runStoryEvent, showPopup, pauseUntilButtonClick, handleCloseButtonClick, createButton, displayMessage };