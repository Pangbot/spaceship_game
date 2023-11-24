document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded!");

    // Example: Current room ID
    let currentRoomId = "room1";

    // Function to check if two rooms are adjacent
    function areRoomsAdjacent(currentRoom, clickedRoom) {
        // Add your adjacency rules here based on room positions
        // For simplicity, I'll assume rooms are adjacent if they are horizontally or vertically aligned

        return Math.abs(currentRoom.top - clickedRoom.top) <= 100 && Math.abs(currentRoom.left - clickedRoom.left) <= 100;
    }

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x1, .roomHighlight2x1');

    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', () => {
            console.log("Clicked!");

            // Get the position of the clicked room
            const clickedRoom = {
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left)
            };

            // Check if the clicked room is different from the current room and is adjacent
            const clickedRoomId = highlight.getAttribute('data-room-id');
            if (clickedRoomId !== currentRoomId && areRoomsAdjacent(currentRoom, clickedRoom)) {
                console.log("Different and adjacent room clicked!");

                // Remove highlighting from all rooms
                allRoomHighlights.forEach(room => {
                    room.classList.remove('highlighted');
                });

                // Add highlighting to the clicked room
                highlight.classList.add('highlighted');

                // Update current room
                currentRoomId = clickedRoomId;
            }
        });
    });
});
