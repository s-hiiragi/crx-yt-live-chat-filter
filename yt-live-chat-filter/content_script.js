console.log(location.href);

const spamWordPatterns = [
    /^[\w ]+$/,
];

function isSpamMessage(text) {
    // 禁止ワードパターンが含まれている
    return spamWordPatterns.some(pattern => {
        if (pattern instanceof RegExp) {
            return pattern.test(text);
        } else {
            return text.includes(pattern);
        }
    });
}

const commentItems = document.querySelector('yt-live-chat-item-list-renderer #items');

const commentObserver = new MutationObserver(records => {
    //console.log(records);

    records.forEach(record => {
        Array.from(record.addedNodes).forEach(message => {
            if (message.tagName.toLowerCase() !== 'yt-live-chat-text-message-renderer') {
                return;
            }

            const text = message.querySelector('#message').textContent.trim();
            //console.log(text);
            if (isSpamMessage(text)) {
                message.style.display = 'none';
                console.log(`hide message "${text}"`);
            }
        });
    });
});

commentObserver.observe(commentItems, {
    childList: true
});
