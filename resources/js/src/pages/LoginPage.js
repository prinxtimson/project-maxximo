import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { loginUser } from "../actions/auth";
import { connect } from "react-redux";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginUser(email.trim(), password);
    };

    return (
        <MainContainer>
            <div className="card my-5 m-auto p-4" style={{ maxWidth: "540px" }}>
                <div className="card-body">
                    <h1 className="card-title text-primary text-center">
                        Sign In
                    </h1>
                    <p className="lead text-center">
                        <i className="fas fa-user"></i> Sign Into Your Account
                    </p>
                    <form onSubmit={handleOnSubmit} className="form row g-3 ">
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
                        <div className="my-1">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <button
                                className="btn btn-primary btn-lg"
                                type="submit"
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
        </MainContainer>
    );
};

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
