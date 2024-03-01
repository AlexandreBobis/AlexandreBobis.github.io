var menuBtn = document.getElementById('menu-btn');
var sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', function() {
    toggleMenu();
});

function toggleMenu() {
    var sideMenu = document.getElementById('side-menu');
    menuBtn.classList.toggle('active');
    sideMenu.classList.toggle('active');

    if (sideMenu.style.right === '0px') {
        sideMenu.style.right = '-250px';
    } else {
        sideMenu.style.right = '0px';
    }
}

window.addEventListener('scroll', function() {
    let offset = window.scrollY;
    let parallax = document.querySelector('.parallax');
    parallax.style.backgroundPositionY = offset * 0.6 + 'px'; // Ajustez le coefficient selon vos préférences
});