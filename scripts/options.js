// options.js
function showOptionsMenu() {
    console.log("Showing options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');

    overlay.style.display = 'block';
    popup.style.display = 'block';
}

function hideOptionsMenu() {
    console.log("Hiding options menu.");

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');
    overlay.style.display = 'none';
    popup.style.display = 'none';
}

export { showOptionsMenu, hideOptionsMenu };
