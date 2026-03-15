export function PriceEvolutionChart({ prices }) {
    return (
        <section className="price-evolution">
            <h3>Price Evolution</h3>

            <div className="chart-placeholder">
                {prices.map((p, i) => (
                    <div key={i} className="chart-bar">
                        <span>{p}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}