import {exportCustomer, importCustomer} from "./ops";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {useState} from "react";
import {ImportPreviewDialog} from "./preview/ImportPreviewDialog";
import {AnimatedBody} from "../../../ui/AnimatedBody";

export function CustomerJsonLoader({ customer, onImport }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const themeStyle = isDark ? styles.dark : styles.light;

    const [preview, setPreview] = useState(null);

    function handleImport(json) {
        setPreview(json);
    }

    function onConfirm(json) {
        onImport(json);
        setPreview(null);
    }

    return (
        <div style={styles.container}>
            <div style={styles.buttons}>
                <button onClick={() => exportCustomer(customer)}
                        style={{
                            ...styles.button,
                            ...themeStyle
                        }}>
                    Export JSON
                </button>

                <button onClick={() => importCustomer(handleImport)}
                        style={{
                            ...styles.button,
                            ...themeStyle
                        }}>
                    Import JSON
                </button>
            </div>

            <AnimatedBody open={!!preview}>
                {preview && (
                    <ImportPreviewDialog current={customer} incoming={preview}
                                         onCancel={() => setPreview(null)}
                                         onConfirm={onConfirm}/>
                )}
            </AnimatedBody>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    buttons: {
        display: "flex",
        gap: 8
    },
    button: {
        padding: "4px 8px",
        borderRadius: 4,
        fontSize: "0.8rem",
        cursor: "pointer",
        border: "1px solid",
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease"
    },
    dark: {
        background: "#1A1A1A",
        color: "#eee",
        borderColor: "#444"
    },
    light: {
        background: "#fff",
        color: "#222",
        borderColor: "#ccc"
    }
}