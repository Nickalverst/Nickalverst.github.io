const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const FPS = 1000 / 60;
const cactusDisplacementSpeed = 10; // Velocidade em que os cactus se aproximam
const jumpSpeed = 15; // Velocidade do pulo
const leftBoundary = 90; // Deve corresponder ao indicado no arquivo .css (dino.style.left)

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyDown(event) {
	if (event.keyCode === 32) {
		if (!isJumping) {
			jump();
		}
	}
}

function jump() {
	isJumping = true;

	let upInterval = setInterval(() => {
		if (position >= 150) {
			// Descendo
			clearInterval(upInterval);

			let downInterval = setInterval(() => {
				if (position <= 0) {
					clearInterval(downInterval);
					isJumping = false;
				} else {
					position -= jumpSpeed;
					dino.style.bottom = position + 'px';
				}
			}, FPS);
		} else {
			// Subindo
			position += jumpSpeed;
			dino.style.bottom = position + 'px';
		}
	}, FPS);
}

function createCactus() {
	const cactus = document.createElement('div');
	let cactusPosition = 1250;
	let randomTime = Math.random() * (3000 - 1000) + 1000;

	if (isGameOver) return;

	cactus.classList.add('cactus');
	background.appendChild(cactus);
	cactus.style.left = cactusPosition + 'px';

	let leftTimer = setInterval(() => {
		if (cactusPosition < -60) {
			// Saiu da tela
			clearInterval(leftTimer);
			background.removeChild(cactus);
		} else if (cactusPosition > leftBoundary && cactusPosition < leftBoundary + 60 && position < 60) {
			// Game over
			clearInterval(leftTimer);
			isGameOver = true;
			document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
		} else {
			cactusPosition -= cactusDisplacementSpeed;
			cactus.style.left = cactusPosition + 'px';
		}
	}, FPS);

	setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);