// storyController.js
import { isUpdateEnabled, storyTime } from './common.js';

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
        displayMessage();
    } else {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';

        // Store messages in the container
        const container = document.getElementById('container');
        const messageList = document.createElement('ul');

        messages.forEach((message, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${index + 1}. ${message}`;
            messageList.appendChild(listItem);
        });

        container.appendChild(messageList);

        isUpdateEnabled = true;
        storyTime = false;
    }
}

export { runStoryEvent };