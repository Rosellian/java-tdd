import {useState} from 'react'
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {RecentCartList} from "./RecentCartList";

export function RecentCartsDropdown({recent, onSelect}) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [open, setOpen] = useState(false);

    return (
        <div style={styles.dropdownWrapper}>
            <div style={{
                ...styles.dropdownHeader,
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}
            onClick={() => setOpen(!open)}>
                Recent carts...
            </div>

            { open && (
                <RecentCartList recent={recent} onSelect={onSelect} setOpen={setOpen}/>
            )}
        </div>
    )
}

const styles = {
    dropdownWrapper: {
        position: "relative",
        width: "100%"
    },
    dropdownHeader: {
        padding: "6px 10px",
        border: "1px solid",
        borderRadius: 4,
        cursor: "pointer",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    headerDark: {
        background: "#2A2A2A",
        borderColor: "#444",
        color: "#E0E0E0"
    },
    headerLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000"
    }
}