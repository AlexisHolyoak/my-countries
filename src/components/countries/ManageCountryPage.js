import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCountries, saveCountry } from "../../redux/actions/countryActions";
import PropTypes from "prop-types";
import CountryForm from "./CountryForm";
import { newCountry } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCountryPage({  
  countries,
  getCountries,
  saveCountry,
  history,
  ...props
}) {
  const [country, setCountry] = useState({ ...props.country });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (countries.length === 0) {
      getCountries().catch(error => {
        alert("Loading countries failed" + error);
      });
    }else {
      setCountry({ ...props.country });
    }
  }, [props.country]);

   function handleChange(event) {    
    setCountry(prevCountry => (prevCountry));
  }
  function formIsValid() {
    const { name } = country;
    const errors = {};

    if (!name) errors.title = "Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCountry(country)
      .then(() => {
        toast.success("Country saved.");
        history.push("/countries");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return countries.length === 0  ? (
    <Spinner />
  ) : (
      <CountryForm
        country={country}
        errors={errors}     
        onChange={handleChange}           
        onSave={handleSave}
        saving={saving}
      />
    );
}

ManageCountryPage.propTypes = {
  country: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,    
  getCountries: PropTypes.func.isRequired,
  saveCountry: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCountryById(countries, id) {
  return countries.find(country => country.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const country =
    id && state.countries.length > 0
      ? getCountryById(state.countries, id)
      : newCountry;
  return {
    country,    
    countries: state.countries
  };
}

const mapDispatchToProps = {  
  getCountries,
  saveCountry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCountryPage);
