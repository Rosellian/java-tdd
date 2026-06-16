import {AnimatedBody} from "../../../ui/AnimatedBody";
import {useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {CustomerHeader} from "./CustomerHeader";
import {CustomerBody} from "./CustomerBody";

export function CustomerItem({ customer, updateField, originalCustomer }) {
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
                    <CustomerBody customer={customer} updateField={updateField} originalCustomer={originalCustomer} />
                </AnimatedBody>
            </div>
        </div>
    )
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
        paddingRight: 4
    },
    containerDark: {
        background: "#1E1E1E",
        color: "#eee",
        borderColor: "#333"
    },
    containerLight: {
        background: "#fafafa",
        color: "#222",
        borderColor: "#ccc"
    },
    scrollArea: {
        overflowY: "auto",
        maxHeight: 300,
        paddingRight: 20,
        flex: "1 1 auto"
    },
    scrollDark: {
        background: "#1E1E1E"
    },
    scrollLight: {
        background: "#f5f5f5"
    }
}