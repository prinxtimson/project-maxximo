import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const SubcriptionPage = ({ isAuthenticated }) => {
    const { t } = useTranslation(["subscription"]);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
    return (
        <MainContainer>
            <div className="bg-white">
                <div
                    className="p-5"
                    style={{ backgroundColor: "#00a7ad", height: 200 }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h1 className="fw-bold text-white">
                                    {t("title")}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container py-3">
                    <main>
                        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                            <h1 className="display-4 fw-normal">
                                {t("sub_title")}
                            </h1>
                            <p className="fs-5 text-muted">{t("p")}</p>
                        </div>
                        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">
                                            {t("basic")}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            $10
                                            <small className="text-muted fw-light">
                                                /m
                                            </small>
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                        </ul>
                                        <Link
                                            type="button"
                                            className="w-100 btn btn-lg btn-outline-primary"
                                            to={
                                                isAuthenticated
                                                    ? "/subscribe/basic"
                                                    : "/login"
                                            }
                                        >
                                            {t("subscribe_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">
                                            {t("essentials")}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            $15
                                            <small className="text-muted fw-light">
                                                /m
                                            </small>
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                        </ul>
                                        <Link
                                            type="button"
                                            className="w-100 btn btn-lg btn-primary text-white"
                                            to={
                                                isAuthenticated
                                                    ? "/subscribe/essentials"
                                                    : "/login"
                                            }
                                        >
                                            {t("subscribe_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                    <div className="card-header py-3 text-white bg-primary border-primary">
                                        <h4 className="my-0 fw-normal">
                                            {t("platinum")}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            $29
                                            <small className="text-muted fw-light">
                                                /m
                                            </small>
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                            <li>Lorem ipsum dolor sit</li>
                                        </ul>
                                        <Link
                                            type="button"
                                            className="w-100 btn btn-lg btn-primary text-white"
                                            to={
                                                isAuthenticated
                                                    ? "/subscribe/platinum"
                                                    : "/login"
                                            }
                                        >
                                            {t("subscribe_now")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </MainContainer>
    );
};

SubcriptionPage.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SubcriptionPage);
