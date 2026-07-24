import {makeGet, makePost} from "../requests";

const BASE_URL = "/api/triage";

export async function runTriage(patient) {
    return makePost("runTriage", BASE_URL, patient);
}

//TODO should be POST without payload?
export async function runTriageForId(patientId) {
    return makeGet("runTriageForId", `${BASE_URL}/${patientId}`);
}

export async function getTriageLevels() {
    return makeGet("getTriageLevels", `${BASE_URL}/levels`);
}