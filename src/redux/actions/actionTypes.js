export const CREATE_CITY = "CREATE_CITY";
export const CREATE_COUNTRY = "CREATE_COUNTRY";
export const LOAD_CITIES_SUCCESS = "LOAD_CITIES_SUCCESS";
export const LOAD_COUNTRIES_SUCCESS = "LOAD_COUNTRIES_SUCCESS";
export const CREATE_CITY_SUCCESS = "CREATE_CITY_SUCCESS";
export const CREATE_COUNTRY_SUCCESS = "CREATE_COUNTRY_SUCCESS";
export const UPDATE_CITY_SUCCESS = "UPDATE_CITY_SUCCESS";
export const UPDATE_COUNTRY_SUCCESS = "UPDATE_COUNTRY_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
export const LOAD_CITIES_FILTER = "LOAD_CITIES_FILTER";
export const LOAD_COUNTRIES_FILTER = "LOAD_COUNTRIES_FILTER";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_CITY_OPTIMISTIC = "DELETE_CITY_OPTIMISTIC";
export const DELETE_COUNTRY_OPTIMISTIC = "DELETE_COUNTRY_OPTIMISTIC";
