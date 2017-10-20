import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const fields = [
    {
        name: 'email',
        type: 'text',
        label: 'Email:',
        errorMessage: 'Please enter an email.'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password:',
        errorMessage: 'Please enter a password.'
    },
    {
        name: 'passwordConfirm',
        type: 'password',
        label: 'Password Confirm:',
        errorMessage: 'Please enter a password confirmation.'
    }
];

class Signup extends Component {
    handleFormSubmit(values) {
        this.props.signup(values);
    }
    renderInput = ({ label, type, ...field }) => {
        const { touched, error } = field.meta;
        return (
            <fieldset className="form-group">
                <label>
                    {label}
                </label>

                <input {...field.input} type={type} className="form-control" />
                {touched &&
                    error &&
                    <div className="error">
                        {field.meta.error}
                    </div>}
            </fieldset>
        );
    };
    renderAlert = () => {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <stong>Oops!</stong> {this.props.errorMessage}
                </div>
            );
        }
    };
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {fields.map(f => {
                    return (
                        <Field
                            key={f.name}
                            name={f.name}
                            component={this.renderInput}
                            label={f.label}
                            type={f.type}
                        />
                    );
                })}
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        );
    }
}

function validate(values) {
    let errors = {};
    const { email, password, passwordConfirm } = values;
    fields.forEach(f => {
        if (!values[f.name]) {
            errors[f.name] = f.errorMessage;
        }
    });
    if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        ) &&
        email &&
        email.length > 0
    ) {
        errors.email = 'You must enter a valid email address';
    }

    if (password !== passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
    }
    return errors;
}

function mapStateToProps({ auth }) {
    return { errorMessage: auth.error };
}

export default reduxForm({
    form: 'signup',
    validate
})(connect(mapStateToProps, { signup: actions.signup })(Signup));
