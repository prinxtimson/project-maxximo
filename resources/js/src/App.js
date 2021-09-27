import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CookieConsent from "react-cookie-consent";
import Cookies from "universal-cookie";

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

const App = () => {
    const [btnRef, setBtnRef] = useState(null);
    const [auth, setAuth] = useState(store.getState().auth);

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
                    <Route exact path="/contact-us" component={ContactUsPage} />
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
                    <Route exact path="/solution" component={SolutionPage} />
                </Switch>
            </Router>
            <CookieConsent buttonText="Accept all cookies" debug={true}>
                Elint-X uses site cookies to provide site functionality and
                improve user experience. By clicking "Accept all cookies", you
                agree to the storing of cookies on your device to enhance site
                navigation, site usage and our marketing efforts cookie policy.
            </CookieConsent>
            <button
                className="d-none"
                data-bs-toggle="modal"
                href="#freeTrialModal"
                ref={(ref) => setBtnRef(ref)}
            ></button>
        </Provider>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
