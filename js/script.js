const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const counter = document.querySelector('.counter'); 

let jumpCount = 0; 

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        jumpCount++; 
        counter.textContent = jumpCount; 
    }, 500);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

    console.log(marioPosition);

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){

        pipe.style.animation = 'none';
        pipe.style.left = '120px';

        mario.style.animation = 'none';
        mario.style.bottom = '${marioPosition}px';

        mario.src='imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
    }
}, 10)

document.addEventListener('keydown',jump);
