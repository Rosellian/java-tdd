import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {diffCustomer} from "./funcs";
import {DiffList} from "./DiffList";
import {ButtonPanel} from "./ButtonPanel";

export function ImportPreviewDialog({ current, incoming, onCancel, onConfirm }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const changes = diffCustomer(current, incoming);

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(isDark ? styles.titleDark : styles.titleLight)
            }}>
                Import Preview
            </h3>

            <div style={styles.subtitle}>
                The following fields will be changed:
            </div>

            <DiffList changes={changes} isDark={isDark} />

            <ButtonPanel onCancel={onCancel} onConfirm={() => onConfirm(incoming)} isDark={isDark} />
        </div>
    )
}

const styles = {
    container: {
        border: "1px solid",
        borderRadius: 6,
        padding: 12,
        marginTop: 12,
        transition: "background 0.25s ease, border-color 0.25s ease"
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
        marginTop: 0,
        marginBottom: 8,
        fontSize: "1.1rem",
        fontWeight: 600
    },
    titleDark: {
        color: "#BB86FC"
    },
    titleLight: {
        color: "#5A2DA8"
    },
    subtitle: {
        opacity: 0.8,
        marginBottom: 12
    }
}