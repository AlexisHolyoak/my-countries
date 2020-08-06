import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CityList = ({ cities, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Country</th>
        <th>Habitants</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {cities.map(city => {
        return (
          <tr key={city.id}>
            <td>
              <Link to={"/city/" + city.slug}>{city.name}</Link>
            </td>
            <td>{city.CountryName}</td>
            <td>{city.habitants}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(city)}
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

CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CityList;
