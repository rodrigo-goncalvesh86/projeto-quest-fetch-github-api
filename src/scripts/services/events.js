import { baseUrl, eventsQuantity } from "../variables.js";

async function getUserEvents(userName) {
    const url = `${baseUrl}/${userName}/events?per_page=${eventsQuantity}`
    const response = await fetch(url);
    return await response.json();
};

export { getUserEvents };