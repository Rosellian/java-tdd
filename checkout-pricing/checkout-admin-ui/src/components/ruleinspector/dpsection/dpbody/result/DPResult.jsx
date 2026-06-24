import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {WinningPath} from "./WinningPath";

export function DPResult({ dp }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    let headerStyle = isDark ? styles.h4Dark : styles.h4Light;

    return (
        <div style={{marginTop: 10}}>
            <h4 style={headerStyle}>Winning Path</h4>
            <WinningPath dp={dp} />

            <h4 style={headerStyle}>Total</h4>
            <div>{dp.finalPrice} kr</div>
        </div>
    )
}

const styles = {
    h4Dark: {
        color: "#BB86FC",
        marginTop: 10
    },
    h4Light: {
        color: "#5A2DA8",
        marginTop: 10
    }
}