import {PriceGraph} from "./pricegraph/PriceGraph";
import {useTheme} from "../../../ui/ThemeProvider";
import {calculatePoints, createPath} from "./chartFuncs";
import {chartStyles} from "./chartStyles";

export function PriceEvolutionChart({ prices }) {
    const { theme } = useTheme();

    if (!prices) {
        return (
            <div style={{
                ...chartStyles.priceEmpty,
                ...(theme === "dark" ? chartStyles.emptyDark : chartStyles.emptyLight)
            }}>
                No price evolution data available.
            </div>
        );
    }

    const points = calculatePoints(prices);
    const path = createPath(points);

    return (
        <div style={{
            ...chartStyles.priceWrapper,
            ...(theme === "dark" ? chartStyles.wrapperDark : chartStyles.wrapperLight)
        }}>
            <h3 style={{
                ...chartStyles.priceHeader,
                ...(theme === "dark" ? chartStyles.headerDark : chartStyles.headerLight)
            }}>Price Evolution</h3>

            <PriceGraph prices={prices} path={path} points={points} />
        </div>
    );
}