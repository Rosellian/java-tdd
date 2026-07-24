import {makeGet, makePost} from "../requests";

const BASE_URL = "/api/triage/rules";

export async function getRuleLists() {
    return makeGet("getRuleLists", BASE_URL);
}

export async function getRules(listId) {
    return makeGet("getRules", `${BASE_URL}/${listId}`);
}

export async function saveRuleList(list, rules) {
    let payload = {list: list, rules: rules};

    //TODO return json response?
    return makePost("saveRuleList", BASE_URL, payload, () => {});
}