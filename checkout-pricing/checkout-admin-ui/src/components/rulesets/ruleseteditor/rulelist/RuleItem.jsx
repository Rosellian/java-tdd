import {useTheme} from "../../../../ui/theme/ThemeProvider";
import React from "react";

export const RuleItem = React.forwardRef(({ i, rule, isSelected, onSelect, onClone },
                                          ref) => {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div ref={ref} key={i} onClick={() => onSelect(i)} style={{
            ...styles.item,
            ...getSelectedItemStyle(i, isSelected, isDark)
        }}>
            {rule.name}

            <button
                style={styles.cloneButton}
                onClick={(e) => {
                    e.stopPropagation();
                    onClone(rule);
                }}
            >
                Clone
            </button>

        </div>
    )
})

function getSelectedItemStyle(i, isSelected, isDark) {
    let shouldApplySelectedStyle = i === isSelected;

    if (shouldApplySelectedStyle) {
        return isDark ? styles.itemSelectedDark : styles.itemSelectedLight;
    }

    return isDark ? styles.itemDark : styles.itemLight;
}

const styles = {
    item: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        padding: 5,
        borderRadius: 4,
        cursor: "pointer",
        transition: "background 0.2s ease, color 0.2s ease"
    },
    itemDark: {
        background: "#2A2A2A",
        color: "#E0E0E0"
    },
    itemLight: {
        background: "#F0F0F0",
        color: "#333"
    },
    itemSelectedDark: {
        background: "#BB86FC",
        color: "#fff"
    },
    itemSelectedLight: {
        background: "#D9C4FF",
        color: "#3A1F6B"
    },
    cloneButton: {
        borderRadius: 10,
        background: "var(--btn-secondary)",
        color: "var(--text-primary)",
        cursor: "pointer"
    }
}