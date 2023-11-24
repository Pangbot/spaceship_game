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

        // Check if the clicked room is the current room
        if (clickedRoom.id !== currentRoom.id) {
            // Remove highlighting from the current room
            const currentRoomHighlight = document.getElementById('playerHighlight');
            currentRoomHighlight.classList.remove('highlighted');

            // Add highlighting to the clicked room
            highlight.classList.add('highlighted');

            // Update player's position
            updateHighlightPosition(clickedRoom);

            // Update the current room
            currentRoom = clickedRoom;
        }
    });
});

function updateHighlightPosition(room) {
    const playerRoom = document.getElementById('playerHighlight'); // Updated ID
    playerRoom.style.top = `${room.top}px`;
    playerRoom.style.left = `${room.left}px`;
    playerRoom.style.width = `${room.width * 100}px`;
    playerRoom.style.height = `${room.height * 100}px`;
}