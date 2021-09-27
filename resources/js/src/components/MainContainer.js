import React, { Fragment } from "react";
import { connect } from "react-redux";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const MainContainer = ({ children, alerts }) => {
    return (
        <Fragment>
            <div
                className="position-fixed"
                style={{ zIndex: 10, top: 60, right: 20 }}
            >
                {alerts.map(
                    (alert) =>
                        alert.alertType === "success" && (
                            <div
                                key={alert.id}
                                className="toast align-items-center text-white bg-success border-0 my-2 show"
                                role="alert"
                                aria-live="assertive"
                            >
                                <div className="toast-body">{alert.msg}</div>
                            </div>
                        )
                )}
            </div>
            <div className="d-flex flex-column flex-grow-1 bg-white">
                <MainHeader />
                <div className="container-fluid flex-grow-1 flex-column d-flex justify-content-center">
                    {children}
                </div>
                <MainFooter />
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(MainContainer);
