document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const menu = document.querySelector('.nav-links');
    const burger = document.querySelector('.hamburger');
    burger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
    });

    // Search Bar Functionality
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", function() {
        let filter = this.value.toLowerCase();
        let tutorials = document.querySelectorAll(".tutorial");
        tutorials.forEach(tutorial => {
            let title = tutorial.querySelector("h4").textContent.toLowerCase();
            let content = tutorial.textContent.toLowerCase();
            if (title.includes(filter) || content.includes(filter)) {
                tutorial.style.display = "";
            } else {
                tutorial.style.display = "none";
            }
        });
    });
});document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const menu = document.querySelector('.nav-links');
    const burger = document.querySelector('.hamburger');
    burger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
    });

    // Search Bar Functionality
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", function() {
        let filter = this.value.toLowerCase();
        let tutorials = document.querySelectorAll(".tutorial");
        tutorials.forEach(tutorial => {
            let title = tutorial.querySelector("h4").textContent.toLowerCase();
            let content = tutorial.textContent.toLowerCase();
            if (title.includes(filter) || content.includes(filter)) {
                tutorial.style.display = "";
            } else {
                tutorial.style.display = "none";
            }
        });
    });
});
