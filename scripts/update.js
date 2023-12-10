// update.js
// Updates stuff.
import { updateResourceBars } from './resourceBars.js';
import { highlightAdjacentRooms, hasOpenDoor } from './roomHighlighting.js';
import { updateButtonDescriptions } from './buttons.js';
import { currentRoom, doors, lastMessageClicked, setLastMessageClicked, isGamePaused } from './common.js';

export function updateGame() {
    if (lastMessageClicked) {
        updateResourceBars();
        setLastMessageClicked(false);
    }

    // Add or update click event listeners on room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    allRoomHighlights.forEach(highlight => {
        // Remove previous click event listener if exists
        highlight.removeEventListener('click', roomHighlightClickHandler);

        // Add a new click event listener
        highlight.addEventListener('click', roomHighlightClickHandler);
    });

    function roomHighlightClickHandler(event) {
        const clickedRoomId = event.currentTarget.getAttribute('data-room-id');

        if (hasOpenDoor(currentRoom.id, clickedRoomId, doors)) {
            // Transition to the target room
            currentRoom.id = clickedRoomId;
            currentRoom.top = parseInt(event.currentTarget.style.top);
            currentRoom.left = parseInt(event.currentTarget.style.left);
            currentRoom.width = parseInt(event.currentTarget.getAttribute('data-room-width')) * 50;
            currentRoom.height = parseInt(event.currentTarget.getAttribute('data-room-height')) * 50;

            // Update room highlights
            highlightAdjacentRooms(currentRoom.id);

            // Update button descriptions based on the new room
            updateButtonDescriptions(currentRoom.id);
        }
    }
}

