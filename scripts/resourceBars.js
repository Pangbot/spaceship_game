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

    let updateThreshold = 500; // Set the threshold to 500 milliseconds (0.5 second)

    function updateBars() {
        const now = performance.now();
        const elapsedMilliseconds = now - (lastTimestamp || now);

        if (!lastTimestamp) {
            lastTimestamp = now;
        }

        if (!storyTime) {
            bars.forEach((bar) => {
                const percentageElement = bar.element.closest('.resource-bar-container').querySelector('.percentage');

                // Calculate the decrease based on the time elapsed
                const decrease = bar.rate * (elapsedMilliseconds / 1000);

                // Update bar only if not in story mode and if enough time has passed
                if (elapsedMilliseconds > updateThreshold) {
                    bar.currentValue = Math.max(0, bar.currentValue - decrease);
                    const currentWidth = bar.currentValue;
                    bar.element.style.width = `${currentWidth}%`;
                    bar.element.setAttribute('data-fill', currentWidth);
                    percentageElement.innerText = `${Math.round(currentWidth)}%`;

                    // Update the last timestamp after the bars are updated
                    lastTimestamp = now;
                }
            });

            // Conditions for a story event
            if (Math.round(bars[1].currentValue) === 93 && storyMessages[0].message_shown === false) {
                console.log('story time! (mandatory)');
                setStoryStatus(true);
            }
        }

        console.log("story time: ",storyTime);
        // Check if a story event needs to be called
        if (storyTime) {
            setUpdateStatus(false);
            cancelAnimationFrame(animationFrameId);
        } else {
            // Use requestAnimationFrame for the next update
            animationFrameId = requestAnimationFrame(updateBars);
        }
    }

    // Initial call to start the recursive process
    animationFrameId = requestAnimationFrame(updateBars);
}

export { updateResourceBars };
