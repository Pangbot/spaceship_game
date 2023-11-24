// Example: Current room ID
let currentRoomId = "room1";

// Add click event listeners to room highlights
const roomHighlights = document.querySelectorAll('.roomHighlight');
roomHighlights.forEach(highlight => {
    highlight.addEventListener('click', () => {
        const clickedRoomId = highlight.getAttribute('data-room-id');
        const clickedRoomWidth = parseInt(highlight.getAttribute('data-room-width'));
        const clickedRoomHeight = parseInt(highlight.getAttribute('data-room-height'));

        // Check if the clicked room is different from the current room
        if (clickedRoomId !== currentRoomId) {
            // Remove highlighting from all rooms
            roomHighlights.forEach(room => {
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