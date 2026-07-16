import {makePost} from "../requests";

const BASE_URL = "/api/triage";

export async function runTriage(patient) {
    return makePost("runTriage", BASE_URL, patient);
}

export async function runTriageForId(patientId) {
    let res = await fetch(`${BASE_URL}/${patientId}`, {
        method: "POST"
    });

    return res.json();
}