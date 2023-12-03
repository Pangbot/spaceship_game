// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { setStoryStatus, setUpdateStatus, storyTime, storyMessages } from "./common.js";

function updateResourceBars() {
    // Oxygen Bar
    const oxygenBar = document.getElementById('oxygen_bar');
    let currentOxygen = parseFloat(oxygenBar.getAttribute('data-fill'));
    const oxygenContainer = oxygenBar.closest('.resource-bar-container');
    const oxygenPercentage = oxygenContainer.querySelector('.percentage');

    // Food Bar
    const foodBar = document.getElementById('food_bar');
    let currentFood = parseFloat(foodBar.getAttribute('data-fill'));
    const foodContainer = foodBar.closest('.resource-bar-container');
    const foodPercentage = foodContainer.querySelector('.percentage');

    // Update bars by decreasing 1% every second for oxygen and 10% for food (adjust the interval as needed)
    const oxygenDecreaseRate = 0.2;
    const foodDecreaseRate = 1;

    let animationFrameId;
    let lastTimestamp;

    function updateBars() {
        const now = performance.now();
        const elapsedMilliseconds = now - (lastTimestamp || now);

        if (!lastTimestamp) {
            lastTimestamp = now;
        }

        if (!storyTime) {
            // Update bars only if not in story mode
            currentOxygen = Math.max(0, currentOxygen - oxygenDecreaseRate * (elapsedMilliseconds / 1000));
            oxygenBar.style.width = `${currentOxygen}%`;
            oxygenBar.setAttribute('data-fill', currentOxygen);
            oxygenPercentage.innerText = `${Math.round(currentOxygen)}%`;

            currentFood = Math.max(0, currentFood - foodDecreaseRate * (elapsedMilliseconds / 1000));
            foodBar.style.width = `${currentFood}%`;
            foodBar.setAttribute('data-fill', currentFood);
            foodPercentage.innerText = `${Math.round(currentFood)}%`;

            // Conditions for a story event
            if (Math.round(currentFood) == 93 && storyMessages[0].message_shown == false) {
                console.log('story time! (mandatory)');
                setStoryStatus(true);
            }
        }

        // Check if a story event needs to be called
        if (storyTime) {
            setUpdateStatus(false);
        } else {
            console.log('bar update...');
            // Use requestAnimationFrame for the next update
            animationFrameId = requestAnimationFrame(updateBars);
            lastTimestamp = now;
        }
    }

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);

    // Function to pause the bars
    function pauseBars() {
        cancelAnimationFrame(animationFrameId);
    }

    // Expose the pause function
    return pauseBars;
}

export { updateResourceBars };
