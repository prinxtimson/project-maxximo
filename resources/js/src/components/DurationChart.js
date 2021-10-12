import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getDuration } from "../actions/analytics";
import moment from "moment";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const DurationChart = ({ getDuration, loading, duration }) => {
    const [chartConfigs, setChartConfigs] = useState(null);
    const [period, setPeriod] = useState(7);

    useEffect(() => {
        getDuration(7);
    }, []);

    useEffect(() => {
        if (duration.length > 0) {
            let data = [];

            duration.map((item) => {
                let d = moment.duration(item[2], "seconds");
                data.push({
                    label: moment(item[0]).format("ll"),
                    value: `${d.minutes()}m ${d.seconds()}s`,
                    tooltext: `${moment(item[0]).format(
                        "LL"
                    )}{br}{br} Duration: ${d.minutes()}m ${d.seconds()}s`,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Duration of Sessions per Day",
                        xAxisName: "Day",
                        yAxisName: "Time",
                        yAxisPosition: "right",
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        drawAnchors: "0",
                        numberSuffix: "min",
                    },
                    data,
                },
            });
        }
    }, [duration]);

    const handleOnChange = (e) => {
        setPeriod(e.target.value);
        getDuration(e.target.value);
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

DurationChart.propTypes = {
    getDuration: PropTypes.func.isRequired,
    duration: PropTypes.array,
};

const mapStateToProps = (state) => ({
    duration: state.analytics.duration,
    loading: state.analytics.loading,
});

export default connect(mapStateToProps, { getDuration })(DurationChart);

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
