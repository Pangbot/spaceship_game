// roomHighlighting.js
// Contains the logic for highlighting rooms on the ship map.
import {doors, isGamePaused} from './common.js';

// Function to check if a door exists between two rooms
function hasOpenDoor(currentRoom, clickedRoom, doors) {
    return doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id && door.status === "open") ||
                                      (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id && door.status === "open"));
}

function hasClosedDoor(currentRoom, clickedRoom, doors) {
    return doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id && door.status === "closed") ||
                                          (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id && door.status === "closed"));
}

function highlightAdjacentRooms(currentRoom) {
    if (isGamePaused) {
        return;
    }
    
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    // First clear all highlights
    allRoomHighlights.forEach(highlight => {
        highlight.classList.remove('adjacent');
        highlight.classList.remove('available');
        highlight.classList.remove('highlighted');
    });

    // Now highlight appropriately
    allRoomHighlights.forEach(highlight => {
        const room = {
            id: highlight.getAttribute('data-room-id'),
            top: parseInt(highlight.style.top),
            left: parseInt(highlight.style.left),
            width: parseInt(highlight.getAttribute('data-room-width')) * 50,
            height: parseInt(highlight.getAttribute('data-room-height')) * 50,
        };

        // Add highlighting to adjacent rooms
        if (hasOpenDoor(currentRoom, room, doors)) {
            highlight.classList.add('available');
        } else if (hasClosedDoor(currentRoom, room, doors)) {
            highlight.classList.add('adjacent');
        } else {
            highlight.classList.remove('adjacent');
            highlight.classList.remove('available');
        }

        // Add highlighting to the current room
        if (currentRoom.id === room.id) {
            highlight.classList.add('highlighted');
        }
    });
}

export { highlightAdjacentRooms, hasOpenDoor, hasClosedDoor};
