document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const menu = document.querySelector('.nav-links');
    const burger = document.querySelector('.hamburger');
    burger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
    });

    // Search Bar Functionality
    document.getElementById("search").addEventListener("keyup", function() {
        let filter = this.value.toLowerCase();
        let items = document.querySelectorAll("nav ul li a");
        items.forEach(item => {
            if (item.innerHTML.toLowerCase().includes(filter)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
