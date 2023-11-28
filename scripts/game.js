import { hasOpenDoor, hasClosedDoor } from './doorLogic.js';
import { highlightAdjacentRooms } from './roomHighlighting.js';
import { updateResourceBars } from './resourceBars.js';
import { updateButtonDescriptions } from './buttons.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded!");

    // Disable context menu on right-click for the ship map
    document.getElementById('mapImage').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    let currentRoom = {
        id: "clone_bay",
        top: 502,
        left: 101,
        width: 202,
        height: 202,
    }

    // Initial Highlighting
    highlightAdjacentRooms()

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    // Add highlighting to the current room
    allRoomHighlights.forEach(highlight => {
        const room = {
            id: highlight.getAttribute('data-room-id'),
            top: parseInt(highlight.style.top),
            left: parseInt(highlight.style.left),
            width: parseInt(highlight.getAttribute('data-room-width')) * 100,
            height: parseInt(highlight.getAttribute('data-room-height')) * 100,
        };

        if (currentRoom.id === room.id) {
            highlight.classList.add('highlighted');
        }
    });

    // Add click event listeners
    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', function (event) {
            const clickedRoom = {
                id: highlight.getAttribute('data-room-id'),
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left),
                width: parseInt(highlight.getAttribute('data-room-width')) * 100,
                height: parseInt(highlight.getAttribute('data-room-height')) * 100,
            };

            if (hasOpenDoor(currentRoom, clickedRoom)) {
                // Transition to the target room
                currentRoom = clickedRoom;

                // Remove highlighting from all rooms
                allRoomHighlights.forEach(room => {
                    room.classList.remove('highlighted');
                });

                // Highlight adjacent rooms
                highlightAdjacentRooms();

                // Add highlighting to the clicked room
                highlight.classList.add('highlighted');

                // Update button descriptions based on the new room
                updateButtonDescriptions(currentRoom.id);
            }
        });
    });

    // Call the function once the DOM is fully loaded
    updateResourceBars();

    // Call the function initially with the current room ID
    updateButtonDescriptions(currentRoom.id);
});
