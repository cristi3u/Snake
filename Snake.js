const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let perfectCoordonate = 20;
let objectSize = 18;
let headXCoordonate = Math.floor(Math.random() * perfectCoordonate);
let headYCoordonate = Math.floor(Math.random() * perfectCoordonate);
const snakeBody = [];
let bodyLength = 2;
let xSnakeMove = 0;
let ySnakeMove = 0;
let appleXCoordonate = Math.floor(Math.random() * perfectCoordonate);
let appleYCoordonate = Math.floor(Math.random() * perfectCoordonate);
let score = 0;

class addSnakeBody {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function startGame() {
	moveTheSnake();
	let result = isGameOver();
	if (result == true) {
		return;
	}
	clearScreen();
	createSnake();
	createApple();
	checkCollision();
	document.getElementById("score").innerHTML = "You're score is : " + score;
	setTimeout(startGame, 100);
}

function isGameOver() {
	let gameOver = false;
	if (xSnakeMove === 0 && ySnakeMove === 0) {
		return false;
	}
	if (headXCoordonate < 0) {
		gameOver = true;
	} else if (headXCoordonate === perfectCoordonate) {
		gameOver = true;
	} else if (headYCoordonate < 0) {
		gameOver = true;
	} else if (headYCoordonate === perfectCoordonate) {
		gameOver = true;
	}

	for (let i = 0; i < snakeBody.length; i++) {
		let part = snakeBody[i];
		if (part.x === headXCoordonate && part.y === headYCoordonate) {
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
	for (let i = 0; i < snakeBody.length; i++) {
		let part = snakeBody[i];
		ctx.fillRect(part.x * perfectCoordonate, part.y * perfectCoordonate, objectSize, objectSize)
	}
	snakeBody.push(new addSnakeBody(headXCoordonate, headYCoordonate));
	if (snakeBody.length > bodyLength) {
		snakeBody.shift();
	}
	ctx.fillStyle = "pink";
	ctx.fillRect(headXCoordonate * perfectCoordonate, headYCoordonate * perfectCoordonate, objectSize, objectSize)
}

function moveTheSnake() {
	headXCoordonate = headXCoordonate + xSnakeMove;
	headYCoordonate = headYCoordonate + ySnakeMove;
}

function createApple() {
	ctx.fillStyle = "red";
	ctx.fillRect(appleXCoordonate * perfectCoordonate, appleYCoordonate * perfectCoordonate, objectSize, objectSize)
}

function checkCollision() {
	if (appleXCoordonate == headXCoordonate && appleYCoordonate == headYCoordonate) {
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
