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
        { roomId: "piloting", targetRoomId: "kitchen" },
        { roomId: "kitchen", targetRoomId: "scanners" },
        { roomId: "kitchen", targetRoomId: "doors" },
        { roomId: "scanners", targetRoomId: "clone_bay" },
        { roomId: "doors", targetRoomId: "shields" },
        { roomId: "clone_bay", targetRoomId: "shields" },
        { roomId: "clone_bay", targetRoomId: "fabrication" },
        { roomId: "shields", targetRoomId: "weapons" },
        { roomId: "fabrication", targetRoomId: "escape_pods_L" },
        { roomId: "fabrication", targetRoomId: "weapons" },
        { roomId: "fabrication", targetRoomId: "electrics" },
        { roomId: "weapons", targetRoomId: "escape_pods_R" },
        { roomId: "weapons", targetRoomId: "electrics" },
        { roomId: "electrics", targetRoomId: "oxygen" },
        { roomId: "electrics", targetRoomId: "water" },
        { roomId: "water", targetRoomId: "security" },
        { roomId: "oxygen", targetRoomId: "recycling" },
        { roomId: "engine", targetRoomId: "recycling" },
        { roomId: "engine", targetRoomId: "security" },
        { roomId: "engine", targetRoomId: "storage" },
    ];

    // Function to check if a door exists between two rooms
    function hasDoor(currentRoom, clickedRoom) {
        return doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id) ||
                                   (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id));
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

            // Check if a door exists between the current room and the clicked room
            if (hasDoor(currentRoom, clickedRoom)) {
                // Transition to the target room
                currentRoom = clickedRoom;

                // Remove highlighting from all rooms
                allRoomHighlights.forEach(room => {
                    room.classList.remove('highlighted');
                });

                // Add highlighting to the clicked room
                highlight.classList.add('highlighted');
            }
        });
    });
});
