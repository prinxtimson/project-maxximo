import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getPageVisit } from "../actions/analytics";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const PageVisitedChart = ({ getPageVisit, loading, page }) => {
    const [chartConfigs, setChartConfigs] = useState(null);
    const [period, setPeriod] = useState(7);

    useEffect(() => {
        getPageVisit(7);
    }, []);

    useEffect(() => {
        if (page.length > 0) {
            let data = [];

            page.map((item) => {
                data.push({
                    label: item.url,
                    value: item.pageViews,
                });
            });

            setChartConfigs({
                type: "bar2d", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Page Visited by Users",
                        //xAxisName: "URL",
                        yAxisName: "Total Visit",
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        // drawAnchors: "0",
                    },
                    data,
                },
            });
        }
    }, [page]);

    const handleOnChange = (e) => {
        setPeriod(e.target.value);
        getVisit(e.target.value);
    };

    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <label htmlFor="country" className="col-sm-4">
                    Period
                </label>
                <div className="col-sm-8">
                    <select
                        className="form-select"
                        aria-label="example"
                        name="period"
                        value={period}
                        onChange={handleOnChange}
                    >
                        <option value="">Select Period</option>
                        {PERIOD.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="">
                <div className="card" style={{ minHeight: 500 }}>
                    <div className="card-body">
                        {!loading && chartConfigs && (
                            <ReactFC {...chartConfigs} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

PageVisitedChart.propTypes = {
    getPageVisit: PropTypes.func.isRequired,
    page: PropTypes.array,
};

const mapStateToProps = (state) => ({
    page: state.analytics.page,
    loading: state.analytics.loading,
});

export default connect(mapStateToProps, { getPageVisit })(PageVisitedChart);

const PERIOD = [
    {
        name: "Last 7 days",
        value: 7,
    },
    {
        name: "Last 30 days",
        value: 30,
    },
];
