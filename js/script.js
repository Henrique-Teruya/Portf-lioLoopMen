const track = document.querySelector('.carrosel-track');
const items = Array.from(track.children);
items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
});
const btnLeft = document.querySelector('.carrosel-btn.left');
const btnRight = document.querySelector('.carrosel-btn.right');

track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    const scrollWidth = track.scrollWidth;
    const halfWidth = scrollWidth / 2;

    // Se passou da metade (segunda sequência)
    if (scrollLeft >= halfWidth) {
        track.scrollLeft = scrollLeft - halfWidth;
    }

    // Se voltou demais para esquerda
    if (scrollLeft <= 0) {
        track.scrollLeft = scrollLeft + halfWidth;
    }
});

// Função para calcular o quanto rolar
const getScrollAmount = () => {
    const item = document.querySelector('.carrosel-item');
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap);
    return item.offsetWidth + gap;
};

// Evento para o botão direito
btnRight.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();
    track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Evento para o botão esquerdo
btnLeft.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();
    track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// Função para atualizar estado dos botões (opacidade) baseado no scroll
const updateButtons = () => {
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    // Se estiver no início, diminui opacidade do botão esquerdo
    btnLeft.style.opacity = scrollLeft <= 5 ? '0.3' : '1';
    btnLeft.style.pointerEvents = scrollLeft <= 5 ? 'none' : 'auto';

    // Se estiver no final, diminui opacidade do botão direito
    btnRight.style.opacity = scrollLeft >= maxScroll - 5 ? '0.3' : '1';
    btnRight.style.pointerEvents = scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
};

// Listeners para monitorar o scroll e atualizar os botões
track.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);

// Inicializar estado dos botões
setTimeout(updateButtons, 100);

let offset = 0;
const speed = 320 + 24; // largura + gap

btnRight.addEventListener('click', () => {
    track.style.animation = 'none';
    offset -= speed;
    track.style.transform = `translateX(${offset}px)`;
});

btnLeft.addEventListener('click', () => {
    track.style.animation = 'none';
    offset += speed;
    track.style.transform = `translateX(${offset}px)`;
});