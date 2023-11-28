// update.js
// Updates stuff.
import { updateResourceBars } from './resourceBars.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Continuous update script loaded!");

    // Call the function once the DOM is fully loaded
    updateResourceBars();
});
