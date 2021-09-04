import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { setAlert } from "../actions/alert";
import { registerUser } from "../actions/auth";
import { connect } from "react-redux";

const RegistrationPage = ({
    setAlert,
    registerUser,
    isAuthenticated,
    alerts,
    loading,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { name, email, password, password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== password_confirmation) {
            setAlert("Password do not match", "danger");
            return;
        }
        registerUser(formData);
    };

    return (
        <MainContainer>
            <div className="card my-5 m-auto p-4" style={{ maxWidth: "540px" }}>
                <div className="card-body">
                    <h1 className="card-title text-primary text-center">
                        Sign Up
                    </h1>
                    <p className="lead text-center">
                        <i className="fas fa-user"></i> Create Your Account
                    </p>
                    {alerts.map(
                        (alert) =>
                            alert.alertType === "danger" && (
                                <div
                                    key={alert.id}
                                    className={`alert alert-${alert.alertType} py-2`}
                                    role="alert"
                                >
                                    {alert.msg}
                                </div>
                            )
                    )}
                    <form onSubmit={handleOnSubmit} className="form row g-3">
                        <div className="form-floating col-12">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Full name"
                                name="name"
                                id="floatingInput"
                                value={name}
                                onChange={handleOnChange}
                                required
                            />
                            <label htmlFor="floatingInput">Full name</label>
                        </div>
                        <div className="form-floating col-12">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                value={email}
                                placeholder="Email"
                                id="floatingInput"
                                name="email"
                                onChange={handleOnChange}
                                required
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating col-12">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                value={password}
                                placeholder="Password"
                                id="floatingInput"
                                name="password"
                                onChange={handleOnChange}
                                required
                            />
                            <label htmlFor="floatingInput">Password</label>
                        </div>
                        <div className="form-floating col-12">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                value={password_confirmation}
                                placeholder="Confirm password"
                                id="floatingInput"
                                name="password_confirmation"
                                onChange={handleOnChange}
                                required
                            />
                            <label htmlFor="floatingInput">
                                Confirm Password
                            </label>
                        </div>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <button
                                className={`btn btn-${
                                    loading ? "secondary" : "primary"
                                } btn-lg text-white`}
                                type="submit"
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p className="my-1">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </MainContainer>
    );
};

RegistrationPage.propTypes = {
    registerUser: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

const mapDispatchToProps = { setAlert, registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
