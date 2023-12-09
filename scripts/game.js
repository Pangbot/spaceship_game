// game.js
import { initialiseGame } from './init.js';
import { updateGame } from './update.js';
import { isGamePaused, setGamePause, tabContent } from './common.js';
import { runStoryEvent, checkForNextStoryEvent } from './storyController.js';
import { showOptionsMenu, hideOptionsMenu } from './options.js';
import { updateResourceBars } from './resourceBars.js';

let fps = 0;

function changeTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const content = document.getElementById('content');

    tabs.forEach((tab, i) => {
        if (i === index) {
        tab.classList.add('active');
        } else {
        tab.classList.remove('active');
        }
    });

    content.innerHTML = `<p>${tabContent[index]}</p>`;
}

window.changeTab = changeTab;

document.addEventListener('DOMContentLoaded', function () {
    console.log("Game script loaded!");

    // Initialise the game
    initialiseGame();

    // Variable to track whether the story event is running
    let isStoryEventRunning = false;

    let storyIndex = 0;

    // Add an event listener for the 'p' key to open/close the options menu
    document.addEventListener('keydown', handleMenuToggle);

    async function gameLoop() {
        if (!isGamePaused) {
            if (checkForNextStoryEvent(storyIndex)) {
                // Set the flag to prevent multiple story event runs
                isStoryEventRunning = true;

                // Run the story event and await its completion
                await runStoryEvent();

                // Reset the flag after the story event is complete
                isStoryEventRunning = false;

                storyIndex++;
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

    // Start monitoring FPS when your game starts
    startFPSMonitoring();
    
    // Start the game loop
    gameLoop();

    function handleMenuToggle(event) {
        // Check if the pressed key is "p"
        if (event.key === 'p' && !isStoryEventRunning) {
            setGamePause(!isGamePaused);
            if (isGamePaused) {
                showOptionsMenu();
            } else {
                hideOptionsMenu();
                updateResourceBars()
            }
        }
    }

    function updateFPS() {
        const now = performance.now();
        const elapsed = now - (updateFPS.lastTime || now);
        updateFPS.lastTime = now;

        fps = 1000 / elapsed;
    }

    function displayFPS() {
        console.log(`Current FPS: ${fps.toFixed(2)}`);
        // You can update your game UI or perform other actions based on the FPS value
    }

    function startFPSMonitoring() {
        setInterval(() => {
            updateFPS();
            displayFPS();
        }, 1000); // Update FPS every second
    }
});

