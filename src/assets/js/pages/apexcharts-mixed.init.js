/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Mixed Chart init js
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


// Mixed - Line Column Chart
var chartLineColumnColors = getChartColorsArray("line_column_chart");
if(chartLineColumnColors){
var options = {
    series: [{
        name: 'Website Blog',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, {
        name: 'Social Media',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }],
    chart: {
        height: 350,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        width: [0, 4]
    },
    title: {
        text: 'Traffic Sources',
        style: {
            fontWeight: 500,
        },
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
    },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: {
        type: 'datetime'
    },
    yaxis: [{
        title: {
            text: 'Website Blog',
            style: {
                fontWeight: 500,
            },
        },

    }, {
        opposite: true,
        title: {
            text: 'Social Media',
            style: {
                fontWeight: 500,
            },
        }
    }],
    colors: chartLineColumnColors
};

var chart = new ApexCharts(document.querySelector("#line_column_chart"), options);
chart.render();
}

// Multiple Y-Axis Charts
var chartMultiColors = getChartColorsArray("multi_chart");
if(chartMultiColors){
var options = {
    series: [{
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    }, {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    }, {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58]
    }],
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [1, 1, 4]
    },
    title: {
        text: 'XYZ - Stock Analysis (2009 - 2016)',
        align: 'left',
        offsetX: 110,
        style: {
            fontWeight: 500,
        },
    },
    xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    yaxis: [{
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#038edc'
            },
            labels: {
                style: {
                    colors: '#038edc',
                }
            },
            title: {
                text: "Income (thousand crores)",
                style: {
                    color: '#038edc',
                    fontWeight: 600
                }
            },
            tooltip: {
                enabled: true
            }
        },
        {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#038edc'
            },
            labels: {
                style: {
                    colors: '#038edc',
                }
            },
            title: {
                text: "Operating Cashflow (thousand crores)",
                style: {
                    color: '#038edc',
                    fontWeight: 600
                }
            },
        },
        {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#51d28c'
            },
            labels: {
                style: {
                    colors: '#51d28c',
                },
            },
            title: {
                text: "Revenue (thousand crores)",
                style: {
                    color: '#51d28c',
                    fontWeight: 600
                }
            }
        },
    ],
    tooltip: {
        fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
        },
    },
    legend: {
        horizontalAlign: 'left',
        offsetX: 40
    },
    colors: chartMultiColors
};

var chart = new ApexCharts(document.querySelector("#multi_chart"), options);
chart.render();
}

// Line & Area Charts
var chartLineAreaColors = getChartColorsArray("line_area_chart");
if(chartLineAreaColors){
var options = {
    series: [{
        name: 'TEAM A',
        type: 'area',
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
    }, {
        name: 'TEAM B',
        type: 'line',
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
    }],
    chart: {
        height: 350,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
    },
    labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
    markers: {
        size: 0
    },
    yaxis: [{
            title: {
                text: 'Series A',
            },
        },
        {
            opposite: true,
            title: {
                text: 'Series B',
            },
        },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            }
        }
    },
    colors: chartLineAreaColors
};

var chart = new ApexCharts(document.querySelector("#line_area_chart"), options);
chart.render();
}

// Line Cloumn & Area Charts

var chartLineAreaMultiColors = getChartColorsArray("line_area_charts");
if(chartLineAreaMultiColors){
var options = {
    series: [{
        name: 'TEAM A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        name: 'TEAM B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'TEAM C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false,
        }
    },
    stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },

    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
        '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
    ],
    markers: {
        size: 0
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        title: {
            text: 'Points',
        },
        min: 0
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;

            }
        }
    },
    colors: chartLineAreaMultiColors
};

var chart = new ApexCharts(document.querySelector("#line_area_charts"), options);
chart.render();
}