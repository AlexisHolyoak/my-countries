import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CountryList = ({ countries, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Country</th>        
        <th />
      </tr>
    </thead>
    <tbody>
      {countries.map(country => {
        return (
          <tr key={country.id}>
            <td>
              <Link to={"/country/" + country.id}>{country.id}</Link>
            </td>
            <td>{country.name}</td>            
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(country)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CountryList;
