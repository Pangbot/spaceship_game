// buttons
// Handles the logic surrounding creating and (un)locking buttons.

// Button Descriptions
const buttonDescriptions = {
    piloting: {
        action1: "Description for Action 1 in Piloting",
        action2: "Description for Action 2 in Piloting",
    },
    kitchen: {
        action1: "Description for Action 1 in Kitchen",
    },
    clone_bay: {
        action1: "Description for Action 1 in Clone Bay",
        action2: "Description for Action 2 in Clone Bay",
        action3: "Description for Action 3 in Clone Bay",
        action4: "Description for Action 4 in Clone Bay",
    },
    scanners: {
        action1: "Description for Action 1 in Scanners",
        action2: "Description for Action 2 in Scanners",
    }
    // ... Add descriptions for other rooms
};

// Function to create and update buttons based on the current room
function updateButtonDescriptions(roomId) {
    const roomButtons = buttonDescriptions[roomId] || {};
    const containerButtons = document.querySelector('.container-buttons');
    containerButtons.innerHTML = ''; // Clear previous buttons

    Object.keys(roomButtons).forEach((action, i) => {
        const actionDescription = roomButtons[action];
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const button = document.createElement('button');
        button.textContent = `Action ${i + 1}`;
        button.disabled = !isActionUnlockConditionMet(action); // Adjust this condition

        buttonWrapper.appendChild(button);

        const descriptionElement = document.createElement('span');
        descriptionElement.classList.add('button-description');
        descriptionElement.textContent = actionDescription;
        buttonWrapper.appendChild(descriptionElement);

        containerButtons.appendChild(buttonWrapper);

        button.addEventListener('click', () => {
            // Handle button click
            console.log(`${roomId} - ${action} clicked`);
        });
    });
}

// Example unlock condition (adjust as needed)
function isActionUnlockConditionMet(action) {
    const foodBar = document.getElementById('food_bar');
    const currentFood = parseFloat(foodBar.getAttribute('data-fill'));

    // Add your unlock condition logic here
    if(currentFood < 70) {
        return false;
    }
    return true;
}

export{ updateButtonDescriptions };