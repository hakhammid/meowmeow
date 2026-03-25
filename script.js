(function() {
    // DOM elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationDiv = document.getElementById('celebrationArea');
    const loveCard = document.getElementById('loveCard');
    const catGif = document.getElementById('catGif');

    // Array of cat GIFs to cycle through on each "No" click
    const catGifs = [
        "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",   // original cute cat
        "https://media.giphy.com/media/5i7W2I8PZ4I4Y/giphy.gif",   // confused cat
        "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif", // shy cat
        "https://media.giphy.com/media/LR7G8lYbYzvJ2/giphy.gif",    // surprised cat
        "https://media.giphy.com/media/11s7Ke7jcNxCHS/giphy.gif",   // curious cat
        "https://media.giphy.com/media/3o6Zt6ML6Bklcaj9ja/giphy.gif", // grumpy cat
        "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",    // pleading cat
        "https://media.giphy.com/media/3o6gbbrvEOqxQdHQQM/giphy.gif"  // excited cat
    ];
    let gifIndex = 0;

    // Prank core: YES button grows on each "No" click
    const BASE_FONT_SIZE = 18;      // px (original font size for YES)
    const BASE_PAD_V = 8;           // px
    const BASE_PAD_H = 20;          // px
    
    let currentScale = 1.0;         // growth multiplier for YES button
    const MAX_SCALE = 8.5;          // maximum enlargement
    const GROWTH_FACTOR = 1.28;      // each "NO" click multiplies scale by 1.28
    
    let isAccepted = false;          // if YES clicked, disable all prank & buttons
    
    // Cycle of teasing messages for the NO button (text changes, size stays the same)
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
    
    // Function to apply YES button size based on currentScale
    function updateYesButtonSize() {
        if (isAccepted) return;
        const newFontSize = BASE_FONT_SIZE * currentScale;
        const newPadV = BASE_PAD_V * currentScale;
        const newPadH = BASE_PAD_H * currentScale;
        
        yesBtn.style.fontSize = `${newFontSize}px`;
        yesBtn.style.padding = `${newPadV}px ${newPadH}px`;
        yesBtn.style.borderRadius = `${Math.min(60, 24 + currentScale * 3)}px`;
        
        // glowing effect when very large
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
    
    // enlarge YES button (called on NO click)
    function enlargeYesButton() {
        if (isAccepted) return;
        let newScale = currentScale * GROWTH_FACTOR;
        if (newScale > MAX_SCALE) {
            newScale = MAX_SCALE;
        }
        if (newScale !== currentScale) {
            currentScale = newScale;
            updateYesButtonSize();
        }
    }
    
    // update NO button text (cycle messages)
    function updateNoButtonText() {
        if (isAccepted) return;
        noMsgIndex = (noMsgIndex + 1) % noMessages.length;
        noBtn.innerHTML = noMessages[noMsgIndex];
    }
    
    // change cat GIF to next in list
    function changeCatGif() {
        if (isAccepted) return;
        gifIndex = (gifIndex + 1) % catGifs.length;
        catGif.src = catGifs[gifIndex];
        // optional: add a tiny bounce effect
        catGif.style.transform = "scale(0.98)";
        setTimeout(() => {
            catGif.style.transform = "";
        }, 150);
    }
    
    // when "NO" is clicked: enlarge YES button, change NO text, change cat GIF
    function onNoClick(e) {
        e.stopPropagation();
        if (isAccepted) return;
        
        enlargeYesButton();
        updateNoButtonText();
        changeCatGif();
        
        // tiny pop effect on love-card border
        loveCard.style.transform = "scale(1.01)";
        setTimeout(() => {
            loveCard.style.transform = "";
        }, 100);
    }
    
    // ----- YES BUTTON acceptance: Celebration & end prank -----
    function onYesClick(e) {
        e.stopPropagation();
        if (isAccepted) return;
        
        isAccepted = true;
        
        // Disable buttons
        yesBtn.disabled = true;
        noBtn.disabled = true;
        yesBtn.style.opacity = "0.7";
        noBtn.style.opacity = "0.6";
        yesBtn.style.cursor = "default";
        noBtn.style.cursor = "default";
        
        // Show celebration area
        celebrationDiv.classList.remove('hidden');
        
        // Soften card background
        loveCard.style.background = "rgba(255, 245, 240, 0.98)";
        
        // Change the question text
        const questionDiv = document.querySelector('.question');
        if (questionDiv) {
            questionDiv.style.background = "#ffe2ec";
            questionDiv.innerHTML = "💖 ACCEPTED WITH LOVE 💖";
        }
        
        // Create floating hearts effect
        createFloatingHearts();
    }
    
    // Romantic floating hearts after YES
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
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
        // Add keyframe if not present
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
    
    // Initialize YES button style (base)
    function initializeYesButton() {
        currentScale = 1.0;
        yesBtn.style.fontSize = `${BASE_FONT_SIZE}px`;
        yesBtn.style.padding = `${BASE_PAD_V}px ${BASE_PAD_H}px`;
        yesBtn.style.borderRadius = "60px";
        yesBtn.style.fontWeight = "bold";
        yesBtn.style.boxShadow = "0 12px 18px -8px #f43b6e80";
    }
    
    // Attach event listeners
    initializeYesButton();
    noBtn.addEventListener('click', onNoClick);
    yesBtn.addEventListener('click', onYesClick);
})();
