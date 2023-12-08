// common.js
// A place for common variables

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

let lastMessageClicked = false;

let isGamePaused = false;

function setGamePause(state) {
    isGamePaused = state;
}

function setLastMessageClicked(state) {
    lastMessageClicked = state;
}

let storyMessages = [
    { message_shown: false, message_content: ["Welcome to the game!"] },
    { message_shown: false, message_content: ["I hate you."] }
];

let tabContent = [
    'This is the content of Statistics.<br><br>Bitches: 0',
    'This is the content of Tasks.<br><br>Task 1: Get some bitches.',
    'This is the content of Sound.<br><br>There is no sound. :(',
    'This is the content of Options.<br><br>Save/Load/Reset game I guess?'
];

export { currentRoom, doors, lastMessageClicked, setLastMessageClicked, storyMessages, isGamePaused, setGamePause, tabContent };