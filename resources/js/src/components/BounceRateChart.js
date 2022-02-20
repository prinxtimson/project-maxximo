import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getBounceRate } from "../actions/analytics";
import moment from "moment";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const BounceRateChart = ({ getBounceRate, bounce, loading }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const [period, setPeriod] = useState(7);

    useEffect(() => {
        getBounceRate(7);
    }, []);

    useEffect(() => {
        if (bounce.length > 0) {
            let data = [];

            bounce.map((item) => {
                let rate = (item[2] / item[1]) * 100 || 0;
                data.push({
                    label: moment(item[0]).format("ll"),
                    value: rate,
                    tooltext: `${moment(item[0]).format("LL")}{br}{br} ${t(
                        "bounce_rate_chat.title"
                    )}: ${rate}%`,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("bounce_rate_chat.title"),
                        xAxisName: t("bounce_rate_chat.x_axis"),
                        yAxisName: t("bounce_rate_chat.y_axis"),
                        yAxisPosition: "right",
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        drawAnchors: "0",
                        numberSuffix: "%",
                    },
                    data,
                },
            });
        }
    }, [bounce]);

    const handleOnChange = (e) => {
        setPeriod(e.target.value);
        getBounceRate(e.target.value);
    };

    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <label htmlFor="country" className="col-sm-4">
                    {t("admin_page.period")}
                </label>
                <div className="col-sm-8">
                    <select
                        className="form-select"
                        aria-label="example"
                        name="period"
                        value={period}
                        onChange={handleOnChange}
                    >
                        <option value="">
                            {t("admin_page.select_period")}
                        </option>
                        {PERIOD.map((item) => (
                            <option key={item.value} value={item.value}>
                                {t("admin_page.label", { num: item.value })}
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

BounceRateChart.propTypes = {
    getBounceRate: PropTypes.func.isRequired,
    bounce: PropTypes.array,
};

const mapStateToProps = (state) => ({
    bounce: state.analytics.bounce,
    loading: state.analytics.loading,
});

export default connect(mapStateToProps, { getBounceRate })(BounceRateChart);

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
