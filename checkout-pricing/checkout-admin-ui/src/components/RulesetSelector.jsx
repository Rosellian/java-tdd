import {useTheme} from "../ui/ThemeProvider";

export function RulesetSelector({ value, onChange }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.box,
            ...(theme === "dark" ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(theme === "dark" ? styles.titleDark : styles.titleLight)
            }}>Ruleset</h3>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    ...styles.select,
                    ...(theme === "dark" ? styles.selectDark : styles.selectLight)
                }}
            >
                <option value="default">Default</option>
                <option value="campaignA">Campaign A</option>
                <option value="campaignB">Campaign B</option>
                <option value="NoCrossNoSkuDiscount">No-Cross No-Sku-Discount</option>
            </select>
        </div>
    );
}

const styles = {
    box: {
        padding: 15,
        borderRadius: 4,
        transition: "background 0.3s ease, color 0.3s ease",
    },
    boxDark: {
        background: "#1E1E1E",
    },
    boxLight: {
        background: "#f2f2f2",
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease",
    },
    titleDark: {
        color: "#82B1FF",
    },
    titleLight: {
        color: "#5A2DA8",
    },
    select: {
        border: "1px solid",
        padding: 5,
        width: "100%",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    selectDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0",
    },
    selectLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000",
    }
}