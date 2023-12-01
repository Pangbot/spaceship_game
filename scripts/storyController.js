import { setStoryStatus, setUpdateStatus } from './common.js';

const messages = [
  "Welcome to the game!",
  "You find yourself in a mysterious world.",
  "A wise old wizard appears before you...",
  "He says, 'You are the chosen one.'"
  // Add more messages as needed
];

let currentMessageIndex = 0;
let nextButtonCreated = false; // Initialize the variable

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
    // Check if the button already exists
    if (!document.getElementById('nextButton')) {
        // Create "Next" button dynamically
        const nextButton = document.createElement('button');
        nextButton.id = 'nextButton'; // Set an ID to check existence later
        nextButton.innerText = 'Next';
        nextButton.onclick = nextMessage; // Attach the onclick event handler

        // Append the button to the popup container
        document.getElementById('popup').appendChild(nextButton);
    }
}

function runStoryEvent() {
    if (currentMessageIndex < messages.length) {
        showPopup();
        displayMessage();

        // Check if the button is not created
        if (!nextButtonCreated) {
            // Create "Next" button dynamically
            createNextButton();

            // Set the flag to true, indicating that the button is created
            nextButtonCreated = true;
        }
    } else {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';

        // Check if the button was created
        if (nextButtonCreated) {
            // Remove the "Next" button after the last message
            const nextButton = document.getElementById('nextButton');
            if (nextButton) {
                nextButton.remove();
            }

            // Reset the flag for the next story event
            nextButtonCreated = false;
        }

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

    // Remove the button after it's clicked
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.remove();
    }
}

export { runStoryEvent };
