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
        const currentRight = currentRoom.left + currentRoom.width + tolerance;
        const currentBottom = currentRoom.top + currentRoom.height + tolerance;
        const clickedRight = clickedRoom.left + clickedRoom.width + tolerance;
        const clickedBottom = clickedRoom.top + clickedRoom.height + tolerance;
    
        const horizontalAdjacent =
            currentRoom.top <= clickedBottom &&
            currentBottom >= clickedRoom.top &&
            currentRoom.left <= clickedRight &&
            currentRight >= clickedRoom.left;
    
        const verticalAdjacent =
            currentRoom.left <= clickedRight &&
            currentRight >= clickedRoom.left &&
            currentRoom.top <= clickedBottom &&
            currentBottom >= clickedRoom.top;
    
        // Check if the rooms are adjacent either horizontally or vertically, but not both
        return (horizontalAdjacent || verticalAdjacent) && !(horizontalAdjacent && verticalAdjacent);
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