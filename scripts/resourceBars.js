// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { isGamePaused, setGamePause } from "./common.js";

function updateResourceBars() {
    const bars = [
        {
            id: 'oxygen_bar',
            rate: 0.2,
            element: document.getElementById('oxygen_bar'),
        },
        {
            id: 'food_bar',
            rate: 1,
            element: document.getElementById('food_bar'),
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
                bar.currentValue = Math.max(0, bar.currentValue - decrease);
                const currentWidth = bar.currentValue;
                bar.element.style.width = `${currentWidth}%`;
                bar.element.setAttribute('data-fill', currentWidth);
                percentageElement.innerText = `${Math.round(currentWidth)}%`;
    
                // Update the last timestamp after the bars are updated
                lastTimestamp = now;
            }
        });
    
        // Check if a story event needs to be called
        if (!isGamePaused) {
            // Use requestAnimationFrame for the next update
            animationFrameId = requestAnimationFrame(updateBars);
        }
    }

    function setBarLevels(foodNum, oxygenNum) {
        const bars = [
            {
                id: 'oxygen_bar',
            },
            {
                id: 'food_bar',
            },
        ];
    
        bars.forEach((bar) => {
            const barElement = document.getElementById(bar.id);
            const percentageElement = barElement.closest('.resource-bar-container').querySelector('.percentage');
    
            // Set bar to the specified level
            const newWidth = Math.max(0, Math.min(100, parseFloat(foodNum)));
            barElement.style.width = `${newWidth}%`;
            barElement.setAttribute('data-fill', newWidth);
            percentageElement.innerText = `${Math.round(newWidth)}%`;
        });
    }

    function changeBarLevels(foodAdjust, oxygenAdjust) {
        const bars = [
            {
                id: 'oxygen_bar',
            },
            {
                id: 'food_bar',
            },
        ];
    
        bars.forEach((bar) => {
            const barElement = document.getElementById(bar.id);
            const percentageElement = barElement.closest('.resource-bar-container').querySelector('.percentage');
    
            // Update bar by the set amount
            bar.currentValue = Math.max(0, parseFloat(barElement.getAttribute('data-fill')) + (bar.id === 'oxygen_bar' ? oxygenAdjust : foodAdjust));
            const currentWidth = bar.currentValue;
            barElement.style.width = `${currentWidth}%`;
            barElement.setAttribute('data-fill', currentWidth);
            percentageElement.innerText = `${Math.round(currentWidth)}%`;
        });
    }
    

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);
}



export { updateResourceBars, setBarLevels, changeBarLevels };
