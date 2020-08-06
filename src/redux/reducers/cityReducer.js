import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function cityReducer(state = initialState.cities, action) {
  var flag=0;
  switch (action.type) {
    case types.CREATE_CITY_SUCCESS:
      return [...state, { ...action.city }];
    case types.UPDATE_CITY_SUCCESS:
      return state.map(city =>
        city.id === action.city.id ? action.city : city
      );
    case types.LOAD_CITIES_SUCCESS:
      if(action.flag){
        flag=1;
      }
      
      if(flag==0){
        return action.cities;
      }
      else {  
        var palabra=action.data;            
        var regex= new RegExp(`^${palabra}` , 'i');
        return action.cities.filter(n=>regex.test(n.title));   
      }      
    case types.LOAD_CITIES_FILTER:
      return action.cities;
    case types.DELETE_CITY_OPTIMISTIC:
      return state.filter(city => city.id !== action.city.id);
    default:
      return state;
  }
}
