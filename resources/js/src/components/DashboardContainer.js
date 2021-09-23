import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MainFooter from "./MainFooter";
import { logoutUser } from "../actions/auth";

const DashboardContainer = ({ children, logoutUser, user, alerts }) => {
    const dropBtnRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => setIsActive(!isActive);

    return (
        <div>
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
            <div className="d-flex flex-column" style={{ minHeight: "95vh" }}>
                <nav className="navbar navbar-light bg-light py-0">
                    <div className="container-fluid px-3">
                        <button
                            className="navbar-toggler mx-2 d-lg-none"
                            id="sidebarCollapse"
                            type="button"
                            onClick={handleToggle}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="flex-grow-1">
                            <Link id="brand" className="navbar-brand" to="/">
                                <img
                                    src="/images/Elint_x.png"
                                    alt="Elint X"
                                    width="50"
                                    height="65"
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0 d-flex align-items-center">
                            <div className="me-2 dropdown">
                                <a
                                    className="d-none dropdown-toggle"
                                    type="button"
                                    ref={dropBtnRef}
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-auto-close="false"
                                    data-bs-display="static"
                                ></a>
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onFocus={() => dropBtnRef.current.click()}
                                    onBlur={() => dropBtnRef.current.click()}
                                />
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                    style={{ minWidth: 320 }}
                                >
                                    {searchResult.length === 0 ? (
                                        <li>
                                            <p className="px-3">
                                                No result found
                                            </p>
                                        </li>
                                    ) : (
                                        searchResult.map((result, index) => (
                                            <li key={index} className="">
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Action
                                                </a>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div className="d-flex mx-2 align-items-center">
                                <h5 className="d-none d-md-block">
                                    Welcome, {user?.name}
                                </h5>
                                <div className="dropdown mx-2">
                                    <a
                                        href="#"
                                        className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                                        id="dropdownUser1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src={user?.avatar}
                                            alt={user?.name}
                                            className="rounded-circle me-2"
                                            width="32"
                                            height="32"
                                        />
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow p-3"
                                        aria-labelledby="dropdownUser1"
                                    >
                                        <h5 className="d-md-none py-2 text-light">
                                            Welcome, {user?.name}
                                        </h5>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/profile"
                                            >
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
                                                onClick={() =>
                                                    logoutUser(history)
                                                }
                                            >
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
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
                            {user?.roles[0]?.name === "admin" ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="#"
                                            className="nav-link text-dark"
                                            aria-current="page"
                                        >
                                            Visit
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="nav-link text-dark"
                                        >
                                            Duration
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/subscribe"
                                            className="nav-link text-dark"
                                        >
                                            Subscribe
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/users"
                                            className="nav-link text-dark"
                                        >
                                            Users
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
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
                                        <Link
                                            to="#"
                                            className="nav-link text-dark"
                                        >
                                            Health
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="nav-link text-dark"
                                        >
                                            Entertainment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="nav-link text-dark"
                                        >
                                            Sport
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/subscribe"
                                            className="nav-link text-dark"
                                        >
                                            Subscribe
                                        </Link>
                                    </li>
                                </>
                            )}
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
    user: state.auth.user,
    alerts: state.alert,
});

export default connect(mapStateToProps, { logoutUser })(DashboardContainer);
