// roomHighlighting.js
// Contains the logic for highlighting rooms on the ship map.
import {doors, isGamePaused} from './common.js';

// Function to check if a door exists between two rooms
function hasOpenDoor(currentRoomId, clickedRoomId, doors) {
    return doors.some(door =>
        (door.roomId === currentRoomId && door.targetRoomId === clickedRoomId && door.status === "open") ||
        (door.roomId === clickedRoomId && door.targetRoomId === currentRoomId && door.status === "open")
    );
}

function hasClosedDoor(currentRoomId, clickedRoomId, doors) {
    return doors.some(door =>
        (door.roomId === currentRoomId && door.targetRoomId === clickedRoomId && door.status === "closed") ||
        (door.roomId === clickedRoomId && door.targetRoomId === currentRoomId && door.status === "closed")
    );
}

function highlightAdjacentRooms(currentRoomId) {
    if (isGamePaused) {
        return;
    }
    console.log(doors);
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

        console.log("Checking room:", room);
        console.log("hasOpenDoor:", hasOpenDoor(currentRoomId, room.id, doors));
        console.log("hasClosedDoor:", hasClosedDoor(currentRoomId, room.id, doors));

        // Add highlighting to adjacent rooms
        if (hasOpenDoor(currentRoomId, room.id, doors)) {
            highlight.classList.add('available');
        } else if (hasClosedDoor(currentRoomId, room.id, doors)) {
            highlight.classList.add('adjacent');
        } else {
            highlight.classList.remove('adjacent');
            highlight.classList.remove('available');
        }

        // Add highlighting to the current room
        if (currentRoomId === room.id) {
            highlight.classList.add('highlighted');
        }
    });
}

export { highlightAdjacentRooms, hasOpenDoor, hasClosedDoor};
