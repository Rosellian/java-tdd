import {useTheme} from "../../../ui/ThemeProvider";
import {PriceListDropdown} from "./PriceListDropdown";

export function PriceListSelector({ value, onChange, names }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.box,
            ...(theme === "dark" ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(theme === "dark" ? styles.titleDark : styles.titleLight)
            }}>Price List</h3>

            <PriceListDropdown value={value} onChange={onChange} names={names} />
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
    }
}