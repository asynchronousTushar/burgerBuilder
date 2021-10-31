import React from "react";
import { Formik } from "formik";
import * as authActionCreator from '../../redux/authActionCreator';
import { connect } from "react-redux";
import { Spinner, Alert } from "reactstrap";

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(authActionCreator.auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

class Auth extends React.Component {
    state = {
        mode: "Log In"
    }

    handleMode = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Log In" : "Sign Up"
        });
    }

    render() {
        let err = null;
        if (this.props.authFailedMsg !== null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }

        let form = null;

        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form =
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            confirmPassword: ""
                        }
                    }

                    onSubmit={
                        values => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }

                    validate={
                        values => {
                            const errors = {};

                            if (!values.email) {
                                errors.email = "Required";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = "Invalid email address";
                            }

                            if (!values.password) {
                                errors.password = "Required";
                            } else if (values.password.length < 6) {
                                errors.password = "Password must be atleast 6 characters!";
                            }

                            if (this.state.mode === "Sign Up") {
                                if (!values.confirmPassword) {
                                    errors.confirmPassword = "Required";
                                } else if (values.password !== values.confirmPassword) {
                                    errors.confirmPassword = "Password field doesn't match!";
                                }
                            }

                            return errors;
                        }
                    }

                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{ border: "2px solid grey", padding: "20px", marginTop: "10px", borderRadius: "7px" }}>
                            <button className="btn btn-block btn-success font-weight-bold" onClick={this.handleMode}>Switch to {this.state.mode === "Sign Up" ? "Log In" : "Sign Up"}</button>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <input name="email" placeholder="Enter your email" className="form-control" value={values.email} onChange={handleChange} />
                                <span style={{ color: 'red' }}>{errors.email}</span>
                                <br />
                                <input name="password" placeholder="Enter your password" className="form-control" value={values.password} onChange={handleChange} />
                                <span style={{ color: 'red' }}>{errors.password}</span>
                                <br />
                                {this.state.mode === "Sign Up" ?
                                    <div>
                                        <input name="confirmPassword" placeholder="Confirm password" className="form-control" value={values.confirmPassword} onChange={handleChange} />
                                        <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                                        <br />
                                    </div>
                                    : null}

                                <br />
                                <button type="submit" className="btn btn-success btn-lg">{this.state.mode}</button>
                            </form>
                        </div>
                    )}

                </Formik>
        }
        return (
            <div>
                <div>{err}</div>
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);