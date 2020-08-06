import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCities, saveCity } from "../../redux/actions/cityActions";
import { getCountries } from "../../redux/actions/countryActions";
import PropTypes from "prop-types";
import CityForm from "./CityForm";
import { newCity } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCityPage({
  cities,
  countries,
  getCountries,
  getCities,
  saveCity,
  history,
  ...props
}) {
  const [city, setCity] = useState({ ...props.city });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cities.length === 0) {
      getCities().catch(error => {
        alert("Loading cities failed" + error);
      });
    } else {
      setCity({ ...props.city });
    }

    if (countries.length === 0) {
      getCountries().catch(error => {
        alert("Loading countries failed" + error);
      });
    }
  }, [props.city]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCity(prevCity => ({
      ...prevCity,
      [name]: name === "countryId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { name, countryId, habitants } = city;
    const errors = {};

    if (!name) errors.title = "Name is required.";
    if (!countryId) errors.country = "Country is required";
    if (!habitants) errors.category = "Habitants is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCity(city)
      .then(() => {
        toast.success("City saved.");
        history.push("/cities");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return countries.length === 0 || cities.length === 0 ? (
    <Spinner />
  ) : (
      <CityForm
        city={city}
        errors={errors}
        countries={countries}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    );
}

ManageCityPage.propTypes = {
  city: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  getCities: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  saveCity: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCityBySlug(cities, slug) {
  return cities.find(city => city.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const city =
    slug && state.cities.length > 0
      ? getCityBySlug(state.cities, slug)
      : newCity;
  return {
    city,
    cities: state.cities,
    countries: state.countries
  };
}

const mapDispatchToProps = {
  getCities,
  getCountries,
  saveCity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCityPage);
