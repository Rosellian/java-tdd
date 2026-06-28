import {highlightExplanationLine} from "../../../../../../functions/dp/highlighting/highlighting";

export function Path({ dp }) {
    return (
        <div style={styles.path}>
            {dp.winningPath.map((line, i) => (
                <div key={i}>
                    {highlightExplanationLine(line)}

                    {i < dp.winningPath.length - 1 ? " +" : ""}
                </div>
            ))}
        </div>
    )
}

const styles = {
    path: {
        fontSize: "0.9rem",
        fontWeight: 600
    }
}