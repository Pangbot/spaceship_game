// common.js
// A place for common variables

// Set to the inital value, "let" so it can be dynamically adjusted
let currentRoom = {
    id: "clone_bay",
    top: 251,
    left: 51,
    width: 200,
    height: 200,
};

// Container for status of all doors
let doors = [
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

let isUpdateEnabled = true;

let storyTime = false;

export { currentRoom, doors, isUpdateEnabled, storyTime };