import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";

const HomePage = (props) => {
    return (
        <MainContainer>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Insights</h1>
                        <h3>Get solutions tailored to your business options</h3>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <button className="btn">
                                    Start Your 14-day Free Trial
                                </button>
                            </div>
                            <div className="col-12 col-lg-6">
                                <button className="btn">Register</button>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </MainContainer>
    );
};

HomePage.propTypes = {};

export default HomePage;
