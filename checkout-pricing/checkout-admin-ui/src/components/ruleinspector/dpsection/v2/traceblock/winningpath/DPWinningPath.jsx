import {useTheme} from "../../../../../../ui/theme/ThemeProvider";
import {Reason} from "./Reason";
import {Path} from "./Path";

export function DPWinningPath({ dp }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <h4 style={{
                ...styles.title,
                ...(isDark ? styles.titleDark : styles.titleLight)
            }}>
                Winning Path
            </h4>

            <Path dp={dp} />

            <Reason dp={dp}/>
        </div>
    )
}

const styles = {
    container: {
        padding: 12,
        borderRadius: 6,
        border: "1px solid"
    },
    containerDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee"
    },
    containerLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    title: {
        marginTop: 0
    },
    titleDark: {
        color: "#BB86FC"
    },
    titleLight: {
        color: "#5A2DA8"
    }
}