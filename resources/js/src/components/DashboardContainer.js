import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MainFooter from "./MainFooter";
import { logoutUser } from "../actions/auth";

const DashboardContainer = ({ children, logoutUser }) => {
    const history = useHistory();
    const [isActive, setIsActive] = React.useState(false);

    const handleToggle = () => setIsActive(!isActive);
    return (
        <div>
            <div className="d-flex flex-column" style={{ minHeight: "95vh" }}>
                <nav className="navbar navbar-light bg-light pt-2">
                    <button
                        className="navbar-toggler mx-2 d-lg-none"
                        id="sidebarCollapse"
                        type="button"
                        onClick={handleToggle}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="flex-grow-1">
                        <Link
                            id="brand"
                            className="navbar-brand d-lg-none"
                            to="/"
                        >
                            <img
                                src="/images/Elint_x.png"
                                alt="Elint X"
                                width="50"
                                height="55"
                            />
                        </Link>
                    </div>
                    <div className="flex-shrink-0 d-flex align-items-center">
                        <div className="me-2">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </div>
                        <div className="d-flex mx-2 align-items-center">
                            <h5 className="d-none d-md-block">Welcome, John</h5>
                            <div className="dropdown mx-2">
                                <a
                                    href="#"
                                    className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                                    id="dropdownUser1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="https://github.com/mdo.png"
                                        alt=""
                                        className="rounded-circle me-2"
                                        width="32"
                                        height="32"
                                    />
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow p-3"
                                    aria-labelledby="dropdownUser1"
                                >
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/change-password"
                                        >
                                            Change Password
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            type="button"
                                            onClick={() => logoutUser(history)}
                                        >
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="wrapper d-flex align-items-stretch flex-grow-1">
                    <nav
                        className={`sidebar flex-column flex-shrink-0 px-3 py-2 text-dark bg-light d-flex ${
                            isActive ? "active" : null
                        }`}
                        id="sidebarMenu"
                    >
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link
                                    to="#"
                                    className="nav-link text-dark"
                                    aria-current="page"
                                >
                                    Food
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="nav-link text-dark">
                                    Health
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="nav-link text-dark">
                                    Entertainment
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="nav-link text-dark">
                                    Sport
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </nav>
                    <main className="flex-grow-1">{children}</main>
                </div>
                <MainFooter />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

export default connect(mapStateToProps, { logoutUser })(DashboardContainer);
