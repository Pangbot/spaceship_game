// Example: Current room ID and size
let currentRoom = { id: "room1", width: 2, height: 2 };

// Add click event listeners to room highlights
const roomHighlights = document.querySelectorAll('.roomHighlight');
roomHighlights.forEach(highlight => {
    highlight.addEventListener('click', () => {
        const clickedRoom = {
            id: highlight.getAttribute('data-room-id'),
            width: parseInt(highlight.getAttribute('data-room-width')),
            height: parseInt(highlight.getAttribute('data-room-height')),
            top: parseInt(highlight.style.top.replace('px', '')),
            left: parseInt(highlight.style.left.replace('px', ''))
        };

        // Clear highlights from all rooms
        roomHighlights.forEach(room => {
            room.classList.remove('highlighted');
        });

        // Apply highlight to the clicked room
        highlight.classList.add('highlighted');

        // Update player's position
        updateHighlightPosition(clickedRoom);
    });
});

// Function to update the player's position
function updateHighlightPosition(room) {
    const playerRoom = document.getElementById('highlight');
    playerRoom.style.top = `${room.top}px`;
    playerRoom.style.left = `${room.left}px`;
    playerRoom.style.width = `${room.width * 100}px`;
    playerRoom.style.height = `${room.height * 100}px`;
}