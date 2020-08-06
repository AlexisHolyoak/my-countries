import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/cities/";

export function getCities() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getCitiesFilter() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCity(city) {
  return fetch(baseUrl + (city.id || ""), {
    method: city.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(city)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCity(cityId) {
  return fetch(baseUrl + cityId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
