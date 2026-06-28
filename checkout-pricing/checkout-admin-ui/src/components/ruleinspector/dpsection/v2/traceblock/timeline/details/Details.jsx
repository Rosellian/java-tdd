import {Options} from "./Options";
import {CollapsibleBlock} from "../CollapsibleBlock";
import {Rules} from "../../rules/Rules";
import {Chosen} from "./Chosen";
import {Detail} from "./Detail";
import {Price} from "../Price";

export function Details({node, debuggerNode, remaining, beforePrice }) {
    const rules = node.rules ?? [];

    return (
        <CollapsibleBlock title="Details">
            <div style={styles.details}>
                <Rules rules={rules} />

                <Detail label="Remaining" value={remaining} />

                <Detail label="Before" value={beforePrice} />

                <Price label="After" node={node} beforePrice={beforePrice} />

                <Chosen debuggerNode={debuggerNode} />

                <Options options={debuggerNode.options} />
            </div>
        </CollapsibleBlock>
    )
}

const styles = {
    details: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 6
    }
}