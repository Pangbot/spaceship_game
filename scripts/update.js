// update.js
// Updates stuff.
import { updateResourceBars } from './resourceBars.js';
import { highlightAdjacentRooms, hasOpenDoor } from './roomHighlighting.js';
import { updateButtonDescriptions } from './buttons.js';
import { currentRoom, doors, lastMessageClicked, setLastMessageClicked, isGamePaused } from './common.js';

export function updateGame() {
    
    if(lastMessageClicked) {
        updateResourceBars();
        setLastMessageClicked(false);
    }

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', function (event) {
            const clickedRoomId = highlight.getAttribute('data-room-id');

            if (hasOpenDoor(currentRoom.id, clickedRoomId, doors)) {
                // Transition to the target room
                currentRoom.id = clickedRoomId;
                currentRoom.top = parseInt(highlight.style.top);
                currentRoom.left = parseInt(highlight.style.left);
                currentRoom.width = parseInt(highlight.getAttribute('data-room-width')) * 50;
                currentRoom.height = parseInt(highlight.getAttribute('data-room-height')) * 50;

                // Update room highlights
                highlightAdjacentRooms(currentRoom.id);

                // Update button descriptions based on the new room
                updateButtonDescriptions(currentRoom.id);
            }
        });
    });
}
