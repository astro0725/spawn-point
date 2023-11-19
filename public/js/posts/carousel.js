// wait for the DOM to be fully loaded before executing this code
document.addEventListener('DOMContentLoaded', (event) => {
    // find all elements with an ID starting with 'carousel'
    // TODO: Update function for better ID support
    document.querySelectorAll('[id^="carousel"]').forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;

        // If there is only one or zero images, hide the left and right buttons and return
        if (images.length <= 1) {
            carousel.querySelector('.left-button').style.display = 'none';
            carousel.querySelector('.right-button').style.display = 'none';
            return; 
        }

        // Add a click event listener to the left button
        carousel.querySelector('.left-button').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Add a click event listener to the right button
        carousel.querySelector('.right-button').addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Function to update the carousel display
        function updateCarousel() {
            const offset = currentIndex * 100;
            carousel.querySelector('.slides').style.transform = `translateX(-${offset}%)`;
        }
    });
});