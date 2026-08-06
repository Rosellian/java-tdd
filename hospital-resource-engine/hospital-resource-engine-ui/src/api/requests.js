import {createKeyHeader} from "./security";

export async function makeGet(requestName, endpoint) {
    let request = async () => {
        console.log(`[${requestName}] Sending GET request`);

        return await fetch(endpoint, { method: "GET", headers: createKeyHeader() });
    };

    return makeRequest(requestName, request);
}

//TODO Find better solution for response handling
export async function makePost(requestName, endpoint, payload, responseHandler = jsonResponse) {
    let request = async () => {
        console.log(`[${requestName}] Sending POST request with body payload:`, payload);

        return await fetch(endpoint, getInit(payload));
    };

    return makeRequest(requestName, request, responseHandler);
}

export async function makeDelete(requestName, endpoint) {
    let request = async () => {
        console.log(`[${requestName}] Sending DELETE request`);

        return await fetch(endpoint, { method: "DELETE", headers: createKeyHeader() });
    };

    return makeRequest(requestName, request);
}

async function makeRequest(requestName, request, responseHandler = jsonResponse) {
    try {
        let res = await request();

        if (!res.ok) {
            let text = await res.text();
            console.error(`[${requestName}] Server returned error:`, res.status, text);
        }

        return await responseHandler(requestName, res);

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

async function jsonResponse(requestName, response) {
    let json = await response.json();
    console.log(`[${requestName}] Response JSON:`, json);

    return json;
}