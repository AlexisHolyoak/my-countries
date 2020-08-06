import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const CityForm = ({
  city,
  countries,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{city.id ? "Edit" : "Add"} City</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={city.name}
        onChange={onChange}
        error={errors.name}
      />

      <SelectInput
        name="countryId"
        label="Country"
        value={city.countryId || ""}
        defaultOption="Select Country"
        options={countries.map(country => ({
          value: country.id,
          text: country.name
        }))}
        onChange={onChange}
        error={errors.country}
      />

      <TextInput
        name="habitants"
        label="Habitants"
        value={city.habitants}
        onChange={onChange}
        error={errors.habitants}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

CityForm.propTypes = {
  countries: PropTypes.array.isRequired,
  city: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default CityForm;
