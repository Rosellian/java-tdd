import {useTheme} from "../../../ui/theme/ThemeProvider";
import {ChangesView} from "./changes/ChangesView";
import {diffRulesets} from "./changes/diffs";
import {RuleDiffView} from "./changes/diffview/RuleDiffView";

export function StatusBar({ status, fallbackUsed, isDraft, unsavedChanges, ruleset, originalRuleset }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let diffs = diffRulesets(originalRuleset, ruleset);

    return (
        <div>
            {status === "loading" &&
                <div style={styles.loading}>
                    Loading ruleset…
                </div>
            }
            {status === "error" &&
                <div style={styles.error}>
                    Failed to load or save ruleset
                </div>
            }

            {fallbackUsed &&
                <div style={styles.fallback}>
                    Failed to load from server, fallback used
                </div>
            }

            {isDraft && (
                <div style={styles.draft}>
                    Unsaved draft
                </div>
            )}

            {unsavedChanges && (
                <div style={{
                    ...styles.unsavedChanges,
                    ...(isDark ? styles.unsavedChangesDark : styles.unsavedChangesLight)
                }}>
                    Unsaved changes
                </div>
            )}

            {unsavedChanges && originalRuleset && (
                <ChangesView diffs={diffs} />
            )}
            {unsavedChanges && originalRuleset && (
                <RuleDiffView diffs={diffs} />
            )}

        </div>
    )
}

const styles = {
    loading: {
        opacity: 0.7
    },
    draft: {
        color: "#FF9800",
        marginBottom: 10
    },
    unsavedChanges: {
        padding: "6px 10px",
        borderRadius: 4,
        fontWeight: 600,
        marginBottom: 10,
        width: "fit-content"
    },
    unsavedChangesDark: {
        background: "#FFB74D",
        color: "#000"
    },
    unsavedChangesLight: {
        background: "#FFE0B2",
        color: "#8B4513"
    },
    fallback: {
        color: "#e57335",
        fontWeight: "bold"
    },
    error: {
        color: "#E53935",
        fontWeight: "bold"
    }
}