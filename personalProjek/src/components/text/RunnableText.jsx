import React from 'react';

/**
 * Parses text in the format "Base|Reading" and renders it as a <ruby> element.
 * If no pipe is found, renders text as is.
 */
export const RunnableText = ({ text, className, style }) => {
    if (typeof text !== 'string') return <span className={className} style={style}>{text}</span>;

    if (text.includes('|')) {
        const parts = text.split(/([^\s|]+)\|([^\s|]+)/g).filter(Boolean);
        return (
            <span className={className} style={style}>
                {parts.map((part, i) => {
                    // Start checking if this part matches our split pattern implicitly or if it was a separator
                    // Actually, split with capture groups returns [pre, base, reading, post, base, reading...]
                    
                    // A simpler generic split might be safer to avoid complex regex logic on mixed strings
                    // Let's assume the Whole String is "Base|Reading" or mixed "Hello World 体験|たいけん"
                    
                    // Regex to find "Kanji|Reading" patterns
                    // Using a match all approach
                    
                    // Simple approach: split by space then check pipes? 
                    // No, spaces might separate words.
                    // Let's just assume the user will pipe individual words: "体験|たいけん"
                    
                    return text.split(/([\w\u0080-\uFFFF]+\|[\w\u0080-\uFFFF]+)/g).map((chunk, j) => {
                        if (chunk.includes('|')) {
                            const [base, reading] = chunk.split('|');
                            return (
                                <ruby key={j} style={{ 
                                    rubyPosition: 'over',
                                    rubyAlign: 'center',
                                    margin: '0 0.1em', // Small separation from surrounding text
                                    fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif', // Native JP fonts
                                }}>
                                    {base}
                                    <rt style={{ 
                                        fontSize: '0.55em', // Slightly smaller for standard look
                                        opacity: 0.9,
                                        fontFamily: 'inherit', // Match base font, not mono
                                        userSelect: 'none',
                                        color: '#ff0033', 
                                        fontWeight: 'bold',
                                        textShadow: 'none', // Remove shadow for cleaner text
                                        paddingBottom: '2px' // Visual lift
                                    }}>{reading}</rt>
                                </ruby>
                            );
                        }
                        return <span key={j}>{chunk}</span>;
                    });
                })[0]} 
            </span>
        );
    }

    return <span className={className} style={style}>{text}</span>;
};
