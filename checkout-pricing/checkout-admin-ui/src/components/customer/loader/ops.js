export function exportCustomer(customer) {
    const blob = new Blob([JSON.stringify(customer, null, 2)], {
        type: "application/json"
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `customer-${customer.id}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

export function importCustomer(onLoaded) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();

        try {
            const json = JSON.parse(text);
            onLoaded(json);
        } catch (err) {
            alert("Invalid JSON file");
        }
    };

    input.click();
}