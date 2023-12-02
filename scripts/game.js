// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, storyTime } from './common.js';
import { runStoryEvent } from './storyController.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    function gameLoop() {
        if (isUpdateEnabled) {
            // Call the continuous update function
            updateGame();
        } else if (storyTime) {
            runStoryEvent();
        } else {
            console.error("I DON'T KNOW WHAT TO DO");
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});
