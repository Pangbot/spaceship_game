// resourceBars.js
// Handles the logic surrounding the oxygen/food bars.

import { setStoryStatus, setUpdateStatus, storyTime, storyMessages } from "./common.js";

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

    function updateBars() {
    const now = performance.now();
    const elapsedMilliseconds = now - (lastTimestamp || now);

    if (!lastTimestamp) {
        lastTimestamp = now;
    }

    if (!storyTime) {
        bars.forEach((bar) => {
            const barElement = document.getElementById(bar.id);
            const percentageElement = barElement.closest('.resource-bar-container').querySelector('.percentage');

            if (bar.id === 'food_bar' && Math.round(bar.currentBar) === 93 && storyMessages[0].message_shown === false) {
                console.log('story time! (mandatory)');
                setStoryStatus(true);
            }

            const decreaseRate = bar.rate * (elapsedMilliseconds / 1000);
            bar.currentBar = Math.max(0, bar.currentBar - decreaseRate);

            const currentWidth = bar.currentBar;
            barElement.style.width = `${currentWidth}%`;
            barElement.setAttribute('data-fill', bar.currentBar);
            percentageElement.innerText = `${Math.round(bar.currentBar)}%`;
        });
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
