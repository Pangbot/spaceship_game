document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded!");

    let currentRoom = {
        top: 0,
        left: 202,
        width: 202,
        height: 102,
    }

    // Function to check if two rooms share a wall
    function areRoomsAdjacent(currentRoom, clickedRoom) {
        const currentRight = currentRoom.left + currentRoom.width;
        const currentBottom = currentRoom.top + currentRoom.height;
        const clickedRight = clickedRoom.left + clickedRoom.width;
        const clickedBottom = clickedRoom.top + clickedRoom.height;

        // Check if the rooms share a horizontal or vertical wall
        const horizontalAdjacent =
            (currentRoom.top >= clickedRoom.top && currentRoom.top <= clickedBottom) ||
            (currentBottom >= clickedRoom.top && currentBottom <= clickedBottom) ||
            (clickedRoom.top >= currentRoom.top && clickedRoom.top <= currentBottom) ||
            (clickedBottom >= currentRoom.top && clickedBottom <= currentBottom);

        const verticalAdjacent =
            (currentRoom.left >= clickedRoom.left && currentRoom.left <= clickedRight) ||
            (currentRight >= clickedRoom.left && currentRight <= clickedRight) ||
            (clickedRoom.left >= currentRoom.left && clickedRoom.left <= currentRight) ||
            (clickedRight >= currentRoom.left && clickedRight <= currentRight);

        return horizontalAdjacent && verticalAdjacent;
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
