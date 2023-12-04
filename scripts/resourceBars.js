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
                const percentageElement = barElement.closest('.resource-bar-container').querySelector('.percentage');
            
                // Calculate the decrease based on the time elapsed
                const decrease = bar.rate * (elapsedMilliseconds / 1000);
    
                // Update bar only if not in story mode
                bar.currentValue = Math.max(0, bar.currentValue - decrease);
                const currentWidth = bar.currentValue * 100; // Use the percentage directly
                barElement.style.width = `${currentWidth}%`; // Set the width as a percentage
                barElement.setAttribute('data-fill', currentWidth);
                percentageElement.innerText = `${Math.round(currentWidth)}%`;

                // Conditions for a story event
                if (bar.id === 'food_bar' && Math.round(bar.currentValue) === 93 && storyMessages[0].message_shown === false) {
                    console.log('story time! (mandatory)');
                    setStoryStatus(true);
                }
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
