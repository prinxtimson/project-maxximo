import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { changePassword } from "../actions/auth";
import { connect } from "react-redux";
import ReactGA from "react-ga";

const ChangePasswordPage = ({ loading, changePassword, alerts }) => {
    const [formData, setFormData] = useState({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const { password, new_password, new_password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        changePassword(formData);
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="bg-white">
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "440px" }}
                >
                    <div className="card-body">
                        <h1 className="card-title text-primary text-center">
                            Change Password
                        </h1>
                        {alerts.map(
                            (alert) =>
                                alert.alertType === "danger" && (
                                    <div
                                        key={alert.id}
                                        className={`alert alert-${alert.alertType} py-2`}
                                        role="alert"
                                    >
                                        {alert.msg}
                                    </div>
                                )
                        )}
                        <form
                            onSubmit={handleOnSubmit}
                            className="form row g-3"
                        >
                            <div className="form-floating col-12">
                                <input
                                    type="password"
                                    className="form-control form-control-lg mb-3"
                                    placeholder="Old Password"
                                    name="password"
                                    onChange={handleOnChange}
                                    id="floatingInput"
                                    value={password}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    Old password
                                </label>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    value={new_password}
                                    placeholder="New password"
                                    id="floatingInput"
                                    name="new_password"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    New password
                                </label>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    value={new_password_confirmation}
                                    placeholder="Confirm new password"
                                    id="floatingInput"
                                    name="new_password_confirmation"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    Confirm new password
                                </label>
                            </div>
                            <div className="d-grid gap-2 col-12 mx-auto">
                                <button
                                    className={`btn btn-${
                                        loading ? "secondary" : "primary"
                                    } btn-lg text-white`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

ChangePasswordPage.propTypes = {
    loading: PropTypes.bool,
    changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    alerts: state.alert,
});

export default connect(mapStateToProps, { changePassword })(ChangePasswordPage);
