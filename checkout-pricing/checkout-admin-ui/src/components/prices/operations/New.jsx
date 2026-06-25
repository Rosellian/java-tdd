import {buttonStyles} from "./buttonStyles";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {createNewPriceListDraft} from "../handlerFuncs";

export function New({setSelected, setPriceListNames, setPriceList, onPriceListChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <button onClick={() => newPriceList(setSelected, setPriceListNames, setPriceList, onPriceListChange)}
                style={{
                    ...buttonStyles.base,
                    ...(isDark ? styles.newButtonDark : styles.newButtonLight)
        }}>
            + New Price List
        </button>
    )
}

function newPriceList(setSelected, setPriceListNames, setPriceList, onPriceListChange) {
    const draft = createNewPriceListDraft();

    setPriceList(draft);

    setPriceListNames(prev => [...prev, draft.name]);
    setSelected(draft.name);
    onPriceListChange(draft.name);
}

const styles = {
    newButtonDark: {
        background: "#4CAF50",
        color: "#fff"
    },
    newButtonLight: {
        background: "#4CAF50",
        color: "#000"
    }
}