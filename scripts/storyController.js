// storyController.js
import { isUpdateEnabled, setStoryStatus, setUpdateStatus, storyTime } from './common.js';

const messages = [
  "Welcome to the game!",
  "You find yourself in a mysterious world.",
  "A wise old wizard appears before you...",
  "He says, 'You are the chosen one.'"
  // Add more messages as needed
];

let currentMessageIndex = 0;
let nextButtonCreated = false; // Flag to track if the button is created

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

        // Check if the button is not created
        if (!nextButtonCreated) {
            // Create "Next" button dynamically
            const nextButton = document.createElement('button');
            nextButton.innerText = 'Next';
            nextButton.onclick = nextMessage; // Attach the onclick event handler

            // Append the button to the popup container
            document.getElementById('popup').appendChild(nextButton);

            // Set the flag to true, indicating that the button is created
            nextButtonCreated = true;
        }
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

        // Reset the flag for the next story event
        nextButtonCreated = false;
    }
}

function nextMessage() {
    currentMessageIndex++;
    runStoryEvent(); // Continue the story event
}

export { runStoryEvent };
