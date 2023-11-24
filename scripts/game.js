// Example: Current room ID and size
let currentRoom = { id: "room1", width: 2, height: 2 };

// Set initial player position over room1
const initialRoomHighlight = document.getElementById('playerHighlight');
initialRoomHighlight.classList.add('highlighted', 'size2x2');

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

        // Check if the clicked room is different from the current room
        if (clickedRoom.id !== currentRoom.id) {
            // Remove highlighting from the current room
            const currentRoomHighlight = document.getElementById('playerHighlight');
            currentRoomHighlight.classList.remove('highlighted');
            currentRoomHighlight.classList.remove(`size${currentRoom.width}x${currentRoom.height}`);

            // Add highlighting to the clicked room
            const roomSizeClass = `size${clickedRoom.width}x${clickedRoom.height}`;
            highlight.classList.add('highlighted', roomSizeClass);

            // Update player's position
            updateHighlightPosition(clickedRoom);

            // Update current room
            currentRoom = clickedRoom;
        }
    });
});

// Function to update the player's position
function updateHighlightPosition(room) {
    const playerRoom = document.getElementById('playerHighlight');
    playerRoom.style.top = `${room.top}px`;
    playerRoom.style.left = `${room.left}px`;
    playerRoom.style.width = `${room.width * 117}px`;
    playerRoom.style.height = `${room.height * 117}px`;
}
