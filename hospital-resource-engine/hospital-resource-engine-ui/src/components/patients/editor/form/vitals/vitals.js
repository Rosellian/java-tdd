//TODO centralize, and build upon rules and realistic values?
export function dangerClass(vitals) {
    return {
        heartRate: setDanger(vitals.heartRate < 15),
        systolicBP: setDanger(vitals.systolicBP < 90),
        diastolicBP: setDanger(vitals.diastolicBP > 110),
        oxygenSaturation: setDanger(vitals.oxygenSaturation < 85),
        temperature: setDanger(vitals.temperature > 39.5)
    };
}

function setDanger(condition) {
    return condition ? " danger" : "";
}

export function createAddDangerClass(danger) {
    let atLeastOneDanger = anyDanger(danger);

    return {class: " danger", add: atLeastOneDanger};
}

function anyDanger(danger) {
    return Object.values(danger).some(x => x === " danger");
}