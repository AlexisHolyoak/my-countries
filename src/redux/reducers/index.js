import { combineReducers } from "redux";
import cities from "./cityReducer";
import countries from "./countryReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  cities,
  countries,
  apiCallsInProgress
});

export default rootReducer;
