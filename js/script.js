const track = document.querySelector('.carrosel-track');
const btnLeft = document.querySelector('.carrosel-btn.left');
const btnRight = document.querySelector('.carrosel-btn.right');

const scrollAmount = 350;

btnRight.addEventListener('click', () => {
    track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

btnLeft.addEventListener('click', () => {
    track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});