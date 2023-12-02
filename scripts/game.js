// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled, storyTime } from './common.js';
import { runStoryEvent, handleCloseButtonClick, handleNextButtonClick } from './storyController.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    function gameLoop() {
        if (isUpdateEnabled) {
            // Call the continuous update function
            updateGame();
        } else if(storyTime) {
            runStoryEvent();
        } else {
            console.error("I DON'T KNOW WHAT TO DO");
        }

        // Use requestAnimationFrame to schedule the next iteration
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    const nextButtonExists = document.getElementById('popup').querySelector('.popup-button-next');
    const closeButtonExists = document.getElementById('popup').querySelector('.popup-button-close');

    if (nextButtonExists) {
        // Add an event listener for the "Next" button click
        document.getElementById('popup').addEventListener('click', function () {
            handleNextButtonClick();
        });
    }

    if (closeButtonExists) {
        // Add an event listener for the "Close" button click
        document.getElementById('popup').addEventListener('click', function () {
            handleCloseButtonClick();
        });
    }
});
