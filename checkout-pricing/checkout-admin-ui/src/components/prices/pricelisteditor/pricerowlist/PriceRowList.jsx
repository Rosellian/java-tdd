import {PriceRow} from "./pricerow/PriceRow";
import {deleteItem, updateItem} from "../editorOps";

export function PriceRowList({ priceList, originalPriceList, onChange }) {
    let originalItems = mapOriginalList(originalPriceList);

    return (
        <div style={styles.listContainer}>
            {priceList.unitPrices.map((item, i) => {
                let originalItem = originalItems[item.sku];

                return (
                <PriceRow key={i} item={item} originalItem={originalItem}
                          onChange={(field, value) => updateItem(i, field, value, priceList, onChange)}
                          onDelete={() => deleteItem(i, priceList, onChange)} />
                )
            })}
        </div>
    )
}

function mapOriginalList(originalPriceList) {
    let originalItems = {};
    if (originalPriceList?.unitPrices) {
        for (let item of originalPriceList.unitPrices) {
            originalItems[item.sku] = item;
        }
    }

    return originalItems;
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