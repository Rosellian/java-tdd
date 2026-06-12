export function updateItem(index, field, value, priceList, onChange) {
    const updated = [...priceList.unitPrices];
    updated[index] = { ...updated[index], [field]: value };

    onChange({ ...priceList, unitPrices: updated });
}

export function deleteItem(index, priceList, onChange) {
    const updated = priceList.unitPrices.filter((_, i) => i !== index);
    onChange({ ...priceList, unitPrices: updated });
}

export function addItem(priceList, onChange) {
    const updated = [...priceList.unitPrices, { sku: "", price: 0 }];
    onChange({ ...priceList, unitPrices: updated });
}