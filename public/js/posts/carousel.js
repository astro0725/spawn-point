document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('[id^="carousel"]').forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
    
        carousel.querySelector('.left-button').addEventListener('click', () => {
            if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            }
        });
    
        carousel.querySelector('.right-button').addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
            }
        });
    
        function updateCarousel() {
            const offset = currentIndex * 100;
            carousel.querySelector('.slides').style.transform = `translateX(-${offset}%)`;
        }
        });
    });