// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { isGamePaused, currentRoom, oxygenRate, foodRate } from "./common.js";
import { updateButtonChecks } from './buttons.js';

function updateResourceBars() {
    let bars = [
        {
            id: 'oxygen_bar',
            rate: oxygenRate,
            element: document.getElementById('oxygen_bar'),
        },
        {
            id: 'food_bar',
            rate: foodRate,
            element: document.getElementById('food_bar'),
        },
    ];

    let animationFrameId;
    let lastTimestamp;

    // Initialize the bars based on their current width in the HTML
    bars.forEach((bar) => {
        bar.currentValue = parseFloat(bar.element.getAttribute('data-fill')) || 0;
    });

    let updateThreshold = 250; // Set the threshold to some milliseconds

    function updateBars() {
        bars[0].rate = oxygenRate;
        bars[1].rate = foodRate;

        const now = performance.now();
        const elapsedMilliseconds = now - (lastTimestamp || now);

        if (!lastTimestamp) {
            lastTimestamp = now;
        }

        // Update bars only if not paused and if enough time has passed
        if (!isGamePaused && elapsedMilliseconds > updateThreshold) {
            bars.forEach((bar) => {
                const percentageElement = bar.element.closest('.resource-bar-container').querySelector('.percentage');
                const decrease = bar.rate * (elapsedMilliseconds / 1000);
    
                bar.currentValue = Math.max(0, bar.currentValue - decrease);
    
                bar.element.style.width = `${bar.currentValue}%`;
                bar.element.setAttribute('data-fill', bar.currentValue);
                percentageElement.innerText = `${Math.round(bar.currentValue)}%`;
            });
    
            lastTimestamp = now;
            animationFrameId = requestAnimationFrame(updateBars);
            updateButtonChecks(currentRoom.id);
            console.log("Bars updated.")
        }
    }

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);
}

export { updateResourceBars };
