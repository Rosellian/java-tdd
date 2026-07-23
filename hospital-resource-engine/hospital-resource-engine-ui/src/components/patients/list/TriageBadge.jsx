export function TriageBadge({ level }) {
    if (!level) return null;

    return (
        <span className={`triage-badge triage-${level.toLowerCase()}`}>
            {level[0]}
        </span>
    )
}