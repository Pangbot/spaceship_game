// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, storyTime, isGamePaused, setGamePause } from './common.js';
import { runStoryEvent } from './storyController.js';
import { showOptionsMenu, hideOptionsMenu } from './options.js';
import { updateResourceBars } from './resourceBars.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    // Variable to track whether the story event is running
    let isStoryEventRunning = false;

    // Add an event listener for the 'p' key to open the options menu
    document.addEventListener('keydown', handleMenuOpen);

    async function gameLoop() {
        if (!isGamePaused) {
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
        }
    
        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    async function handleMenuOpen(event) {
        // Check if the pressed key is "p"
        if (event.key === 'p' && !isGamePaused && !isStoryEventRunning) {
            setGamePause(true);

            document.removeEventListener('keydown', handleMenuOpen);

            // Add an event listener for the 'p' key to close the options menu
            document.addEventListener('keydown', handleMenuClose);
            
            await showOptionsMenu();
        }
    }

    function handleMenuClose(event) {
        // Check if the pressed key is "esc"
        if (event.key === 'p' && isGamePaused && !isStoryEventRunning) {
            setGamePause(false);

            document.removeEventListener('keydown', handleMenuClose);

            document.addEventListener('keydown', handleMenuOpen);

            hideOptionsMenu();
            console.log('restarting the bars...');
            updateResourceBars();
        }
    }
});