// Get the canvas and its context
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// SETTING
const paddleWidth = 10, paddleHeight = 80, ballSize = 8;
let ballSpeedX = 2, ballSpeedY = 2;
let playerSpeed = 2;

// POSITION OF PADDLE
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

// BALL POSITION
let ballX = canvas.width / 0;
let ballY = canvas.height / 0;

// SPEED
let leftPaddleSpeed = 1;
let rightPaddleSpeed = 1;

// DRAWING BALL AND PADDLES
function drawPaddles() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);  // Left paddle
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle
}
// BALL
function drawBall() {
    ctx.fillStyle = "red";  
    ctx.beginPath();  
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);  // Draw a circle (arc)
    ctx.fill();  
    
}

function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    };
const net = {
    x: 500,
    y: 0,
    width: 10,
    height: 35,
    color: 'blue',
}
// MOVEMENT AND COLLISION
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

       if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball hits right paddle
    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds (left or right)
    if (ballX <= 0 || ballX >= canvas.width) {
        resetBall();
    }
}

// BALL RESET @ CENTER
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 3;
}

// PADDLE MOVEMENT
function movePaddles() {
    if (leftPaddleY + leftPaddleSpeed >= 0 && leftPaddleY + leftPaddleSpeed <= canvas.height - paddleHeight) {
        leftPaddleY += leftPaddleSpeed;
    }

    if (rightPaddleY + rightPaddleSpeed >= 0 && rightPaddleY + rightPaddleSpeed <= canvas.height - paddleHeight) {
        rightPaddleY += rightPaddleSpeed;
    }
}

// GAME LOGIC
function update() {
    moveBall();
    movePaddles();
    draw();
    requestAnimationFrame(update);
}

// GAME ELEMENTS
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
}

// PADDLE CONTROLS
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        rightPaddleSpeed = -playerSpeed;
    }
    if (e.key === "ArrowDown") {
        rightPaddleSpeed = playerSpeed;
    }
    if (e.key === "w") {
        leftPaddleSpeed = -playerSpeed;
    }
    if (e.key === "s") {
        leftPaddleSpeed = playerSpeed;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        rightPaddleSpeed = 0;
    }
    if (e.key === "w" || e.key === "s") {
        leftPaddleSpeed = 0;
    }
});

update();
