// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { isGamePaused, manualTime, manualFood, manualOxygen, foodAdjust, oxygenAdjust, resetManualTime, currentRoom, oxygenRate, foodRate } from "./common.js";
import { updateButtonChecks } from './buttons.js';

function updateResourceBars() {
    let bars = [
        {
            id: 'oxygen_bar',
            rate: oxygenRate,
            element: document.getElementById('oxygen_bar'),
            manual: manualOxygen,
            adjust: oxygenAdjust,
        },
        {
            id: 'food_bar',
            rate: foodRate,
            element: document.getElementById('food_bar'),
            manual: manualFood,
            adjust: foodAdjust,
        },
    ];

    let animationFrameId;
    let lastTimestamp;

    // Initialize the bars based on their current width in the HTML
    bars.forEach((bar) => {
        bar.currentValue = parseFloat(bar.element.getAttribute('data-fill')) || 0;
    });

    let updateThreshold = 250; // Set the threshold to some milliseconds
    let extraTimes = [];

    function updateBars() {
        bars[0].manual = manualOxygen;
        bars[0].adjust = oxygenAdjust;
        bars[1].manual = manualFood;
        bars[1].adjust = foodAdjust;

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
    
                if (manualTime > 1) {
                    bar.currentValue = bar.manual;
                } else if (manualTime > 0) {
                    bar.currentValue = Math.min(100, Math.max(0, bar.currentValue + bar.adjust));
                } else {
                    bar.currentValue = Math.max(0, bar.currentValue - decrease);
                }
    
                bar.element.style.width = `${bar.currentValue}%`;
                bar.element.setAttribute('data-fill', bar.currentValue);
                percentageElement.innerText = `${Math.round(bar.currentValue)}%`;
            });
    
            lastTimestamp = now;
            setTimeout(() => resetManualTime(), updateThreshold * 2);
        }
    
        if (!isGamePaused) {
            // Use requestAnimationFrame for the next update
            animationFrameId = requestAnimationFrame(updateBars);
            updateButtonChecks(currentRoom.id);
        }
    }

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);
}

export { updateResourceBars };
