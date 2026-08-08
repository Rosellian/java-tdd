import {makeDelete, makeGet, makePost} from "../requests";

const BASE_URL = "/api/patients";

export async function getPatientLists() {
    return makeGet("getPatientLists", BASE_URL);
}

export async function getPatients(listId) {
    return makeGet("getPatients", `${BASE_URL}/${listId}`);
}

export async function savePatientList(list, patients) {
    let payload = {list: list, patients: patients};

    //TODO return json response?
    return makePost("savePatientList", BASE_URL, payload, () => {});
}

export async function createPatient(createSpecs) {
    return makePost("createPatient", `${BASE_URL}/create`, createSpecs);
}

export async function getAllPatients() {
    return makeGet("getAllPatients", `${BASE_URL}/all`);
}

const PATIENT_BASE_URL = BASE_URL + "/patient";

export async function savePatient(patient) {
    return makePost("savePatient", PATIENT_BASE_URL, patient);
}

export async function deletePatient(patient) {
    return makeDelete("savePatient", `${PATIENT_BASE_URL}/${patient.id}`);
}