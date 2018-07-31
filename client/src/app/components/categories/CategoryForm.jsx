import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <input type={type} placeholder={placeholder} {...input} />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <h1>New Category</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          {/* Description */}
          <Field name="description" component={renderField} type="text" placeholder="Description" />

          {/* Server error message */}
          <div>
            { this.props.errorMessage && this.props.errorMessage.signup &&
                <div className="error-container">Oops! { this.props.errorMessage.signup }</div> }
          </div>

          {/* Submit button */}
          <button type="submit" className="btn">Save</button>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {};
  const fields = ['description'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if(props.description && props.description.length < 3) {
    errors.description = "minimum of 4 characters";
  }

  if(props.description && props.description.length > 20) {
    errors.description = "maximum of 20 characters";
  }
  
  return errors;
};


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

CategoryForm = reduxForm({ form: 'signup', validate })(CategoryForm);

export default connect(mapStateToProps, actions)(CategoryForm);
