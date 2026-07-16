import {createKeyHeader} from "./security";

export async function makePost(requestName, endpoint, payload) {
    try {
        console.log(`[${requestName}] Sending request with body payload:`, payload);

        let res = await fetch(endpoint, getInit(payload));

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