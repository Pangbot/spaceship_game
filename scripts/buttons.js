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
    updateBar('food_bar', foodAdjust);
    updateBar('oxygen_bar', oxygenAdjust);
}

function updateBar(barId, adjustment) {
    const bar = document.getElementById(barId);
    const currentFill = parseFloat(bar.getAttribute('data-fill'));
    const newFill = Math.max(currentFill + adjustment, 0);

    // Update the data-fill attribute
    bar.setAttribute('data-fill', newFill);

    // Update the displayed percentage if available
    const percentageContainer = bar.parentElement.querySelector('.percentage');
    if (percentageContainer) {
        percentageContainer.textContent = `${newLevel}%`;
    }

    // Adjust the width of the fill div
    const fillDiv = bar.querySelector('.resource-fill');
    fillDiv.style.width = `${newFill}%`;
}

function setBarLevels(foodNum, oxygenNum) {
    setBarLevel('food_bar', foodNum);
    setBarLevel('oxygen_bar', oxygenNum);
}

function setBarLevel(barId, level) {
    const bar = document.getElementById(barId);
    const newLevel = Math.max(Math.min(level, 100), 0); // Ensure the level is between 0 and 100

    // Update the data-fill attribute
    bar.setAttribute('data-fill', newLevel);

    // Update the displayed percentage if available
    const percentageContainer = bar.parentElement.querySelector('.percentage');
    if (percentageContainer) {
        percentageContainer.textContent = `${newLevel}%`;
    }

    // Adjust the width of the fill div
    const fillDiv = bar.querySelector('.resource-fill');
    fillDiv.style.width = `${newLevel}%`;
}

export { updateButtonDescriptions };
