const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const marioImage = document.querySelector('.mario');
const counter = document.querySelector('.counter');
const restartButton = document.querySelector('.restart-button');
const gameOver = document.querySelector('.game-over-container');
const jumpSound = document.getElementById('jumpSound');
const scoreContainer = document.querySelector('.score');
jumpSound.volume = 0.1;

let jumpCount = 0;
let gameLost = false;

const jump = () => {
    if (gameLost) {
        return;
    }

    mario.classList.add('jump');
    jumpSound.currentTime = 0; // Reinicia o som do pulo
    jumpSound.play();

    setTimeout(() => {
        mario.classList.remove('jump');
        jumpCount++;
        counter.textContent = jumpCount;
	 updateScore();
    }, 500);
}


const updateScore = () => {
    const formattedScore = String(jumpCount).padStart(5, '0');
    scoreContainer.textContent = `Score: ${formattedScore}`;
    counter.textContent = formattedScore;
}

const loop = setInterval(() => {
	 gameOver.style.display = 'none'; 
    if (gameLost) {
        pipe.style.animation = 'none';
        pipe.style.left = '120px';

        mario.style.animation = 'none';
        mario.style.bottom = '${marioPosition}px';

        mario.src = 'imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';


        restartButton.style.display = 'block'; 	// Exibe o botão de reiniciar
	 gameOver.style.display = 'block';  
	

        clearInterval(loop);
        return;
    }

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameLost = true;
    }
}, 10);

document.addEventListener('keydown', jump);

// Reiniciar o jogo
function restartGame() {
    location.reload();
}

restartButton.onclick = restartGame;
