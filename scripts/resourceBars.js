// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

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
    const interval = 1000; // 1000 milliseconds = 1 second

    setInterval(function () {
        currentOxygen = Math.max(0, currentOxygen - oxygenDecreaseRate);
        oxygenBar.style.width = `${currentOxygen}%`;
        oxygenBar.setAttribute('data-fill', currentOxygen);
        oxygenPercentage.innerText = `${Math.round(currentOxygen)}%`;

        currentFood = Math.max(0, currentFood - foodDecreaseRate);
        foodBar.style.width = `${currentFood}%`;
        foodBar.setAttribute('data-fill', currentFood);
        foodPercentage.innerText = `${Math.round(currentFood)}%`;
    }, interval);
}

export {updateResourceBars};