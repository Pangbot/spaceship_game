document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded!");

    // Example: Current room ID
    let currentRoomId = "room1";

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x1, .roomHighlight2x1');

    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', () => {
            console.log("Clicked!");

            // Check if the clicked room is different from the current room
            const clickedRoomId = highlight.getAttribute('data-room-id');
            if (clickedRoomId !== currentRoomId) {
                console.log("Different room clicked!");

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
