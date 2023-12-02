// storyController.js
import { setLastMessageClicked, setStoryStatus, setUpdateStatus } from './common.js';

const messages = [
    "Welcome to the game!",
    // Add more messages as needed
];

let currentMessageIndex = 0;
let resolvePause;

let closeButton; // Declare closeButton outside the function

function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    displayMessage();

    // Create 'Close' button only if it doesn't exist
    if (!closeButton) {
        closeButton = createButton('Close', handleCloseButtonClick);
        document.getElementById('popup').appendChild(closeButton);
    }
}

function displayMessage() {
    document.getElementById('message').innerText = messages[currentMessageIndex];

    // Remove existing buttons (if any)
    const existingButtons = document.querySelectorAll('.popup-button');
    existingButtons.forEach(button => button.remove());

    // Create 'Close' button
    const closeButton = createButton('Close', handleCloseButtonClick);
    document.getElementById('popup').appendChild(closeButton);
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
    // Remove event listener before handling the button click
    document.getElementById('popup').removeEventListener('click', handlePopupButtonClick);

    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';

    // Store messages in the container
    const container = document.getElementById('popup-container');
    const messageList = document.createElement('ul');

    messages.forEach((message, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${index + 1}. ${message}`;
        messageList.appendChild(listItem);
    });

    container.appendChild(messageList);

    // Reset currentMessageIndex and resume resource bars when 'Done' is clicked
    setUpdateStatus(true);
    setStoryStatus(false);
    setLastMessageClicked(true);
    currentMessageIndex = 0;

    // Add event listener back after handling the button click
    document.getElementById('popup').addEventListener('click', handlePopupButtonClick);

    resumeAfterButtonClick();
}

document.body.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.popup-button');
    if (clickedButton) {
        console.log('Popup button clicked');
        handleCloseButtonClick();
    }
});

function resumeAfterButtonClick() {
    if (resolvePause) {
        resolvePause();
        resolvePause = null;
    }
}

function pauseUntilButtonClick() {
    return new Promise(resolve => {
        resolvePause = resolve;
    });
}

// Add event listener to the document body for button clicks
document.body.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.popup-button');
    if (clickedButton && clickedButton.innerText === 'Close') {
        handleCloseButtonClick();
    }
});

async function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();
        // Pause resource bars while the popup is visible
        setUpdateStatus(false);
        await pauseUntilButtonClick();
    } else {
        if (currentMessageIndex === messages.length) {
            // Handle the end of the story (if needed)
            handleCloseButtonClick();
        }
    }
}

export { runStoryEvent };
