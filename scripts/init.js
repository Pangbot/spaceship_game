// init.js
// Initialises stuff.
import { highlightAdjacentRooms } from './roomHighlighting.js';
import { updateButtonDescriptions } from './buttons.js';
import { currentRoom } from './common.js';
import { updateResourceBars } from './resourceBars.js';

export function initialiseGame() {
    console.log("Initialisation script loaded!");

    // Disable context menu on right-click for the ship map
    document.getElementById('mapImage').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    // Disable context menu on right-click for the banner image
    document.getElementById('bannerImage').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // Make tab 1 active
    changeTab(0);

    // Initial Highlighting
    highlightAdjacentRooms(currentRoom);

    // Get initial buttons
    updateButtonDescriptions(currentRoom.id);

    updateResourceBars();
}
