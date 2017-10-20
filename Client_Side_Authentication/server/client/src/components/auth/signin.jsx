import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
    }
    renderInput({ label, type, ...field }) {
        return (
            <fieldset className="form-group">
                <label>
                    {label}
                </label>
                <input {...field.input} type={type} className="form-control" />
            </fieldset>
        );
    }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <stong>Oops!</stong>
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    name="email"
                    component={this.renderInput}
                    label="Email:"
                    type="text"
                />
                <Field
                    name="password"
                    component={this.renderInput}
                    label="Password:"
                    type="password"
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">
                    Sign In
                </button>
            </form>
        );
    }
}

function mapStateToProps({ auth }) {
    return { errorMessage: auth.error };
}

export default reduxForm({
    form: 'signin'
})(connect(mapStateToProps, { signinUser: actions.signinUser })(Signin));
