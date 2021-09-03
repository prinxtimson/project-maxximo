import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../actions/auth";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";

const ForgotPasswordPage = ({ isAuthenticated, requestPasswordReset }) => {
    const [email, setEmail] = useState("");

    const handleOnChange = (e) => setEmail(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        requestPasswordReset(email.trim(), handleSuccess);
    };

    const handleSuccess = () => {
        setEmail("");
    };

    return (
        <MainContainer>
            <div className="card my-5 m-auto p-4" style={{ maxWidth: "540px" }}>
                <div className="card-body">
                    <h1 className="card-title text-primary text-center">
                        Request Password Reset
                    </h1>
                    <p className="lead text-center">
                        <i className="fas fa-user"></i> Enter your email to
                        request password reset.
                    </p>
                    <form onSubmit={handleOnSubmit} className="form row g-3">
                        <div className="form-floating col-12">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                value={email}
                                placeholder="Email"
                                id="floatingInput"
                                name="email"
                                onChange={handleOnChange}
                                required
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <button
                                className="btn btn-primary btn-lg"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <p className="my-1">
                        Remember password? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </MainContainer>
    );
};

ForgotPasswordPage.propTypes = {
    requestPasswordReset: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { requestPasswordReset })(
    ForgotPasswordPage
);
