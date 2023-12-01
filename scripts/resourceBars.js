// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { setStoryStatus, setUpdateStatus, storyTime } from "./common.js";

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

    let lastTimestamp;

    function updateBars(timestamp) {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        const elapsedMilliseconds = timestamp - lastTimestamp;

        currentOxygen = Math.max(0, currentOxygen - (oxygenDecreaseRate * (elapsedMilliseconds / 1000)));
        oxygenBar.style.width = `${currentOxygen}%`;
        oxygenBar.setAttribute('data-fill', currentOxygen);
        oxygenPercentage.innerText = `${Math.round(currentOxygen)}%`;

        currentFood = Math.max(0, currentFood - (foodDecreaseRate * (elapsedMilliseconds / 1000)));
        foodBar.style.width = `${currentFood}%`;
        foodBar.setAttribute('data-fill', currentFood);
        foodPercentage.innerText = `${Math.round(currentFood)}%`;

        // Update last timestamp
        lastTimestamp = timestamp;

        // Continue the loop
        requestAnimationFrame(updateBars);

        // Conditions for a story event
        if (Math.round(currentFood) == 93) {
            setStoryStatus(true);
        }

        // Check if a story event needs to be called
        if (storyTime) {
            // If in story mode, pause the resource bars update
            requestAnimationFrame(updateBars);
            setUpdateStatus(false);
            return;
        }
    }

    // Initial call to start the recursive process
    requestAnimationFrame(updateBars);
}

export { updateResourceBars };