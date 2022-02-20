import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Dashboard = ({ user }) => {
    const { t } = useTranslation(["dashboard"]);

    return (
        <div className="container-fluid p-4">
            <h1 className="fw-bold mb-4">
                {t("index.welcome")} <span>{user?.name.split(" ")[0]}</span>
            </h1>
            <div className="">
                <img
                    style={{ width: "100%" }}
                    src="/images/elint.jpg"
                    alt="Elint Dashboard"
                />
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(Dashboard);
