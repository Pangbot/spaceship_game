// options.js
import { setUpdateStatus, setGamePause } from './common.js';

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

    return new Promise(resolve => {
        function handleKeyPress(event) {
            if (event.key === 'p') {
                document.removeEventListener('keydown', handleKeyPress); // Remove the event listener
                resolve(); // Resolve the Promise when 'p' is pressed
            }
        }

        document.addEventListener('keydown', handleKeyPress);
    });
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';

    setUpdateStatus(true);
}

export { showOptionsMenu, hideOptionsMenu };