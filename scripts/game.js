// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isGamePaused, previousFoodRate, previousOxygenRate, setFoodRate, setOxygenRate } from './common.js';

function handleLordOfTimeCheckboxChange() {
    // Get the checkbox element
    var checkbox = document.getElementById('lordOfTimeCheckbox');

    // Check if the checkbox is checked
    if (checkbox.checked) {
        // Call the setFoodRate and setOxygenRate functions
        setFoodRate(0);
        setOxygenRate(0);
    } else {
        setFoodRate(previousFoodRate);
        setOxygenRate(previousOxygenRate);
    }
}

window.handleLordOfTimeCheckboxChange = handleLordOfTimeCheckboxChange;

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    async function gameLoop() {
        if (!isGamePaused) {
                // Call the continuous update function
                updateGame();
            } else {
                console.error("I DON'T KNOW WHAT TO DO");
            }

        // Use requestAnimationFrame to schedule the next iteration
        // requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

});

