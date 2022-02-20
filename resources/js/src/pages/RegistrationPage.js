import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { setAlert } from "../actions/alert";
import { registerUser } from "../actions/auth";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const RegistrationPage = ({
    setAlert,
    registerUser,
    isAuthenticated,
    alerts,
    loading,
}) => {
    const { t } = useTranslation(["register"]);
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const { name, email, password, password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== password_confirmation) {
            setAlert("Password do not match", "danger");
            return;
        }
        registerUser(formData, history);
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
                                    {t("title")}
                                </h1>
                                <p className="lead text-center">
                                    <i className="fas fa-user"></i>{" "}
                                    {t("sub_title")}
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
                                    className="form row g-3"
                                >
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
                                        <label htmlFor="floatingInput">
                                            {t("name")}
                                        </label>
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
                                        <label htmlFor="floatingInput">
                                            {t("email")}
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
                                            {t("password")}
                                        </label>
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
                                            {t("confirm_password")}
                                        </label>
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
                                            {t("btn_text")}
                                        </button>
                                    </div>
                                </form>
                                <p className="my-1">
                                    {`${t("have_account")} `}
                                    <Link to="/login">{t("login")}</Link>
                                </p>
                                <p className="text-muted mb-0 mt-4">
                                    {
                                        "By Submitting this form, I agree to Elint-X's "
                                    }
                                    <Link color="inherit" to="/privacy-policy">
                                        {t("privacy_policy")}
                                    </Link>
                                    {" and "}
                                    <Link
                                        color="inherit"
                                        to="/terms-and-conditions"
                                    >
                                        {t("terms_and_conditions")}
                                    </Link>
                                    {"."}
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
