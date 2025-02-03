/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.comom
File: Radar Chart init js
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


// Basic Radar Chart
var chartRadarBasicColors = getChartColorsArray("basic_radar");
if(chartRadarBasicColors){
var options = {
    series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
    }],
    chart: {
        height: 350,
        type: 'radar',
        toolbar: {
            show: false
        }
    },
    colors: chartRadarBasicColors,
    xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June']
    }
};

var chart = new ApexCharts(document.querySelector("#basic_radar"), options);
chart.render();
}

// Radar Chart - Multi series
var chartRadarMultiColors = getChartColorsArray("multi_radar");
if(chartRadarMultiColors){
var options = {
    series: [{
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
        },
        {
            name: 'Series 2',
            data: [20, 30, 40, 80, 20, 80],
        },
        {
            name: 'Series 3',
            data: [44, 76, 78, 13, 43, 10],
        }
    ],
    chart: {
        height: 350,
        type: 'radar',
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        },
        toolbar: {
            show: false
        },
    },
    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.2
    },
    markers: {
        size: 0
    },
    colors: chartRadarMultiColors,
    xaxis: {
        categories: ['2014', '2015', '2016', '2017', '2018', '2019']
    }
};
var chart = new ApexCharts(document.querySelector("#multi_radar"), options);
chart.render();
}

// Polygon - Radar Charts
var chartRadarPolyradarColors = getChartColorsArray("polygon_radar");
if(chartRadarPolyradarColors){
var options = {
    series: [{
        name: 'Series 1',
        data: [20, 100, 40, 30, 50, 80, 33],
    }],
    chart: {
        height: 350,
        type: 'radar',
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: true
    },
    plotOptions: {
        radar: {
            size: 140,

        }
    },
    title: {
        text: 'Radar with Polygon Fill',
        style: {
            fontWeight: 500,
        },
    },
    colors: chartRadarPolyradarColors,
    markers: {
        size: 4,
        colors: ['#fff'],
        strokeColor: '#f34e4e',
        strokeWidth: 2,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val
            }
        }
    },
    xaxis: {
        categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    yaxis: {
        tickAmount: 7,
        labels: {
            formatter: function (val, i) {
                if (i % 2 === 0) {
                    return val
                } else {
                    return ''
                }
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#polygon_radar"), options);
chart.render();
}