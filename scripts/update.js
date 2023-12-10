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

    // Delegate click event to a common ancestor
    const commonAncestor = document.querySelector('.container-of-all-room-highlights');

    commonAncestor.addEventListener('click', function (event) {
        const target = event.target;

        // Check if the clicked element has the class 'roomHighlight1x2', 'roomHighlight2x1', or 'roomHighlight2x2'
        if (target.matches('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2')) {
            const clickedRoomId = target.getAttribute('data-room-id');

            if (hasOpenDoor(currentRoom.id, clickedRoomId, doors)) {
                // Transition to the target room
                currentRoom.id = clickedRoomId;
                currentRoom.top = parseInt(target.style.top);
                currentRoom.left = parseInt(target.style.left);
                currentRoom.width = parseInt(target.getAttribute('data-room-width')) * 50;
                currentRoom.height = parseInt(target.getAttribute('data-room-height')) * 50;

                // Update room highlights
                highlightAdjacentRooms(currentRoom.id);

                // Update button descriptions based on the new room
                updateButtonDescriptions(currentRoom.id);
            }
        }
    });
}
