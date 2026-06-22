export function highlightExplanationLine(line) {
    const specialPriceRuleRe = /(\d+)-for-(\d+(\.\d+)?)/;
    const numberRe = /(\d+(\.\d+)?)/;
    const opRe = /(->|=>|→|x|=|\+|\*|-)/;
    const keywordRe = new RegExp(
        [
            "non-stackable",
            "\\bunitPrice\\b",
            "\\bState\\b",
            "\\bPrice\\b",
            "\\bOption\\b",
            "\\bChosen\\b",
            "\\bTotal\\b",
            "\\bRemaining\\b",
            "\\bitems\\b",
            "\\bkr\\b"
        ].join("|")
    );

    const tokens = [];
    let i = 0;

    while (i < line.length) {
        const rest = line.slice(i);

        const ruleMatch = rest.match(specialPriceRuleRe);
        const numberMatch = rest.match(numberRe);
        const opMatch = rest.match(opRe);
        const kwMatch = rest.match(keywordRe);

        const candidates = [];

        if (ruleMatch) {
            candidates.push({ type: "rule", match: ruleMatch, index: ruleMatch.index });
        }
        if (numberMatch) {
            candidates.push({ type: "number", match: numberMatch, index: numberMatch.index });
        }
        if (opMatch) {
            candidates.push({ type: "op", match: opMatch, index: opMatch.index });
        }
        if (kwMatch) {
            candidates.push({ type: "kw", match: kwMatch, index: kwMatch.index });
        }

        if (candidates.length === 0) {
            tokens.push(rest);
            break;
        }

        const next = candidates.sort((a, b) => a.index - b.index)[0];

        if (next.index > 0) {
            tokens.push(rest.slice(0, next.index));
        }

        const value = next.match[0];

        if (next.type === "rule") {
            tokens.push(<span className="text-rule">{value}</span>);
        } else if (next.type === "number") {
            tokens.push(<span className="text-number">{value}</span>);
        } else if (next.type === "op") {
            tokens.push(<span className="text-operator">{value}</span>);
        } else if (next.type === "kw") {
            tokens.push(<span className="text-keyword">{value}</span>);
        }

        i += next.index + value.length;
    }

    return tokens;
}