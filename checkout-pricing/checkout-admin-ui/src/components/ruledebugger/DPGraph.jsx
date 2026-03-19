export function DPGraph({ dp }) {
    if (!dp) return null;

    return (
        <section className="dp-graph">
            <h3>DP States</h3>

            <ul>
                {dp.map((state, i) => (
                    <li key={i} className="dp-state">
                        <div className="dp-label">{state.state}</div>
                        <div className="dp-options">
                            Options: {state.options.join(", ")}
                        </div>
                        <div className="dp-chosen">Chosen: {state.chosen}</div>
                        <div className="dp-price">Price: {state.price}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
}