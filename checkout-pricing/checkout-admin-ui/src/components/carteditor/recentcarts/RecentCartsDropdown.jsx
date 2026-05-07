import {useState} from 'react'
import {RecentCartRow} from "./RecentCartRow";
import {useTheme} from "../../../ui/ThemeProvider";

export function RecentCartsDropdown({recent, onSelect}) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.dropdownWrapper}>
            <div style={{
                ...styles.dropdownHeader,
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}
            onClick={() => setOpen(!open)}>
                Recent carts...
            </div>

            { open && <RecentCartList recent={recent} onSelect={onSelect} setOpen={setOpen}/>}
        </div>
    );
}

function RecentCartList({recent, onSelect, setOpen}) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.dropdownList,
            ...(theme === "dark" ? styles.listDark : styles.listLight)
        }}>
            {recent.map((cart, i) => (
                <RecentCartRow
                    key={i}
                    index={i}
                    cart={cart}
                    onSelect={() => {
                        onSelect(cart);
                        setOpen(false);
                    }}
                />
            ))}
        </div>
    )
}

const styles = {
    dropdownWrapper: {
        position: "relative",
        width: "100%",
    },
    dropdownHeader: {
        padding: "6px 10px",
        border: "1px solid",
        borderRadius: 4,
        cursor: "pointer",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    headerDark: {
        background: "#2A2A2A",
        borderColor: "#444",
        color: "#E0E0E0",
    },
    headerLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000",
    },
    dropdownList: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        marginTop: 4,
        borderRadius: 4,
        border: "1px solid",
        zIndex: 10,
        overflow: "visible",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    listDark: {
        background: "#1E1E1E",
        borderColor: "#444",
        color: "#E0E0E0",
    },
    listLight: {
        background: "#f5f5f5",
        borderColor: "#ccc",
        color: "#000000",
    }
}