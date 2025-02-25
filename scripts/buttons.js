// buttons.js
// Handles the logic surrounding creating and (un)locking buttons.
import { unlockDoor, setOxygenRate, setFoodRate, changeEventListenerActive, doors } from './common.js';
import { highlightAdjacentRooms, hasClosedDoor } from './roomHighlighting.js';

// Bar rate changes
const oxygenLoss = 0.2;
const foodLoss = 1;

// Function to open a door by wrenching it
function wrenchOpen(roomFrom, roomTo) {
    setOxygenRate(oxygenLoss);
    setFoodRate(foodLoss);
    unlockDoor(roomFrom, roomTo);
    highlightAdjacentRooms(roomFrom);
    changeEventListenerActive(true);
}

// Button Descriptions
const buttonDescriptions = {
    piloting: {
        action1: {
            label: "Action 1 in Piloting",
            unlockCondition: () => true, 
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 1 in Piloting clicked");
            },
        },
        action2: {
            label: "Action 2 in Piloting",
            unlockCondition: () => true, 
            onClick: () => {
                // Add your action-specific logic here
                console.log("Action 2 in Piloting clicked");
            },
        },
    },
    kitchen: {
        action1: {
            label: "Eat some food (+50% food)",
            unlockCondition: () => isActionUnlockConditionMet("eat_food"), 
            onClick: () => {
                setFoodRate(-foodLoss);
            },
        },
    },
    clone_bay: {
        action1: {
            label: "Wrench open door to Scanners (-20% food, -10% oxygen)",
            unlockCondition: () => hasClosedDoor("clone_bay", "scanners", doors) ? isActionUnlockConditionMet("wrench_door") : false,
            onClick: () => {
                wrenchOpen("clone_bay", "scanners");
            },
        },
        action2: {
            label: "Wrench open door to Shields (-20% food, -10% oxygen)",
            unlockCondition: () => hasClosedDoor("clone_bay", "shields", doors) ? isActionUnlockConditionMet("wrench_door") : false,
            onClick: () => {
                wrenchOpen("clone_bay", "shields");
            },
        },
        action3: {
            label: "Wrench open door to Fabrication (-20% food, -10% oxygen)",
            unlockCondition: () => hasClosedDoor("clone_bay", "fabrication", doors) ? isActionUnlockConditionMet("wrench_door") : false,
            onClick: () => {
                wrenchOpen("clone_bay", "fabrication");
            },
        },
        action4: {
            label: "Wrench yourself (-100% food, -100% oxygen)",
            unlockCondition: () => isActionUnlockConditionMet("suicide"), 
            onClick: () => {
                setBarLevels(suicideFood, suicideOxygen);
            },
        }
    },
    scanners: {
        action1: {
            label: "Wrench open door to Kitchen (-20% food, -10% oxygen)",
            unlockCondition: () => hasClosedDoor("kitchen", "scanners", doors) ? isActionUnlockConditionMet("wrench_door") : false,
            onClick: () => {
                wrenchOpen("scanners", "kitchen");
            },
        },
        action2: {
            label: "Action 2 in Scanners",
            unlockCondition: () => true, 
            onClick: () => {
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

// Function to update button states based on current unlock conditions
function updateButtonChecks(roomId) {
    const roomButtons = buttonDescriptions[roomId] || {};
    const containerButtons = document.querySelector('.container-buttons');

    for (const [action, { unlockCondition }] of Object.entries(roomButtons)) {
        try {
            // Use a case-insensitive selector for buttons with text content matching the action
            const button = Array.from(containerButtons.querySelectorAll('.button-wrapper button'))
                .find(btn => btn.textContent.trim().toLowerCase() === `action ${action.slice(-1)}`.toLowerCase());

            if (button) {
                button.disabled = !unlockCondition();
            } else {
                console.error(`Button with text "${action}" not found.`);
            }
        } catch (error) {
            console.error(`Error checking unlock condition for ${action}: ${error}`);
        }
    }
}

// Example unlock condition
function isActionUnlockConditionMet(action) {
    const foodBar = document.getElementById('food_bar');
    const currentFood = parseFloat(foodBar.getAttribute('data-fill'));
    const oxygenBar = document.getElementById('oxygen_bar');
    const currentOxygen = parseFloat(oxygenBar.getAttribute('data-fill'));

    return (currentFood > 0 && currentOxygen > 0);
}

export { updateButtonDescriptions, updateButtonChecks };
