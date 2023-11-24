// Example: Current room ID and size
let currentRoom = { id: "room1", width: 2, height: 2 };

// Add click event listeners to room highlights
const roomHighlights = document.querySelectorAll('.roomHighlight');
roomHighlights.forEach(highlight => {
    highlight.addEventListener('click', () => {
        const clickedRoom = {
            id: highlight.getAttribute('data-room-id'),
            width: parseInt(highlight.getAttribute('data-room-width')),
            height: parseInt(highlight.getAttribute('data-room-height'))
        };
        if (isAdjacent(currentRoom, clickedRoom)) {
            updateHighlightPosition(clickedRoom);
            currentRoom = clickedRoom;

            // Clear highlights from all rooms
            roomHighlights.forEach(room => {
                room.classList.remove('highlighted');
            });

            // Apply highlight to the current room
            highlight.classList.add('highlighted');
        } else {
            alert('You can only move to adjacent rooms.');
        }
    });
});

// Function to check if two rooms are adjacent
function isAdjacent(room1, room2) {
    return Math.abs(room1.id.charAt(4) - room2.id.charAt(4)) + Math.abs(room1.id.charAt(5) - room2.id.charAt(5)) === 1;
}

// Function to update the player's position
function updateHighlightPosition(room) {
    const playerRoom = document.getElementById('highlight');
    playerRoom.style.top = highlight.style.top;
    playerRoom.style.left = highlight.style.left;
    playerRoom.style.width = `${room.width * 100}px`;
    playerRoom.style.height = `${room.height * 100}px`;
}