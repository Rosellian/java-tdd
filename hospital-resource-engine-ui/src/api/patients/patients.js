import {createKeyHeader} from "../security";

const BASE_URL = "/api/patients";

export async function createPatient(createSpecs = {}) {
    try {
        console.log("[createPatient] Sending request:", createSpecs);

        let res = await fetch(`${BASE_URL}/create`, getInit(createSpecs));

        if (!res.ok) {
            let text = await res.text();
            console.error("[createPatient] Server returned error:", res.status, text);
        }

        const json = await res.json();
        console.log("[createPatient] Response JSON:", json);

        return json;

    } catch (err) {
        console.error("[createPatient] Unexpected error:", err);
        throw err;
    }
}

export async function addPatient(patient) {
    let res = await fetch(`${BASE_URL}`, getInit(patient));

    return res.json();
}

function getInit(bodyPayload) {
    return {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=utf-8", ...createKeyHeader()},
        body: JSON.stringify(bodyPayload)
    };
}