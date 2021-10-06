import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { resetPassword } from "../actions/auth";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import ReactGA from "react-ga";

const ResetPasswordPage = ({
    setAlert,
    isAuthenticated,
    match: { params },
    resetPassword,
    alerts,
}) => {
    const history = useHistory();
    const search = new URLSearchParams(useLocation().search);
    const [formData, setFormData] = useState({
        email: search.get("email"),
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);

    const { password, password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== password_confirmation) {
            setAlert("Password do not match", "danger");
            return;
        }
        setLoading(true);
        resetPassword(formData, params.token, history);
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="card my-5 m-auto p-2" style={{ maxWidth: "440px" }}>
                <div className="card-body">
                    <h1 className="card-title text-primary text-center">
                        Reset Password
                    </h1>
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
    alerts: state.alert,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { setAlert, resetPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
