// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, setUpdateStatus } from './common.js';
import { runStoryEvent, nextMessage } from './storyController.js';
import { updateResourceBars } from './resourceBars.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialize the game
    initialiseGame();

    // Start updating resource bars independently
    const pauseBars = updateResourceBars();

    function gameLoop() {
        if (isUpdateEnabled) {
            // Call the continuous update function
            updateGame();
        } else {
            runStoryEvent();
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    // Add an event listener for the "Next" button click
    document.getElementById('popup').addEventListener('click', function () {
        nextMessage();
        // Optional: Pause other animations if needed
    });
});