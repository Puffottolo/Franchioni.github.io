const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentIndex = 0;
let slideInterval;

// Elemento nav
const nav = document.getElementById('scritte-a-scompasrsa');
let lastPosY = 0;
let isMobile = screen.orientation.type.toString().includes('landscape') ? false : true;

const animationTime = 350;
let isClicked = false;

screen.orientation.addEventListener('change', (e) => {
    const type = e.target.type.toString();
    isMobile = type.includes('portrait') ? true : false;
})

window.addEventListener('scroll', () => {
    if (!isMobile) return;

    
    // Posizione attuale dello scroll
    const posY = this.window.scrollY;

    if(!isClicked){
        if (posY > lastPosY) {
            closeNav();
        }
        else if (posY < lastPosY) {
            openNav();
        }
    }

    lastPosY = posY;
});

nav.addEventListener('click', (e) => {
    isClicked = true;
    closeNav();
    setTimeout(() => {
        isClicked = false;
    }, animationTime);

})

function openNav() {
    nav.classList.add('translate-y-0')
    nav.classList.remove('-translate-y-48')
    nav.style.transition = 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)';
}

function closeNav() {
    nav.classList.add('-translate-y-48')
    nav.classList.remove('translate-y-0')
    nav.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
}



// Duplica le slide per creare un effetto infinito
function duplicateSlides() {
    slidesContainer.innerHTML += slidesContainer.innerHTML;
    slidesContainer.classList.add('duplicate');
}

// Avvia lo slideshow
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 4000); // Cambia slide ogni 4 secondi
}

// Ferma lo slideshow
function stopSlideshow() {
    clearInterval(slideInterval);
}

// Avvia e gestisci lo slideshow infinito
function initSlideshow() {
    duplicateSlides();
    startSlideshow();
}

function nextSlide() {
    const slidesWidth = slidesContainer.offsetWidth / 2; // Dato che abbiamo duplicato, la larghezza è divisa per 2
    if (currentIndex >= totalSlides) {
        slidesContainer.style.transition = 'none'; // Disattiva la transizione per il reset
        slidesContainer.style.transform = `translateX(0)`; // Torna alla prima immagine
        currentIndex = 0; // Ripristina l'indice
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 1s ease-in-out'; // Riattiva la transizione
            currentIndex++;
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 50);
    } else {
        currentIndex++;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

function prevSlide() {
    if (currentIndex <= 0) {
        slidesContainer.style.transition = 'none'; // Disattiva la transizione per il reset
        slidesContainer.style.transform = `translateX(-${totalSlides * 100}%)`; // Vai all'ultimo gruppo di immagini
        currentIndex = totalSlides - 1; // Ripristina l'indice
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 1s ease-in-out'; // Riattiva la transizione
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 50);
    } else {
        currentIndex--;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Eventi di navigazione
document.querySelector('.arrow.right').addEventListener('click', nextSlide);
document.querySelector('.arrow.left').addEventListener('click', prevSlide);

// Gestione dello scorrimento automatico
document.querySelector('.slideshow-container').addEventListener('mouseenter', stopSlideshow);
document.querySelector('.slideshow-container').addEventListener('mouseleave', startSlideshow);

// Inizializza lo slideshow
initSlideshow();