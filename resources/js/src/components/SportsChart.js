import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getSport, clearChart, getFootballById } from "../actions/chart";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const SportsChart = ({
    loading,
    sport,
    getSport,
    clearChart,
    getFootballById,
}) => {
    const [chartConfigs, setChartConfigs] = useState(null);
    const [chartConfigs2, setChartConfigs2] = useState(null);
    const [fixtures, setFixtures] = useState([]);
    const [teams, setTeams] = useState("");

    const handleOnChange = (e) => {
        getFootballById(e.target.value);
        let team = fixtures.find((item) => item.id === e.target.value);
        if (team) setTeams(team.teams);
    };

    useEffect(() => {
        getSport();

        return clearChart;
    }, []);

    useEffect(() => {
        let newFixtures = [];
        if (sport.football) {
            sport.football.fixtures?.map((item) => {
                setTeams(`${item.teams.home.name} VS ${item.teams.away.name}`);
                newFixtures.push({
                    teams: `${item.teams.home.name} VS ${item.teams.away.name}`,
                    id: item.fixture.id,
                });
            });
        }

        setFixtures(newFixtures);
    }, [sport.football]);

    useEffect(() => {
        if (sport.football) {
            const { statistics } = sport.football;

            let labels = statistics[0].statistics.map((item) => ({
                label: item.type,
            }));
            let homeTeam = {
                seriesname: statistics[0].team.name,
                data: statistics[0].statistics.map((item) => ({
                    value: item.name,
                })),
            };
            let awayTeam = {
                seriesname: statistics[1].team.name,
                data: statistics[1].statistics.map((item) => ({
                    value: item.name,
                })),
            };

            setChartConfigs2({
                type: "mscolumn2d", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Match Statistics",
                        subCaption: `${teams}`,
                        xAxisName: "Statistics",
                        yAxisName: "Value",
                        theme: "fusion",
                        labelDisplay: "rotate",
                    },
                    categories: [
                        {
                            category: labels,
                        },
                    ],
                    dataset: [homeTeam, awayTeam],
                },
            });
        }
    }, [sport.football]);

    useEffect(() => {
        if (sport.tennis) {
            const {
                results: { rankings },
            } = sport.tennis;

            let labels = [];
            let tennisData = [];

            rankings.map(({ full_name, ranking_points }) => {
                labels.push({ label: full_name });
                tennisData.push({
                    value: ranking_points,
                });
            });

            setChartConfigs({
                type: "msline", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Tennis Ranking",
                        xAxisName: "Date",
                        yAxisName: "Population",
                        theme: "fusion",
                        labelDisplay: "rotate",
                        labelStep: "5",
                        drawAnchors: "0",
                    },
                    categories: [
                        {
                            category: labels,
                        },
                    ],
                    dataset: [
                        {
                            seriesname: "Ranking Points",
                            data: tennisData,
                        },
                    ],
                },
            });
        }
    }, [sport.tennis]);

    return (
        <div className="container-fluid p-4">
            <div className="p-2">
                <h5>Sport Rankings</h5>
            </div>
            <div className="row mb-4">
                <div className="col col-md-6">
                    <div className="card" style={{ minHeight: 400 }}>
                        <div className="card-body">
                            {!loading && chartConfigs && (
                                <ReactFC {...chartConfigs} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col col-md-6 mb-md-0 mb-4">
                    <div className="card" style={{ minHeight: 400 }}>
                        <div className="card-body">
                            <div className="row mb-4">
                                <label htmlFor="country" className="col-sm-4">
                                    Match
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-select"
                                        aria-label="example"
                                        name="match"
                                        defaultValue={fixtures[0]?.id}
                                        onChange={handleOnChange}
                                    >
                                        <option value="">Select Match</option>
                                        {fixtures.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.teams}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {!loading && chartConfigs2 && (
                                <ReactFC {...chartConfigs2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*
            <div className="row">
                <div className="col col-md-6">
                    <div className="card" style={{ minHeight: 400 }}>
                        <div className="card-body">
                            {!loading && chartConfigs3 && (
                                <ReactFC {...chartConfigs3} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col col-md-6 mb-md-0 mb-4">
                    <div className="card" style={{ minHeight: 400 }}>
                        <div className="card-body">
                            {!loading && chartConfigs4 && (
                                <ReactFC {...chartConfigs4} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            */}
        </div>
    );
};

SportsChart.propTypes = {
    loading: PropTypes.bool,
    sport: PropTypes.object,
    clearChart: PropTypes.func.isRequired,
    getSport: PropTypes.func.isRequired,
    getFootballById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.chart.loading,
    sport: state.chart.sport,
});

export default connect(mapStateToProps, {
    clearChart,
    getSport,
    getFootballById,
})(SportsChart);