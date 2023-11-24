const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Circle properties
let x = canvas.width / 2;
let y = canvas.height / 2;
const radius = 20;

// Movement speed
const speed = 5;

// Event listener for key presses
window.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch (event.key) {
        case 'w':
            y -= speed;
            break;
        case 'a':
            x -= speed;
            break;
        case 's':
            y += speed;
            break;
        case 'd':
            x += speed;
            break;
    }

    drawCircle();
}

function drawCircle() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
}

// Initial draw
drawCircle();