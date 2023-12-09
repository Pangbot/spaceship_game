// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { isGamePaused, manualTime, manualFood, manualOxygen, foodAdjust, oxygenAdjust, resetManualTime, startValueUpdateLoop } from "./common.js";

function updateResourceBars() {

    const bars = [
        {
            id: 'oxygen_bar',
            rate: 0.2,
            element: document.getElementById('oxygen_bar'),
            manual: manualOxygen,
            adjust: oxygenAdjust,
        },
        {
            id: 'food_bar',
            rate: 1,
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

    let updateThreshold = 1000; // Set the threshold to some milliseconds

    function updateBars() {
        console.log(manualTime);
        
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
                    console.log("Setting...");
                    const currentWidth = bar.manual;
                    bar.element.style.width = `${currentWidth}%`;
                    bar.element.setAttribute('data-fill', currentWidth);
                    percentageElement.innerText = `${Math.round(currentWidth)}%`;
            
                } else if (manualTime > 0) {
                    console.log("Changing...");
                    bar.currentValue = Math.max(0, bar.currentValue + bar.adjust);
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
                // Update the last timestamp after the bars are updated
                lastTimestamp = now;
            }
        });
        resetManualTime();
    
        // Check if a story event needs to be called
        if (!isGamePaused) {
            // Use requestAnimationFrame for the next update
            animationFrameId = requestAnimationFrame(updateBars);
        }
    }

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);
}



export { updateResourceBars };
