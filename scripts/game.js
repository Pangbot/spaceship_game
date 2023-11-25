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
        { roomId: "piloting", targetRoomId: "kitchen", doorPosition: "bottom" },
        { roomId: "kitchen", targetRoomId: "scanners", doorPosition: "bottom" },
        { roomId: "kitchen", targetRoomId: "doors", doorPosition: "bottom" },
        { roomId: "scanners", targetRoomId: "clone_bay", doorPosition: "bottom" },
        { roomId: "doors", targetRoomId: "shields", doorPosition: "bottom" },
        { roomId: "clone_bay", targetRoomId: "shields", doorPosition: "right" },
        { roomId: "clone_bay", targetRoomId: "fabrication", doorPosition: "bottom" },
        { roomId: "shields", targetRoomId: "weapons", doorPosition: "bottom" },
        { roomId: "fabrication", targetRoomId: "escape_pods_L", doorPosition: "left" },
        { roomId: "fabrication", targetRoomId: "weapons", doorPosition: "right" },
        { roomId: "fabrication", targetRoomId: "electrics", doorPosition: "bottom" },
        { roomId: "weapons", targetRoomId: "escape_pods_R", doorPosition: "right" },
        { roomId: "weapons", targetRoomId: "electrics", doorPosition: "bottom" },
        { roomId: "electrics", targetRoomId: "oxygen", doorPosition: "left" },
        { roomId: "electrics", targetRoomId: "water", doorPosition: "right" },
        { roomId: "water", targetRoomId: "security", doorPosition: "bottom" },
        { roomId: "oxygen", targetRoomId: "recycling", doorPosition: "bottom" },
        { roomId: "engine", targetRoomId: "recycling", doorPosition: "left" },
        { roomId: "engine", targetRoomId: "security", doorPosition: "right" },
        { roomId: "engine", targetRoomId: "storage", doorPosition: "bottom" },
    ];

    // Function to check if a door is clicked
    function isDoorClicked(room, mouseX, mouseY, tolerance = 5) {
        const door = doors.find(door => door.roomId === room.id);
        if (door) {
            const doorX = room.left + (room.width / 2); // assuming the door is in the middle horizontally
            const doorY = (door.doorPosition === "bottom") ? room.top + room.height : room.top; // adjust based on door position

            // Check if the click is within the door area with tolerance
            return Math.abs(mouseX - doorX) < tolerance && Math.abs(mouseY - doorY) < tolerance;
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
