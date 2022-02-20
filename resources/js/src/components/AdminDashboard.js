import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getVisit } from "../actions/analytics";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import moment from "moment";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const AdminDashboard = ({ getVisit, visit, loading, userType }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const [period, setPeriod] = useState(7);
    const [chartConfigs2, setChartConfigs2] = useState(null);

    useEffect(() => {
        getVisit(7);
        document.title = "Visit Chart";
    }, []);

    useEffect(() => {
        if (userType.length > 0) {
            let data = [];

            userType.map((item) => {
                data.push({
                    label: item.type,
                    value: item.sessions,
                });
            });

            setChartConfigs2({
                type: "doughnut2d", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("admin_page.caption"),
                        theme: "fusion",
                        startingAngle: "310",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "40",
                    },
                    data,
                },
            });
        }
    }, [userType]);

    useEffect(() => {
        if (visit.length > 0) {
            let data = [];
            let len = visit.length;
            if (period > len) {
                let r = period - len;

                for (let i = 1; i <= r; i++) {
                    let d = new Date(visit[0]?.date);
                    d.setDate(d.getDate() - i);
                    data.unshift({
                        label: moment(d.toISOString()).format("ll"),
                        value: 0,
                    });
                }
            }
            visit.map((item) => {
                data.push({
                    label: moment(item.date).format("ll"),
                    value: item.visitors,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("admin_page.caption_2"),
                        xAxisName: t("admin_page.x_axis"),
                        yAxisName: t("admin_page.y_axis"),
                        theme: "fusion",
                        labelStep: period > 7 ? "5" : "0",
                        // drawAnchors: "0",
                    },
                    data,
                },
            });
        }
    }, [visit]);

    const handleOnChange = (e) => {
        setPeriod(e.target.value);
        getVisit(e.target.value);
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
            <div className="row">
                <div className="col col-md-6 mb-md-0 mb-4">
                    <div className="card" style={{ minHeight: 500 }}>
                        <div className="card-body">
                            {!loading && chartConfigs && (
                                <ReactFC {...chartConfigs} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col col-md-6 ">
                    <div className="card" style={{ minHeight: 500 }}>
                        <div className="card-body">
                            {!loading && chartConfigs2 && (
                                <ReactFC {...chartConfigs2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdminDashboard.propTypes = {
    getVisit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    visit: state.analytics.visit,
    userType: state.analytics.userType,
    loading: state.analytics.loading,
});

export default connect(mapStateToProps, { getVisit })(AdminDashboard);

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
