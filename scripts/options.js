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

    // Use a promise to wait for the 'p' key to be pressed
    await new Promise(resolve => {
        function resolveOnKeyPress(event) {
            if (event.key === 'p') {
                document.removeEventListener('keydown', resolveOnKeyPress); // Remove the event listener
                resolve();
            }
        }

        // Add an additional event listener to resolve the promise on 'p' key press
        document.addEventListener('keydown', resolveOnKeyPress);
    });

    hideOptionsMenu();
}

function handleKeyPress(event) {
    // Check if the pressed key is "p"
    if (event.key === 'p') {
        document.removeEventListener('keydown', keyDownListener); // Remove the event listener
        hideOptionsMenu();
    }
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);

    // Rebind the game loop event listener for the 'p' key
    document.addEventListener('keydown', handleGameLoopKeyPress);
}

function handleGameLoopKeyPress(event) {
    // Check if the pressed key is "p"
    if (event.key === 'p') {
        setGamePause(true);
        document.removeEventListener('keydown', handleGameLoopKeyPress); // Remove the event listener
        showOptionsMenu(); // Show options menu again
    }
}

export { showOptionsMenu };
