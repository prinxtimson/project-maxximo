import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import DashboardContainer from "../components/DashboardContainer";
import UsersTable from "../components/UsersTable";

const DashboardPage = ({ loading }) => {
    const { routeName, id } = useParams();

    const renderComponent = (param) => {
        switch (param) {
            case "users":
                return <UsersTable />;
            default:
                return <h1>Dashboard ....</h1>;
        }
    };
    return (
        <DashboardContainer>
            <div className="container">{renderComponent(routeName)}</div>
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
