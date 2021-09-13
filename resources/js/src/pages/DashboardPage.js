import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardContainer from "../components/DashboardContainer";

const DashboardPage = ({ loading }) => {
    return (
        <DashboardContainer>
            <div className="container">
                <h1>Dashboard ....</h1>
            </div>
        </DashboardContainer>
    );
};

DashboardPage.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(DashboardPage);
