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
    const postsPerPage = 2;
    const blogPosts = document.querySelectorAll('.blog-post');
    const paginationLinks = document.querySelectorAll('.pagination-link');
    const prevLink = document.querySelector('.pagination-prev');
    const nextLink = document.querySelector('.pagination-next');
    let filteredPosts = Array.from(blogPosts); // Default: all posts

    function updatePagination(filtered = filteredPosts) {
        const totalPages = Math.ceil(filtered.length / postsPerPage);
        const pagination = document.querySelector('.pagination');

        // Update pagination links
        pagination.innerHTML = `
            <a href="#" class="pagination-prev" aria-label="Previous page" data-page="0">«</a>
            ${Array.from({ length: totalPages }, (_, i) => `
                <a href="#" class="pagination-link${i === 0 ? ' active' : ''}" aria-current="${i === 0 ? 'page' : ''}" data-page="${i + 1}">${i + 1}</a>
            `).join('')}
            <a href="#" class="pagination-next" aria-label="Next page" data-page="2">»</a>
        `;

        // Re-bind event listeners
        const newPaginationLinks = pagination.querySelectorAll('.pagination-link');
        const newPrevLink = pagination.querySelector('.pagination-prev');
        const newNextLink = pagination.querySelector('.pagination-next');

        newPaginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.dataset.page);
                console.log(`Clicked page: ${page}`); // Debug log
                showPage(page, filtered);
            });
        });

        if (newPrevLink) {
            newPrevLink.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(newPrevLink.dataset.page);
                console.log(`Clicked prev: ${page}`); // Debug log
                showPage(page, filtered);
            });
        }

        if (newNextLink) {
            newNextLink.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(newNextLink.dataset.page);
                console.log(`Clicked next: ${page}`); // Debug log
                showPage(page, filtered);
            });
        }

        showPage(1, filtered); // Show first page
    }

    function showPage(page, posts) {
        console.log(`Showing page: ${page}, posts count: ${posts.length}`); // Debug log
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogPosts.forEach(post => {
            post.style.display = 'none';
        });

        posts.slice(start, end).forEach(post => {
            post.style.display = '';
        });

        setTimeout(() => {
            const paginationLinks = document.querySelectorAll('.pagination-link');
            paginationLinks.forEach(link => {
                const isActive = parseInt(link.dataset.page) === page;
                link.classList.toggle('active', isActive);
                console.log(`Link ${link.dataset.page} active: ${isActive}`); // Debug log
            });

            const prevLink = document.querySelector('.pagination-prev');
            const nextLink = document.querySelector('.pagination-next');
            if (prevLink) prevLink.dataset.page = Math.max(1, page - 1);
            if (nextLink) nextLink.dataset.page = Math.min(Math.ceil(posts.length / postsPerPage), page + 1);
        }, 0);
    }

    // Category Filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                console.log(`Clicked category: ${category}`); // Debug log

                // Filter posts
                filteredPosts = category === 'All' 
                    ? Array.from(blogPosts)
                    : Array.from(blogPosts).filter(post => post.dataset.category === category);

                console.log(`Filtered posts count: ${filteredPosts.length}`); // Debug log

                // Update active category link
                categoryLinks.forEach(catLink => {
                    catLink.classList.toggle('active', catLink === link);
                });

                // Update pagination and show first page
                updatePagination(filteredPosts);
            });
        });
    }

    // Initial pagination setup
    updatePagination();

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
