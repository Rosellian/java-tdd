import {Section} from "../../ui/Section";
import {useTheme} from "../../ui/theme/ThemeProvider";

export function TotalSection({ finalTotal }) {
    const { theme } = useTheme();

    return (
        <Section title="Final Total">
            <div style={{
                ...styles.total,
                ...(theme === "dark" ? styles.totalDark : styles.totalLight)
            }}>
                {finalTotal} kr
            </div>
        </Section>
    )
}

const styles = {
    total: {
        fontSize: 24,
        fontWeight: "bold",
        transition: "color 0.3s ease"
    },
    totalDark: {
        color: "#03DAC6"
    },
    totalLight: {
        color: "#00897B"
    }
}