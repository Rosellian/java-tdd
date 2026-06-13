import {ThemeToggleButton} from "../ui/ThemeToggleButton";
import {DisabledButton} from "../ui/DisableButton";

export function ButtonPanel({ cart, ruleset, priceList, getTrace }) {
    const isDisabled = Object.keys(cart).length === 0;

    return (
        <div style={styles.buttons}>
            <DisabledButton isDisabled={isDisabled} onClick={() => getTrace(cart, ruleset, priceList)}
                            name="Evaluate" />
            <ThemeToggleButton />
        </div>
    );
}

const styles = {
    buttons: {
        marginBottom: 40,
    }
}