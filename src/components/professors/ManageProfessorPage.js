import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProfessors, saveProfessor } from "../../redux/actions/professorActions";
import PropTypes from "prop-types";
import ProfessorForm from "./ProfessorForm";
import { newProfessor } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageProfessorPage({  
  professors,
  getProfessors,
  saveProfessor,
  history,
  ...props
}) {
  const [professor, setProfessor] = useState({ ...props.professor });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (professors.length === 0) {
      getProfessors().catch(error => {
        alert("Loading professors failed" + error);
      });
    }else {
      setProfessor({ ...props.professor });
    }
  }, [props.professor]);

   function handleChange(event) {    
    setProfessor(prevProfessor => (prevProfessor));
  }
  function formIsValid() {
    const { name } = professor;
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
    saveProfessor(professor)
      .then(() => {
        toast.success("Professor saved.");
        history.push("/professors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return professors.length === 0  ? (
    <Spinner />
  ) : (
      <ProfessorForm
        professor={professor}
        errors={errors}     
        onChange={handleChange}           
        onSave={handleSave}
        saving={saving}
      />
    );
}

ManageProfessorPage.propTypes = {
  professor: PropTypes.object.isRequired,
  professors: PropTypes.array.isRequired,    
  getProfessors: PropTypes.func.isRequired,
  saveProfessor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getProfessorById(professors, id) {
  return professors.find(professor => professor.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const professor =
    id && state.professors.length > 0
      ? getProfessorById(state.professors, id)
      : newProfessor;
  return {
    professor,    
    professors: state.professors
  };
}

const mapDispatchToProps = {  
  getProfessors,
  saveProfessor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProfessorPage);
