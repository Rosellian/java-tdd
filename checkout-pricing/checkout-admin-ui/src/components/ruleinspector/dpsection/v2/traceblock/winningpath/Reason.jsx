export function Reason({ dp }) {
    return (
        <div style={styles.reason}>
            <strong>Reason: SAMPLE DATA</strong>

            <ul>
                <li>Lowest final price</li>
                <li>Valid remaining count</li>
                <li>Rule priority respected</li>
            </ul>
        </div>
    )
}

const styles = {
    reason: {
        opacity: 0.8
    }
}