export function exportPriceList(priceList) {
    let blob = new Blob([JSON.stringify(priceList, null, 2)], {
        type: "application/json"
    });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = `priceList-${priceList.name || "unnamed"}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

export function importPriceList(onLoaded) {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (e) => {
        let file = e.target.files[0];
        if (!file) return;

        let text = await file.text();

        try {
            let json = JSON.parse(text);

            if (!json.unitPrices || !Array.isArray(json.unitPrices)) {
                alert("Invalid price list JSON: missing 'unitPrices' array");
                return;
            }

            onLoaded(json);
        } catch (err) {
            alert("Invalid JSON file");
        }
    };

    input.click();
}