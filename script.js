(function() {
    // DOM elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationDiv = document.getElementById('celebrationArea');
    const loveCard = document.getElementById('loveCard');
    const catGif = document.getElementById('catGif');

    // ----- SINGLE RELIABLE CAT GIF -----
    const CAT_GIF_URL = "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"; // cute kitty

    // Set the GIF once on page load
    catGif.src = CAT_GIF_URL;
    catGif.onerror = function() {
        // Fallback in case the GIF fails (very unlikely)
        this.src = "https://media.giphy.com/media/3o6Zt6ML6Bklcaj9ja/giphy.gif";
    };

    // Prank core: YES button grows on each "No" click
    const BASE_FONT_SIZE = 18;
    const BASE_PAD_V = 8;
    const BASE_PAD_H = 20;
    
    let currentScale = 1.0;
    const MAX_SCALE = 8.5;
    const GROWTH_FACTOR = 1.28;
    
    let isAccepted = false;
    
    // Teasing messages for NO button
    const noMessages = [
        "😿 NO 😿", 
        "💔 No... wait?", 
        "🙈 Are you sure?", 
        "🤔 Think again!", 
        "💢 Last chance!", 
        "😭 Please don't!", 
        "❤️‍🩹 SAY YES", 
        "✨ Pressing me grows YES! ✨"
    ];
    let noMsgIndex = 0;
    
    // Update YES button size
    function updateYesButtonSize() {
        if (isAccepted) return;
        const newFontSize = BASE_FONT_SIZE * currentScale;
        const newPadV = BASE_PAD_V * currentScale;
        const newPadH = BASE_PAD_H * currentScale;
        
        yesBtn.style.fontSize = `${newFontSize}px`;
        yesBtn.style.padding = `${newPadV}px ${newPadH}px`;
        yesBtn.style.borderRadius = `${Math.min(60, 24 + currentScale * 3)}px`;
        
        if (currentScale >= 3.5) {
            yesBtn.style.boxShadow = `0 0 18px #ff80ab, 0 12px 28px rgba(244, 59, 110, 0.5)`;
        } else {
            yesBtn.style.boxShadow = `0 12px 18px -8px #f43b6e80`;
        }
        
        if (currentScale >= 5) {
            yesBtn.style.fontWeight = "900";
        } else {
            yesBtn.style.fontWeight = "bold";
        }
    }
    
    function enlargeYesButton() {
        if (isAccepted) return;
        let newScale = currentScale * GROWTH_FACTOR;
        if (newScale > MAX_SCALE) newScale = MAX_SCALE;
        if (newScale !== currentScale) {
            currentScale = newScale;
            updateYesButtonSize();
        }
    }
    
    function updateNoButtonText() {
        if (isAccepted) return;
        noMsgIndex = (noMsgIndex + 1) % noMessages.length;
        noBtn.innerHTML = noMessages[noMsgIndex];
    }
    
    // NO click handler (no GIF change now)
    function onNoClick(e) {
        e.stopPropagation();
        if (isAccepted) return;
        
        enlargeYesButton();
        updateNoButtonText();
        
        loveCard.style.transform = "scale(1.01)";
        setTimeout(() => {
            loveCard.style.transform = "";
        }, 100);
    }
    
    // YES click handler
    function onYesClick(e) {
        e.stopPropagation();
        if (isAccepted) return;
        
        isAccepted = true;
        
        yesBtn.disabled = true;
        noBtn.disabled = true;
        yesBtn.style.opacity = "0.7";
        noBtn.style.opacity = "0.6";
        yesBtn.style.cursor = "default";
        noBtn.style.cursor = "default";
        
        celebrationDiv.classList.remove('hidden');
        loveCard.style.background = "rgba(255, 245, 240, 0.98)";
        
        const questionDiv = document.querySelector('.question');
        if (questionDiv) {
            questionDiv.style.background = "#ffe2ec";
            questionDiv.innerHTML = "💖 ACCEPTED WITH LOVE 💖";
        }
        
        createFloatingHearts();
    }
    
    // Floating hearts animation
    function createFloatingHearts() {
        const container = document.body;
        for (let i = 0; i < 18; i++) {
            let heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '💘', '💝', '💗', '💓'][Math.floor(Math.random() * 6)];
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 28 + 16 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-20px';
            heart.style.opacity = '0.8';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            heart.style.animation = `floatUp ${Math.random() * 2 + 2}s linear forwards`;
            heart.style.filter = 'drop-shadow(0 0 4px #ff99bb)';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }
        if (!document.querySelector('#floatAnimStyle')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'floatAnimStyle';
            styleSheet.innerText = `
                @keyframes floatUp {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
                    100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    // Initialize YES button size
    function initializeYesButton() {
        currentScale = 1.0;
        yesBtn.style.fontSize = `${BASE_FONT_SIZE}px`;
        yesBtn.style.padding = `${BASE_PAD_V}px ${BASE_PAD_H}px`;
        yesBtn.style.borderRadius = "60px";
        yesBtn.style.fontWeight = "bold";
        yesBtn.style.boxShadow = "0 12px 18px -8px #f43b6e80";
    }
    
    initializeYesButton();
    noBtn.addEventListener('click', onNoClick);
    yesBtn.addEventListener('click', onYesClick);
})();
