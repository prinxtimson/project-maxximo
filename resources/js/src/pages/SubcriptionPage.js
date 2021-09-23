import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SubcriptionPage = ({ isAuthenticated }) => {
    return (
        <MainContainer>
            <div className="container py-3">
                <main>
                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">
                            Subscription Plans
                        </h1>
                        <p className="fs-5 text-muted">
                            Find the plan that will help your brand grow.
                        </p>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Basic</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">
                                        $10
                                        <small className="text-muted fw-light">
                                            /mo
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
                                        Subscribe Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">
                                        Essentials
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">
                                        $15
                                        <small className="text-muted fw-light">
                                            /mo
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
                                        Subscribe Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                <div className="card-header py-3 text-white bg-primary border-primary">
                                    <h4 className="my-0 fw-normal">Platinum</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">
                                        $29
                                        <small className="text-muted fw-light">
                                            /mo
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
                                        Subscribe Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
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
