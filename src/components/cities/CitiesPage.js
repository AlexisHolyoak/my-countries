import React from "react";
import { connect } from "react-redux";
import * as cityActions from "../../redux/actions/cityActions";
import * as CountryActions from "../../redux/actions/countryActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CityList from "./CityList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

//import Autocomplete from '../autocomplete';


class CitiesPage extends React.Component {
  state = {
    redirectToAddCityPage: false
  };

  componentDidMount() {
    const { cities, countries, actions } = this.props;

    if (cities.length === 0) {
      actions.getCities().catch(error => {
        alert("Loading cities failed" + error);
      });
    }
    /*var palabra="Proce";
    var regex= new RegExp(`^${palabra}` , 'i');
    console.log(this.props.cities.length);
    var filtrado = cities.filter(n=>regex.test(n.title));
    console.log(filtrado);*/

    if (countries.length === 0) {
      actions.getCountries().catch(error => {
        alert("Loading countries failed" + error);
      });
    }
  }

  handleDeleteCity = async city => {
    toast.success("City deleted");
    try {
      await this.props.actions.deleteCity(city);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  handleBuscarFiltro = () => {
    var valorBuscar=document.getElementById("BuscarText").value;
    if(valorBuscar=="")
    {
      alert("ingrese el curso a buscar");
      return;
    }
    //alert("hola "+valorBuscar);
    this.props.actions.getCitiesFilter(valorBuscar);
    //this.props.actions.getCities();
  };

  handleTodosCiudades = () => {
    
    //alert("hola "+valorBuscar);
    this.props.actions.getCities();
    //this.props.actions.getCities();
  };


  render() {
    return (
      <>
        {this.state.redirectToAddCityPage && <Redirect to="/city" />}
        <h2>Cities</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
            <>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-city"
                onClick={() => this.setState({ redirectToAddCityPage: true })}
              >
                Add City
            </button>
            {/* <form className="form-inline"> */}
              <input id="BuscarText" className="form-control" type="text" placeholder="Ciudad a buscar"></input>
              <button className="btn btn-outline-success my-2 my-sm-0 mr-md-3" onClick={this.handleBuscarFiltro}>Buscar</button>
              <button className="btn btn-outline-success my-2 my-sm-0 mr-md-3" type="submit" onClick={this.handleTodosCiudades}>Todos los Ciudades</button>
            {/* </form>             */}
              <CityList
                onDeleteClick={this.handleDeleteCity}
                cities={this.props.cities}
              />
            </>
          )}
      </>
    );
  }
}

CitiesPage.propTypes = {
  countries: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    cities:
      state.countries.length === 0
        ? []
        : state.cities.map(city => {
          return {
            ...city,
            CountryName: state.countries.find(a => a.id === city.countryId).name
          };
        }),
    countries: state.countries,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCities: bindActionCreators(cityActions.getCities, dispatch),
      getCountries: bindActionCreators(CountryActions.getCountries, dispatch),
      deleteCity: bindActionCreators(cityActions.deleteCity, dispatch),
      getCitiesFilter: bindActionCreators(cityActions.getCitiesFilter, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitiesPage);
