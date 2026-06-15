import {ThemeToggleButton} from "../ui/theme/ThemeToggleButton";
import {DisabledButton} from "../ui/DisableButton";

export function ButtonPanel({ cart, ruleset, priceList, customer, getTrace }) {
    const isDisabled = Object.keys(cart).length === 0;

    return (
        <div style={styles.buttons}>
            <DisabledButton isDisabled={isDisabled} onClick={() => getTrace(cart, ruleset, priceList, customer)}
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