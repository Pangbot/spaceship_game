// init.js
// Initialises stuff.
import { highlightAdjacentRooms } from './roomHighlighting.js';
import { updateButtonDescriptions } from './buttons.js';

export function initializeGame() {
    console.log("Initialization script loaded!");

    // Disable context menu on right-click for the ship map
    document.getElementById('mapImage').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    // Disable context menu on right-click for the banner image
    document.getElementById('bannerImage').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    let currentRoom = {
        id: "clone_bay",
        top: 502,
        left: 101,
        width: 202,
        height: 202,
    }

    // Initial Highlighting
    highlightAdjacentRooms(currentRoom);

    // Get initial buttons
    updateButtonDescriptions(currentRoom.id);
}
