import {useState} from 'react'
import {RecentCartRow} from "./RecentCartRow";

export function RecentCartsDropdown({recent, onSelect}) {
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.dropdownWrapper}>
            <div style={styles.dropdownHeader}
            onClick={() => setOpen(!open)}>
                Recent carts...
            </div>

            { open && <RecentCartList recent={recent} onSelect={onSelect} setOpen={setOpen}/>}
        </div>
    );
}

function RecentCartList({recent, onSelect, setOpen}) {
    return (
        <div style={styles.dropdownList}>
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
        background: "#2A2A2A",
        border: "1px solid #444",
        borderRadius: 4,
        cursor: "pointer",
        color: "#E0E0E0",
    },
    dropdownList: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "#1E1E1E",
        border: "1px solid #444",
        borderRadius: 4,
        marginTop: 4,
        zIndex: 10,
    }
}