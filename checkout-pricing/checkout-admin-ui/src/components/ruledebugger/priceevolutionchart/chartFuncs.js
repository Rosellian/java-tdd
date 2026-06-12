export const width = 500;
export const height = 200;

export function calculatePoints(prices) {
    const padding = 30;
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    return prices.map((p, i) => {
        const x = padding + (i / (prices.length - 1)) * (width - padding * 2);
        const y = height - padding - ((p - min) / (max - min)) * (height - padding * 2);
        return {x, y, value: p};
    });
}

export function createPath(points) {
    return points.map((p) => `${p.x},${p.y}`).join(" ");
}