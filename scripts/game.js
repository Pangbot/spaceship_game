// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled } from './common.js';
import { runStoryEvent } from './storyController.js';
import { updateResourceBars } from './resourceBars.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialize the game
    initialiseGame();

    // Start updating resource bars independently
    updateResourceBars();

    function gameLoop() {
        if (isUpdateEnabled) {
            // Call the continuous update function
            updateGame();
        } else {
            runStoryEvent();
            updateResourceBars();
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});
