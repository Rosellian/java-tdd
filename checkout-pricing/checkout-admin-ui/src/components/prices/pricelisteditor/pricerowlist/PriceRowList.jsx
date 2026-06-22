import {PriceRow} from "./pricerow/PriceRow";
import {deleteItem, updateItem} from "../editorOps";

export function PriceRowList({ priceList, onChange }) {
    return (
        <div style={styles.listContainer}>
            {priceList.unitPrices.map((p, i) => (
                <PriceRow key={i} item={p}
                          onChange={(field, value) => updateItem(i, field, value, priceList, onChange)}
                          onDelete={() => deleteItem(i, priceList, onChange)} />
            ))}
        </div>
    )
}

const styles = {
    listContainer: {
        maxHeight: "250px",
        overflowY: "auto",
        paddingRight: 4,
        display: "flex",
        flexDirection: "column",
        gap: 8
    }
}