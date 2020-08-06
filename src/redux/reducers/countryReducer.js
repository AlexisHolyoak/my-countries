import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function CountryReducer(state = initialState.countries, action) {
  var flag=0;
  switch (action.type) {
    case types.CREATE_COUNTRY_SUCCESS:
      return [...state, { ...action.country }];
    case types.UPDATE_COUNTRY_SUCCESS:
      return state.map(country =>
        country.id === action.country.id ? action.country : country
      );
    case types.LOAD_COUNTRIES_SUCCESS:
      if(action.flag){
        flag=1;
      }
      
      if(flag==0){
        return action.countries;
      }
      else {  
        var palabra=action.data;            
        var regex= new RegExp(`^${palabra}` , 'i');
        return action.countries.filter(n=>regex.test(n.name));   
      }
    case types.LOAD_COUNTRIES_FILTER:
      return action.countries;
    case types.DELETE_COUNTRY_OPTIMISTIC:
      return state.filter(country => country.id !== action.country.id);
    default:
      return state;
  }
}
