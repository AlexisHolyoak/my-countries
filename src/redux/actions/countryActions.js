import * as types from "./actionTypes";
import * as countryApi from "../../api/countryApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getCountrySuccess(countries) {
  return { type: types.LOAD_COUNTRIES_SUCCESS, countries };
}

export function getCountryFilter(countries,valorBuscar,flag) {
  //console.log(valorBuscar);
  return { type: types.LOAD_COUNTRIES_SUCCESS, countries,data:valorBuscar,flag:flag };
}

export function createCountrySuccess(country) {
  return { type: types.CREATE_COUNTRY_SUCCESS, country };
}

export function updateCountrySuccess(country) {
  return { type: types.UPDATE_COUNTRY_SUCCESS, country };
}

export function deleteCountryOptimistic(country) {
  return { type: types.DELETE_COUNTRY_OPTIMISTIC, country };
}

export function getCountries() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return countryApi
      .getCountries()
      .then(countries => {
        dispatch(getCountrySuccess(countries));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}


export function getCountriesFilter(valorBuscar) {  
  //console.log(valorBuscar);
  var flag=1;
  return function (dispatch) {
    dispatch(beginApiCall());
    return countryApi
      .getCountriesFilter()
      .then(countries => {
        //console.log(valorBuscar);
        dispatch(getCountryFilter(countries,valorBuscar,flag));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}


export function saveCountry(country) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return countryApi
      .saveCountry(country)
      .then(savedCountry => {
        country.id
          ? dispatch(updateCountrySuccess(savedCountry))
          : dispatch(createCountrySuccess(savedCountry));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCountry(country) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCountryOptimistic(country));
    return countryApi.deleteCountry(country.id);
  };
}
