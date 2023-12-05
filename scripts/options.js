// options.js
import { isGamePaused, setGamePause } from './common.js';

function handleMenuClose(event) {
    // Check if the pressed key is "p"
    if (event.key === 'p' && isGamePaused) {
        hideOptionsMenu();
    }
}

function showOptionsMenu() {
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

    // Add an event listener for the 'p' key to close the options menu
    document.addEventListener('keydown', handleMenuClose);
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    // Only unpause if the game was previously paused
    if (isGamePaused) {
        setGamePause(false);
    }

    // Remove the event listener for the 'p' key
    document.removeEventListener('keydown', handleMenuClose);
}

export { showOptionsMenu, hideOptionsMenu };
