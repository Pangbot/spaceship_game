// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialize the game
    initialiseGame();

    // Call the continuous update function
    updateGame();
});
