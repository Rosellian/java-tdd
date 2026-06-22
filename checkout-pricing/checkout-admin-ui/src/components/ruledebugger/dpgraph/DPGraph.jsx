import {useTraceSync} from "../../TraceSyncProvider";
import {DPDetails} from "./dpdetails/DPDetails";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {addGlobalIndex, groupBySku, renderEmptyState} from "./dpFuncs";
import {SkuNodes} from "./SkuNodes";
import {DPDetailsV2} from "./v2/DPDetailsV2";

export function DPGraph({ dp }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const { selectedStep } = useTraceSync();

    if (!dp) {
        return renderEmptyState(isDark);
    }

    const indexedDP = addGlobalIndex(dp);
    const grouped = groupBySku(indexedDP);

    return (
        <div style={{
            ...styles.dpWrapper,
            ...(isDark ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <h3 style={{
                ...styles.dpHeader,
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}>
                DP Graph
            </h3>

            <div style={styles.scrollSection}>
                {Object.entries(grouped).map(([sku, nodes]) =>
                    <SkuNodes key={sku} sku={sku} nodes={nodes} />
                )}
            </div>

            {selectedStep !== null && (
                <>
                    <DPDetails node={dp[selectedStep]} index={selectedStep} />

                    <DPDetailsV2 node={dp[selectedStep]} index={selectedStep} />
                </>
            )}
        </div>
    )
}

const styles = {
    dpWrapper: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.25s ease, color 0.25s ease"
    },
    wrapperLight: {
        background: "#f5f5f5",
        color: "#000"
    },
    dpHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    headerDark: {
        color: "#fff"
    },
    headerLight: {
        color: "#3A1F6B"
    },
    scrollSection: {
        width: "100%",
        minWidth: 250,
        maxHeight: 300,
        overflowY: "auto",
        paddingRight: 6,
        marginBottom: 15
    }
}