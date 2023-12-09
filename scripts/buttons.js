// buttons.js
// Handles the logic surrounding creating and (un)locking buttons.
import { unlockDoor } from './common.js';
import { highlightAdjacentRooms } from './roomHighlighting.js';

// Bar change amounts
const wrenchFoodLoss = -20;
const wrenchOxygenLoss = -10;
const suicideFood = 0;
const suicideOxygen = 0;

// Button Descriptions
const buttonDescriptions = {
    piloting: {
        action1: {
            label: "Action 1 in Piloting",
            unlockCondition: () => true, // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 1 in Piloting clicked");
            },
        },
        action2: {
            label: "Action 2 in Piloting",
            unlockCondition: () => true, // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 2 in Piloting clicked");
            },
        },
    },
    kitchen: {
        action1: {
            label: "Action 1 in Kitchen",
            unlockCondition: () => true, // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 1 in Kitchen clicked");
            },
        },
    },
    clone_bay: {
        wrench1: {
            label: "Wrench open door to Scanners (-20 food, -10 oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("wrench1"), // Add your unlock condition function
            onClick: () => {
                console.log("Wrench open door to Scanners clicked");
                changeBarLevels(wrenchFoodLoss,wrenchOxygenLoss);
                unlockDoor("clone_bay", "scanners");
                highlightAdjacentRooms("clone_bay");
            },
        },
        wrench2: {
            label: "Wrench open door to Shields (-20 food, -10 oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("wrench2"), // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Wrench open door to Shields clicked");
                changeBarLevels(wrenchFoodLoss,wrenchOxygenLoss);
                unlockDoor("clone_bay","shields");
                highlightAdjacentRooms("clone_bay");
            },
        },
        wrench3: {
            label: "Wrench open door to Fabrication (-20 food, -10 oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("wrench3"), // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Wrench open door to Fabrication clicked");
                changeBarLevels(wrenchFoodLoss,wrenchOxygenLoss);
                unlockDoor("clone_bay","fabrication");
                highlightAdjacentRooms("clone_bay");
            },
        },
        suicide: {
            label: "Wrench yourself (-100 food, -100 oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("suicide"), // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Suicide button clicked :(");
                setBarLevels(suicideFood,suicideOxygen);
            },
        }
    },
    scanners: {
        action1: {
            label: "Action 1 in Scanners",
            unlockCondition: () => true, // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 1 in Scanners clicked");
            },
        },
        action2: {
            label: "Action 2 in Scanners",
            unlockCondition: () => true, // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 2 in Scanners clicked");
            },
        },
    }
    // ... Add descriptions for other rooms
};

// Function to create and update buttons based on the current room
function updateButtonDescriptions(roomId) {
    const roomButtons = buttonDescriptions[roomId] || {};
    const containerButtons = document.querySelector('.container-buttons');
    containerButtons.innerHTML = ''; // Clear previous buttons

    Object.keys(roomButtons).forEach((action, i) => {
        const { label, unlockCondition, onClick } = roomButtons[action];

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const button = document.createElement('button');
        button.textContent = `Action ${i + 1}`;
        button.disabled = !unlockCondition();

        buttonWrapper.appendChild(button);

        const descriptionElement = document.createElement('span');
        descriptionElement.classList.add('button-description');
        descriptionElement.textContent = label;
        buttonWrapper.appendChild(descriptionElement);

        containerButtons.appendChild(buttonWrapper);

        button.addEventListener('click', onClick);
    });
}

// Example unlock condition (adjust as needed)
function isActionUnlockConditionMet(action) {
    const foodBar = document.getElementById('food_bar');
    const currentFood = parseFloat(foodBar.getAttribute('data-fill'));
    const oxygenBar = document.getElementById('oxygen_bar');
    const currentOxygen = parseFloat(oxygenBar.getAttribute('data-fill'));

    // Add your unlock condition logic here
    if (currentFood < 20 || currentOxygen < 10) {
        return false;
    }
    return true;
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
        bar.currentValue = Math.max(0, parseFloat(barElement.getAttribute('data-fill')) - (bar.id === 'oxygen_bar' ? oxygenAdjust : foodAdjust));
        const currentWidth = bar.currentValue;
        barElement.style.width = `${currentWidth}%`;
        barElement.setAttribute('data-fill', currentWidth);
        percentageElement.innerText = `${Math.round(currentWidth)}%`;
    });
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

export { updateButtonDescriptions };
