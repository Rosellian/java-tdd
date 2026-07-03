import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function PriceListDropdown({ value, onChange, entries, isDraft }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let label = "PriceListSelection";

    let sortedEntries = getSortedEntries(entries);

    return (
        <select title={label} name={label} value={value?.id ?? ""}
                onChange={(e) => handleChange(e.target.value, entries, onChange)}
                style={{
                    ...styles.select,
                    ...(isDark ? styles.selectDark : styles.selectLight)
        }}>
            {sortedEntries.map(entry => {
                let id = entry.id;
                let name = entry.name;
                return (
                    <option key={id} value={id}>
                        {isDraft && id === value.id ? `${name} (unsaved)` : name}
                    </option>
                )
            })}
        </select>
    )
}

function getSortedEntries(entries) {
    return [...entries].sort((a, b) => a.name.localeCompare(b.name));
}

function handleChange(id, entries, onChange) {
    let entry = entries.find(e => e.id === id);
    onChange(entry);
}

const styles = {
    select: {
        border: "1px solid",
        padding: 5,
        width: "auto",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    selectDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0"
    },
    selectLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000"
    }
}