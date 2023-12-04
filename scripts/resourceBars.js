// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { setStoryStatus, setUpdateStatus, storyTime, storyMessages } from "./common.js";

function updateResourceBars() {
    const bars = [
        {
            id: 'oxygen_bar',
            rate: 0.2,
        },
        {
            id: 'food_bar',
            rate: 1,
        },
    ];

    let animationFrameId;
    let lastTimestamp;

    function updateBars() {
        const now = performance.now();
        const elapsedMilliseconds = now - (lastTimestamp || now);

        if (!lastTimestamp) {
            lastTimestamp = now;
        }

        if (!storyTime) {
            bars.forEach((bar) => {
                const barElement = document.getElementById(bar.id);
                let currentBar = parseFloat(barElement.getAttribute('data-fill'));
                const container = barElement.closest('.resource-bar-container');
                const percentage = container.querySelector('.percentage');

                const decreaseRate = bar.rate * (elapsedMilliseconds / 1000);
                currentBar = Math.max(0, currentBar - decreaseRate);

                const barWidth = currentBar; // Use the percentage directly
                barElement.style.width = `${barWidth}%`; // Set the width as a percentage
                barElement.setAttribute('data-fill', currentBar);
                percentage.innerText = `${Math.round(currentBar)}%`;
            });

            // Conditions for a story event
            const foodBar = bars.find((bar) => bar.id === 'food_bar');
            if (Math.round(foodBar.rate) === 93 && storyMessages[0].message_shown === false) {
                console.log('story time! (mandatory)');
                setStoryStatus(true);
            }
        }

        // Check if a story event needs to be called
        if (storyTime) {
            setUpdateStatus(false);
            cancelAnimationFrame(animationFrameId);
        } else {
            // Use requestAnimationFrame for the next update
            animationFrameId = requestAnimationFrame(updateBars);
            lastTimestamp = now;
        }
    }

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);
}


export { updateResourceBars };
