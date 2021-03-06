import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getFood, clearChart } from "../actions/chart";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const FoodChart = ({ getFood, clearChart, food, loading }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const [chartConfigs2, setChartConfigs2] = useState(null);
    const [chartConfigs3, setChartConfigs3] = useState(null);

    const handleOnChange = (e) => {
        getFood(e.target.value);
    };

    useEffect(() => {
        getFood("rice");

        return clearChart;
    }, []);

    useEffect(() => {
        if (food) {
            const { totalNutrients, totalDaily, totalNutrientsKCal } = food;

            let totalNutrientsArry = [];
            let totalDailyArry = [];
            let totalNutrientsKCalArry = [];

            for (let [key, value] of Object.entries(totalNutrients)) {
                totalNutrientsArry.push({
                    label: value.label,
                    value: value.quantity,
                    tooltext: `${value.label}, ${value.quantity}${value.unit}`,
                });
            }
            for (let [key, value] of Object.entries(totalDaily)) {
                totalDailyArry.push({
                    label: value.label,
                    value: value.quantity,
                    tooltext: `${value.label}, ${value.quantity}${value.unit}`,
                });
            }
            for (let [key, value] of Object.entries(totalNutrientsKCal)) {
                totalNutrientsKCalArry.push({
                    label: value.label,
                    value: value.quantity,
                    tooltext: `${value.label}, ${value.quantity}${value.unit}`,
                });
            }

            setChartConfigs({
                type: "bar3d", // The chart type
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("food_chat.caption"),
                        theme: "fusion",
                        startingAngle: "310",
                        legendPosition: "right",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "40",
                    },
                    data: totalDailyArry,
                },
            });

            setChartConfigs2({
                type: "bar3d", // The chart type
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("food_chat.caption_1"),
                        theme: "fusion",
                        startingAngle: "310",
                        legendPosition: "right",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "40",
                    },
                    data: totalNutrientsArry,
                },
            });
        }
    }, [food]);

    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <label htmlFor="country" className="col-sm-4">
                    {t("food_chat.food")}
                </label>
                <div className="col-sm-8">
                    <select
                        className="form-select"
                        aria-label="example"
                        name="food"
                        defaultValue="rice"
                        onChange={handleOnChange}
                    >
                        <option value="">{t("food_chat.select_food")}</option>
                        {FOODS.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.name}
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

FoodChart.propTypes = {
    loading: PropTypes.bool,
    getFood: PropTypes.func.isRequired,
    clearChart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    food: state.chart.food,
    laoding: state.chart.loading,
});

export default connect(mapStateToProps, { getFood, clearChart })(FoodChart);

const FOODS = [
    {
        value: "rice",
        name: "Rice",
    },
    {
        value: "beans",
        name: "Beans",
    },
    {
        value: "bread",
        name: "Bread",
    },
];
