document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    
    // Add input event listener to update previews as user types
    textInput.addEventListener('input', updatePreviews);
    
    // Initial update
    updatePreviews();
});

function updatePreviews() {
    const text = document.getElementById('text-input').value;
    
    // Update all preview boxes
    document.getElementById('text-preview').textContent = text;
    document.getElementById('text-preview-slight').textContent = slurText(text, 0.2);
    document.getElementById('text-preview-moderate').textContent = slurText(text, 0.5);
    document.getElementById('text-preview-very').textContent = slurText(text, 0.8);
}

function slurText(text, scale) {
    if (!text) return '';
    
    let result = '';
    const confusedText = '...huuuhhh...';
    const burpText = '*BURP*';
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Character substitutions (scale/3 probability)
        if (Math.random() < scale / 3) {
            switch(char.toLowerCase()) {
                case 'o': result += 'u'; continue;
                case 's': result += 'ch'; continue;
                case 'a': result += 'ah'; continue;
                case 'u': result += 'oo'; continue;
                case 'c': result += 'k'; continue;
            }
        }
        
        // Add confused or burp text (scale/20 probability)
        if (Math.random() < scale / 20) {
            if (char === ' ') {
                result += confusedText;
                continue;
            } else if (char === '.') {
                result += burpText;
                continue;
            }
        }
        
        // Character repetition (scale * 3/20 probability)
        if (Math.random() < scale * 3/20) {
            const repeatCount = Math.floor(Math.random() * 2) + 2; // 2-3 repetitions
            result += char.repeat(repeatCount);
            continue;
        }
        
        result += char;
    }
    
    // Clean up the result
    return cleanupText(result);
}

function cleanupText(text) {
    return text
        // Replace multiple spaces with a single space
        .replace(/\s+/g, ' ')
        // Remove spaces before periods
        .replace(/\s+\./g, '.')
        // Remove spaces before burps
        .replace(/\s+\*BURP\*/g, '*BURP*')
        // Remove spaces at the start and end
        .trim();
}

function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const previewBox = document.getElementById(elementId).closest('.preview-box');
        const icon = previewBox.querySelector('.copy-button i');
        const originalClass = icon.className;
        icon.className = 'fa-solid fa-check';
        setTimeout(() => {
            icon.className = originalClass;
        }, 1000);
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}