import React from "react";
import { connect } from "react-redux";
import * as CountryActions from "../../redux/actions/countryActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CountryList from "./CountryList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

//import Autocomplete from '../autocomplete';


class CountriesPage extends React.Component {
  state = {
    redirectToAddCountryPage: false
  };

  componentDidMount() {
    const { countries, actions } = this.props;
  
    /*var palabra="Proce";
    var regex= new RegExp(`^${palabra}` , 'i');
    console.log(this.props.countries.length);
    var filtrado = countries.filter(n=>regex.test(n.title));
    console.log(filtrado);*/

    if (countries.length === 0) {
      actions.getCountries().catch(error => {
        alert("Loading countries failed" + error);
      });
    }
  }

  handleDeleteCountry = async country => {
    toast.success("Country deleted");
    try {
      await this.props.actions.deleteCountry(country);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  handleBuscarFiltro = () => {
    var valorBuscar=document.getElementById("BuscarText").value;
    if(valorBuscar=="")
    {
      alert("ingrese el pais a buscar");
      return;
    }
    //alert("hola "+valorBuscar);
    this.props.actions.getCountriesFilter(valorBuscar);
    //this.props.actions.getCountries();
  };

  handleTodosCountries = () => {
    
    //alert("hola "+valorBuscar);
    this.props.actions.getCountries();
    //this.props.actions.getCountries();
  };


  render() {
    return (
      <>
        {this.state.redirectToAddCountryPage && <Redirect to="/country" />}
        <h2>Countries</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
            <>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-course"
                onClick={() => this.setState({ redirectToAddCountryPage: true })}
              >
                Add Country
            </button>
            {/* <form className="form-inline"> */}
              <input id="BuscarText" className="form-control" type="text" placeholder="Pais a buscar"></input>
              <button className="btn btn-outline-success my-2 my-sm-0 mr-md-3" onClick={this.handleBuscarFiltro}>Buscar</button>
              <button className="btn btn-outline-success my-2 my-sm-0 mr-md-3" type="submit" onClick={this.handleTodosCountries}>Todos los Paises</button>
            {/* </form>             */}
              <CountryList
                onDeleteClick={this.handleDeleteCountry}
                countries={this.props.countries}
              />
            </>
          )}
      </>
    );
  }
}

CountriesPage.propTypes = {
  countries: PropTypes.array.isRequired,  
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    countries: state.countries,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCountries: bindActionCreators(CountryActions.getCountries, dispatch),
      deleteCountry: bindActionCreators(CountryActions.deleteCountry, dispatch),
      getCountriesFilter: bindActionCreators(CountryActions.getCountriesFilter, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountriesPage);
