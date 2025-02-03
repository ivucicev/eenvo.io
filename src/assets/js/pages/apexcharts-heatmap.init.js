/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Heatmap Chart init js
*/

// get colors array from the string
function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        if (colors) {
            colors = JSON.parse(colors);
            return colors.map(function(value) {
                var newValue = value.replace(" ", "");
                if (newValue.indexOf(",") === -1) {
                    var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                    if (color) return color;
                    else return newValue;;
                } else {
                    var val = value.split(',');
                    if (val.length == 2) {
                        var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                        return rgbaColor;
                    } else {
                        return newValue;
                    }
                }
            });
        }
    }
}

// Basic Heatmap Charts
var chartHeatMapBasicColors = getChartColorsArray("basic_heatmap");
if (chartHeatMapBasicColors) {
    var options = {
        series: [{
                name: 'Metric1',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric2',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric3',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric4',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric5',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric6',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric7',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric8',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric9',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            }
        ],
        chart: {
            height: 450,
            type: 'heatmap',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: [chartHeatMapBasicColors[0]],
        title: {
            text: 'HeatMap Chart (Single color)',
            style: {
                fontWeight: 500,
            },
        },
        stroke: {
            colors: [chartHeatMapBasicColors[1]]
        }
    };

    var chart = new ApexCharts(document.querySelector("#basic_heatmap"), options);
    chart.render();
}

// Generate Data Script

function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}

var data = [{
        name: 'W1',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W2',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W3',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W4',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W5',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W6',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W7',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W8',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W9',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W10',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W11',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W12',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W13',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W14',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    },
    {
        name: 'W15',
        data: generateData(8, {
            min: 0,
            max: 90
        })
    }
]

data.reverse()

var colors = ["#f7cc53", "#f1734f", "#663f59", "#6a6e94", "#4e88b4", "#00a7c6", "#18d8d8", '#a9d794', '#46aF78', '#a93f55', '#8c5e58', '#2176ff', '#5fd0f3', '#74788d', '#51d28c']

colors.reverse()

// Multiple Series - Heatmap
var chartHeatMapMultipleColors = getChartColorsArray("multiple_heatmap");
if (chartHeatMapMultipleColors) {
    var options = {
        series: data,
        chart: {
            height: 450,
            type: 'heatmap',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: [chartHeatMapMultipleColors[0], chartHeatMapMultipleColors[1], chartHeatMapMultipleColors[2], chartHeatMapMultipleColors[3], chartHeatMapMultipleColors[4], chartHeatMapMultipleColors[5], chartHeatMapMultipleColors[6], chartHeatMapMultipleColors[7]],
        xaxis: {
            type: 'category',
            categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30']
        },
        title: {
            text: 'HeatMap Chart (Different color shades for each series)',
            style: {
                fontWeight: 500,
            },
        },
        grid: {
            padding: {
                right: 20
            }
        },
        stroke: {
            colors: [chartHeatMapMultipleColors[8]]
        }
    };
    var chart = new ApexCharts(document.querySelector("#multiple_heatmap"), options);
    chart.render();
}

//   Color Range
var chartHeatMapColors = getChartColorsArray("color_heatmap");
if (chartHeatMapColors) {
    var options = {
        series: [{
                name: 'Jan',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Feb',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Mar',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Apr',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'May',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Jun',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Jul',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Aug',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Sep',
                data: generateData(20, {
                    min: -30,
                    max: 55
                })
            }
        ],
        chart: {
            height: 350,
            type: 'heatmap',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [{
                            from: -30,
                            to: 5,
                            name: 'Low',
                            color: chartHeatMapColors[0]
                        },
                        {
                            from: 6,
                            to: 20,
                            name: 'Medium',
                            color: chartHeatMapColors[1]
                        },
                        {
                            from: 21,
                            to: 45,
                            name: 'High',
                            color: chartHeatMapColors[2]
                        },
                        {
                            from: 46,
                            to: 55,
                            name: 'Extreme',
                            color: chartHeatMapColors[3]
                        }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1
        },
        title: {
            text: 'HeatMap Chart with Color Range',
            style: {
                fontWeight: 500,
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#color_heatmap"), options);
    chart.render();
}

// Heatmap - Range Without Shades
var chartHeatMapShadesColors = getChartColorsArray("shades_heatmap");
if (chartHeatMapShadesColors) {
    var options = {
        series: [{
                name: 'Metric1',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric2',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric3',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric4',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric5',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric6',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric7',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric8',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric8',
                data: generateData(20, {
                    min: 0,
                    max: 90
                })
            }
        ],
        chart: {
            height: 350,
            type: 'heatmap',
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: 0
        },
        plotOptions: {
            heatmap: {
                radius: 30,
                enableShades: false,
                colorScale: {
                    ranges: [{
                            from: 0,
                            to: 50,
                            color: chartHeatMapShadesColors[0]
                        },
                        {
                            from: 51,
                            to: 100,
                            color: chartHeatMapShadesColors[1]
                        },
                    ],
                },

            }
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#fff']
            }
        },
        xaxis: {
            type: 'category',
        },
        title: {
            text: 'Rounded (Range without Shades)',
            style: {
                fontWeight: 500,
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#shades_heatmap"), options);
    chart.render();
}