import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import MainContainer from "../components/MainContainer";
import { loginUser } from "../actions/auth";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const LoginPage = ({ loginUser, alerts, loading }) => {
    const { t } = useTranslation(["login"]);
    const history = useHistory();
    const [checkBox, setCheckBox] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        setFormData({
            email: localStorage.getItem("maxximo_user_email") || "",
            password: localStorage.getItem("maxximo_user_pass") || "",
        });
    }, []);

    const { email, password } = formData;

    const toggleCheckBox = () => setCheckBox(!checkBox);

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (checkBox) {
            localStorage.setItem("maxximo_user_email", email);
            localStorage.setItem("maxximo_user_pass", password);
        }
        loginUser(email.trim(), password, history);
    };

    const onChange = (val) => {
        console.log(val);
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
                                    <div className="my-1 d-flex justify-content-between">
                                        <div className="">
                                            <div class="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked"
                                                    checked={checkBox}
                                                    onClick={toggleCheckBox}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="flexCheckChecked"
                                                >
                                                    {t("remember_me")}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="">
                                            <Link to="/forgot-password">
                                                {t("forgot_password")}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="">
                                        <ReCAPTCHA
                                            sitekey="6LecV4AeAAAAAK2akj_MsDO7nm4IzleCo6MY2rVX"
                                            onChange={onChange}
                                        />
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
                                    {`${t("do_not_have_account")} `}
                                    <Link to="/register">{t("register")}</Link>
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
