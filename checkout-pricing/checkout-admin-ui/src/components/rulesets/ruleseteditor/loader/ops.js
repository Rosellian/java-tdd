export function exportRuleset(ruleset) {
    let blob = new Blob([JSON.stringify(ruleset, null, 2)], {
        type: "application/json"
    });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = `ruleset-${ruleset.name || "unnamed"}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

export function importRuleset(onLoaded) {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (e) => {
        let file = e.target.files[0];
        if (!file) return;

        let text = await file.text();

        try {
            let json = JSON.parse(text);

            if (!json.rules || !Array.isArray(json.rules)) {
                alert("Invalid ruleset JSON: missing 'rules' array");
                return;
            }

            onLoaded(json);
        } catch (err) {
            alert("Invalid JSON file");
        }
    };

    input.click();
}