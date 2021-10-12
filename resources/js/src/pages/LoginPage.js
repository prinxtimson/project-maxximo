import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { loginUser } from "../actions/auth";
import { connect } from "react-redux";
import ReactGA from "react-ga";

const LoginPage = ({ loginUser, alerts, loading }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const { email, password } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginUser(email.trim(), password, history);
    };

    return (
        <MainContainer>
            <div className="container-fluid bg-white">
                <div className="row align-items-center">
                    <div className="col">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "440px" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title text-primary text-center">
                                    Sign In
                                </h1>
                                <p className="lead text-center">
                                    <i className="fas fa-user"></i> Sign Into
                                    Your Account
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
                                <form
                                    onSubmit={handleOnSubmit}
                                    className="form row g-3 "
                                >
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
                                        <label htmlFor="floatingInput">
                                            Email address
                                        </label>
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
                                        <label htmlFor="floatingInput">
                                            Password
                                        </label>
                                    </div>
                                    <div className="my-1">
                                        <Link to="/forgot-password">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button
                                            className={`btn btn-${
                                                loading
                                                    ? "secondary"
                                                    : "primary"
                                            } btn-lg text-white`}
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Signin
                                        </button>
                                    </div>
                                </form>
                                <p className="my-1">
                                    Don't have an account?{" "}
                                    <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-sm-none d-md-block">
                        <img
                            style={{ width: "100%" }}
                            src="/images/login.png"
                            alt="Login"
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    alerts: state.alert,
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
