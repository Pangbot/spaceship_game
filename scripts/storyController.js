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
        const nextButton = createButton('Next', handleNextButtonClick);
        document.getElementById('popup').appendChild(nextButton);
    }

    // Create 'Close' button for the last message
    if (currentMessageIndex === messages.length - 1) {
        const closeButton = createButton('Close', handleCloseButtonClick);
        document.getElementById('popup').appendChild(closeButton);
    }
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.innerText = text;
    button.className = 'popup-button';
    button.addEventListener('click', clickHandler);
    return button;
}

function handleNextButtonClick() {
    currentMessageIndex++;
    displayMessage(); // Show the next message
}

function handleCloseButtonClick() {
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
        document.getElementById('popup').addEventListener('click', function (event) {
            const nextButtonExists = event.target.matches('.popup-button-next');
            const closeButtonExists = event.target.matches('.popup-button-close');
    
            if (nextButtonExists) {
                handleNextButtonClick();
            }
    
            if (closeButtonExists) {
                handleCloseButtonClick();
            }
        });
        // Pause resource bars while the popup is visible
        setUpdateStatus(false);
    } else {
        if (currentMessageIndex === messages.length) {
            handleCloseButtonClick();
        }
        document.getElementById('popup').addEventListener('click', function (event) {
            const nextButtonExists = event.target.matches('.popup-button-next');
            const closeButtonExists = event.target.matches('.popup-button-close');
    
            if (nextButtonExists) {
                handleNextButtonClick();
            }
    
            if (closeButtonExists) {
                handleCloseButtonClick();
            }
        });
    }
}

export { runStoryEvent, handleCloseButtonClick, handleNextButtonClick };
