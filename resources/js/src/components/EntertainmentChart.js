import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const EntertainmentChart = (props) => {
    return (
        <div className="container-fluid p-4">
            <div className="row"></div>
        </div>
    );
};

EntertainmentChart.propTypes = {};

export default EntertainmentChart;
