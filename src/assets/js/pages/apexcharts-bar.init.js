/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Bar Chart init js
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


// Basic Bar chart
var chartBarColors = getChartColorsArray("bar_chart");
if(chartBarColors){
var options = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365]
    }],
    colors: chartBarColors,
    grid: {
        borderColor: '#f1f1f1',
    },
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
    }
}
var chart = new ApexCharts(document.querySelector("#bar_chart"),options);
chart.render();
}

// Custom DataLabels Bar
var chartDatalabelsBarColors = getChartColorsArray("custom_datalabels_bar");
if(chartDatalabelsBarColors){
var options = {
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
                position: 'bottom'
            },
        }
    },
    colors: chartDatalabelsBarColors,
    dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
            colors: ['#fff']
        },
        formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
            enabled: false
        }
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'India'
        ],
    },
    yaxis: {
        labels: {
            show: false
        }
    },
    title: {
        text: 'Custom DataLabels',
        align: 'center',
        floating: true,
        style: {
            fontWeight: 500,
        },
    },
    subtitle: {
        text: 'Category Names as DataLabels inside bars',
        align: 'center',
    },
    tooltip: {
        theme: 'dark',
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function () {
                    return ''
                }
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#custom_datalabels_bar"), options);
chart.render();
}

// Stacked Bar Charts
var chartStackedBarColors = getChartColorsArray("stacked_bar");
if(chartStackedBarColors){
var options = {
    series: [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
    }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
    }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
    }, {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    title: {
        text: 'Fiction Books Sales',
        style: {
            fontWeight: 500,
        },
    },
    xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
            formatter: function (val) {
                return val + "K"
            }
        }
    },
    yaxis: {
        title: {
            text: undefined
        },
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "K"
            }
        }
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
    },
    colors: chartStackedBarColors
};

var chart = new ApexCharts(document.querySelector("#stacked_bar"), options);
chart.render();
}

// Stacked Bars 100
var chartStackedBar100Colors = getChartColorsArray("stacked_bar_100");
if(chartStackedBar100Colors){
var options = {
    series: [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
    }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
    }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
    }, {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    title: {
        text: '100% Stacked Bar',
        style: {
            fontWeight: 500,
        },
    },
    xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "K"
            }
        }
    },
    fill: {
        opacity: 1

    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
    },
    colors: chartStackedBar100Colors
};

var chart = new ApexCharts(document.querySelector("#stacked_bar_100"), options);
chart.render();
}

// Bar with Negative Values
var chartNegativeBarColors = getChartColorsArray("negative_bars");
if(chartNegativeBarColors){
var options = {
    series: [{
            name: 'Males',
            data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5,
                3.9, 3.5, 3
            ]
        },
        {
            name: 'Females',
            data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4,
                -4.1, -4, -4.1, -3.4, -3.1, -2.8
            ]
        }
    ],
    chart: {
        type: 'bar',
        height: 360,
        stacked: true,
        toolbar: {
            show: false,
        }
    },
    colors: chartNegativeBarColors,
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '80%',
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 1,
        colors: ["#fff"]
    },

    grid: {
        xaxis: {
            lines: {
                show: false
            }
        }
    },
    yaxis: {
        min: -5,
        max: 5,
        title: {
            text: 'Age',
            style: {
                fontWeight: 500,
            },
        },
    },
    tooltip: {
        shared: false,
        x: {
            formatter: function (val) {
                return val
            }
        },
        y: {
            formatter: function (val) {
                return Math.abs(val) + "%"
            }
        }
    },
    title: {
        text: 'Mauritius population pyramid 2011',
        style: {
            fontWeight: 500,
        },
    },
    xaxis: {
        categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54',
            '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9',
            '0-4'
        ],
        title: {
            text: 'Percent'
        },
        labels: {
            formatter: function (val) {
                return Math.abs(Math.round(val)) + "%"
            }
        }
    },
};

var chart = new ApexCharts(document.querySelector("#negative_bars"), options);
chart.render();
}

//   Bar with Markers
var chartBarMarkersColors = getChartColorsArray("bar_markers");
if(chartBarMarkersColors){
var options = {
    series: [{
        name: 'Actual',
        data: [{
                x: '2011',
                y: 12,
                goals: [{
                    name: 'Expected',
                    value: 14,
                    strokeWidth: 5,
                    strokeColor: '#564ab1'
                }]
            },
            {
                x: '2012',
                y: 44,
                goals: [{
                    name: 'Expected',
                    value: 54,
                    strokeWidth: 5,
                    strokeColor: '#564ab1'
                }]
            },
            {
                x: '2013',
                y: 54,
                goals: [{
                    name: 'Expected',
                    value: 52,
                    strokeWidth: 5,
                    strokeColor: '#564ab1'
                }]
            },
            {
                x: '2014',
                y: 66,
                goals: [{
                    name: 'Expected',
                    value: 65,
                    strokeWidth: 5,
                    strokeColor: '#564ab1'
                }]
            },
            {
                x: '2015',
                y: 81,
                goals: [{
                    name: 'Expected',
                    value: 66,
                    strokeWidth: 5,
                    strokeColor: '#564ab1'
                }]
            },
            {
                x: '2016',
                y: 67,
                goals: [{
                    name: 'Expected',
                    value: 70,
                    strokeWidth: 5,
                    strokeColor: '#564ab1'
                }]
            }
        ]
    }],
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    colors: chartBarMarkersColors,
    dataLabels: {
        formatter: function (val, opt) {
            var goals =
                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals

            // if (goals && goals.length) {
            //   return `${val} / ${goals[0].value}`
            // }
            return val
        }
    },
    legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Actual', 'Expected'],
        markers: {
            fillColors: chartBarMarkersColors
        }
    }
};

var chart = new ApexCharts(document.querySelector("#bar_markers"), options);
chart.render();
}

// Reversed Bar Chart
var chartBarReversedColors = getChartColorsArray("reversed_bars");
if(chartBarReversedColors){
var options = {
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690]
    }],
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
            show: false,
        }
    },
    annotations: {
        xaxis: [{
            x: 500,
            borderColor: '#038edc',
            label: {
                borderColor: '#038edc',
                style: {
                    color: '#fff',
                    background: '#038edc',
                },
                text: 'X annotation',
            }
        }],
        yaxis: [{
            y: 'July',
            y2: 'September',
            label: {
                text: 'Y annotation'
            }
        }]
    },
    colors: chartBarReversedColors,
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: true
    },
    xaxis: {
        categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    grid: {
        xaxis: {
            lines: {
                show: true
            }
        }
    },
    yaxis: {
        reversed: true,
        axisTicks: {
            show: true
        }
    }
};

var chart = new ApexCharts(document.querySelector("#reversed_bars"), options);
chart.render();
}

// Patterned Charts
var chartPatternedColors = getChartColorsArray("patterned_bars");
if(chartPatternedColors){
var options = {
    series: [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
    }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
    }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        dropShadow: {
            enabled: true,
            blur: 1,
            opacity: 0.25
        },
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '60%',
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 2,
    },
    title: {
        text: 'Compare Sales Strategy',
        style: {
            fontWeight: 500,
        },
    },
    xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    },
    yaxis: {
        title: {
            text: undefined
        },
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
                return val + "K"
            }
        }
    },
    fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
            style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

        }
    },
    states: {
        hover: {
            filter: 'none'
        }
    },
    legend: {
        position: 'right',
        offsetY: 40
    },
    colors: chartPatternedColors
};

var chart = new ApexCharts(document.querySelector("#patterned_bars"), options);
chart.render();
}

// Groups Bar Charts
var chartGroupbarColors = getChartColorsArray("grouped_bar");
if(chartGroupbarColors){
var options = {
    series: [{
        data: [44, 55, 41, 64, 22, 43, 21]
    }, {
        data: [53, 32, 33, 52, 13, 44, 32]
    }],
    chart: {
        type: 'bar',
        height: 410,
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                position: 'top',
            },
        }
    },
    dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
            fontSize: '12px',
            colors: ['#fff']
        }
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    tooltip: {
        shared: true,
        intersect: false
    },
    xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
    },
    colors: chartGroupbarColors
};

var chart = new ApexCharts(document.querySelector("#grouped_bar"), options);
chart.render();
}

// Bar with Images

var options = {
    series: [{
        name: 'coins',
        data: [2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12,
            11, 12, 13, 14, 16, 14, 15, 17, 19, 21
        ]
    }],
    chart: {
        type: 'bar',
        height: 410,
        animations: {
            enabled: false
        },
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '100%',

        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        colors: ["#fff"],
        width: 0.2
    },
    labels: Array.apply(null, {
        length: 39
    }).map(function (el, index) {
        return index + 1;
    }),
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        labels: {
            show: false
        },
        title: {
            text: 'Weight',
        },
    },
    grid: {
        position: 'back'
    },
    title: {
        text: 'Paths filled by clipped image',
        align: 'right',
        offsetY: 30,
        style: {
            fontWeight: 500,
        },
    },
    fill: {
        type: 'image',
        opacity: 0.87,
        image: {
            src: ['assets/images/small/img-4.jpg'],
            width: 466,
            height: 406
        }
    },
};

if(document.querySelector("#bar_images")){
    var chart = new ApexCharts(document.querySelector("#bar_images"), options);
    chart.render();
}