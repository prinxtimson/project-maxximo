import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";

const SolutionPage = () => {
    return (
        <MainContainer>
            <div className="">
                <div
                    className="p-5"
                    style={{ backgroundColor: "#1976d2", height: 350 }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h1 className="fw-bold text-white">ELINT-X</h1>
                                <h5 className="text-white">
                                    From real time raw data to up-to date
                                    reports, Elint-X platform is your one-stop
                                    shop for all your data and trend analysis
                                    enquiries leaving you time to focus on your
                                    business. Insights gained from this platform
                                    will give you the strategies needed to
                                    leverage data to make informed business
                                    decisions.
                                </h5>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6 pe-4">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    Who Has The Most to Gain from Elint-X
                                </h2>
                                <h5>
                                    Start-up businesses, Existing businesses,
                                    Academic and Market Researchers, Developers.
                                </h5>
                            </div>
                            <div className="col-6">
                                <img
                                    src="/images/Segment.svg"
                                    alt="man and a lady in a meeting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5" style={{ backgroundColor: "#f7f9fc" }}>
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <img
                                    src="/images/analytics.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                            <div className="col-6 pe-4">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    Use Driven Methods to Apply Insights
                                </h2>
                                <h5>
                                    Get the right tools to capture, evaluate
                                    real time data to gain the insights needed
                                    to make informed business decisions to match
                                    your business options.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    Branding and Rebranding
                                </h2>
                                <h5>
                                    Gain insights needed to build, evaluate, and
                                    improve your online presence to attract more
                                    customers, improve customer engagement and
                                    retain customers.
                                </h5>
                            </div>
                            <div className="col-6">
                                <img
                                    src="/images/Charts.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5" style={{ backgroundColor: "#f7f9fc" }}>
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <img
                                    src="/images/Growth.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                            <div className="col-6">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    Competitive Analysis
                                </h2>
                                <h5>
                                    Real time data reporting delivers accurate
                                    trend analysis helping you to leverage the
                                    edge you need over your business
                                    competitors.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="container py-2">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <h2
                                    className="fw-bold"
                                    style={{ color: "#1976d2" }}
                                >
                                    What It does for You
                                </h2>
                                <h5>
                                    With an easy-to use intuitive dashboard with
                                    infographics, download options and flexible
                                    API, you can process, analyse data and share
                                    reports in a snap. Elint-X also offers built
                                    in technical support that secures your data
                                    while giving you the control you need.
                                </h5>
                            </div>
                            <div className="col-6">
                                <img
                                    src="/images/Investing.svg"
                                    alt="man sitting"
                                    width="100%"
                                    height="300"
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

SolutionPage.propTypes = {};

export default SolutionPage;
