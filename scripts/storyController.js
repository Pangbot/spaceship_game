// storyController.js
import { setLastMessageClicked, storyMessages, setGamePause } from './common.js';

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
    const closeButton = document.querySelector('.popup-button');

    // Remove the button from the popup
    if (closeButton) {
        popup.removeChild(closeButton);
    }

    overlay.style.display = 'none';
    popup.style.display = 'none';

    setGamePause(false);
    setLastMessageClicked(true);
    currentMessageIndex = 0;
}


async function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();
        setGamePause(true);
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

function checkForNextStoryEvent(i) {
    // Conditions for a story event
    switch (i) {
        case 0:
        return Math.round(parseFloat(document.getElementById('food_bar').getAttribute('data-fill'))) === 93 && storyMessages[0].message_shown === false;
        case 1:
        return false;
        case 2:
        return false;
        default:
        return false;
    }
}

export { runStoryEvent, checkForNextStoryEvent };