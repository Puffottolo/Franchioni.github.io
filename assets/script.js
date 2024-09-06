const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentIndex = 0;
let slideInterval;

// Elemento nav
const nav = document.getElementById('scritte-a-scompasrsa');

// Variabile per memorizzare la posizione dello scroll precedente
let lastScrollTop = 0;
let isScrollUp = false;
window.addEventListener('scroll', function () {
    // Posizione attuale dello scroll
    const pos = window.scrollY;
    let currentScroll = document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        isScrollUp = false;
        // Se l'utente sta scorrendo verso il basso
        nav.classList.add('hidden');
        nav.classList.remove('block');
    } else if (!isScrollUp) {
        isScrollUp = true;
        // Se l'utente sta scorrendo verso l'alto
        nav.classList.add('block');
        nav.classList.remove('hidden');
    }
    console.log(isScrollUp);
    // Aggiorna la posizione dello scroll precedente
    lastScrollTop = currentScroll


});



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

// Get all anchor links with an href attribute
const anchorLinks = document.querySelectorAll('a[href*="#"]');

// Add an event listener to each anchor link
anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        // Get the target element (the section with the corresponding id)
        const target = document.querySelector(link.getAttribute('href'));

        // Calculate the offset (in this case, the height of the header + 15px)
        const offset = document.querySelector('.header').offsetHeight + 15;

        // Scroll to the target element with the offset
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth',
        });

        // Prevent the default anchor link behavior
        event.preventDefault();
    });
});