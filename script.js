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

    function showPage(page) {
        console.log(`Showing page: ${page}`); // Debug log
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogPosts.forEach((post, index) => {
            post.style.display = (index >= start && index < end) ? '' : 'none';
        });

        setTimeout(() => {
            paginationLinks.forEach(link => {
                const isActive = parseInt(link.dataset.page) === page;
                link.classList.toggle('active', isActive);
                console.log(`Link ${link.dataset.page} active: ${isActive}`); // Debug log
            });
        }, 0);

        if (prevLink) prevLink.dataset.page = Math.max(1, page - 1);
        if (nextLink) nextLink.dataset.page = Math.min(Math.ceil(blogPosts.length / postsPerPage), page + 1);
    }

    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.dataset.page);
                console.log(`Clicked page: ${page}`); // Debug log
                showPage(page);
            });
        });

        if (prevLink) {
            prevLink.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(prevLink.dataset.page);
                console.log(`Clicked prev: ${page}`); // Debug log
                showPage(page);
            });
        }

        if (nextLink) {
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(nextLink.dataset.page);
                console.log(`Clicked next: ${page}`); // Debug log
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
    backToTopBtn.textContent = '```javascript
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
});
```

**Changes**:
- Added `console.log` statements for each pagination click (`Clicked page`, `Clicked prev`, `Clicked next`) and `.active` class toggling.
- Wrapped `.active` class toggling in `setTimeout(() => {}, 0)` to ensure DOM updates complete.
- Kept `postsPerPage = 2`.

---

### **No Changes to Other Files**
- **blog.html**: Already correct, with functional "Read More" links.
- **excel-functions.html**, **powerbi-intro.html**, **tableau-basics.html**: No changes needed, as they match the site’s structure and work as expected.

---

### **Implementation Steps**

1. **Deploy Updated Files**:
   - Replace `style.css` and `script.js` in your repository ([https://github.com/Sunilmalluri/Sunilmalluri](https://github.com/Sunilmalluri/Sunilmalluri)).
   - Save the provided content locally, then commit and push:
     ```bash
     git add style.css script.js
     git commit -m "Fix pagination background, height issues, and page height consistency"
     git push origin main
     ```
   - Or use GitHub’s web interface:
     - Navigate to `style.css` and `script.js`.
     - Click “Edit” and paste the updated content.
     - Commit with a message like “Update pagination fixes”.

2. **Clear Cache**:
   - Clear browser cache or use incognito mode to load `style.css?v=4`.
   - In dev tools (F12 → Network tab), confirm `style.css` and `script.js` load the updated versions.

3. **Test Functionality**:
   - Visit [https://sunilmalluri.github.io/Sunilmalluri/blog.html](https://sunilmalluri.github.io/Sunilmalluri/blog.html).
   - **Pagination**:
     - Click “1”, “2”, “3”, “«”, “»” in desktop view.
     - Verify:
       - Active page has blue background (`#4A90E2`) and white text consistently.
       - Pagination links maintain fixed height (32px) with no increase.
       - Page height remains consistent across pages (no layout shift between page 1 with 2 posts and page 3 with 1 post).
       - Pagination section is compact (less vertical space).
     - Open dev tools (F12 → Console) and check logs (e.g., `Clicked page: 2`, `Link 2 active: true`).
   - **"Read More" Links**:
     - Confirm links work:
       - “Introduction to Power BI” → `blog/powerbi-intro.html`.
       - “Top 5 Excel Functions” → `blog/excel-functions.html`.
       - “Tableau Basics” → `blog/tableau-basics.html`.
       - Placeholders (“Data Storytelling”, “Power Query Best Practices”) are greyed out.
   - **Mobile View**:
     - Set viewport to 768px or below.
     - Confirm pagination styling, page height, and navigation work.
   - **Search and Categories**:
     - Test search bar (e.g., “Power BI”) and category links (e.g., “Excel”).

4. **Debugging**:
   - **If Background Is Inconsistent**:
     - Inspect `.pagination a.active` in dev tools (F12 → Elements).
     - Confirm `background-color: #4A90E2 !important` is applied.
     - Share Console logs (e.g., `Link 2 active: true`) and a screenshot of pages 2 and 3.
   - **If Height Increases**:
     - Check `.pagination a` and `.pagination a.active` for `height: 32px`.
     - Share a screenshot showing the height change.
   - **If Page Height Varies**:
     - Confirm `.blog-posts` has `min-height: 800px` (or `600px`/`500px` in responsive views).
     - Share screenshots of page 1 vs. page 3.
   - **If Pagination Section Is Too Tall**:
     - Verify `.pagination` has `margin-top: 30px`, `margin-bottom: 20px`, `height: 40px`.
     - Share a screenshot of the pagination area.

5. **Validate**:
   - HTML: [W3C Markup Validator](https://validator.w3.org/) – Test `blog.html`.
   - CSS: [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) – Test `style.css`.
   - Accessibility/Performance: [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) – Run on `blog.html`.
   - Mobile: [Responsinator](https://www.responsinator.com/) – Test at various screen sizes.

---

### **Additional Notes**

- **Pagination Background**:
  - The `setTimeout` in `script.js` should resolve any DOM update issues. If the background still fails, the Console logs will help identify if `.active` is toggling correctly.
  - If the issue persists, we can add a CSS fallback (e.g., `[data-page="${page}"].pagination-link`).

- **Height Consistency**:
  - The `min-height: 800px` on `.blog-posts` is an estimate based on 2 posts’ height. If it’s too tall/short, adjust to `750px` or `850px` after testing.
  - If layout shifts persist, we can use `display: grid` with fixed row heights for `.blog-posts`.

- **Pagination Section Height**:
  - Reduced margins and padding should make the pagination section compact. If it’s still too tall, we can further reduce `padding` to `6px 12px` or `font-size` to `0.9rem`.

- **Missing Pages**:
  - The placeholders for `data-storytelling.html` and `powerquery-best-practices.html` are correct. Create these when ready using the `powerbi-intro.html` template.
  - If `powerbi-performance.html` or `tableau-lod.html` exist locally, please share their content or upload them to `/blog/`.

- **Enhancements** (Optional):
  - Add a loading animation for pagination transitions (e.g., fade effect).
  - Implement a sidebar on blog post pages for consistency.
  - Create category pages (e.g., `blog/category/excel.html`).
  - Add “Related Posts” sections.

---

### **Next Steps**

1. **Deploy the Updates**:
   - Update `style.css` and `script.js` in the repository.
   - Confirm deployment on [https://sunilmalluri.github.io/Sunilmalluri/blog.html](https://sunilmalluri.github.io/Sunilmalluri/blog.html).

2. **Test and Report**:
   - Test pagination background, link heights, page height consistency, and pagination section height.
   - Share:
     - Screenshots of pages 1, 2, and 3 (desktop and mobile).
     - Console logs from `script.js` (e.g., `Clicked page: 2`, `Link 2 active: true`).
     - Any issues with height, styling, or functionality.
   - Confirm “Read More” links work as expected.

3. **Further Assistance**:
   - If issues persist, I can debug specific elements (e.g., inspect live site CSS/JS).
   - If you need help with Git/deployment, let me know your preferred method (e.g., command line, GitHub UI).

Please deploy the updated files, test the pagination and page height, and let me know the results. I’m here to resolve any remaining issues promptly.
