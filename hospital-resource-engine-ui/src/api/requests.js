import {createKeyHeader} from "./security";

export async function makeGet(requestName, endpoint) {
    let request = async () => {
        console.log(`[${requestName}] Sending GET request`);

        return await fetch(endpoint, { method: "GET", headers: createKeyHeader() });
    };

    return makeRequest(requestName, request);
}

export async function makePost(requestName, endpoint, payload) {
    let request = async () => {
        console.log(`[${requestName}] Sending POST request with body payload:`, payload);

        return await fetch(endpoint, getInit(payload));
    };

    return makeRequest(requestName, request);
}

async function makeRequest(requestName, request) {
    try {
        let res = await request();

        if (!res.ok) {
            let text = await res.text();
            console.error(`[${requestName}] Server returned error:`, res.status, text);
        }

        const json = await res.json();
        console.log(`[${requestName}] Response JSON:`, json);

        return json;

    } catch (err) {
        console.error(`[${requestName}] Unexpected error:`, err);
        throw err;
    }
}

function getInit(bodyPayload) {
    return {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=utf-8", ...createKeyHeader()},
        body: JSON.stringify(bodyPayload)
    };
}