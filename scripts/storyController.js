// storyController.js
import { setLastMessageClicked, setStoryStatus, setUpdateStatus } from './common.js';

const messages = [
    "Welcome to the game!",
    "You find yourself in a mysterious world.",
    "A wise old wizard appears before you...",
    "He says, 'You are the chosen one.'"
    // Add more messages as needed
];

let currentMessageIndex = 0;

function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    displayMessage();
}

function displayMessage() {
    document.getElementById('message').innerText = messages[currentMessageIndex];

    // Remove existing buttons (if any)
    const existingButtons = document.querySelectorAll('.popup-button');
    existingButtons.forEach(button => button.remove());

    // Create 'Next' button for all messages except the last one
    if (currentMessageIndex < messages.length - 1) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.className = 'popup-button';
        nextButton.addEventListener('click', handleNextButtonClick);
        document.getElementById('popup').appendChild(nextButton);
    }

    // Create 'Close' button for the last message
    if (currentMessageIndex === messages.length - 1) {
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.className = 'popup-button';
        closeButton.addEventListener('click', handleCloseButtonClick);
        document.getElementById('popup').appendChild(closeButton);
    }
}

function handleNextButtonClick() {
    currentMessageIndex++;
    runStoryEvent();
    // Update: Remove the 'Next' button after clicking
    const nextButton = document.querySelector('.popup-button');
    if (nextButton) {
        nextButton.remove();
    }
}

function handleDoneButtonClick() {
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
}

function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();
        // Pause resource bars while the popup is visible
        setUpdateStatus(false);
    } else {
        if (currentMessageIndex === messages.length) {
            handleDoneButtonClick();
        }
    }
}

export { runStoryEvent };
