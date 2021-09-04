import React from "react";
import { Link } from "react-router-dom";

const MainFooter = () => {
    return (
        <div className="row align-items-center">
            <div className="col">
                <p className="text-muted mb-0">
                    {"Copyright © "}
                    <a color="inherit" href="https://tritekconsulting.co.uk">
                        Tritek Consulting Ltd
                    </a>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </p>
            </div>
            <div className="col">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/terms-and-conditions">
                            Terms &amp; Conditions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/privacy-policy">
                            Privacy Policy
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi-facebook"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi-twitter"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MainFooter;
