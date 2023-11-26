document.addEventListener('DOMContentLoaded', function () {
    console.log("Script loaded!");

    // Disable context menu on right-click for the ship map
    document.getElementById('mapImage').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    let currentRoom = {
        id: "clone_bay",
        top: 502,
        left: 101,
        width: 202,
        height: 202,
    }

    // Define doors between rooms
    const doors = [
        { roomId: "piloting", targetRoomId: "kitchen", status: "closed" },
        { roomId: "kitchen", targetRoomId: "scanners", status: "open" },
        { roomId: "kitchen", targetRoomId: "doors", status: "open" },
        { roomId: "scanners", targetRoomId: "clone_bay", status: "open" },
        { roomId: "doors", targetRoomId: "shields", status: "open" },
        { roomId: "clone_bay", targetRoomId: "shields", status: "open" },
        { roomId: "clone_bay", targetRoomId: "fabrication", status: "open" },
        { roomId: "shields", targetRoomId: "weapons", status: "open" },
        { roomId: "fabrication", targetRoomId: "escape_pods_L", status: "open" },
        { roomId: "fabrication", targetRoomId: "weapons", status: "open" },
        { roomId: "fabrication", targetRoomId: "electrics", status: "open" },
        { roomId: "weapons", targetRoomId: "escape_pods_R", status: "open" },
        { roomId: "weapons", targetRoomId: "electrics", status: "open" },
        { roomId: "electrics", targetRoomId: "oxygen", status: "open" },
        { roomId: "electrics", targetRoomId: "water", status: "open" },
        { roomId: "water", targetRoomId: "security", status: "open" },
        { roomId: "oxygen", targetRoomId: "recycling", status: "open" },
        { roomId: "engine", targetRoomId: "recycling", status: "open" },
        { roomId: "engine", targetRoomId: "security", status: "open" },
        { roomId: "engine", targetRoomId: "storage", status: "closed" },
    ];

    // Function to check if a door exists between two rooms
    function hasOpenDoor(currentRoom, clickedRoom) {
        return doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id && door.status == "open") ||
                                   (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id && door.status == "open"));
    }

    function hasClosedDoor(currentRoom, clickedRoom) {
        return doors.some(door => (door.roomId === currentRoom.id && door.targetRoomId === clickedRoom.id && door.status == "closed") ||
                                   (door.roomId === clickedRoom.id && door.targetRoomId === currentRoom.id && door.status == "closed"));
    }

    // Function to highlight adjacent rooms
    function highlightAdjacentRooms() {
        const allRoomHighlights = document.querySelectorAll('.roomHighlight1x2, .roomHighlight2x1, .roomHighlight2x2');

        allRoomHighlights.forEach(highlight => {
            const room = {
                id: highlight.getAttribute('data-room-id'),
                top: parseInt(highlight.style.top),
                left: parseInt(highlight.style.left),
                width: parseInt(highlight.getAttribute('data-room-width')) * 100,
                height: parseInt(highlight.getAttribute('data-room-height')) * 100,
            };

            if (hasOpenDoor(currentRoom, room)) {
                highlight.classList.add('available');
            } else if (hasClosedDoor(currentRoom, room)) {
                highlight.classList.add('adjacent');
            } else {
                highlight.classList.remove('adjacent');
                highlight.classList.remove('available');
            }
        });
    }

    highlightAdjacentRooms()

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
            if (hasOpenDoor(currentRoom, clickedRoom)) {
                // Transition to the target room
                currentRoom = clickedRoom;

                // Remove highlighting from all rooms
                allRoomHighlights.forEach(room => {
                    room.classList.remove('highlighted');
                });

                // Highlight adjacent rooms
                highlightAdjacentRooms();

                // Add highlighting to the clicked room
                highlight.classList.add('highlighted');
            }
        });
    });

    function decreaseFillOverTime(bar, duration) {
        const fillElement = bar.querySelector('.resource-bar::before');
        const percentageElement = bar.parentElement.querySelector('.percentage');
        let fillPercentage = bar.dataset.fill;
    
        function update() {
            fillPercentage = Math.max(0, fillPercentage - 1);
    
            fillElement.style.width = `${fillPercentage}%`;
            percentageElement.textContent = `${fillPercentage}%`;
    
            if (fillPercentage > 0) {
                setTimeout(update, duration);
            }
        }
    
        update();
    }
    
    // Example: Decrease fill levels over time
    decreaseFillOverTime(document.getElementById('oxygen_bar'), 10000);
    decreaseFillOverTime(document.getElementById('food_bar'), 1000);

});
