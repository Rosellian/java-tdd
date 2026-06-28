import {customerSchema} from "../jsonFunc";
import {JsonEditor} from "../../../../ui/json/jsonEditor/JsonEditor";
import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function CustomerSection({ label, open, setOpen, changed, field, updateField, customer, originalCustomer }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let changedColor = changed ? "4px solid #FFB300" : "4px solid transparent";

    return (
        <div>
            <div onClick={() => setOpen(!open)}
                 style={{
                     ...styles.sectionHeader,
                     ...(isDark ? styles.sectionHeaderDark : styles.sectionHeaderLight),
                     borderLeft: changedColor
            }}>
                <span>{label}</span>

                <span style={styles.toggle}>
                    {open ? "▼" : "▶"}
                </span>
            </div>

            {open && (
                <JsonEditor
                    value={customer[field]}
                    originalValue={originalCustomer[field]}
                    schema={customerSchema[field]}
                    onChange={(obj) => updateField(field, obj)}
                />
            )}
        </div>
    )
}

const styles = {
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 6px",
        cursor: "pointer",
        marginTop: 10,
        borderRadius: 4,
        fontWeight: 600,
        transition: "background 0.25s ease"
    },
    sectionHeaderDark: {
        background: "#2A2A2A",
        color: "#BB86FC"
    },
    sectionHeaderLight: {
        background: "#eaeaea",
        color: "#5A2DA8"
    },
    toggle: {
        opacity: 0.8
    }
}