const starWarsSound = new Audio('/sounds/StarWarsMainTheme.mp3');

let beginDiv = document.querySelector('.begin'),
    container = document.querySelector('.container'),
    nav = document.querySelector('nav'),
    htmlElement = document.querySelector('html'),
    intro = document.querySelector('.intro'),
    logo = document.querySelector('.logo'),
    content = document.querySelector('#content'),
    skipDiv = document.querySelector('.skip');

const beginBtn = document.getElementById('begin').addEventListener('click', () => {
    beginDiv.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-in'
    });

    skipDiv.animate([
        { opacity: 0 },
        { display: 'block' },
        { opacity: 1 }
    ], {
        duration: 3000,
        easing: 'ease-in'
    });

    setTimeout(() => {
        beginDiv.style.display = 'none';
        skipDiv.style.display = 'block';
    }, 1000);


    setTimeout(() => {
        intro.style.animation = 'intro 6s ease-in-out 1s';
        logo.style.animation = 'logo 9s ease-in-out 9s';
        content.style.animation = 'scroll 100s linear 18s'
        container.style.animation = 'container 250s ease-in-out 80s';
    }, 1000);

    setTimeout(() => {
        starWarsSound.play();
    }, 9550);

    setTimeout(() => {
        intro.style.display = "none";
    }, 9000);
    
    setTimeout(() => {
        logo.style.display = "none";
    }, 20000);

    setTimeout(() => {
        container.style.display = "none";
    }, 250000);

    // setTimeout(() => {
    //     nav.animate([
    //         { opacity: 0 },
    //         { display: 'block'},
    //         { opacity: 1 }
    //     ], {
    //         duration: 2000,
    //         iterations: 1,
    //         easing: 'ease-in'
    //     });
    // }, 1000);

    // setTimeout(() => {
    //     nav.style.display = 'block';
    // }, 3000);
    
    // setTimeout(() => {
    //     container.animate([
    //         { opacity: 0 },
    //         { display: 'block'},
    //         { opacity: 1 }
    //     ], {
    //         duration: 5000,
    //         // iterations: 1,
    //         easing: 'ease-in-out'
    //     });
    // }, 1000);
    
    htmlElement.animate([
        { overflow: 'hidden' },
        { height: '1000%'},
        { background: '#000' }
    ], {
        duration: 5000,
        iterations: 1,
        easing: 'ease-in'
    });

    setTimeout(() => {
        htmlElement.style.height = '100vh';
        htmlElement.style.overflow = 'hidden';
        htmlElement.style.background = '#000';
    }, 2500);

    setTimeout(() => {
        htmlElement.style.overflow = 'hidden';
    }, 5000);
});

//! STARS

const numStars = 200;

for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");  
    star.className = "star";
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.body.append(star);
}

function getRandomPosition() {  
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random()*x);
    var randomY = Math.floor(Math.random()*y);
    return [randomX,randomY];
}