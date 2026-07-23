import {makeGet, makePost} from "../requests";

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

export async function addPatient(patient) {
    return makePost("addPatient", BASE_URL, patient);
}