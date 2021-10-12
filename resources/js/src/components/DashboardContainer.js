import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import MainFooter from "./MainFooter";
import { logoutUser } from "../actions/auth";

const DashboardContainer = ({ children, logoutUser, user, alerts }) => {
    const { routeName } = useParams();
    const dropBtnRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => setIsActive(!isActive);

    return (
        <div className="flex-grow-1 d-flex flex-column">
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

            <div className="wrapper d-flex align-items-stretch flex-grow-1">
                <nav
                    className={`sidebar flex-column flex-shrink-0 px-3 py-2 text-white d-flex ${
                        isActive ? "active" : null
                    }`}
                    style={{ backgroundColor: "#00a7ad" }}
                    id="sidebarMenu"
                >
                    <Link id="brand" className="navbar-brand mx-auto" to="/">
                        <img
                            src="/images/Elint_x.png"
                            alt="Elint X"
                            width="69"
                            height="68"
                        />
                    </Link>
                    <ul className="nav nav-pills flex-column mb-auto py-5">
                        {user?.roles[0]?.name === "admin" ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/dashboard/visit"
                                        className={`nav-link fw-bold ${
                                            routeName === "visit"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                        aria-current="page"
                                    >
                                        No of Visit
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/duration"
                                        className={`nav-link fw-bold ${
                                            routeName === "duration"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Duration
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/page-visited"
                                        className={`nav-link fw-bold ${
                                            routeName === "page-visited"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Page Visited
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/bounce-rate"
                                        className={`nav-link fw-bold ${
                                            routeName === "bounce-rate"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Bounce Rate
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/users"
                                        className={`nav-link fw-bold ${
                                            routeName === "users"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Users
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/dashboard/food"
                                        className={`nav-link fw-bold ${
                                            routeName === "food"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                        aria-current="page"
                                    >
                                        Food
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/health"
                                        className={`nav-link fw-bold ${
                                            routeName === "health"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Health
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/entertainment"
                                        className={`nav-link fw-bold ${
                                            routeName === "entertainment"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Entertainment
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/sport"
                                        className={`nav-link fw-bold ${
                                            routeName === "sport"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Sport
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/account"
                                        className={`nav-link fw-bold ${
                                            routeName === "account"
                                                ? "active-tab"
                                                : "text-white"
                                        }`}
                                    >
                                        Account
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <hr />
                </nav>
                <main className="flex-grow-1">
                    <nav
                        className="navbar navbar-light bg-white py-0"
                        style={{ minHeight: 60 }}
                    >
                        <div className="container-fluid px-3">
                            <button
                                className="navbar-toggler mx-2 d-xl-none"
                                id="sidebarCollapse"
                                type="button"
                                onClick={handleToggle}
                            >
                                <span className="navbar-toggler-icon text-primary"></span>
                            </button>
                            <Link
                                id="brand"
                                className={`navbar-brand d-xl-none ${
                                    isActive ? "d-none" : "d-block"
                                }`}
                                to="/"
                            >
                                <img
                                    src="/images/Elint_x.png"
                                    alt="Elint X"
                                    width="69"
                                    height="68"
                                />
                            </Link>
                            <div className="flex-grow-1 py-2"></div>
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
                                        onFocus={() =>
                                            dropBtnRef.current.click()
                                        }
                                        onBlur={() =>
                                            dropBtnRef.current.click()
                                        }
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
                                            searchResult.map(
                                                (result, index) => (
                                                    <li
                                                        key={index}
                                                        className=""
                                                    >
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Action
                                                        </a>
                                                    </li>
                                                )
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="d-flex mx-2 align-items-center">
                                    <h5
                                        className="d-none d-md-block fw-bold"
                                        style={{ color: "#00a7ad" }}
                                    >
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
                                            <h5
                                                className="d-md-none py-2 fw-bold"
                                                style={{ color: "#00a7ad" }}
                                            >
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
                    {children}
                    <MainFooter />
                </main>
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
