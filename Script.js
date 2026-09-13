
/* =========================
LOADER
========================= */


window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    // Loader already shown in this browser tab
    if (sessionStorage.getItem("loaderShown") === "true") {
        loader.classList.add("hide");
        return;
    }

    // First time only
    sessionStorage.setItem("loaderShown", "true");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 2500);

});



/* =========================
COUNTDOWN
========================= */

const weddingDate =
new Date("January 10, 2027 00:00:00").getTime();

const daysEl =
document.getElementById("days");

const hoursEl =
document.getElementById("hours");

const minutesEl =
document.getElementById("minutes");

const secondsEl =
document.getElementById("seconds");

function formatNumber(num) {

    return String(num).padStart(2, "0");

}

function updateCountdown() {

    if (
        !daysEl ||
        !hoursEl ||
        !minutesEl ||
        !secondsEl
    ) return;

    const now = new Date().getTime();

    const distance = Math.max(
        0,
        weddingDate - now
    );

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (
            distance %
            (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (
            distance %
            (1000 * 60 * 60)
        ) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (
            distance %
            (1000 * 60)
        ) / 1000
    );

    daysEl.textContent =
    formatNumber(days);

    hoursEl.textContent =
    formatNumber(hours);

    minutesEl.textContent =
    formatNumber(minutes);

    secondsEl.textContent =
    formatNumber(seconds);

    if (distance === 0) {

        const countdownGrid =
        document.querySelector(
            ".countdown-grid"
        );

        if (countdownGrid) {

            countdownGrid.innerHTML = `
                <div class="wedding-day">
                    ✨ Wedding Day Has Arrived ✨
                </div>
            `;

        }

        clearInterval(
            countdownInterval
        );

    }

}

updateCountdown();

const countdownInterval =
setInterval(
    updateCountdown,
    1000
);












/* =========================
MUSIC PLAYER
========================= */

const music =
document.getElementById("music");

const musicBtn =
document.getElementById("musicBtn");

let playing = false;

if (music && musicBtn) {

    musicBtn.addEventListener("click", () => {

        if (!playing) {

            music.play();

            musicBtn.innerHTML = "❚❚";

            playing = true;

        } else {

            music.pause();

            musicBtn.innerHTML = "▶";

            playing = false;

        }

    });

}


/* =========================
AUTO PLAY AFTER FIRST CLICK
========================= */

document.body.addEventListener("click", () => {

    if (
        music &&
        musicBtn &&
        !playing
    ) {

        music.play();

        musicBtn.innerHTML = "❚❚";

        playing = true;

    }

}, { once: true });







/* =========================
SCROLL TOP BUTTON
========================= */

const topBtn =
document.querySelector(".top-btn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}




/* =========================
SCROLL REVEAL (UP & DOWN)
========================= */

const revealCards = document.querySelectorAll(".glass-card");

let lastScrollY = window.scrollY;

function revealOnScroll() {

    const scrollingDown = window.scrollY > lastScrollY;

    revealCards.forEach((card) => {

        const rect = card.getBoundingClientRect();

        // Card visible
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "all 0.8s ease";

        } else {

            card.style.opacity = "0";
            card.style.transition = "all 0.8s ease";

            if (scrollingDown) {
                // Scroll Down → Next time bottom இருந்து வரும்
                card.style.transform = "translateY(60px)";
            } else {
                // Scroll Up → Next time top இருந்து வரும்
                card.style.transform = "translateY(-60px)";
            }

        }

    });

    lastScrollY = window.scrollY;
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);















/* =========================
FLOATING PARTICLES
========================= */

function createParticle() {

    const particle =
    document.createElement("span");

    particle.classList.add("particle");

    particle.innerHTML = "•";

    particle.style.left =
    Math.random() *
    window.innerWidth + "px";

    particle.style.fontSize =
    (Math.random() * 10 + 8) + "px";

    particle.style.animationDuration =
    (Math.random() * 5 + 5) + "s";

    document.body.appendChild(
        particle
    );

    setTimeout(() => {

        particle.remove();

    }, 10000);

}

setInterval(
    createParticle,
    700
);


/* =========================
CURSOR GLOW
========================= */

const glowCursor =
document.createElement("div");

glowCursor.classList.add(
    "cursor-glow"
);

document.body.appendChild(
    glowCursor
);

document.addEventListener(
    "mousemove",
    (e) => {

        glowCursor.style.left =
        e.clientX + "px";

        glowCursor.style.top =
        e.clientY + "px";

    }
);


/* =========================
BUTTON RIPPLE EFFECT
========================= */

const allButtons =
document.querySelectorAll(
".hero-btn, .map-btn, .rsvp-form button"
);

allButtons.forEach((btn) => {

    btn.addEventListener(
        "click",
        function (e) {

            const ripple =
            document.createElement("span");

            ripple.classList.add(
                "ripple"
            );

            this.appendChild(
                ripple
            );

            const x =
            e.clientX -
            this.getBoundingClientRect().left;

            const y =
            e.clientY -
            this.getBoundingClientRect().top;

            ripple.style.left =
            x + "px";

            ripple.style.top =
            y + "px";

            setTimeout(() => {

                ripple.remove();

            }, 700);

        }
    );

});

/* =========================
NAVBAR BACKGROUND ON SCROLL
========================= */

const navbar =
document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.style.background =
            "rgba(17,28,19,.55)";

            navbar.style.backdropFilter =
            "blur(18px)";

        } else {

            navbar.style.background =
            "rgba(255,255,255,.12)";

        }

    });

}


/* =========================
TYPEWRITER EFFECT
========================= */

const inviteText =
document.querySelector(".invite-text");

if (inviteText) {

    const originalText =
    inviteText.textContent;

    inviteText.textContent = "";

    let i = 0;

    function typingEffect() {

        if (i < originalText.length) {

            inviteText.textContent +=
            originalText.charAt(i);

            i++;

            setTimeout(
                typingEffect,
                120
            );

        }

    }

    typingEffect();

}


/* =========================
MOON FLOAT EFFECT
========================= */

const moon =
document.querySelector(".moon");

if (moon) {

    window.addEventListener(
        "mousemove",
        (e) => {

            const x =
            e.clientX / 50;

            const y =
            e.clientY / 50;

            moon.style.transform =
            `translate(${x}px, ${y}px)`;

        }
    );

}



/* =========================
CARD HOVER GLOW
========================= */

const cards =
document.querySelectorAll(".glass-card");

cards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.boxShadow =
            `
            0 15px 50px
            rgba(31,61,43,.18)
            `;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.boxShadow =
            `
            0 10px 40px
            rgba(0,0,0,.08)
            `;

        }
    );

});

/* =========================
MOBILE MENU TOGGLE
========================= */

const menuToggle =
document.querySelector(".menu-toggle");

const navMenu =
document.querySelector(".navbar ul");

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "active"
            );

            if (
                navMenu.classList.contains(
                    "active"
                )
            ) {

                menuToggle.innerHTML = "✕";

            } else {

                menuToggle.innerHTML = "☰";

            }

        }
    );

}


/* =========================
ACTIVE NAV LINK
========================= */

const sections =
document.querySelectorAll(
    "section, div[id]"
);

const navLinks =
document.querySelectorAll(
    ".navbar ul li a"
);

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(
            (section) => {

                const sectionTop =
                section.offsetTop;

                if (
                    window.pageYOffset >=
                    sectionTop - 200
                ) {

                    current =
                    section.getAttribute(
                        "id"
                    );

                }

            }
        );

        navLinks.forEach(
            (link) => {

                link.classList.remove(
                    "active-nav"
                );

                if (
                    current &&
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active-nav"
                    );

                }

            }
        );

    }
);


/* =========================
SCROLL PROGRESS BAR
========================= */

const progress =
document.createElement("div");

progress.classList.add(
    "scroll-progress"
);

document.body.appendChild(
    progress
);

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
        document.documentElement
        .scrollTop;

        const scrollHeight =
        document.documentElement
        .scrollHeight -
        document.documentElement
        .clientHeight;

        const scrolled =
        (
            scrollTop /
            scrollHeight
        ) * 100;

        progress.style.width =
        scrolled + "%";

    }
);



/* =========================
QURAN VERSE SLIDER
========================= */

const verses = document.querySelectorAll(".verse");
const dots = document.querySelectorAll(".dot");

let verseIndex = 0;

function showVerse(index){

    verses.forEach((verse)=>{
        verse.classList.remove("active-verse");
    });

    dots.forEach((dot)=>{
        dot.classList.remove("active-dot");
    });

    verses[index].classList.add("active-verse");
    dots[index].classList.add("active-dot");

}


/* dots click */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        verseIndex=index;

        showVerse(verseIndex);

    });

});


/* arrow buttons */

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        verseIndex++;

        if(verseIndex >= verses.length){
            verseIndex = 0;
        }

        showVerse(verseIndex);

    });

}

if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        verseIndex--;

        if(verseIndex < 0){
            verseIndex = verses.length - 1;
        }

        showVerse(verseIndex);

    });

}





window.addEventListener("load", () => {

    const stamp = document.querySelector(".stamp");

    if (!stamp) return;

    stamp.classList.add("stamp-hit");

});




/* =========================
STAMP ANIMATION
========================= */



window.addEventListener("load", () => {

    const stamp = document.querySelector(".stamp");
    const splash = document.querySelector(".ink-splash");
    const sound = document.getElementById("stampSound");

    setTimeout(() => {

        stamp.classList.add("stamp-hit");

        document.body.classList.add("screen-shake");

        splash.classList.add("splash-show");

        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }

        setTimeout(() => {
            document.body.classList.remove("screen-shake");
        }, 350);

    }, 800);

});























