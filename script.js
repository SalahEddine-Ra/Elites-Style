// Fixed JavaScript for handling most popular sections
function handleProjectSections() {
    const projectSlides = document.querySelectorAll('#most-popular-slides'); // Mobile version
    const myprojects = document.querySelectorAll('#most-popular'); // Desktop version
    
    if (window.innerWidth < 768) {
        // Show mobile version (slides with auto-scroll)
        projectSlides.forEach(slide => {
            slide.style.display = 'flex';
            slide.style.flexDirection = 'column';
        });
        // Hide desktop version
        myprojects.forEach(project => {
            project.style.display = 'none';
        });
        
        // Initialize auto-scroll for mobile
        initializeAutoScroll();
    } else {
        // Show desktop version (grid layout)
        myprojects.forEach(project => {
            project.style.display = 'flex';
            project.style.flexDirection = 'column';
        });
        // Hide mobile version
        projectSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Clear any existing auto-scroll
        clearAutoScroll();
    }
}

let autoScrollInterval = null;

function initializeAutoScroll() {
    clearAutoScroll(); // Clear any existing interval
    
    // Small delay to ensure elements are rendered
    setTimeout(() => {
        const slider = document.querySelector('#most-popular-slides .popular');
        if (!slider) {
            console.log('Slider not found');
            return;
        }

        const cards = slider.querySelectorAll('.card-popular');
        if (cards.length === 0) {
            console.log('No cards found');
            return;
        }

        const cardWidth = cards[0].offsetWidth + 16; // Card width + gap
        let currentIndex = 0;

        function scrollNext() {
            currentIndex++;
            
            // Reset to beginning if we've reached the end
            if (currentIndex >= cards.length) {
                currentIndex = 0;
            }
            
            const scrollPosition = currentIndex * cardWidth;
            slider.scrollTo({ 
                left: scrollPosition, 
                behavior: 'smooth' 
            });
        }

        // Start auto-scroll
        autoScrollInterval = setInterval(scrollNext, 3000); // 3 seconds
        
        // Pause auto-scroll on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        // Resume auto-scroll when mouse leaves
        slider.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(scrollNext, 3000);
        });
        
    }, 100);
}

function clearAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// Event listeners
window.addEventListener('resize', handleProjectSections);
window.addEventListener('DOMContentLoaded', handleProjectSections);

// Clean up on page unload
window.addEventListener('beforeunload', clearAutoScroll);

// products pages

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-button');
    const productCards = document.querySelectorAll('.products');

    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const filter = this.id;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            productCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = (card.id === 'allProducts') ? 'block' : 'none';
                } else if (filter === 'Jersey') {
                    card.style.display = (card.id === 'allJerseys') ? 'block' : 'none';
                } else if (filter === 'Boots') {
                    card.style.display = (card.id === 'allBoots') ? 'block' : 'none';
                } else if (filter === 'Equipment') {
                    card.style.display = (card.id === 'allEquipment') ? 'block' : 'none';
                }
            });
        });
    });

});