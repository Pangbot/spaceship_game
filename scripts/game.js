// Example: Current room ID
let currentRoom = "room1";

// Add click event listeners to room highlights
const roomHighlights = document.querySelectorAll('.roomHighlight');
roomHighlights.forEach(highlight => {
    highlight.addEventListener('click', () => {
        const clickedRoom = highlight.getAttribute('data-room-id');
        if (isAdjacent(currentRoom, clickedRoom)) {
            updateHighlightPosition(clickedRoom);
            currentRoom = clickedRoom;
        } else {
            alert('You can only move to adjacent rooms.');
        }
    });
});

// Function to check if two rooms are adjacent
function isAdjacent(room1, room2) {
    return Math.abs(room1.charAt(4) - room2.charAt(4)) + Math.abs(room1.charAt(5) - room2.charAt(5)) === 1;
}

// Function to update the player's position
function updateHighlightPosition(roomId) {
    const playerRoom = document.getElementById('highlight');
    const clickedRoom = document.querySelector(`[data-room-id="${roomId}"]`);
    playerRoom.style.top = clickedRoom.style.top;
    playerRoom.style.left = clickedRoom.style.left;
}