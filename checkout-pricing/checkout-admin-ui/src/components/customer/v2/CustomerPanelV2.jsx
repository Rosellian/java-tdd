import { useTheme } from "../../../ui/theme/ThemeProvider";
import {EditableRow} from "./EditableRow";
import {CustomerSections} from "./sections/CustomerSections";
import {CustomerJsonLoader} from "../loader/CustomerJsonLoader";

export function CustomerPanelV2({ customer, setCustomer, originalCustomer }) {
    const { theme } = useTheme();

    function updateField(key, value) {
        setCustomer(prev => ({ ...prev, [key]: value }));
    }

    return (
        <div style={{
            ...styles.box,
            ...(theme === "dark" ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(theme === "dark" ? styles.titleDark : styles.titleLight)
            }}>Customer</h3>

            <CustomerJsonLoader customer={customer} onImport={(json) => setCustomer(json)} />

            <div style={{
                ...styles.scrollArea,
                ...(theme === "dark" ? styles.scrollDark : styles.scrollLight)
            }}>
                <EditableRow label="ID" value={customer.id} onChange={value => updateField("id", value)} />
                <EditableRow label="Segment" value={customer.segment}
                             onChange={value => updateField("segment", value)} />

                <CustomerSections customer={customer} originalCustomer={originalCustomer} updateField={updateField} />
            </div>
        </div>
    )
}

const styles = {
    box: {
        padding: 10,
        borderRadius: 4,
        minWidth: 300,
        transition: "background 0.3s ease, color 0.3s ease",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start"
    },
    boxDark: {
        background: "#1E1E1E",
        color: "#E0E0E0"
    },
    boxLight: {
        background: "#f5f5f5",
        color: "#000000"
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease"
    },
    titleDark: {
        color: "#80CBC4"
    },
    titleLight: {
        color: "#00796B"
    },
    scrollArea: {
        overflowY: "auto",
        paddingRight: 6,
        flex: "1 1 auto",
        alignSelf: "flex-start",
        maxHeight: 600,
        width: "100%",
        boxSizing: "border-box"
    },
    scrollDark: {
        background: "#1E1E1E"
    },
    scrollLight: {
        background: "#f5f5f5"
    }
}