// update.js
// Updates stuff.
import { updateResourceBars } from './resourceBars.js';

export function updateGame() {
    console.log("Continuous update script loaded!");

    // Call the function once the DOM is fully loaded
    updateResourceBars();
}
