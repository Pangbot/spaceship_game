// buttons.js
// Handles the logic surrounding creating and (un)locking buttons.
import { unlockDoor, changeBarLevels, setBarLevels } from './common.js';
import { highlightAdjacentRooms } from './roomHighlighting.js';

// Bar change amounts
const wrenchFoodLoss = -20;
const wrenchOxygenLoss = -10;
const suicideFood = 0;
const suicideOxygen = 0;

// Function to open a door by wrenching it
function wrenchOpen(roomFrom, roomTo) {
    changeBarLevels(wrenchFoodLoss, wrenchOxygenLoss);
    unlockDoor(roomFrom, roomTo);
    highlightAdjacentRooms(roomFrom);
}

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
        clone_bay_to_scanners: {
            label: "Wrench open door to Scanners (-20% food, -10% oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("wrench_door"), // Add your unlock condition function
            onClick: () => {
                console.log("Wrench open door to Scanners clicked");
                wrenchOpen("clone_bay", "scanners");
            },
        },
        clone_bay_to_shields: {
            label: "Wrench open door to Shields (-20% food, -10% oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("wrench_door"), // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Wrench open door to Shields clicked");
                wrenchOpen("clone_bay", "shields");
            },
        },
        clone_bay_to_fabrication: {
            label: "Wrench open door to Fabrication (-20% food, -10% oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("wrench_door"), // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Wrench open door to Fabrication clicked");
                wrenchOpen("clone_bay", "fabrication");
            },
        },
        suicide: {
            label: "Wrench yourself (-100% food, -100% oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("suicide"), // Add your unlock condition function
            onClick: () => {
                // Add your action-specific logic here
                console.log("Suicide button clicked :(");
                setBarLevels(suicideFood, suicideOxygen);
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
    },
    // ... Add descriptions for other rooms
};

// Function to create and update buttons based on the current room
function updateButtonDescriptions(roomId) {
    const roomButtons = buttonDescriptions[roomId] || {};
    const containerButtons = document.querySelector('.container-buttons');
    containerButtons.innerHTML = ''; // Clear previous buttons
    let i = 0;

    for (const [action, { label, unlockCondition, onClick }] of Object.entries(roomButtons)) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const button = document.createElement('button');
        button.textContent = `Action ${i + 1}`;
        i++;

        try {
            button.disabled = !unlockCondition();
        } catch (error) {
            console.error(`Error checking unlock condition for ${action}: ${error}`);
            button.disabled = true;
        }

        buttonWrapper.appendChild(button);

        const descriptionElement = document.createElement('span');
        descriptionElement.classList.add('button-description');
        descriptionElement.textContent = label;
        buttonWrapper.appendChild(descriptionElement);

        containerButtons.appendChild(buttonWrapper);

        button.addEventListener('click', onClick);
    }
}

// Example unlock condition (adjust as needed)
function isActionUnlockConditionMet(action) {
    const foodBar = document.getElementById('food_bar');
    const currentFood = parseFloat(foodBar.getAttribute('data-fill'));
    const oxygenBar = document.getElementById('oxygen_bar');
    const currentOxygen = parseFloat(oxygenBar.getAttribute('data-fill'));

    console.log(action === "suicide");
    if (action === "suicide" && currentFood > 0 && currentOxygen > 0) {
        return true;
    } else if (action === "wrench_door" && currentFood > 20 && currentOxygen > 10) {
        return true;
    }

    return false;
}

export { updateButtonDescriptions };
