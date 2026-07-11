import {useState} from "react";
import {useTraceSync} from "../../../TraceSyncProvider";
import {DPNode} from "./DPNode";

export function DPNodes({ nodes }) {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { selectedStep, setSelectedStep } = useTraceSync();

    return (
        <div style={styles.dpNodes}>
            {nodes.map((node) =>
                <DPNode key={node.globalIndex} node={node} hoverIndex={hoverIndex} setHoverIndex={setHoverIndex}
                        selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
            )}
        </div>
    )
}

const styles = {
    dpNodes: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 5
    }
}