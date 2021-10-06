import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import ReactGA from "react-ga";

const HomePage = ({ isAuthenticated, loading }) => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
    return (
        <MainContainer>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <h1
                            className="display-1 fw-bold"
                            style={{ color: "blue" }}
                        >
                            Insights
                        </h1>
                        <h2 className="">
                            Get solutions tailored to your business options
                        </h2>
                        <div className="d-grid gap-2 d-md-block">
                            {loading
                                ? null
                                : !isAuthenticated && (
                                      <Link
                                          className="btn btn-primary text-white"
                                          type="button"
                                          to="/register"
                                      >
                                          Start Your 14-day Free Trial
                                      </Link>
                                  )}
                        </div>
                    </div>
                    <div className="col d-sm-none d-md-block">
                        <img
                            style={{ width: "100%" }}
                            src="/images/metrix.png"
                            alt="Metrix"
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

HomePage.propTypes = {
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(HomePage);
