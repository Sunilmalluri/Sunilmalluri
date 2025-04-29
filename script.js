document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('nav-active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.textContent = isExpanded ? '✕' : '☰'; // Toggle icon
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.textContent = '☰';
            });
        });
    }

    // Search Bar Functionality
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            const tutorials = document.querySelectorAll('.tutorial-card, .tutorial');

            tutorials.forEach(tutorial => {
                const titleElement = tutorial.querySelector('h3') || tutorial.querySelector('h4');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                const content = tutorial.textContent.toLowerCase();

                if (title.includes(filter) || content.includes(filter)) {
                    tutorial.style.display = '';
                } else {
                    tutorial.style.display = 'none';
                }
            });
        });
    }

    // Back to Top Button (Optional)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.textContent = '↑ Top';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
});
