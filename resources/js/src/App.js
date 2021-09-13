import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CookieConsent from "react-cookie-consent";

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

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(getPrivacy());
        store.dispatch(getTerms());
    }, []);

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
                    <Route exact path="/dashboard" component={DashboardPage} />
                </Switch>
            </Router>
            <CookieConsent buttonText="Accept all cookies" debug={true}>
                Elint-X uses site cookies to provide site functionality and
                improve user experience. By clicking "Accept all cookies", you
                agree to the storing of cookies on your device to enhance site
                navigation, site usage and our marketing efforts cookie policy.
            </CookieConsent>
        </Provider>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
