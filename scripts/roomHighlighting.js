// roomHighlighting.js
// Contains the logic for highlighting rooms on the ship map.

import { doors } from './common.js';

// Function to check if a door exists between two rooms
function hasOpenDoor(currentRoom, clickedRoom) {
    const isOpen = doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id && door.status === "open") ||
                                      (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id && door.status === "open"));

    console.log(`Open door between ${currentRoom.id} and ${clickedRoom.id}: ${isOpen}`);
    return isOpen;
}

function hasClosedDoor(currentRoom, clickedRoom) {
    const isClosed = doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id && door.status === "closed") ||
                                          (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id && door.status === "closed"));

    console.log(`Closed door between ${currentRoom.id} and ${clickedRoom.id}: ${isClosed}`);
    return isClosed;
}

function highlightAdjacentRooms(currentRoom) {
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');
    console.log("Current room:",currentRoom.id);

    allRoomHighlights.forEach(highlight => {
        const room = {
            id: highlight.getAttribute('data-room-id'),
            top: parseInt(highlight.style.top),
            left: parseInt(highlight.style.left),
            width: parseInt(highlight.getAttribute('data-room-width')) * 50,
            height: parseInt(highlight.getAttribute('data-room-height')) * 50,
        };
        console.log("Checking room:", room.id);

        // Add highlighting to adjacent rooms
        if (hasOpenDoor(currentRoom.id, room.id)) {
            console.log("Open door to", room.id);
            highlight.classList.add('available');
        } else if (hasClosedDoor(currentRoom.id, room.id)) {
            console.log("Closed door to", room.id);
            highlight.classList.add('adjacent');
        } else {
            console.log("No door to", room.id);
            highlight.classList.remove('adjacent');
            highlight.classList.remove('available');
        }

        // Add highlighting to the current room
        if (currentRoom.id === room.id) {
            console.log("Highlighting current room:", room.id);
            highlight.classList.add('highlighted');
        }
    });
}

export { highlightAdjacentRooms, hasOpenDoor, hasClosedDoor};
