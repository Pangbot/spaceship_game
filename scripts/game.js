document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded!");

    let currentRoom = {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
    }

    // Function to check if two rooms share a wall
    function areRoomsAdjacent(currentRoom, clickedRoom) {
        // Check if the rooms share a horizontal or vertical wall
        const horizontalAdjacent =
            (currentRoom.top === clickedRoom.top && Math.abs(currentRoom.left + currentRoom.width - clickedRoom.left) === 100) ||
            (currentRoom.top + currentRoom.height === clickedRoom.top && Math.abs(currentRoom.left - clickedRoom.left) === 100);

        const verticalAdjacent =
            (currentRoom.left === clickedRoom.left && Math.abs(currentRoom.top + currentRoom.height - clickedRoom.top) === 100) ||
            (currentRoom.left + currentRoom.width === clickedRoom.left && Math.abs(currentRoom.top - clickedRoom.top) === 100);

        return horizontalAdjacent || verticalAdjacent;
    }

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x1, .roomHighlight2x1');

    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', function() {
            console.log("Clicked!");

            // Get the position and size of the clicked room
            const clickedRoom = {
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left),
                width: parseInt(highlight.getAttribute('data-room-width')) * 100,
                height: parseInt(highlight.getAttribute('data-room-height')) * 100,
            };

            // Check if the clicked room is different from the current room and shares a wall
            const clickedRoomId = highlight.getAttribute('data-room-id');
            if (clickedRoomId !== currentRoom.id && areRoomsAdjacent(currentRoom, clickedRoom)) {
                console.log("Different and adjacent room clicked!");

                // Remove highlighting from all rooms
                allRoomHighlights.forEach(room => {
                    room.classList.remove('highlighted');
                });

                // Add highlighting to the clicked room
                highlight.classList.add('highlighted');

                // Update current room
                currentRoom = clickedRoom;
            }
        });
    });
});
