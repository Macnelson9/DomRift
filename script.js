'use strict';

// Selected elements
const navLinks = document.querySelectorAll('.nav-ul li a');
const openMenuBtn = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close-btn');
const openMenuDiv = document.querySelectorAll('.hamburger div.bar');
const closeBtnDiv = document.querySelectorAll('.close-btn div.bar');
const lightBtn = document.querySelector('#light-btn');
const darkBtn = document.querySelector('#dark-btn');
const lightBtn1 = document.querySelector('#light-btn1');
const darkBtn1 = document.querySelector('#dark-btn1');
const mobileNav = document.querySelector('.mobile-navigation');
const bodyContainer = document.querySelector('.body-container');
const arrowIcon = document.querySelector('.arrow');
const entryMedia = document.querySelectorAll('.entry__media');
const socialAfter = document.querySelectorAll('.social-links li');
const contactAfter = document.querySelectorAll('.contact-social-links li');

// Lenis smooth scrolling
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
	lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Smooth scroll implementation 

const smoothScroll = function (e) {
    e.preventDefault();
    
    try {
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) {
            console.warn(`Target section ${targetId} not found`);
            return;
        }

        lenis.scrollTo(targetSection, {
            offset: 0,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    } catch (error) {
        console.error('Error during smooth scroll:', error);
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Open and close mobile navigation
openMenuBtn.addEventListener('click', function () {
    mobileNav.classList.add('active');
})

closeBtn.addEventListener('click', function () {
    mobileNav.classList.remove('active');
})

// Animated cursor
const words = ['Craft', 'Canvas', 'Language', 'Joy', 'Escape'];

// Main timeline
const mainTimeline = gsap.timeline({
	repeat: -1
})

// For each word, create a new timeline, use the Text plugin, then append that timeline to the main one
words.forEach(word => {
	let textTimeline = gsap.timeline({
		repeat: 1,
		yoyo: true,
		repeatDelay: 6
    })

	textTimeline.to('#typewriter', {
		text: word,
		duration: 1,
		onUpdate: () => {
			cursorTimeline.restart()
			cursorTimeline.pause()
		},
		onComplete: () => {
			cursorTimeline.play()
		}
	})
	
	mainTimeline.add(textTimeline)
})

// Blinking cursor 
let cursorTimeline = gsap.timeline({
	repeat: -1,
	repeatDelay: .8
})

cursorTimeline.to('#cursor', {
	opacity: 1,
	duration: 0
}).to('#cursor', {
	opacity: 0,
	duration: 0,
	delay: .8
})

// Magneto button
const magneto = document.querySelector('.magneto');
const magnetoText = document.querySelector('.magneto .text');

const activateMagneto = (event) => {
    let boundBox = magneto.getBoundingClientRect();
    const magnetoStrength = 40;
    const magnetoTextStrength = 80;
    const newX = ((event.clientX - boundBox.left)/magneto.offsetWidth) - 0.5;
    const newY = ((event.clientY - boundBox.top)/magneto.offsetHeight) - 0.5;

    // Move the button to its new position
    gsap.to(magneto, {
        duration: 1,
        x: newX * magnetoStrength,
        y: newY * magnetoStrength,
        ease: Power4.easeOut
    })

    // Move the button to its new position
    gsap.to(magnetoText, {
        duration: 1,
        x: newX * magnetoTextStrength,
        y: newY * magnetoTextStrength,
        ease: Power4.easeOut
    })
}

// Mouse leave stuff
const resetMagneto = (event) => {
	// Move the button to its default position
	gsap.to(magneto, {
		duration: 1,
		x: 0,
		y: 0,
		ease: "Elastic.easeOut"
	})

	// Move the button text to its default position
	gsap.to(magnetoText, {
		duration: 1,
		x: 0,
		y: 0,
		ease: "Elastic.easeOut"
	})
}



// Add event listeners
magneto.addEventListener('mousemove', activateMagneto);
magneto.addEventListener('mouseleave', resetMagneto);
magneto.addEventListener('click', smoothScroll);

// Animations
    gsap.set(['.hero-h1', '#hero-h3', '#hero-p', '.social-links-li'], {
    scale: 0,
    opacity: 0,
    transformOrigin: '50% 50%'
    });

    const tl = gsap.timeline({
        duration: 1.2
    });

    tl.fromTo('.logo', {
        y: -100
    }, {
        y: 0,
        ease: "bounce"
    }).fromTo('.nav-ul li', {
        y: -100,
        ease: "bounce"
    }, {
        y: 0,
        ease: "bounce"
    }, '>').fromTo('.header-side-content', {
        y: -100
    }, {
        y: 0,
        ease: "bounce"
    }, '>').to('.hero-h1', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2ease.out"
    }, '>')
        
        tl.to('#hero-h3', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2ease.out"
        })
            
        tl.to('#hero-p', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2ease.out"
    })

    tl.to('.social-links-li', {
        rotation: 360,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3ease.out"
    },'>')

    tl.fromTo('.magneto', {
    opacity: 0,
    duration: 1.2,
    ease: "power2ease.out"
    }, {
    opacity: 1,
    duration: 1.2,
    ease: "power2ease.out"
    }, '>')

    // ScrollIntoView
const entries = document.querySelectorAll('.entry');

entries.forEach(entry => {
    let entryMeta = entry.querySelector('.entry__meta');
    let entryMedia = entry.querySelector('.entry__media');

    let entriesTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: entry,
            start: 'top bottom',
            end: 'bottom 90%',
            scrub: true,
            // markers: true
        }
    })

    entriesTimeline.fromTo(entryMeta, {
        xPercent: -100,
        opacity: 0
    }, {
        xPercent: 0,
        opacity: 1
    })
    
    entriesTimeline.fromTo(entryMedia, {
        xPercent: 100,
        opacity: 0
    }, {
        xPercent: 0,
        opacity: 1
    }, '<')
})

const darkElements = [bodyContainer, arrowIcon, magneto];

const toggleTheme = (theme) => {
    if (theme === 'dark') {
        darkElements.forEach(el => el.classList.add('dark'));
        openMenuDiv.forEach(div => div.classList.add('dark'));
        closeBtnDiv.forEach(div => div.classList.add('dark'));
        entryMedia.forEach(entry => entry.classList.add('dark'));
        socialAfter.forEach(after => after.classList.add('dark'));
        contactAfter.forEach(after => after.classList.add('dark'));
        darkBtn.style.display = 'none';
        lightBtn.style.display = 'block';
        darkBtn1.style.display = 'none';
        lightBtn1.style.display = 'block';
    } else {
        darkElements.forEach(el => el.classList.remove('dark'));
        openMenuDiv.forEach(div => div.classList.remove('dark'));
        closeBtnDiv.forEach(div => div.classList.remove('dark'));
        entryMedia.forEach(entry => entry.classList.remove('dark'));
        socialAfter.forEach(after => after.classList.remove('dark'));
        contactAfter.forEach(after => after.classList.remove('dark'));
        lightBtn.style.display = 'none';
        darkBtn.style.display = 'block';
        lightBtn1.style.display = 'none';
        darkBtn1.style.display = 'block';
    }
    localStorage.setItem('theme', theme);
}

darkBtn.addEventListener('click', () => toggleTheme('dark'));
lightBtn.addEventListener('click', () => toggleTheme('light'));
darkBtn1.addEventListener('click', () => toggleTheme('dark'));
lightBtn1.addEventListener('click', () => toggleTheme('light'));

document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    toggleTheme(currentTheme);
});



