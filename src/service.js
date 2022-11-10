import {BASE_URL} from "./constants.js"

export async function handleFetchGet(url) {
    const response = await fetch(url);
    return await response.json();

}

export async function handleFetchDelete(id){
    await fetch(`${BASE_URL}/${id}`, {method:"DELETE"});
}

export async function handleFetchPatch(id, requestBody) {
    await fetch(`${BASE_URL}/${id}` , {
        method: "PATCH", headers: { "Content-type": "application/json" }, body: JSON.stringify(requestBody)});

}