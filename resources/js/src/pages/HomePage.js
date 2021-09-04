import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";

const HomePage = (props) => {
    return (
        <MainContainer>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <h1 className="display-1 fw-bold">Insights</h1>
                        <h2 className="">
                            Get solutions tailored to your business options
                        </h2>
                        <div className="d-grid gap-2 d-md-block">
                            <button
                                className="btn btn-primary text-white"
                                type="button"
                            >
                                Start Your 14-day Free Trial
                            </button>
                        </div>
                    </div>
                    <div className="col">
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

HomePage.propTypes = {};

export default HomePage;
