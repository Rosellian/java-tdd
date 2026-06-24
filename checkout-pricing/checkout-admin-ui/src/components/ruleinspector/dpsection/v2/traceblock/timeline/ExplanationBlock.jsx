import {highlightExplanationLine} from "../../../../../../functions/dp/highlighting/highlighting";
import {CollapsibleBlock} from "./CollapsibleBlock";

export function ExplanationBlock({ node }) {
    const itemCount = node.explanation.length;

    return (
        <CollapsibleBlock title="Explanation" itemCount={itemCount}>
            <div style={styles.body}>

                {node.explanation.map((line, i) => (
                    <div key={i} style={styles.line}>
                        {highlightExplanationLine(line)}
                    </div>
                ))}
            </div>
        </CollapsibleBlock>
    )
}

const styles = {
    body: {
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2
    },
    line: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        whiteSpace: "pre-wrap"
    }
}