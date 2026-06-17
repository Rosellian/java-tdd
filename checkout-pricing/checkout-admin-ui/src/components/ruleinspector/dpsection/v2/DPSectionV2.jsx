import {Section} from "../../../../ui/Section";
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {DPTraceBlock} from "./DPTraceBlock";

export function DPSectionV2({ dpTraces }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Section title="Dynamic Programming Paths">
            {dpTraces.map((dpTrace, i) => (
                <DPTraceBlock key={i} dp={dpTrace} isDark={isDark} />
            ))}
        </Section>
    )
}