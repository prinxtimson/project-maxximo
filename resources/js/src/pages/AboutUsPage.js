import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";

const AboutUsPage = () => {
    return (
        <MainContainer>
            <div className="">
                <div
                    className="p-5"
                    style={{ backgroundColor: "#1976d2", height: 200 }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h1 className="fw-bold text-white">About Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="d-flex justify-content-center">
                            <div className="p-4">
                                <div className="clearfix shadow-lg p-5 mb-5 rounded">
                                    <img
                                        src="/images/google_analytics.svg"
                                        alt="man and a lady in a meeting"
                                        className="col-md-6 float-md-end mb-3 ms-md-3"
                                        srcset=""
                                    />
                                    <h5 className="mb-4 text-muted fs-3">
                                        Today, more than at any other time in
                                        human existence, we need data to make
                                        fast, informed and qualitative decisions
                                        in the face of complex challenges.
                                    </h5>
                                    <h5 className="mb-4 text-muted fs-3">
                                        Elint-X provides access to vital
                                        resources to enable a global community
                                        aggregate solution to real life
                                        challenges.
                                    </h5>
                                    <h5 className="mb-4 text-muted fs-3">
                                        Our mission is to ensure we create a
                                        platform that provides a superlative
                                        user experience for analysing real-world
                                        data empowering individuals to make
                                        cutting edge decisions.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

AboutUsPage.propTypes = {};

export default AboutUsPage;
