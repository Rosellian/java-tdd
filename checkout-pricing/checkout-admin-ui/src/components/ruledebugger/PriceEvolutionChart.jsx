export function PriceEvolutionChart({ prices }) {
    if (!prices) return null;

    return (
        <section className="price-evolution">
            <h3>Price Evolution</h3>

            <div style={styles.chartPlaceholder}>
                {prices.map((p, i) => (
                    <div key={i} className="chart-bar">
                        <span>{p}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

const styles = {
    chartPlaceholder: {
        display: "flex",
        gap: 4,
    },
}