import {Section} from "../../ui/Section";
import {useTheme} from "../../ui/ThemeProvider";
import {useState} from "react";
import {AnimatedBody} from "../../ui/AnimatedBody";
import {CollapsibleJsonItem} from "./CollapsibleJsonItem";

export function CustomerPanel({ customer }) {
    return (
        <Section title="Customer">
            <CustomerItem customer={customer} />
        </Section>
    )
}

function CustomerItem({ customer }) {
    const { theme } = useTheme();

    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                ...styles.container,
                ...(theme === "dark" ? styles.containerDark : styles.containerLight)
            }}
        >
            <CustomerHeader customer={customer} onClick={() => setOpen(!open)} />

            <div style={{
                    ...styles.scrollArea,
                    ...(theme === "dark" ? styles.scrollDark : styles.scrollLight)
            }}>
                <AnimatedBody open={open}>
                    <CustomerBody customer={customer} />
                </AnimatedBody>
            </div>
        </div>
    )
}

function CustomerHeader({ customer, onClick }) {
    const { theme } = useTheme();

    return (
        <div onClick={onClick}
             style={{
                 ...styles.header,
                 ...(theme === "dark" ? styles.headerDark : styles.headerLight)
             }}>
            <span>ID: {customer.id}</span>
        </div>
    )
}

// function CustomerBody({ customer }) {
//     const { theme } = useTheme();
//
//     return (
//         <div style={{
//             ...styles.body,
//             ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
//         }}>
//             <pre style={{
//                 ...styles.pre,
//                 ...(theme === "dark" ? styles.preDark : styles.preLight)
//             }}>{JSON.stringify(customer, null, 2)}</pre>
//         </div>
//     )
// }
function CustomerBody({ customer }) {
    const { theme } = useTheme();

    return (
        <div
            style={{
                ...styles.body,
                ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
            }}
        >
            {Object.entries(customer).map(([key, value]) => (
                <CollapsibleJsonItem key={key} label={key} value={value} />
            ))}
        </div>
    );
}


const styles = {
    container: {
        marginBottom: 10,
        borderRadius: 4,
        transition: "background 0.25s ease",
        borderTop: "1px solid",
        borderRight: "1px solid",
        borderBottom: "1px solid",
        borderLeft: "1px solid",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 4,
        paddingRight: 4,
    },
    containerDark: {
        background: "#1E1E1E",
        color: "#eee",
        borderColor: "#333",
    },
    containerLight: {
        background: "#fafafa",
        color: "#222",
        borderColor: "#ccc",
    },
    header: {
        minWidth: 290,
        boxSizing: "border-box",
        padding: "10px 10px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "1rem",
        fontWeight: 600,
        flexShrink: 0,
        transition: "background 0.25s ease, color 0.25s ease",
    },
    headerDark: {
        background: "#2A2A2A",
        color: "#BB86FC",
        borderBottom: "1px solid #333",
    },
    headerLight: {
        background: "#f0f0f0",
        color: "#5A2DA8",
        borderBottom: "1px solid #ccc",
    },
    scrollArea: {
        overflowY: "auto",
        maxHeight: 300,
        paddingRight: 6,
        flex: "1 1 auto",
    },
    scrollDark: {
        background: "#1E1E1E",
    },
    scrollLight: {
        background: "#f5f5f5",
    },
    body: {
        gap: 10,
        padding: 10,
        transition: "background 0.25s ease",
    },
    bodyDark: {
        background: "#1A1A1A",
        borderTop: "1px solid #333",
    },
    bodyLight: {
        background: "#ffffff",
        borderTop: "1px solid #ccc",
    },
    pre: {
        margin: 0,
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333",
    },
    preLight: {
        background: "#f5f5f5",
        color: "#333",
        borderColor: "#ddd",
    }
}