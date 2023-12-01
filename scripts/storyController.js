// storyController.js
import { setStoryStatus, setUpdateStatus } from './common.js';

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
    createNextButton(); // Create "Next" button dynamically
}

function displayMessage() {
    document.getElementById('message').innerText = messages[currentMessageIndex];
}

function createNextButton() {
    // Create "Next" button dynamically
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.onclick = nextMessage; // Attach the onclick event handler

    // Append the button to the popup container
    document.getElementById('popup').appendChild(nextButton);
}

function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();
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

        setUpdateStatus(true);
        setStoryStatus(false);
    }
}

function nextMessage() {
    currentMessageIndex++;
    runStoryEvent(); // Continue the story event
}

export { runStoryEvent };
