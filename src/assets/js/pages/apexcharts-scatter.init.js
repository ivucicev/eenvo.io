/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Scatter Chart init js
*/

// get colors array from the string
function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        colors = JSON.parse(colors);
        return colors.map(function (value) {
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


// Basic Scatter Charts
var chartScatterBasicColors = getChartColorsArray("basic_scatter");
if(chartScatterBasicColors){
var options = {
    series: [{
        name: "SAMPLE A",
        data: [
            [16.4, 5.4],
            [21.7, 2],
            [25.4, 3],
            [19, 2],
            [10.9, 1],
            [13.6, 3.2],
            [10.9, 7.4],
            [10.9, 0],
            [10.9, 8.2],
            [16.4, 0],
            [16.4, 1.8],
            [13.6, 0.3],
            [13.6, 0],
            [29.9, 0],
            [27.1, 2.3],
            [16.4, 0],
            [13.6, 3.7],
            [10.9, 5.2],
            [16.4, 6.5],
            [10.9, 0],
            [24.5, 7.1],
            [10.9, 0],
            [8.1, 4.7],
            [19, 0],
            [21.7, 1.8],
            [27.1, 0],
            [24.5, 0],
            [27.1, 0],
            [29.9, 1.5],
            [27.1, 0.8],
            [22.1, 2]
        ]
    }, {
        name: "SAMPLE B",
        data: [
            [36.4, 13.4],
            [1.7, 11],
            [5.4, 8],
            [9, 17],
            [1.9, 4],
            [3.6, 12.2],
            [1.9, 14.4],
            [1.9, 9],
            [1.9, 13.2],
            [1.4, 7],
            [6.4, 8.8],
            [3.6, 4.3],
            [1.6, 10],
            [9.9, 2],
            [7.1, 15],
            [1.4, 0],
            [3.6, 13.7],
            [1.9, 15.2],
            [6.4, 16.5],
            [0.9, 10],
            [4.5, 17.1],
            [10.9, 10],
            [0.1, 14.7],
            [9, 10],
            [12.7, 11.8],
            [2.1, 10],
            [2.5, 10],
            [27.1, 10],
            [2.9, 11.5],
            [7.1, 10.8],
            [2.1, 12]
        ]
    }, {
        name: "SAMPLE C",
        data: [
            [21.7, 3],
            [23.6, 3.5],
            [24.6, 3],
            [29.9, 3],
            [21.7, 20],
            [23, 2],
            [10.9, 3],
            [28, 4],
            [27.1, 0.3],
            [16.4, 4],
            [13.6, 0],
            [19, 5],
            [22.4, 3],
            [24.5, 3],
            [32.6, 3],
            [27.1, 4],
            [29.6, 6],
            [31.6, 8],
            [21.6, 5],
            [20.9, 4],
            [22.4, 0],
            [32.6, 10.3],
            [29.7, 20.8],
            [24.5, 0.8],
            [21.4, 0],
            [21.7, 6.9],
            [28.6, 7.7],
            [15.4, 0],
            [18.1, 0],
            [33.4, 0],
            [16.4, 0]
        ]
    }],
    chart: {
        height: 350,
        type: 'scatter',
        zoom: {
            enabled: true,
            type: 'xy'
        },
        toolbar: {
            show: false,
        }
    },
    xaxis: {
        tickAmount: 10,
        labels: {
            formatter: function (val) {
                return parseFloat(val).toFixed(1)
            }
        }
    },
    yaxis: {
        tickAmount: 7
    },
    colors: chartScatterBasicColors
};

var chart = new ApexCharts(document.querySelector("#basic_scatter"), options);
chart.render();
}

// Dtaetime - Scatter Charts

function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([baseval, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

var chartScatterDateTimeColors = getChartColorsArray("datetime_scatter");
if(chartScatterDateTimeColors){
var options = {
    series: [{
            name: 'TEAM 1',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'TEAM 2',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'TEAM 3',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'TEAM 4',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'TEAM 5',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
                min: 10,
                max: 60
            })
        },
    ],
    chart: {
        height: 350,
        type: 'scatter',
        zoom: {
            type: 'xy'
        },
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
    },
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        max: 70
    },
    colors: chartScatterDateTimeColors
};

var chart = new ApexCharts(document.querySelector("#datetime_scatter"), options);
chart.render();
}

// Scatter - Images Charts
var chartScatterImagesColors = getChartColorsArray("images_scatter");
if(chartScatterImagesColors){
var options = {
    series: [{
        name: 'User A',
        data: [
            [16.4, 5.4],
            [21.7, 4],
            [25.4, 3],
            [19, 2],
            [10.9, 1],
            [13.6, 3.2],
            [10.9, 7],
            [10.9, 8.2],
            [16.4, 4],
            [13.6, 4.3],
            [13.6, 12],
            [29.9, 3],
            [10.9, 5.2],
            [16.4, 6.5],
            [10.9, 8],
            [24.5, 7.1],
            [10.9, 7],
            [8.1, 4.7],
        ]
    }, {
        name: 'User B',
        data: [
            [6.4, 5.4],
            [11.7, 4],
            [15.4, 3],
            [9, 2],
            [10.9, 11],
            [20.9, 7],
            [12.9, 8.2],
            [6.4, 14],
            [11.6, 12]
        ]
    }],
    chart: {
        height: 350,
        type: 'scatter',
        animations: {
            enabled: false,
        },
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false
        }
    },
    colors: chartScatterImagesColors,
    xaxis: {
        tickAmount: 10,
        min: 0,
        max: 40
    },
    yaxis: {
        tickAmount: 7
    },
    markers: {
        size: 20
    },
    fill: {
        type: 'image',
        opacity: 1,
        image: {
            src: ['assets/images/users/avatar-1.jpg', 'assets/images/users/avatar-2.jpg'],
            width: 40,
            height: 40
        }
    },
    legend: {
        labels: {
            useSeriesColors: true
        },
        markers: {
            customHTML: [
                function () {
                    return ''
                },
                function () {
                    return ''
                }
            ]
        }
    }
};

var chart = new ApexCharts(document.querySelector("#images_scatter"), options);
chart.render();
}