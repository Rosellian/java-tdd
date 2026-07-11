import {buttonStyles} from "./buttonStyles";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {createNewPriceListDraft} from "../priceFuncs";

export function New({ unsavedChanges, onNew }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <button disabled={unsavedChanges} onClick={() => newPriceList(onNew)}
                style={{
                    ...buttonStyles.base,
                    ...(isDark ? styles.newButtonDark : styles.newButtonLight),
                    ...(unsavedChanges ? buttonStyles.buttonDisabled : {})
        }}>
            + New Price List
        </button>
    )
}

function newPriceList(onNew) {
    const draft = createNewPriceListDraft();

    onNew(draft);
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