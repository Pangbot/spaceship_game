document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded!");

    let currentRoom = {
        id: "room1",
        top: 0,
        left: 202,
        width: 202,
        height: 102,
    }

    // Function to check if two rooms share a wall
    function areRoomsAdjacent(currentRoom, clickedRoom, tolerance = 5) {
        const currentRight = currentRoom.left + currentRoom.width;
        const currentBottom = currentRoom.top + currentRoom.height;
        const clickedRight = clickedRoom.left + clickedRoom.width;
        const clickedBottom = clickedRoom.top + clickedRoom.height;
    
        // Convert absolute coordinates to relative coordinates
        const currentRelative = {
            left: currentRoom.left,
            top: currentRoom.top,
            width: currentRoom.width,
            height: currentRoom.height
        };
    
        const clickedRelative = {
            left: clickedRoom.left,
            top: clickedRoom.top,
            width: clickedRoom.width,
            height: clickedRoom.height
        };
    
        // Check if the rooms share a horizontal or vertical wall with tolerance
        const horizontalAdjacent =
            (currentRelative.top >= clickedRelative.top - tolerance && currentRelative.top <= clickedBottom + tolerance) ||
            (currentBottom >= clickedRelative.top - tolerance && currentBottom <= clickedBottom + tolerance) ||
            (clickedRelative.top >= currentRelative.top - tolerance && clickedRelative.top <= currentBottom + tolerance) ||
            (clickedBottom >= currentRelative.top - tolerance && clickedBottom <= currentBottom + tolerance);
    
        const verticalAdjacent =
            (currentRelative.left >= clickedRelative.left - tolerance && currentRelative.left <= clickedRight + tolerance) ||
            (currentRight >= clickedRelative.left - tolerance && currentRight <= clickedRight + tolerance) ||
            (clickedRelative.left >= currentRelative.left - tolerance && clickedRelative.left <= currentRight + tolerance) ||
            (clickedRight >= currentRelative.left - tolerance && clickedRight <= currentRight + tolerance);
    
        // Check if the rooms share more than one side with a small gap
        const shareSidesWithoutGaps =
            (horizontalAdjacent && Math.abs(currentRelative.left - clickedRight) < tolerance) ||
            (verticalAdjacent && Math.abs(currentRelative.top - clickedBottom) < tolerance);
    
        return shareSidesWithoutGaps;
    }

    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    // Add highlighting to the current room
    allRoomHighlights.forEach(highlight => {
        const room = {
            top: parseInt(highlight.style.top),
            left: parseInt(highlight.style.left),
            width: parseInt(highlight.getAttribute('data-room-width')) * 100,
            height: parseInt(highlight.getAttribute('data-room-height')) * 100,
        };

        if (areRoomsAdjacent(currentRoom, room)) {
            highlight.classList.add('adjacent');
        }

        if (currentRoom.id == highlight.getAttribute('data-room-id')) {
            highlight.classList.remove('adjacent');
            highlight.classList.add('highlighted');
        }

    });

    // Add click event listeners
    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', function() {

            // Get the position and size of the clicked room
            const clickedRoom = {
                id: highlight.getAttribute('data-room-id'),
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left),
                width: parseInt(highlight.getAttribute('data-room-width')) * 100,
                height: parseInt(highlight.getAttribute('data-room-height')) * 100,
            };

            // Check if the clicked room is different from the current room and shares a wall
            const clickedRoomId = highlight.getAttribute('data-room-id');
            if (clickedRoomId !== currentRoom.id && areRoomsAdjacent(currentRoom, clickedRoom)) {

                // Remove highlighting from all rooms
                allRoomHighlights.forEach(room => {
                    room.classList.remove('highlighted', 'adjacent');
                });

                // Update current room
                currentRoom = clickedRoom;

                // Add highlighting to adjacent rooms
                allRoomHighlights.forEach(room => {
                    const roomData = {
                        top: parseInt(room.style.top),
                        left: parseInt(room.style.left),
                        width: parseInt(room.getAttribute('data-room-width')) * 100,
                        height: parseInt(room.getAttribute('data-room-height')) * 100,
                    };

                    if (areRoomsAdjacent(currentRoom, roomData)) {
                        room.classList.add('adjacent');
                    }
                });

                // Add highlighting to the clicked room
                highlight.classList.remove('adjacent');
                highlight.classList.add('highlighted');

            }
        });
    });
});