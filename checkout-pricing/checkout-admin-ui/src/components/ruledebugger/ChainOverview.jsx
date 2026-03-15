export function ChainOverview({ steps }) {
    return (
        <section className="chain-overview">
            <h3>Pricing Chain</h3>
            <ul>
                {steps.map((s, i) => (
                    <li key={i} className="chain-step">
                        <div className="step-title">{s.step}</div>
                        <div className="step-desc">{s.description}</div>
                        <div className="step-price">
                            {s.priceBefore} → {s.priceAfter}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}