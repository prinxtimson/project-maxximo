import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
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
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
