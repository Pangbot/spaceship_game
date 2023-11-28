// roomHighlighting.js
// Contains the logic for highlighting rooms on the ship map.

function highlightAdjacentRooms(currentRoom) {
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    allRoomHighlights.forEach(highlight => {
        const room = {
            id: highlight.getAttribute('data-room-id'),
            top: parseInt(highlight.style.top),
            left: parseInt(highlight.style.left),
            width: parseInt(highlight.getAttribute('data-room-width')) * 100,
            height: parseInt(highlight.getAttribute('data-room-height')) * 100,
        };

        if (hasOpenDoor(currentRoom.id, room.id)) {
            highlight.classList.add('available');
        } else if (hasClosedDoor(currentRoom.id, room.id)) {
            highlight.classList.add('adjacent');
        } else {
            highlight.classList.remove('adjacent');
            highlight.classList.remove('available');
        }
    });
}

export { highlightAdjacentRooms };