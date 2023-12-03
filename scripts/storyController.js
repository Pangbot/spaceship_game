// storyController.js
import { setUpdateStatus, setStoryStatus, setLastMessageClicked } from './common.js';

const messages = [
    "Welcome to the game!",
    // Add more messages as needed
];

let currentMessageIndex = 0;

function showPopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    overlay.style.display = 'block';
    popup.style.display = 'block';
    displayMessage();

    const closeButton = createButton('Close', handleCloseButtonClick);
    popup.appendChild(closeButton);
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

    const container = document.getElementById('popup-container');
    const messageList = document.createElement('ul');

    messages.forEach((message, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${index + 1}. ${message}`;
        messageList.appendChild(listItem);
    });

    container.appendChild(messageList);

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
        document.body.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.popup-button');
            if (clickedButton && clickedButton.innerText === 'Close') {
                resolve();
            }
        }, { once: true });
    });
}

export { runStoryEvent };
