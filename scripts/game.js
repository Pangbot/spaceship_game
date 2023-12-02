// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, storyTime } from './common.js';
import { runStoryEvent, handleCloseButtonClick, handleNextButtonClick } from './storyController.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    let waitForButtonClick = false;

    function gameLoop() {
        if (isUpdateEnabled) {
            // Call the continuous update function
            updateGame();
        } else if (storyTime) {
            runStoryEvent();
            if (waitForButtonClick) {
                waitForButtonClick = false;
                return;
            }
        } else {
            console.error("I DON'T KNOW WHAT TO DO");
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    // Add an event listener for the "Next" button click
    document.getElementById('popup').addEventListener('click', function () {
        waitForButtonClick = true;
        runStoryEvent();
    });
});