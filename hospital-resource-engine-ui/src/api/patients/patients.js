const BASE_URL = "/api/patients";

export async function createPatient(createSpecs) {
    let res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createSpecs)
    });

    return res.json();
}

export async function addPatient(patient) {
    let res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
    });

    return res.json();
}