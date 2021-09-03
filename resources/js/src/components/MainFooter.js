import React from "react";

const MainFooter = () => {
    return (
        <div className="row">
            <div className="col">
                <p className="text-muted">
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
                        <a className="nav-link" href="#">
                            Terms &amp; Conditions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Privacy Policy
                        </a>
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
