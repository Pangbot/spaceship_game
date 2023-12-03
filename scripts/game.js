// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, storyTime } from './common.js';
import { runStoryEvent } from './storyController.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    // Variable to track whether the story event is running
    let isStoryEventRunning = false;

    async function gameLoop() {
        if (isUpdateEnabled && !isStoryEventRunning) {
            // Call the continuous update function
            updateGame();
        } else if (storyTime && !isStoryEventRunning) {
            // Set the flag to prevent multiple story event runs
            isStoryEventRunning = true;

            // Run the story event and await its completion
            await runStoryEvent();

            // Reset the flag after the story event is complete
            isStoryEventRunning = false;
        } else {
            console.error("I DON'T KNOW WHAT TO DO");
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});
