const BASE_URL = "/api/triage";

export async function runTriage(patient) {
    let res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
    });

    return res.json();
}

export async function runTriageForId(patientId) {
    let res = await fetch(`${BASE_URL}/${patientId}`, {
        method: "POST"
    });

    return res.json();
}