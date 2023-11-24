// Example: Update highlight position based on player's current room
const playerRoom = document.getElementById('highlight');

function updateHighlightPosition(top, left, width, height) {
    playerRoom.style.top = top + 'px';
    playerRoom.style.left = left + 'px';
    playerRoom.style.width = width + 'px';
    playerRoom.style.height = height + 'px';
}

// Call this function when the player enters a new room
updateHighlightPosition(150, 200, 100, 100); // Example coordinates and size