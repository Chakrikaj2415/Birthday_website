
/* =====================================
   1. BIRTHDAY DATE
===================================== */

// Change this date to test your website.
// November = 10 in JavaScript.
const birthday = new Date(2026, 10, 16, 0, 0, 0);


/* =====================================
   2. PAGE NAVIGATION
===================================== */

const pages = [
    "countdownPage",
    "birthdayPage",
    "menuPage",
    "letterPage",
    "cakePage"
];

function showPage(pageId) {
    pages.forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================
   3. COUNTDOWN
===================================== */

let birthdayUnlocked = false;
let countdownInterval;

function updateCountdown() {
    const now = new Date();
    const difference = birthday - now;

    if (difference <= 0) {
        if (!birthdayUnlocked) {
            birthdayUnlocked = true;
            showPage("birthdayPage");
        }

        clearInterval(countdownInterval);
        return;
    }

    document.getElementById("days").textContent =
        Math.floor(difference / 86400000);

    document.getElementById("hours").textContent =
        Math.floor((difference / 3600000) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((difference / 60000) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((difference / 1000) % 60);
}

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);


/* =====================================
   4. OPEN SURPRISE
===================================== */

document.getElementById("openButton").addEventListener("click", () => {
    showPage("menuPage");
});


/* =====================================
   5. SURPRISE CARDS
===================================== */

document.getElementById("letterButton").addEventListener("click", () => {
    showPage("letterPage");
});

document.getElementById("cakeButton").addEventListener("click", () => {
    showPage("cakePage");
});


/* =====================================
   6. BACK BUTTONS
===================================== */

document.querySelectorAll(".backButton").forEach(button => {
    button.addEventListener("click", () => {
        showPage("menuPage");
    });
});


/* =====================================
   7. CREATE 17 CANDLES
===================================== */

const candlesContainer = document.getElementById("candles");

for (let i = 0; i < 17; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";

    const flame = document.createElement("div");
    flame.className = "flame";

    candle.appendChild(flame);
    candlesContainer.appendChild(candle);
}


/* =====================================
   8. BLOW OUT CANDLES
===================================== */

const blowButton = document.getElementById("blowButton");
const resetButton = document.getElementById("resetButton");

blowButton.addEventListener("click", () => {
    document.querySelectorAll(".flame").forEach(flame => {
        flame.classList.add("off");
    });

    document.getElementById("cakeMessage").textContent =
        "You made a wish! ♡";

    document.getElementById("celebration").classList.remove("hidden");

    blowButton.disabled = true;

    createConfetti();
});


/* =====================================
   9. RESET CAKE
===================================== */

resetButton.addEventListener("click", () => {
    document.querySelectorAll(".flame").forEach(flame => {
        flame.classList.remove("off");
    });

    document.getElementById("cakeMessage").textContent =
        "17 little candles, one big wish.";

    document.getElementById("celebration").classList.add("hidden");

    blowButton.disabled = false;
});


/* =====================================
   10. CONFETTI
===================================== */

function createConfetti() {
    const decorations = ["🎉", "✨", "💗", "🎊", "♡"];

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement("span");

        confetti.textContent =
            decorations[Math.floor(Math.random() * decorations.length)];

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";
        confetti.style.fontSize = (16 + Math.random() * 15) + "px";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";

        confetti.style.animation =
            `fall ${2 + Math.random() * 3}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}


/* =====================================
   11. ANIMATED LETTER ENVELOPE
===================================== */

const envelope = document.getElementById("envelope");
const envelopeButton = document.getElementById("envelopeButton");
const closeLetterButton = document.getElementById("closeLetterButton");

envelopeButton.addEventListener("click", () => {
    envelope.classList.add("open");

    envelopeButton.classList.add("hidden");

    setTimeout(() => {
        closeLetterButton.classList.remove("hidden");
    }, 1000);
});

closeLetterButton.addEventListener("click", () => {
    envelope.classList.remove("open");

    closeLetterButton.classList.add("hidden");

    envelopeButton.classList.remove("hidden");
});
