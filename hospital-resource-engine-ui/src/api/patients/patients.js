import {makePost} from "../requests";

const BASE_URL = "/api/patients";

export async function createPatient(createSpecs) {
    return makePost("createPatient", `${BASE_URL}/create`, createSpecs);
}

export async function addPatient(patient) {
    return makePost("addPatient", BASE_URL, patient);
}