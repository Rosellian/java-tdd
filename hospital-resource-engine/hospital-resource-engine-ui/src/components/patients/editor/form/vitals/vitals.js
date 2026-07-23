//TODO centralize, and build upon rules?
export function dangerClass(vitals) {
    return {
        heartRate: setDanger(vitals.heartRate > 130),
        systolicBP: setDanger(vitals.systolicBP > 180),
        diastolicBP: setDanger(vitals.diastolicBP > 120),
        oxygenSaturation: setDanger(vitals.oxygenSaturation < 90),
        temperature: setDanger(vitals.temperature > 39)
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