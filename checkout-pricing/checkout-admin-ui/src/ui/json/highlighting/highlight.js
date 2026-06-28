export function highlightJsonSafe(obj) {
    const json = JSON.stringify(obj, null, 2);

    const tokens = [];
    const regex = /"([^"]+)"\s*:|"(.*?)"|(\d+(\.\d+)?)\b|(true|false|null)/g;

    let lastIndex = 0;
    let keyCounter = 0;
    let match;

    while ((match = regex.exec(json)) !== null) {
        if (match.index > lastIndex) {
            tokens.push(json.slice(lastIndex, match.index));
        }

        if (match[1]) {
            tokens.push(<span key={keyCounter++} className="json-key">"{match[1]}"</span>);
            tokens.push(":");
        } else if (match[2]) {
            tokens.push(<span key={keyCounter++} className="json-string">"{match[2]}"</span>);
        } else if (match[3]) {
            tokens.push(<span key={keyCounter++} className="json-number">{match[3]}</span>);
        } else if (match[5] === "true" || match[5] === "false") {
            tokens.push(<span key={keyCounter++} className="json-boolean">{match[5]}</span>);
        } else if (match[5] === "null") {
            tokens.push(<span key={keyCounter++} className="json-null">null</span>);
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < json.length) {
        tokens.push(json.slice(lastIndex));
    }

    return tokens;
}