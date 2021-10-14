import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../actions/auth";

const MainHeader = ({ isAuthenticated, logoutUser, loading, user }) => {
    const dropBtnRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [searchResult, setSearchResult] = useState([]);
    const history = useHistory();

    useEffect(() => {
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const updateWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    return (
        <nav className="navbar navbar-expand-xl navbar-light py-0">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/images/Elint_x.png"
                        alt="Elint X"
                        width="69"
                        height="68"
                    />
                </Link>
                <div
                    className="collapse navbar-collapse d-none d-xl-block"
                    id="navbarNav"
                >
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                aria-current="page"
                                to="/solution"
                            >
                                Solutions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                aria-current="page"
                                to="/subscribe"
                            >
                                Subscription
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                to="/about-us"
                            >
                                About us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                to="/contact-us"
                            >
                                Contact us
                            </Link>
                        </li>
                        {!loading && isAuthenticated && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white fw-bold"
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                    {loading
                        ? null
                        : !isAuthenticated && (
                              <div className="d-grid gap-2 d-md-block col-md-3 col-sm-6 col-xs-12">
                                  <Link
                                      className="btn btn-light text-primary"
                                      to="/register"
                                  >
                                      Register
                                  </Link>
                                  <span className=" mx-2" />
                                  <Link
                                      className="btn btn-outline-light"
                                      to="/login"
                                  >
                                      Login
                                  </Link>
                              </div>
                          )}
                </div>
                {loading ? null : isAuthenticated ? (
                    <div className="flex-shrink-0 d-flex justify-content-end">
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
                                        <p className="px-3">No result found</p>
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
                            <h5 className="d-none d-md-block text-white fw-bold">
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
                                            onClick={() => logoutUser(history)}
                                        >
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
                    </div>
                ) : (
                    <div className="flex-shrink-0 d-flex justify-content-end">
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
                    </div>
                )}
                <div
                    className={`collapse d-xl-none ${
                        screenWidth < 1200 ? "navbar-collapse" : null
                    }`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                aria-current="page"
                                to="/solution"
                            >
                                Solutions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                aria-current="page"
                                to="/subscribe"
                            >
                                Subscription
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                to="/about-us"
                            >
                                About us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white fw-bold"
                                to="/contact-us"
                            >
                                Contact us
                            </Link>
                        </li>
                        {!loading && isAuthenticated && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white fw-bold"
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                    {loading
                        ? null
                        : !isAuthenticated && (
                              <div className="d-grid gap-2 d-md-block col-md-3 col-sm-6 col-xs-12">
                                  <Link
                                      className="btn btn-light text-primary"
                                      to="/register"
                                  >
                                      Register
                                  </Link>
                                  <span className=" mx-2" />
                                  <Link
                                      className="btn btn-outline-light"
                                      to="/login"
                                  >
                                      Login
                                  </Link>
                              </div>
                          )}
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(MainHeader);
