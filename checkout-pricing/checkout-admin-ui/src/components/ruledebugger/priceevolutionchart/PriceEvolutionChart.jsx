import {PriceGraph} from "./pricegraph/PriceGraph";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {calculatePoints, createPath} from "./chartFuncs";
import {chartStyles} from "./chartStyles";

export function PriceEvolutionChart({ prices }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    if (!prices) {
        return (
            <div style={{
                ...chartStyles.priceEmpty,
                ...(isDark ? chartStyles.emptyDark : chartStyles.emptyLight)
            }}>
                No price evolution data available.
            </div>
        )
    }

    const points = calculatePoints(prices);
    const path = createPath(points);

    return (
        <div style={{
            ...chartStyles.priceWrapper,
            ...(isDark ? chartStyles.wrapperDark : chartStyles.wrapperLight)
        }}>
            <h3 style={{
                ...chartStyles.priceHeader,
                ...(isDark ? chartStyles.headerDark : chartStyles.headerLight)
            }}>
                Price Evolution
            </h3>

            <PriceGraph prices={prices} path={path} points={points} />
        </div>
    )
}