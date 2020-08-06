import * as types from "./actionTypes";
import * as cityApi from "../../api/cityApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getCitySuccess(cities) {
  return { type: types.LOAD_CITIES_SUCCESS, cities };
}

export function getCityFilter(cities,valorBuscar,flag) {
  //console.log(valorBuscar);
  return { type: types.LOAD_CITIES_SUCCESS, cities,data:valorBuscar,flag:flag };
}

export function createCitySuccess(city) {
  return { type: types.CREATE_CITY_SUCCESS, city };
}

export function updateCitySuccess(city) {
  return { type: types.UPDATE_CITY_SUCCESS, city };
}

export function deleteCityOptimistic(city) {
  return { type: types.DELETE_CITY_OPTIMISTIC, city };
}

export function getCities() {  
  return function (dispatch) {
    dispatch(beginApiCall());
    return cityApi
      .getCities()
      .then(cities => {
        dispatch(getCitySuccess(cities));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}


export function getCitiesFilter(valorBuscar) {  
  //console.log(valorBuscar);
  var flag=1;
  return function (dispatch) {
    dispatch(beginApiCall());
    return cityApi
      .getCitiesFilter()
      .then(cities => {
        //console.log(valorBuscar);
        dispatch(getCityFilter(cities,valorBuscar,flag));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}


export function saveCity(city) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return cityApi
      .saveCity(city)
      .then(savedCity => {
        city.id
          ? dispatch(updateCitySuccess(savedCity))
          : dispatch(createCitySuccess(savedCity));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCity(city) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCityOptimistic(city));
    return cityApi.deleteCity(city.id);
  };
}
