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

let typed = new Typed('.auto-typing', {
    strings: ["Alexandre BOBIS", "Web Developer", "Video Games Player", "World Adventurer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});