// game.js
import { initializeGame } from './init.js';
import { updateGame } from './update.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialize the game
    initializeGame();

    // Additional game logic can be added here

    // Call the continuous update function
    updateGame();
});
