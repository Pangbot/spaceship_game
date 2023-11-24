// Example: Current room ID
let currentRoomId = "room1";

// Add click event listeners to room highlights
const roomHighlights1x1 = document.querySelectorAll('.roomHighlight1x1');
const roomHighlights2x1 = document.querySelectorAll('.roomHighlight2x1');

const allRoomHighlights = document.querySelectorAll('.roomHighlight1x1, .roomHighlight2x1');

allRoomHighlights.forEach(highlight => {
    highlight.addEventListener('click', () => {
        const clickedRoomId = highlight.getAttribute('data-room-id'); // Replace with the correct attribute
        const clickedRoomWidth = parseInt(highlight.getAttribute('data-room-width')); // Replace with the correct attribute
        const clickedRoomHeight = parseInt(highlight.getAttribute('data-room-height')); // Replace with the correct attribute

        // Check if the clicked room is different from the current room
        if (clickedRoomId !== currentRoomId) {
            // Remove highlighting from all rooms
            allRoomHighlights.forEach(room => {
                room.classList.remove('highlighted');
            });

            // Add highlighting to the clicked room
            const roomSizeClass = `size${clickedRoomWidth}x${clickedRoomHeight}`;
            highlight.classList.add('highlighted', roomSizeClass);

            // Update current room
            currentRoomId = clickedRoomId;
        }
    });
});
