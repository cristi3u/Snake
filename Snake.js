const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var perfectCoordonate = 20;
var objectSize = 18;
var headXCoordonate = 10;
var headYCoorodonat = 10;
const snakeBody = [];
var bodyLength = 2;
var xSnakeMove = 0;
var ySnakeMove = 0;
var appleXCoordonate = 5;
var appleYCoordonate = 5
var score = 0;

class addSnakeBody {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function startGame() {
	moveTheSnake();
	var result = isGameOver();
	if (result == true) {
		return;
	}
	clearScreen();
	createSnake();
	createApple();

	checkCollision()
	document.getElementById("score").innerHTML = "You're score is : " + score;
	setTimeout(startGame, 100);
}

function isGameOver() {
	var gameOver = false;
	if (xSnakeMove === 0 && ySnakeMove === 0) {
		return false;
	}
	if (headXCoordonate < 0) {
		gameOver = true;
	} else if (headXCoordonate === perfectCoordonate) {
		gameOver = true;
	} else if (headYCoorodonat < 0) {
		gameOver = true;
	} else if (headYCoorodonat === perfectCoordonate) {
		gameOver = true;
	}

	for (var i = 0; i < snakeBody.length; i++) {
		var part = snakeBody[i];
		if (part.x === headXCoordonate && part.y === headYCoorodonat) {
			gameOver = true;
			break;
		}
	}

	if (gameOver == true) {
		document.getElementById("result").innerHTML = "Game over!";
	}
	return gameOver;
}

function clearScreen() {
	ctx.fillStyle = 'darkgreen';
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

function createSnake() {
	ctx.fillStyle = "yellow";
	for (var i = 0; i < snakeBody.length; i++) {
		var part = snakeBody[i];
		ctx.fillRect(part.x * perfectCoordonate, part.y * perfectCoordonate, objectSize, objectSize)
	}
	snakeBody.push(new addSnakeBody(headXCoordonate, headYCoorodonat));
	if (snakeBody.length > bodyLength) {
		snakeBody.shift();
	}
	ctx.fillStyle = "pink";
	ctx.fillRect(headXCoordonate * perfectCoordonate, headYCoorodonat * perfectCoordonate, objectSize, objectSize)
}

function moveTheSnake() {
	headXCoordonate = headXCoordonate + xSnakeMove;
	headYCoorodonat = headYCoorodonat + ySnakeMove;
}

function createApple() {
	ctx.fillStyle = "red";
	ctx.fillRect(appleXCoordonate * perfectCoordonate, appleYCoordonate * perfectCoordonate, objectSize, objectSize)
}

function checkCollision() {
	if (appleXCoordonate == headXCoordonate && appleYCoordonate == headYCoorodonat) {
		appleXCoordonate = Math.floor(Math.random() * perfectCoordonate);
		appleYCoordonate = Math.floor(Math.random() * perfectCoordonate);
		++bodyLength;
		++score;
	}
}

document.body.addEventListener('keydown', keyDown);

function keyDown() {
	if (event.keyCode == 38) {
		if (ySnakeMove == 1) {
			return;
		}
		ySnakeMove = -1;
		xSnakeMove = 0;

	}

	if (event.keyCode == 40) {
		if (ySnakeMove == -1) {
			return;
		}
		ySnakeMove = 1;
		xSnakeMove = 0;
	}

	if (event.keyCode == 37) {
		if (xSnakeMove == 1) {
			return;
		}
		ySnakeMove = 0;
		xSnakeMove = -1;
	}

	if (event.keyCode == 39) {
		if (xSnakeMove == -1) {
			return;
		}
		ySnakeMove = 0;
		xSnakeMove = 1;
	}
}

startGame();
