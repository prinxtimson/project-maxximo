import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../actions/auth";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = ({
    isAuthenticated,
    requestPasswordReset,
    alerts,
}) => {
    const { t } = useTranslation(["forgot-password"]);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => setEmail(e.target.value);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        requestPasswordReset(email.trim(), handleSuccess);
    };

    const handleSuccess = () => {
        setEmail("");
        setLoading(false);
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
                                    {t("remember_password") + " "}
                                    <Link to="/login">{t("login")}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-sm-none d-md-block">
                        <img
                            style={{ width: "100%" }}
                            src="/images/forgot_pass.png"
                            alt="Forgot Password"
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

ForgotPasswordPage.propTypes = {
    requestPasswordReset: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts: state.alert,
});

export default connect(mapStateToProps, { requestPasswordReset })(
    ForgotPasswordPage
);
