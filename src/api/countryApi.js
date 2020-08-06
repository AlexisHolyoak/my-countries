import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/countries/";

export function getCountries() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getCountriesFilter() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCountry(country) {
  return fetch(baseUrl + (country.id || ""), {
    method: country.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(country)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCountry(countryId) {
  return fetch(baseUrl + countryId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
