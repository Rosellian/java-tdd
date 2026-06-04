import {useTheme} from "../../ui/ThemeProvider";

export function PriceListEditor({ priceList, onChange }) {
    const { theme } = useTheme();

    if (!priceList || !Array.isArray(priceList.unitPrices)) return null;

    function updateItem(index, field, value) {
        const updated = [...priceList.unitPrices];
        updated[index] = { ...updated[index], [field]: value };

        onChange({ ...priceList, unitPrices: updated });
    }

    function deleteItem(index) {
        const updated = priceList.unitPrices.filter((_, i) => i !== index);
        onChange({ ...priceList, unitPrices: updated });
    }

    function addItem() {
        const updated = [...priceList.unitPrices, { sku: "", price: 0 }];
        onChange({ ...priceList, unitPrices: updated });
    }

    return (
        <div style={{
            ...styles.box,
            ...(theme === "dark" ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(theme === "dark" ? styles.titleDark : styles.titleLight)
            }}>
                Unit Prices
            </h3>

            {priceList.unitPrices.map((p, i) => (
                <PriceRow
                    key={i}
                    item={p}
                    onChange={(field, value) => updateItem(i, field, value)}
                    onDelete={() => deleteItem(i)}
                />
            ))}

            <button
                onClick={addItem}
                style={{
                    ...styles.addButton,
                    ...(theme === "dark" ? styles.addButtonDark : styles.addButtonLight)
                }}
            >
                + Add SKU
            </button>
        </div>
    );
}

function PriceRow({ item, onChange, onDelete }) {
    const { theme } = useTheme();

    return (
        <div style={styles.row}>
            <input
                placeholder="SKU"
                value={item.sku}
                onChange={(e) => onChange("sku", e.target.value)}
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />

            <input
                placeholder="Price"
                type="number"
                value={item.price}
                onChange={(e) => onChange("price", parseFloat(e.target.value))}
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />

            <button
                onClick={onDelete}
                style={{
                    ...styles.deleteButton,
                    ...(theme === "dark" ? styles.deleteButtonDark : styles.deleteButtonLight)
                }}
            >
                ✕
            </button>
        </div>
    );
}

const styles = {
    box: {
        background: "#1E1E1E",
        padding: 15,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "background 0.3s ease",
    },
    boxDark: {
        background: "#1E1E1E",
    },
    boxLight: {
        background: "#f2f2f2",
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease",
    },
    titleDark: {
        color: "#82B1FF",
    },
    titleLight: {
        color: "#5A2DA8",
    },
    row: {
        display: "flex",
        gap: 10,
        alignItems: "center",
    },
    input: {
        padding: 6,
        borderRadius: 4,
        border: "1px solid",
        flex: 1,
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    inputDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0",
    },
    inputLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000",
    },
    deleteButton: {
        padding: "6px 10px",
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
    },
    deleteButtonDark: {
        background: "#8B0000",
        color: "#fff",
    },
    deleteButtonLight: {
        background: "#ffdddd",
        color: "#900",
    },
    addButton: {
        padding: "6px 12px",
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
        marginTop: 10,
    },
    addButtonDark: {
        background: "#4CAF50",
        color: "#fff",
    },
    addButtonLight: {
        background: "#4CAF50",
        color: "#000",
    }
}