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
    } else if (backwardDoorIndex !== -1) {
        doors[backwardDoorIndex].status = "open";
    } else {
        console.log(`Door between ${roomId} and ${targetRoomId} not found.`);
    }
}

let isEventListenerActive = true;

function changeEventListenerActive(state) {
    isEventListenerActive = state;
}

let isGamePaused = false;

let oxygenRate = 0;
let foodRate = 0;
let previousOxygenRate = 0;
let previousFoodRate = 0;

function setOxygenRate(rate) {
    previousOxygenRate = oxygenRate;
    oxygenRate = rate;
    console.log("Oxygen rate changed")
    console.log(oxygenRate)
}

function setFoodRate(rate) {
    previousFoodRate = foodRate;
    foodRate = rate;
}

function setGamePause(state) {
    isGamePaused = state;
}

export { currentRoom, doors, isGamePaused, setGamePause, unlockDoor, isEventListenerActive, changeEventListenerActive,
    oxygenRate, foodRate, setOxygenRate, setFoodRate, previousOxygenRate, previousFoodRate };