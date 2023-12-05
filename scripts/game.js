// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isGamePaused, setGamePause } from './common.js';
import { runStoryEvent, checkForNextStoryEvent } from './storyController.js';
import { showOptionsMenu, hideOptionsMenu } from './options.js';
import { updateResourceBars } from './resourceBars.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    // Variable to track whether the story event is running
    let isStoryEventRunning = false;

    // Add an event listener for the 'p' key to open/close the options menu
    document.addEventListener('keydown', handleMenuToggle);

    async function gameLoop() {
        if (!isGamePaused) {
            if (checkForNextStoryEvent()) {
                // Set the flag to prevent multiple story event runs
                isStoryEventRunning = true;

                // Run the story event and await its completion
                await runStoryEvent();

                // Reset the flag after the story event is complete
                isStoryEventRunning = false;
            } else if (!isStoryEventRunning) {
                // Call the continuous update function
                updateGame();
            } else {
                console.error("I DON'T KNOW WHAT TO DO");
            }
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    function handleMenuToggle(event) {
        console.log("Listener trigger.");
        // Check if the pressed key is "p"
        if (event.key === 'p' && !isStoryEventRunning) {
            console.log("Menu toggle!");
            setGamePause(!isGamePaused);
            console.log("Game paused now? ",isGamePaused);
            if (isGamePaused) {
                showOptionsMenu();
            } else {
                hideOptionsMenu();
                console.log('restarting the bars and game...');
                updateResourceBars();
            }
        }
        console.log("Listener function end.")
    }
});
