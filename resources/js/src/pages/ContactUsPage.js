import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { connect } from "react-redux";
import emailjs from "emailjs-com";
import { setAlert } from "../actions/alert";
import ReactGA from "react-ga";

const ContactUsPage = ({ alerts, setAlert }) => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const { name, email, message } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
            .sendForm(
                process.env.MIX_SERVICE_ID,
                process.env.MIX_TEMPLATE_ID,
                e.target,
                process.env.MIX_USER_ID
            )
            .then(
                (result) => {
                    formRef.current?.reset();
                    setLoading(false);
                    setAlert(
                        "Your message had been submitted successfuly",
                        "success"
                    );
                    console.log(result.text);
                },
                (error) => {
                    setLoading(false);
                    console.log(error.text);
                    setAlert(error.text, "danger");
                }
            );
    };

    return (
        <MainContainer>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "440px" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title text-primary text-center">
                                    Contact Us
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
                                    className="form row g-3 "
                                    ref={formRef}
                                >
                                    <div className="form-floating col-12">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            value={name}
                                            placeholder="Name"
                                            id="floatingInput"
                                            name="name"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            Name
                                        </label>
                                    </div>
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
                                        <label htmlFor="floatingInput">
                                            Email address
                                        </label>
                                    </div>
                                    <div className="form-floating col-12">
                                        <textarea
                                            className="form-control"
                                            id="floatingInput"
                                            value={message}
                                            style={{ height: 150 }}
                                            name="message"
                                            onChange={handleOnChange}
                                            required
                                        ></textarea>

                                        <label htmlFor="floatingInput">
                                            Message
                                        </label>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button
                                            className={`btn btn-${
                                                loading
                                                    ? "secondary"
                                                    : "primary"
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
                    <div className="col d-sm-none d-md-block">
                        <img
                            style={{ width: "100%" }}
                            src="/images/contact_us.png"
                            alt="Contact us illustration"
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

ContactUsPage.propTypes = {
    alerts: PropTypes.array,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(ContactUsPage);
