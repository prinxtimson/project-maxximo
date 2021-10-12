import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getCountry } from "../actions/analytics";
import moment from "moment";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const LocationChart = ({ getCountry, loading, country }) => {
    const [chartConfigs, setChartConfigs] = useState(null);
    const [period, setPeriod] = useState(7);

    useEffect(() => {
        getCountry(7);
    }, []);

    useEffect(() => {
        if (country.length > 0) {
            let data = [];

            country.map((item) => {
                let rate = (item[2] / item[1]) * 100 || 0;
                data.push({
                    label: moment(item[0]).format("ll"),
                    value: rate,
                    tooltext: `${moment(item[0]).format(
                        "LL"
                    )}{br}{br} Bounce Rate: ${rate}%`,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Bounce Rate",
                        xAxisName: "Day",
                        yAxisName: "Percentage",
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
    }, [country]);

    const handleOnChange = (e) => {
        setPeriod(e.target.value);
        getCountry(e.target.value);
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

LocationChart.propTypes = {
    getCountry: PropTypes.func.isRequired,
    country: PropTypes.array,
};

const mapStateToProps = (state) => ({
    country: state.analytics.country,
    loading: state.analytics.loading,
});

export default connect(mapStateToProps, { getCountry })(LocationChart);

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
