import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { resetPassword } from "../actions/auth";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";

const ResetPasswordPage = ({
    setAlert,
    isAuthenticated,
    match: { params },
    resetPassword,
}) => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert("Password do not match", "danger");
            return;
        }

        resetPassword(password, params.token, handleSuccess);
    };

    const handleSuccess = () => {
        setFormData({
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <MainContainer>
            <div className="card my-5 m-auto p-4" style={{ maxWidth: "540px" }}>
                <div className="card-body">
                    <h1 className="card-title text-primary text-center">
                        Reset Password
                    </h1>
                    <form onSubmit={handleOnSubmit} className="form row g-3">
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
                                value={confirmPassword}
                                placeholder="Confirm password"
                                id="floatingInput"
                                name="confirmPassword"
                                onChange={handleOnChange}
                                required
                            />
                            <label htmlFor="floatingInput">
                                Confirm Password
                            </label>
                        </div>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <button
                                className="btn btn-primary btn-lg"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainContainer>
    );
};

ResetPasswordPage.propTypes = {
    setAlert: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    alert: state.alert,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { setAlert, resetPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
