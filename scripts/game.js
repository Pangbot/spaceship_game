// Example: Current room ID
let currentRoomId = "room1";

// Set initial player position over room1
const initialRoomHighlight = document.getElementById('playerHighlight');
initialRoomHighlight.classList.add('highlighted', 'size2x2');

// Add click event listeners to room highlights
const roomHighlights = document.querySelectorAll('.roomHighlight');
roomHighlights.forEach(highlight => {
    highlight.addEventListener('click', () => {
        const clickedRoomId = highlight.getAttribute('data-room-id');
        const clickedRoomWidth = parseInt(highlight.getAttribute('data-room-width'));
        const clickedRoomHeight = parseInt(highlight.getAttribute('data-room-height'));

        // Check if the clicked room is different from the current room
        if (clickedRoomId !== currentRoomId) {
            // Remove highlighting from the current room
            const currentRoomHighlight = document.getElementById('playerHighlight');
            currentRoomHighlight.classList.remove('highlighted');
            currentRoomHighlight.classList.remove(`size${clickedRoomWidth}x${clickedRoomHeight}`);

            // Add highlighting to the clicked room
            const roomSizeClass = `size${clickedRoomWidth}x${clickedRoomHeight}`;
            highlight.classList.add('highlighted', roomSizeClass);

            // Update player's position
            updateHighlightPosition(clickedRoomWidth, clickedRoomHeight, highlight.style.top, highlight.style.left);

            // Update current room
            currentRoomId = clickedRoomId;
        }
    });
});

// Function to update the player's position
function updateHighlightPosition(roomWidth, roomHeight, topPosition, leftPosition) {
    const playerRoom = document.getElementById('playerHighlight');
    playerRoom.style.top = topPosition;
    playerRoom.style.left = leftPosition;
    playerRoom.style.width = `${roomWidth * 117}px`;
    playerRoom.style.height = `${roomHeight * 117}px`;
}