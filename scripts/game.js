// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isUpdateEnabled } from './common.js';
import { runStoryEvent } from './storyController.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialize the game
    initialiseGame();

    while (true) {

        if (isUpdateEnabled) {
            // Call the continuous update function
            updateGame();
        }
        else {
            runStoryEvent();
        }
    }
});
