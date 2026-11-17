
// PAGE NAVIGATION

const pages = [
    "countdownPage",
    "birthdayPage",
    "menuPage",
    "scrapbookPage",
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

// COUNTDOWN

const birthday = new Date(2026, 10, 18, 13, 0, 0);

function updateCountdown() {
    const now = new Date();
    const difference = birthday - now;

    if (difference <= 0) {
        showPage("birthdayPage");
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// STARTING PAGE

if (new Date() >= birthday) {
    showPage("birthdayPage");
} else {
    showPage("countdownPage");
}

// HOMEPAGE AND MENU BUTTONS

document.getElementById("openButton").addEventListener("click", () => {
    showPage("menuPage");
});

document.getElementById("homeButton").addEventListener("click", () => {
    showPage("birthdayPage");
});

document.getElementById("scrapbookButton").addEventListener("click", () => {
    showPage("scrapbookPage");
});

document.getElementById("letterButton").addEventListener("click", () => {
    showPage("letterPage");
});

document.getElementById("cakeButton").addEventListener("click", () => {
    showPage("cakePage");
});

// BACK BUTTONS

document.querySelectorAll(".backButton").forEach(button => {
    button.addEventListener("click", () => {
        showPage("menuPage");
    });
});

// SCRAPBOOK

const scrapbookGrid = document.getElementById("scrapbookGrid");

const scrapbookCaptions = [
    "the little moments ♡",
    "Inside out 😡😊😢😓🤢",
    "making memories at Prom ✧",
    "Sunrises and smiles",
    "Halloween w soulja boys",
    "First day of senior year",
    "Umi Shushi 🍣 w the fam",
    "First movie all together 🎬",
    "Senior sunrise 🌅",
    "just being you",
    "another day, another story",
    "one for the camera",
    "memories on repeat",
    "the good old days",
    "a little bit of everything",
    "the moments that matter",
    "sixteen was special",
    "and everything in between ♡"
];

for (let i = 1; i <= 9; i++) {
    const photoCard = document.createElement("div");
    photoCard.className = "scrapbook-photo";

    const imageArea = document.createElement("div");
    imageArea.className = "scrapbook-image";

    const image = document.createElement("img");
    image.src = `images/photo${i}.jpeg`;
    image.alt = `Scrapbook memory ${i}`;

    const placeholder = document.createElement("div");
    placeholder.className = "scrapbook-placeholder";
    placeholder.innerHTML = `♡<small>PHOTO ${i}</small>`;

    image.onload = () => {
        image.style.display = "block";
        placeholder.style.display = "none";
    };

    image.onerror = () => {
        image.style.display = "none";
        placeholder.style.display = "flex";
    };

    imageArea.appendChild(image);
    imageArea.appendChild(placeholder);

    const caption = document.createElement("p");
    caption.className = "scrapbook-caption";
    caption.textContent = scrapbookCaptions[i - 1];

    photoCard.appendChild(imageArea);
    photoCard.appendChild(caption);

    scrapbookGrid.appendChild(photoCard);
}

// LETTER ENVELOPE

const envelope = document.getElementById("envelope");
const letterMessage = document.getElementById("letterMessage");
const envelopeHint = document.getElementById("envelopeHint");

envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {
        envelopeHint.textContent = "Your little letter ♡";
        letterMessage.classList.remove("hidden");
    } else {
        envelopeHint.textContent = "Tap to open ♡";
        letterMessage.classList.add("hidden");
    }
});

// CAKE CANDLES

const candlesContainer = document.getElementById("candles");
const cakeMessage = document.getElementById("cakeMessage");

function createCandles() {
    candlesContainer.innerHTML = "";

    for (let i = 0; i < 17; i++) {
        const candle = document.createElement("div");
        candle.className = "candle";

        const flame = document.createElement("div");
        flame.className = "flame";

        candle.appendChild(flame);
        candlesContainer.appendChild(candle);
    }

    cakeMessage.textContent = "Take a breath and make a wish! ♡";
}

createCandles();

// BLOW OUT CANDLES

document.getElementById("blowButton").addEventListener("click", () => {
    const flames = document.querySelectorAll(".flame");

    flames.forEach(flame => {
        flame.style.display = "none";
    });

    cakeMessage.textContent = "Your wish is on its way! Happy 17th! ♡";

    createConfetti();
});

// RESET CANDLES

document.getElementById("resetButton").addEventListener("click", () => {
    createCandles();
});

// CONFETTI

function createConfetti() {
    const colors = [
        "#d99eae",
        "#713d50",
        "#f2d4d9",
        "#b77c91",
        "#f5c7a9",
        "#ffffff"
    ];

    for (let i = 0; i < 90; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDelay = Math.random() * 1.5 + "s";
        piece.style.animationDuration = (2 + Math.random() * 2) + "s";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4500);
    }
}
