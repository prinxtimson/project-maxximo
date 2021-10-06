import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MainContainer from "../components/MainContainer";
import { useParams, useHistory } from "react-router-dom";
import PaypalButton from "../components/PaypalButton";
import { connect } from "react-redux";
import { savePayment } from "../actions/subscription";
import ReactGA from "react-ga";

const PurchasePage = ({ user, savePayment }) => {
    const { routeName } = useParams();
    const history = useHistory();

    const handleSavePayment = (data) => {
        savePayment(data, history);
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="container p-4">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h2 className="display-6 text-center mb-4">
                            {`${
                                routeName.charAt(0).toUpperCase() +
                                routeName.slice(1)
                            } Plan`}
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc hendrerit pulvinar nisi, quis fringilla
                            leo interdum ut. Integer id turpis nisi. Phasellus
                            imperdiet magna ut purus gravida, a sodales orci
                            vehicula. Vivamus id ex sit amet nibh laoreet
                            elementum at ac magna. Donec mollis accumsan nibh.
                            Fusce sed turpis et enim vulputate condimentum.
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <PaypalButton
                            plan_id={
                                routeName === "basic"
                                    ? "P-3GF26775M0553772CMFE45SA"
                                    : routeName === "essentials"
                                    ? "P-4UW90831RJ858105VMFFXM2Q"
                                    : "P-74180116YA6179122MFFXP4Y"
                            }
                            user={user}
                            handleSavePayment={handleSavePayment}
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

PurchasePage.propTypes = {
    user: PropTypes.object,
    savePayment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { savePayment })(PurchasePage);
