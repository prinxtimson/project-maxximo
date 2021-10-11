import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getAnalytics } from "../actions/analytics";
import { connect } from "react-redux";

const AdminDashboard = ({ getAnalytics }) => {
    useEffect(() => {
        getAnalytics();
    }, []);
    return <div></div>;
};

AdminDashboard.propTypes = {
    getAnalytics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getAnalytics })(AdminDashboard);
