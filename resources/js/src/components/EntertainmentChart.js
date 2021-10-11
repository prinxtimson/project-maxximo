import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { connect } from "react-redux";
import { getVideo, clearChart } from "../actions/chart";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const EntertainmentChart = ({ loading, trendVideo, getVideo, clearChart }) => {
    const [chartConfigs, setChartConfigs] = useState(null);
    const [chartConfigs2, setChartConfigs2] = useState(null);
    const [chartConfigs3, setChartConfigs3] = useState(null);
    const [chartConfigs4, setChartConfigs4] = useState(null);

    useEffect(() => {
        getVideo();

        return clearChart;
    }, []);

    useEffect(() => {
        if (trendVideo) {
            let diggCountData = [];
            let shareCountData = [];
            let commentCountData = [];
            let playCountData = [];

            trendVideo.items.map(({ stats, author, music }) => {
                diggCountData.push({
                    label: author.nickname,
                    value: stats.diggCount,
                    tooltext: `Music:{br} Title: ${music.title}{br} Author: ${music.authorName}`,
                });
                shareCountData.push({
                    label: author.nickname,
                    value: stats.shareCount,
                    tooltext: `Music:{br} Title: ${music.title}{br} Author: ${music.authorName}`,
                });
                commentCountData.push({
                    label: author.nickname,
                    value: stats.commentCount,
                    tooltext: `Music:{br} Title: ${music.title}{br} Author: ${music.authorName}`,
                });
                playCountData.push({
                    label: author.nickname,
                    value: stats.playCount,
                    tooltext: `Music:{br} Title: ${music.title}{br} Author: ${music.authorName}`,
                });
            });

            setChartConfigs({
                type: "column2d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: "Digital Count",
                        xAxisName: "Author",
                        yAxisName: "Count",
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: diggCountData,
                },
            });

            setChartConfigs2({
                type: "column2d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: "Share Count",
                        xAxisName: "Author",
                        yAxisName: "Count",
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: shareCountData,
                },
            });

            setChartConfigs3({
                type: "column2d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: "Comment Count",
                        xAxisName: "Author",
                        yAxisName: "Count",
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: commentCountData,
                },
            });

            setChartConfigs4({
                type: "column2d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: "Play Count",
                        xAxisName: "Author",
                        yAxisName: "Count",
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: playCountData,
                },
            });
        }
    }, [trendVideo]);
    return (
        <div className="container-fluid p-4">
            <div className="p-2">
                <h5>Trending Video</h5>
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
                            {!loading && chartConfigs2 && (
                                <ReactFC {...chartConfigs2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    );
};

EntertainmentChart.propTypes = {
    loading: PropTypes.bool,
    trendVideo: PropTypes.object,
    getVideo: PropTypes.func.isRequired,
    clearChart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.chart.loading,
    trendVideo: state.chart.entertainment.video,
});

export default connect(mapStateToProps, { clearChart, getVideo })(
    EntertainmentChart
);
