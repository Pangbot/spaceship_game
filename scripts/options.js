// options.js
import { setUpdateStatus, setGamePause } from './common.js';

let keyDownListener; // Variable to store the event listener reference

async function showOptionsMenu() {
    console.log("Showing options menu.");

    const messages = ["This is the options menu!"];
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    // Reset currentMessageIndex to 0
    let currentMessageIndex = 0;

    overlay.style.display = 'block';
    popup.style.display = 'block';
    const messageElement = document.getElementById('message');
    messageElement.innerText = messages[currentMessageIndex];

    // Add event listener for the "p" key
    keyDownListener = handleKeyPress; // Assign the event listener to keyDownListener
    document.addEventListener('keydown', keyDownListener);

    if (currentMessageIndex < messages.length) {
        setUpdateStatus(false);
        await pauseUntilButtonClick();
    } else if (currentMessageIndex === messages.length) {
        hideOptionsMenu();
    }
}

function handleKeyPress(event) {
    // Check if the pressed key is "p"
    if (event.key === 'p') {
        document.removeEventListener('keydown', keyDownListener); // Remove the event listener
        hideOptionsMenu();
    }
}

function pauseUntilButtonClick() {
    return new Promise(resolve => {
        const popup = document.getElementById('popup');

        // Create a click handler function
        function clickHandler() {
            // Remove the click event listener first
            popup.removeEventListener('click', clickHandler);
            // Remove the keydown event listener after the button is clicked
            document.removeEventListener('keydown', keyDownListener);

            // Resolve the promise after cleaning up listeners
            resolve();
        }

        // Add the click handler to the popup
        popup.addEventListener('click', clickHandler);
    });
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);

    // Rebind the game loop event listener for the 'p' key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'p') {
            setGamePause(true);
            showOptionsMenu(); // Show options menu again
        }
    });
}

export { showOptionsMenu };
