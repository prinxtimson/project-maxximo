import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CookieConsent from "react-cookie-consent";
import Cookies from "universal-cookie";

import { FaRobot } from "react-icons/fa";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import "flag-icon-css/css/flag-icons.min.css";

import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

import ReactGA from "react-ga";

import "./i18n";

import store from "./store";
import { loadUser } from "./actions/auth";
import { getPrivacy } from "./actions/privacy";
import { getTerms } from "./actions/terms";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import SolutionPage from "./pages/SolutionPage";
import SubcriptionPage from "./pages/SubcriptionPage";
import PurchasePage from "./pages/PurchasePage";
import ContactUsPage from "./pages/ContactUsPage";

const cookies = new Cookies();

ReactGA.initialize("UA-209541600-1");

const App = () => {
    const { t } = useTranslation(["translation"]);
    const [btnRef, setBtnRef] = useState(null);
    const [auth, setAuth] = useState(store.getState().auth);
    const [showChat, setShowChat] = useState(false);

    const toggleChatBot = () => setShowChat(!showChat);

    useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(getPrivacy());
        store.dispatch(getTerms());
    }, []);

    store.subscribe(() => {
        setAuth(store.getState().auth);
    });

    useEffect(() => {
        if (!auth.loading && !auth.isAuthenticated) {
            if (!cookies.get("maxPopup")) {
                btnRef?.click();
                cookies.set("maxPopup", "elint-x", { maxAge: 86400 });
            }
        }
    }, [auth]);

    return (
        <>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route
                            exact
                            path="/register"
                            component={RegistrationPage}
                        />
                        <Route exact path="/login" component={LoginPage} />
                        <Route
                            exact
                            path="/forgot-password"
                            component={ForgotPasswordPage}
                        />
                        <Route
                            exact
                            path="/contact-us"
                            component={ContactUsPage}
                        />
                        <Route
                            exact
                            path="/reset-password/:token"
                            component={ResetPasswordPage}
                        />
                        <Route
                            exact
                            path="/privacy-policy"
                            component={PrivacyPolicyPage}
                        />
                        <Route
                            exact
                            path="/terms-and-conditions"
                            component={TermsConditionsPage}
                        />
                        <Route
                            exact
                            path="/change-password"
                            component={ChangePasswordPage}
                        />
                        <Route
                            exact
                            path="/dashboard/:routeName?"
                            component={DashboardPage}
                        />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/about-us" component={AboutUsPage} />
                        <Route
                            exact
                            path="/subscribe"
                            component={SubcriptionPage}
                        />
                        <Route
                            exact
                            path="/subscribe/:routeName"
                            component={PurchasePage}
                        />
                        <Route
                            exact
                            path="/solution"
                            component={SolutionPage}
                        />
                    </Switch>
                </Router>
                <div
                    className=""
                    style={{
                        borderRadius: 5,
                        bottom: 40,
                        boxShadow: "5px 5px 13px rgba(91,81,81,.4)",
                        display: "flex",
                        justifyContent: "center",
                        margin: "40px 0",
                        position: "fixed",
                        right: 40,
                        zIndex: 6,
                    }}
                >
                    <div
                        className={!showChat && "d-none"}
                        style={{ position: "relative", width: 275 }}
                    >
                        <Chatbot
                            config={config}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                        />
                    </div>
                    <button
                        style={{
                            backgroundColor: "#1f3646",
                            border: "none",
                            borderRadius: 25,
                            bottom: 15,
                            height: 50,
                            position: "fixed",
                            right: 40,
                            width: 50,
                            zIndex: 10,
                        }}
                        onClick={toggleChatBot}
                    >
                        <FaRobot color="#fff" size={30} />
                    </button>
                </div>
                <div
                    className="modal fade"
                    id="freeTrialModal"
                    aria-hidden="true"
                    aria-labelledby="freeTrialModalLabel"
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <button
                                type="button"
                                style={{ zIndex: 2000 }}
                                className="btn-close position-absolute top-0 end-0"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>

                            <div className="modal-body py-5">
                                {`${t("free_trial")} `}
                                <a href="/register">{t("now")}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <CookieConsent buttonText={t("cookie_btn")} debug={true}>
                    {t("cookie_text")}
                </CookieConsent>
                <button
                    className="d-none"
                    data-bs-toggle="modal"
                    href="#freeTrialModal"
                    ref={(ref) => setBtnRef(ref)}
                ></button>
            </Provider>
        </>
    );
};

export default App;

const loadingMarkup = <div className="py-4 text-center"></div>;

if (document.getElementById("app")) {
    ReactDOM.render(
        <Suspense fallback={loadingMarkup}>
            <App />
        </Suspense>,
        document.getElementById("app")
    );
}
