document.addEventListener('DOMContentLoaded', function () {
    console.log("Script loaded!");

    let currentRoom = {
        id: "clone_bay",
        top: 502,
        left: 101,
        width: 202,
        height: 202,
    }

    // Define doors between rooms
    const doors = [
        { roomId: "piloting", targetRoomId: "kitchen", sharedWall: "bottom" },
        { roomId: "kitchen", targetRoomId: "scanners", sharedWall: "bottom" },
        { roomId: "kitchen", targetRoomId: "doors", sharedWall: "bottom" },
        { roomId: "scanners", targetRoomId: "clone_bay", sharedWall: "bottom" },
        { roomId: "doors", targetRoomId: "shields", sharedWall: "bottom" },
        { roomId: "clone_bay", targetRoomId: "shields", sharedWall: "right" },
        { roomId: "clone_bay", targetRoomId: "fabrication", sharedWall: "bottom" },
        { roomId: "shields", targetRoomId: "weapons", sharedWall: "bottom" },
        { roomId: "fabrication", targetRoomId: "escape_pods_L", sharedWall: "left" },
        { roomId: "fabrication", targetRoomId: "weapons", sharedWall: "right" },
        { roomId: "fabrication", targetRoomId: "electrics", sharedWall: "bottom" },
        { roomId: "weapons", targetRoomId: "escape_pods_R", sharedWall: "right" },
        { roomId: "weapons", targetRoomId: "electrics", sharedWall: "bottom" },
        { roomId: "electrics", targetRoomId: "oxygen", sharedWall: "left" },
        { roomId: "electrics", targetRoomId: "water", sharedWall: "right" },
        { roomId: "water", targetRoomId: "security", sharedWall: "bottom" },
        { roomId: "oxygen", targetRoomId: "recycling", sharedWall: "bottom" },
        { roomId: "engine", targetRoomId: "recycling", sharedWall: "left" },
        { roomId: "engine", targetRoomId: "security", sharedWall: "right" },
        { roomId: "engine", targetRoomId: "storage", sharedWall: "bottom" },
    ];

    // Function to check if a door is clicked
    function isDoorClicked(room, mouseX, mouseY, tolerance = 5) {
        const roomDoors = doors.filter(door => door.roomId === room.id || door.targetRoomId === room.id);

        for (const door of roomDoors) {
            let doorX, doorY;

            // Calculate door position based on the shared wall
            switch (door.sharedWall) {
                case "bottom":
                    doorX = room.left + (room.width / 2);
                    doorY = room.top + room.height;
                    break;
                case "right":
                    doorX = room.left + room.width;
                    doorY = room.top + (room.height / 2);
                    break;
                case "left":
                    doorX = room.left;
                    doorY = room.top + (room.height / 2);
                    break;
            }

            // Check if the click is within the door area with tolerance
            if (Math.abs(mouseX - doorX) < tolerance && Math.abs(mouseY - doorY) < tolerance) {
                return true;
            }
        }

        return false;
    }


    // Add click event listeners to room highlights
    const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

    // Add highlighting to the current room
    allRoomHighlights.forEach(highlight => {
        const room = {
            id: highlight.getAttribute('data-room-id'),
            top: parseInt(highlight.style.top),
            left: parseInt(highlight.style.left),
            width: parseInt(highlight.getAttribute('data-room-width')) * 100,
            height: parseInt(highlight.getAttribute('data-room-height')) * 100,
        };

        if (currentRoom.id === room.id) {
            highlight.classList.add('highlighted');
        }
    });

    // Add click event listeners
    allRoomHighlights.forEach(highlight => {
        highlight.addEventListener('click', function (event) {
            const clickedRoom = {
                id: highlight.getAttribute('data-room-id'),
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left),
                width: parseInt(highlight.getAttribute('data-room-width')) * 100,
                height: parseInt(highlight.getAttribute('data-room-height')) * 100,
            };

            // Check if a door is clicked in either direction
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const doorFromCurrentToClicked = doors.find(door => door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id);
            const doorFromClickedToCurrent = doors.find(door => door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id);

            if (doorFromCurrentToClicked && isDoorClicked(currentRoom, mouseX, mouseY)) {
                // Transition to the target room
                currentRoom = clickedRoom;
            } else if (doorFromClickedToCurrent && isDoorClicked(clickedRoom, mouseX, mouseY)) {
                // Transition to the target room
                currentRoom = clickedRoom;
            }

            // Remove highlighting from all rooms
            allRoomHighlights.forEach(room => {
                room.classList.remove('highlighted');
            });

            // Add highlighting to the clicked room
            highlight.classList.add('highlighted');
        });
    });
});
