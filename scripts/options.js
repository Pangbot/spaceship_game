// options.js
function showOptionsMenu() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');

    overlay.style.display = 'block';
    popup.style.display = 'block';
}

function hideOptionsMenu() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('options');
    overlay.style.display = 'none';
    popup.style.display = 'none';
}

export { showOptionsMenu, hideOptionsMenu };
