const track = document.querySelector('.carrosel-track');
const btnLeft = document.querySelector('.carrosel-btn.left');
const btnRight = document.querySelector('.carrosel-btn.right');

// Função para calcular o quanto rolar
const getScrollAmount = () => {
    const item = document.querySelector('.carrosel-item');
    const gap = 24; // Definido no CSS
    return item ? item.offsetWidth + gap : 350;
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