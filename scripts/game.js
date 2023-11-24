// Example: Current room ID and size
let currentRoom = { id: "room1", width: 2, height: 2 };

// Set initial player position over room1
updateHighlightPosition(currentRoom);

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

        // Switch colors between the clicked room and the current room
        highlight.classList.toggle('highlighted');
        const currentRoomHighlight = document.querySelector(`[data-room-id="${currentRoom.id}"]`);
        currentRoomHighlight.classList.toggle('highlighted');

        // Update player's position
        updateHighlightPosition(clickedRoom);

        // Update current room
        currentRoom = clickedRoom;
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