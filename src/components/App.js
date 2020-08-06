import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CitiesPage from "./cities/CitiesPage";
import CountriesPage from "./countries/CountriesPage";
import ManageCityPage from "./cities/ManageCityPage"; // eslint-disable-line import/no-named-as-default
import ManageCountryPage from "./countries/ManageCountryPage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/cities" component={CitiesPage} />
        <Route path="/city/:slug" component={ManageCityPage} />
        <Route path="/city" component={ManageCityPage} />
        <Route path="/countries" component={CountriesPage} />
        <Route path="/country/:id" component={ManageCountryPage} />
        <Route path="/country" component={ManageCountryPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
