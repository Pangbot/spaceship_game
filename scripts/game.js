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

    // Function to update the resource bars over time
    function updateResourceBars() {
        // Oxygen Bar
        const oxygenBar = document.getElementById('oxygen_bar');
        let currentOxygen = parseFloat(oxygenBar.getAttribute('data-fill'));
        const oxygenPercentage = oxygenBar.parentElement.querySelector('.percentage');
        console.log(oxygenBar.parentElement)

        // Food Bar
        const foodBar = document.getElementById('food_bar');
        let currentFood = parseFloat(foodBar.getAttribute('data-fill'));
        const foodPercentage = foodBar.parentElement.querySelector('.percentage');
        console.log(foodBar.parentElement)

        // Update bars by decreasing 1% every second for oxygen and 10% for food (adjust the interval as needed)
        const oxygenDecreaseRate = 0.1; // 10x slower than food
        const foodDecreaseRate = 1;
        const interval = 1000; // 1000 milliseconds = 1 second

        setInterval(function () {
            currentOxygen = Math.max(0, currentOxygen - oxygenDecreaseRate);
            oxygenBar.style.width = `${currentOxygen}%`;
            oxygenBar.setAttribute('data-fill', currentOxygen);
            oxygenPercentage.innerText = `${Math.round(currentOxygen)}%`;

            currentFood = Math.max(0, currentFood - foodDecreaseRate);
            foodBar.style.width = `${currentFood}%`;
            foodBar.setAttribute('data-fill', currentFood);
            foodPercentage.innerText = `${Math.round(currentFood)}%`;
        }, interval);
    }

    // Call the function once the DOM is fully loaded
    updateResourceBars();

});
