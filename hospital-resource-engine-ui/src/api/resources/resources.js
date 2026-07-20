import {makeGet, makePost} from "../requests";

const BASE_URL = "/api/resources";

export async function getResourceLists() {
    return makeGet("getResourceLists", BASE_URL);
}

export async function getResources(listId) {
    return makeGet("getResources", `${BASE_URL}/${listId}`);
}

export async function saveResourceList(list, resources) {
    let payload = {list: list, resources: resources};

    //TODO return json response?
    return makePost("saveResourceList", BASE_URL, payload, () => {});
}