import {useTheme} from "../../../ui/theme/ThemeProvider";
import {RulesetDropdown} from "./RulesetDropdown";

export function RulesetSelector({ value, onChange, names }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.box,
            ...(isDark ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(isDark ? styles.titleDark : styles.titleLight)
            }}>
                Ruleset
            </h3>

            <RulesetDropdown value={value} onChange={onChange} names={names} />
        </div>
    )
}

const styles = {
    box: {
        width: "fit-content",
        padding: 15,
        borderRadius: 4,
        transition: "background 0.3s ease, color 0.3s ease"
    },
    boxDark: {
        background: "#1E1E1E"
    },
    boxLight: {
        background: "#f2f2f2"
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease"
    },
    titleDark: {
        color: "#82B1FF"
    },
    titleLight: {
        color: "#5A2DA8"
    }
}