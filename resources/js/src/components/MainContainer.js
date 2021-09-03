import React, { Fragment } from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const MainContainer = ({ children }) => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: "95vh" }}>
            <MainHeader />
            <div className="container-fluid flex-grow-1">
                <div className="d-flex flex-column">
                    <div className="flex-grow-1">{children}</div>
                </div>
            </div>
            <MainFooter />
        </div>
    );
};

export default MainContainer;
