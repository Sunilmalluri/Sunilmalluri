document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('nav-active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.textContent = isExpanded ? '✕' : '☰';
        });

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
            const items = document.querySelectorAll('.tutorial-card, .tutorial, .blog-post');

            items.forEach(item => {
                const titleElement = item.querySelector('h3') || item.querySelector('h4') || item.querySelector('h2');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                const content = item.textContent.toLowerCase();

                if (title.includes(filter) || content.includes(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Pagination Functionality
    const postsPerPage = 3;
    const blogPosts = document.querySelectorAll('.blog-post');
    const paginationLinks = document.querySelectorAll('.pagination-link');
    const prevLink = document.querySelector('.pagination-prev');
    const nextLink = document.querySelector('.pagination-next');

    function showPage(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogPosts.forEach((post, index) => {
            post.style.display = (index >= start && index < end) ? '' : 'none';
        });

        paginationLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.dataset.page) === page) {
                link.classList.add('active');
            }
        });

        if (prevLink) prevLink.dataset.page = Math.max(1, page - 1);
        if (nextLink) nextLink.dataset.page = Math.min(Math.ceil(blogPosts.length / postsPerPage), page + 1);
    }

    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.dataset.page);
                showPage(page);
            });
        });

        if (prevLink) {
            prevLink.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(prevLink.dataset.page);
                showPage(page);
            });
        }

        if (nextLink) {
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(nextLink.dataset.page);
                showPage(page);
            });
        }

        showPage(1); // Show first page by default
    }

    // Category Filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;

                blogPosts.forEach(post => {
                    const postCategory = post.dataset.category;
                    post.style.display = (category === 'All' || postCategory === category) ? '' : 'none';
                });

                categoryLinks.forEach(catLink => {
                    catLink.classList.toggle('active', catLink === link);
                });

                showPage(1); // Reset to first page after filtering
            });
        });
    }

    // Back to Top Button
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
