// common.js
// A place for common variables
import { highlightAdjacentRooms } from './roomHighlighting.js';

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
    { roomId: "kitchen", targetRoomId: "scanners", status: "closed" },
    { roomId: "kitchen", targetRoomId: "doors", status: "closed" },
    { roomId: "scanners", targetRoomId: "clone_bay", status: "closed" },
    { roomId: "doors", targetRoomId: "shields", status: "closed" },
    { roomId: "clone_bay", targetRoomId: "shields", status: "closed" },
    { roomId: "clone_bay", targetRoomId: "fabrication", status: "closed" },
    { roomId: "shields", targetRoomId: "weapons", status: "closed" },
    { roomId: "fabrication", targetRoomId: "escape_pods_L", status: "closed" },
    { roomId: "fabrication", targetRoomId: "weapons", status: "closed" },
    { roomId: "fabrication", targetRoomId: "electrics", status: "closed" },
    { roomId: "weapons", targetRoomId: "escape_pods_R", status: "closed" },
    { roomId: "weapons", targetRoomId: "electrics", status: "closed" },
    { roomId: "electrics", targetRoomId: "oxygen", status: "closed" },
    { roomId: "electrics", targetRoomId: "water", status: "closed" },
    { roomId: "water", targetRoomId: "security", status: "closed" },
    { roomId: "oxygen", targetRoomId: "recycling", status: "closed" },
    { roomId: "engine", targetRoomId: "recycling", status: "closed" },
    { roomId: "engine", targetRoomId: "security", status: "closed" },
    { roomId: "engine", targetRoomId: "storage", status: "closed" },
];

function unlockDoor(roomId, targetRoomId) {
    const forwardDoorIndex = doors.findIndex(
        (door) => door.roomId === roomId && door.targetRoomId === targetRoomId
    );

    const backwardDoorIndex = doors.findIndex(
        (door) => door.roomId === targetRoomId && door.targetRoomId === roomId
    );

    if (forwardDoorIndex !== -1) {
        doors[forwardDoorIndex].status = "open";
        console.log(`Door between ${roomId} and ${targetRoomId} is now open.`);
    } else if (backwardDoorIndex !== -1) {
        doors[backwardDoorIndex].status = "open";
        console.log(`Door between ${targetRoomId} and ${roomId} is now open.`);
    } else {
        console.log(`Door between ${roomId} and ${targetRoomId} not found.`);
    }
    console.log(doors);
    setTimeout(() => {
        highlightAdjacentRooms(roomId);
    }, 100);
}

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

export { currentRoom, doors, lastMessageClicked, setLastMessageClicked, storyMessages, isGamePaused, setGamePause, tabContent, unlockDoor };