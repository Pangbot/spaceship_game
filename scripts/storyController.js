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
}

function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();

        // Pause resource bars while the popup is visible
        setUpdateStatus(false);
    } else {
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

        if (currentMessageIndex === messages.length) {
            setUpdateStatus(true);
            setStoryStatus(false);
            setLastMessageClicked(true);
            currentMessageIndex = 0;
            return;
        }
    }
}

function nextMessage() {
    currentMessageIndex++;
    runStoryEvent(); // Continue the story event
}

export { runStoryEvent, nextMessage };