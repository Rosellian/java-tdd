export function EventBody({ event }) {
    return (
        <div style={styles.eventBody}>
            <pre>Delta: {JSON.stringify(event.delta, null, 2)}</pre>
            <pre>Before: {JSON.stringify(event.before, null, 2)}</pre>
            <pre>After: {JSON.stringify(event.after, null, 2)}</pre>
        </div>
    )
}

const styles = {
    eventBody: {
        padding: 10,
        background: "#1A1A1A",
    }
}