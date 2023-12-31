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
    
        bars.forEach((bar) => {
            const percentageElement = bar.element.closest('.resource-bar-container').querySelector('.percentage');
    
            // Calculate the decrease based on the time elapsed
            const decrease = bar.rate * (elapsedMilliseconds / 1000);
    
            // Update bar only if not in story mode and if enough time has passed
            if (!isGamePaused && elapsedMilliseconds > updateThreshold) {
                if (manualTime > 1) {
                    bar.currentValue = bar.manual;
                    const currentWidth = bar.currentValue;
                    bar.element.style.width = `${currentWidth}%`;
                    bar.element.setAttribute('data-fill', currentWidth);
                    percentageElement.innerText = `${Math.round(currentWidth)}%`;
            
                } else if (manualTime > 0) {
                    bar.currentValue = Math.min(100, Math.max(0, bar.currentValue + bar.adjust));
                    const currentWidth = bar.currentValue;
                    bar.element.style.width = `${currentWidth}%`;
                    bar.element.setAttribute('data-fill', currentWidth);
                    percentageElement.innerText = `${Math.round(currentWidth)}%`;
                }
                else {
                    bar.currentValue = Math.max(0, bar.currentValue - decrease);
                    const currentWidth = bar.currentValue;
                    bar.element.style.width = `${currentWidth}%`;
                    bar.element.setAttribute('data-fill', currentWidth);
                    percentageElement.innerText = `${Math.round(currentWidth)}%`;
                }
                // Calculate FPS and output to the console
                const extraTime = elapsedMilliseconds - updateThreshold;
                extraTimes.push(extraTime);

                // Calculate the sum of extraTimes
                const sum = extraTimes.reduce((acc, num) => acc + num, 0);

                // console.log(`Last extra time: ${extraTime}. Average extra time: ${sum / extraTimes.length}`);

                // Update the last timestamp after the bars are updated
                lastTimestamp = now;
            }
        });
        if(elapsedMilliseconds > updateThreshold) {
            resetManualTime();
        }
    
        // Check if a story event needs to be called
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
