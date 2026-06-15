import { useTheme } from "../../ui/ThemeProvider";
import {useState} from "react";
import {JsonEditor} from "./JsonEditor";
import {customerSchema} from "./jsonValidation";

export function CustomerPanelV2({ customer, setCustomer, originalCustomer }) {
    const { theme } = useTheme();

    const [basicOpen, setBasicOpen] = useState(false);
    const [metaOpen, setMetaOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);

    function updateField(key, value) {
        setCustomer(prev => ({ ...prev, [key]: value }));
    }

    const changedBasicInfo = JSON.stringify(customer.basicInfo) !== JSON.stringify(originalCustomer.basicInfo);
    const changedMeta = JSON.stringify(customer.metadata) !== JSON.stringify(originalCustomer.metadata);
    const changedOrders = JSON.stringify(customer.recentOrders) !==
        JSON.stringify(originalCustomer.recentOrders);

    return (
        <div
            style={{
                ...styles.box,
                ...(theme === "dark" ? styles.boxDark : styles.boxLight)
            }}
        >
            <h3
                style={{
                    ...styles.title,
                    ...(theme === "dark" ? styles.titleDark : styles.titleLight)
                }}
            >
                Customer
            </h3>

            <div
                style={{
                    ...styles.scrollArea,
                    ...(theme === "dark" ? styles.scrollDark : styles.scrollLight)
            }}>
                <EditableRow label="ID" value={customer.id} onChange={value => updateField("id", value)} />
                <EditableRow label="Segment" value={customer.segment}
                             onChange={value => updateField("segment", value)} />

                <div
                    onClick={() => setBasicOpen(!basicOpen)}
                    style={{
                        ...styles.sectionHeader,
                        ...(theme === "dark" ? styles.sectionHeaderDark : styles.sectionHeaderLight),
                        borderLeft: changedBasicInfo ? "4px solid #FFB300" : "4px solid transparent"
                    }}
                >
                    <span>Basic Info</span>
                    <span style={{ opacity: 0.8 }}>{basicOpen ? "▼" : "▶"}</span>
                </div>

                {basicOpen && (
                    <JsonEditor
                        value={customer.basicInfo}
                        originalValue={originalCustomer.basicInfo}
                        schema={customerSchema.basicInfo}
                        onChange={(obj) => updateField("basicInfo", obj)}
                    />
                )}

                <div
                    onClick={() => setMetaOpen(!metaOpen)}
                    style={{
                        ...styles.sectionHeader,
                        ...(theme === "dark" ? styles.sectionHeaderDark : styles.sectionHeaderLight),
                        borderLeft: changedMeta ? "4px solid #FFB300" : "4px solid transparent"
                    }}
                >
                    <span>Metadata</span>
                    <span style={{ opacity: 0.8 }}>{metaOpen ? "▼" : "▶"}</span>
                </div>

                {metaOpen && (
                    <JsonEditor
                        value={customer.metadata}
                        originalValue={originalCustomer.metadata}
                        schema={customerSchema.metadata}
                        onChange={(obj) => updateField("metadata", obj)}
                    />
                )}

                <div
                    onClick={() => setOrdersOpen(!ordersOpen)}
                    style={{
                        ...styles.sectionHeader,
                        ...(theme === "dark" ? styles.sectionHeaderDark : styles.sectionHeaderLight),
                        borderLeft: changedOrders ? "4px solid #FFB300" : "4px solid transparent"
                    }}
                >
                    <span>Recent Orders</span>
                    <span style={{ opacity: 0.8 }}>
                        {ordersOpen ? "▼" : "▶"}
                    </span>
                </div>

                {ordersOpen && (
                    <JsonEditor
                        value={customer.recentOrders}
                        originalValue={originalCustomer.recentOrders}
                        schema={customerSchema.recentOrders}
                        onChange={(obj) => updateField("recentOrders", obj)}
                    />
                )}
            </div>

        </div>
    )
}

function EditableRow({ label, value, onChange }) {
    const { theme } = useTheme();

    return (
        <div style={styles.row}>
            <strong style={{ width: 120 }}>{label}</strong>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />
        </div>
    )
}

const styles = {
    box: {
        padding: 10,
        borderRadius: 4,
        minWidth: 300,
        transition: "background 0.3s ease, color 0.3s ease",
        height: 650,
        display: "flex",
        flexDirection: "column",
    },
    boxDark: {
        background: "#1E1E1E",
        color: "#E0E0E0",
    },
    boxLight: {
        background: "#f5f5f5",
        color: "#000000",
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease",
    },
    titleDark: {
        color: "#80CBC4",
    },
    titleLight: {
        color: "#00796B",
    },
    scrollArea: {
        overflowY: "auto",
        paddingRight: 6,
        flex: "1 1 auto",
        maxHeight: 600,
        width: "100%",
        boxSizing: "border-box",
    },
    scrollDark: {
        background: "#1E1E1E",
    },
    scrollLight: {
        background: "#f5f5f5",
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 6px",
        cursor: "pointer",
        marginTop: 10,
        borderRadius: 4,
        fontWeight: 600,
        transition: "background 0.25s ease",
    },
    sectionHeaderDark: {
        background: "#2A2A2A",
        color: "#BB86FC",
    },
    sectionHeaderLight: {
        background: "#eaeaea",
        color: "#5A2DA8",
    },
    sectionBody: {
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 6,
    },
    row: {
        display: "flex",
        marginTop: 6,
        marginBottom: 6,
    },
    input: {
        flex: 1,
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid",
        fontSize: "0.9rem",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
    },
    inputDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444",
    },
    inputLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc",
    },
    pre: {
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333",
    },
    preLight: {
        background: "#ffffff",
        color: "#333",
        borderColor: "#ddd",
    }
}