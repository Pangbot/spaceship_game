// update.js
// Updates stuff.
import { updateResourceBars } from './resourceBars.js';
import { highlightAdjacentRooms, hasOpenDoor } from './roomHighlighting.js';
import { updateButtonDescriptions } from './buttons.js';
import { currentRoom, doors } from './common.js';

export function updateGame() {
    console.log("Continuous update script loaded!");

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    // Add click event listeners
    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', function (event) {
            const clickedRoom = {
                id: highlight.getAttribute('data-room-id'),
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left),
                width: parseInt(highlight.getAttribute('data-room-width')) * 50,
                height: parseInt(highlight.getAttribute('data-room-height')) * 50,
            };

            if (hasOpenDoor(currentRoom, clickedRoom, doors)) {
                // Transition to the target room
                currentRoom.id = clickedRoom.id;
                currentRoom.top = clickedRoom.top;
                currentRoom.left = clickedRoom.left;
                currentRoom.width = clickedRoom.width;
                currentRoom.height = clickedRoom.height;

                // Update room highlights
                highlightAdjacentRooms(currentRoom);

                // Update button descriptions based on the new room
                updateButtonDescriptions(currentRoom.id);
            }
        });
    });
}
