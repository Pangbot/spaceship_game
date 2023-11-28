// doorLogic.js
// Contains the status of all doors at the start of the game and the functions to decide if a certain door is open or not.

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