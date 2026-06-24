import {Options} from "./Options";
import {CollapsibleBlock} from "../CollapsibleBlock";
import {useTheme} from "../../../../../../../ui/theme/ThemeProvider";
import {Rules} from "../../rules/Rules";
import {Chosen} from "./Chosen";
import {Detail} from "./Detail";

export function Details({node, debuggerNode, remaining, beforePrice }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const rules = node.rules ?? [];

    return (
        <CollapsibleBlock title="Details">
            <div style={styles.details}>
                <Rules rules={rules} />

                <Detail label="Remaining" value={remaining} />
                <Detail label="Before" value={beforePrice} />

                <div>
                    <span>After: </span>

                    <span style={{
                        ...styles.afterPrice,
                        ...(isDark ? styles.afterPriceDark : styles.afterPriceLight)
                    }}>
                        {debuggerNode.price}
                    </span>
                </div>

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
    },
    afterPrice: {
        fontWeight: 600
    },
    afterPriceDark: {
        color: "#4caf50"
    },
    afterPriceLight: {
        color: "#2e7d32"
    }
}