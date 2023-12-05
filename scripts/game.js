// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, storyTime, isGamePaused, setGamePause } from './common.js';
import { runStoryEvent } from './storyController.js';
import { showOptionsMenu } from './options.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    // Variable to track whether the story event is running
    let isStoryEventRunning = false;

    // Add an event listener for the 'p' key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'p') {
            setGamePause(true);
            showOptionsMenu();
        }
    });

    async function gameLoop() {
        if (isUpdateEnabled && !isStoryEventRunning && !isGamePaused) {
            // Call the continuous update function
            updateGame();
        } else if (storyTime && !isStoryEventRunning && !isGamePaused) {
            // Set the flag to prevent multiple story event runs
            isStoryEventRunning = true;

            // Run the story event and await its completion
            await runStoryEvent()
            // Reset the flag after the story event is complete
            isStoryEventRunning = false;
        } else if (isGamePaused) {
            await showOptionsMenu();
        } else {
            console.error("I DON'T KNOW WHAT TO DO");
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});

export { runStoryEvent };
