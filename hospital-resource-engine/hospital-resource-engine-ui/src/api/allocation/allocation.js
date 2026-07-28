import {makePost} from "../requests";

const BASE_URL = "/api/allocation";

export async function runAllocation(patient, resources) {
    return makePost("runAllocation", BASE_URL, {patient: patient, resources: resources});
}