import {buttonStyles} from "./buttonStyles";
import {useTheme} from "../../../ui/ThemeProvider";
import {createNewPriceListDraft} from "../handlerOps";

export function New({ mode, setMode, setSelected, setPriceListNames, setPriceList, onPriceListChange }) {
    const { theme } = useTheme();

    return (
        <button disabled={mode === "new"} onClick={() => newPriceList(setMode, setSelected, setPriceListNames,
            setPriceList, onPriceListChange)}
                style={{
                    ...buttonStyles.base,
                    ...(theme === "dark" ? styles.newButtonDark : styles.newButtonLight)
                }}>+ New Price List</button>
    )
}

function newPriceList(setMode, setSelected, setPriceListNames, setPriceList, onPriceListChange) {
    const draft = createNewPriceListDraft();

    setMode("new");
    setPriceList(draft);

    setPriceListNames(prev => [...prev, draft.name]);
    setSelected(draft.name);
    onPriceListChange(draft.name);
}

const styles = {
    newButtonDark: {
        background: "#4CAF50",
        color: "#fff",
    },
    newButtonLight: {
        background: "#4CAF50",
        color: "#000",
    }
}