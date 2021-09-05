import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../actions/auth";

const MainHeader = ({ isAuthenticated, logoutUser, loading }) => {
    const history = useHistory();
    return (
        <nav className="navbar navbar-expand-md navbar-light ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/images/Elint_x.png"
                        alt="Elint X"
                        width="50"
                        height="55"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="#"
                            >
                                Solutions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                About us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {!loading && !isAuthenticated ? (
                            <>
                                <li className="nav-item mx-2 my-sm-2">
                                    <Link
                                        className="btn btn-primary text-white"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item mx-2 my-sm-2">
                                    <Link
                                        className="btn btn-outline-primary"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item mx-2 my-sm-2">
                                    <Link
                                        className="nav-link"
                                        to="/change-password"
                                    >
                                        Change Password
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-warning"
                                        href="#"
                                        onClick={() => logoutUser(history)}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

export default connect(mapStateToProps, { logoutUser })(MainHeader);
