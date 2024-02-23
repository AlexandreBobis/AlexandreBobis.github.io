var menuBtn = document.getElementById('menu-btn');
var sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', function() {
    toggleMenu();
});

function toggleMenu() {
    var sideMenu = document.getElementById('side-menu');
    menuBtn.classList.toggle('active');
    sideMenu.classList.toggle('active');

    if (sideMenu.style.width === '250px') {
        sideMenu.style.width = '0';
    } else {
        sideMenu.style.width = '250px';
    }
}
