/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Line Chart init js
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


//  Basic Line Charts

var linechartBasicColors = getChartColorsArray("line_chart_basic");
if (linechartBasicColors) {
    var options = {
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        markers: {
            size: 4,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: linechartBasicColors,
        title: {
            text: 'Product Trends by Month',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },

        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };

    var chart = new ApexCharts(document.querySelector("#line_chart_basic"), options);
    chart.render();
}


// Zoomable Timeseries
var linechartZoomColors = getChartColorsArray("line_chart_zoomable");
if (linechartZoomColors) {
    var options = {
        series: [{
            name: 'XYZ MOTORS',
            data: [{
                x: new Date('2018-01-12').getTime(),
                y: 140
            }, {
                x: new Date('2018-01-13').getTime(),
                y: 147
            }, {
                x: new Date('2018-01-14').getTime(),
                y: 150
            }, {
                x: new Date('2018-01-15').getTime(),
                y: 154
            }, {
                x: new Date('2018-01-16').getTime(),
                y: 160
            }, {
                x: new Date('2018-01-17').getTime(),
                y: 165
            }, {
                x: new Date('2018-01-18').getTime(),
                y: 162
            }, {
                x: new Date('2018-01-20').getTime(),
                y: 159
            }, {
                x: new Date('2018-01-21').getTime(),
                y: 164
            }, {
                x: new Date('2018-01-22').getTime(),
                y: 160
            }, {
                x: new Date('2018-01-23').getTime(),
                y: 165
            }, {
                x: new Date('2018-01-24').getTime(),
                y: 169
            }, {
                x: new Date('2018-01-25').getTime(),
                y: 172
            }, {
                x: new Date('2018-01-26').getTime(),
                y: 177
            }, {
                x: new Date('2018-01-27').getTime(),
                y: 173
            }, {
                x: new Date('2018-01-28').getTime(),
                y: 169
            }, {
                x: new Date('2018-01-29').getTime(),
                y: 163
            }, {
                x: new Date('2018-01-30').getTime(),
                y: 158
            }, {
                x: new Date('2018-02-01').getTime(),
                y: 153
            }, {
                x: new Date('2018-02-02').getTime(),
                y: 149
            }, {
                x: new Date('2018-02-03').getTime(),
                y: 144
            }, {
                x: new Date('2018-02-05').getTime(),
                y: 150
            }, {
                x: new Date('2018-02-06').getTime(),
                y: 155
            }, {
                x: new Date('2018-02-07').getTime(),
                y: 159
            }, {
                x: new Date('2018-02-08').getTime(),
                y: 163
            }, {
                x: new Date('2018-02-09').getTime(),
                y: 156
            }, {
                x: new Date('2018-02-11').getTime(),
                y: 151
            }, {
                x: new Date('2018-02-12').getTime(),
                y: 157
            }, {
                x: new Date('2018-02-13').getTime(),
                y: 161
            }, {
                x: new Date('2018-02-14').getTime(),
                y: 150
            }, {
                x: new Date('2018-02-15').getTime(),
                y: 154
            }, {
                x: new Date('2018-02-16').getTime(),
                y: 160
            }, {
                x: new Date('2018-02-17').getTime(),
                y: 165
            }, {
                x: new Date('2018-02-18').getTime(),
                y: 162
            }, {
                x: new Date('2018-02-20').getTime(),
                y: 159
            }, {
                x: new Date('2018-02-21').getTime(),
                y: 164
            }, {
                x: new Date('2018-02-22').getTime(),
                y: 160
            }, {
                x: new Date('2018-02-23').getTime(),
                y: 165
            }, {
                x: new Date('2018-02-24').getTime(),
                y: 169
            }, {
                x: new Date('2018-02-25').getTime(),
                y: 172
            }, {
                x: new Date('2018-02-26').getTime(),
                y: 177
            }, {
                x: new Date('2018-02-27').getTime(),
                y: 173
            }, {
                x: new Date('2018-02-28').getTime(),
                y: 169
            }, {
                x: new Date('2018-02-29').getTime(),
                y: 163
            }, {
                x: new Date('2018-02-30').getTime(),
                y: 162
            }, {
                x: new Date('2018-03-01').getTime(),
                y: 158
            }, {
                x: new Date('2018-03-02').getTime(),
                y: 152
            }, {
                x: new Date('2018-03-03').getTime(),
                y: 147
            }, {
                x: new Date('2018-03-05').getTime(),
                y: 142
            }, {
                x: new Date('2018-03-06').getTime(),
                y: 147
            }, {
                x: new Date('2018-03-07').getTime(),
                y: 151
            }, {
                x: new Date('2018-03-08').getTime(),
                y: 155
            }, {
                x: new Date('2018-03-09').getTime(),
                y: 159
            }, {
                x: new Date('2018-03-11').getTime(),
                y: 162
            }, {
                x: new Date('2018-03-12').getTime(),
                y: 157
            }, {
                x: new Date('2018-03-13').getTime(),
                y: 161
            }, {
                x: new Date('2018-03-14').getTime(),
                y: 166
            }, {
                x: new Date('2018-03-15').getTime(),
                y: 169
            }, {
                x: new Date('2018-03-16').getTime(),
                y: 172
            }, {
                x: new Date('2018-03-17').getTime(),
                y: 177
            }, {
                x: new Date('2018-03-18').getTime(),
                y: 181
            }, {
                x: new Date('2018-03-20').getTime(),
                y: 178
            }, {
                x: new Date('2018-03-21').getTime(),
                y: 173
            }, {
                x: new Date('2018-03-22').getTime(),
                y: 169
            }, {
                x: new Date('2018-03-23').getTime(),
                y: 163
            }, {
                x: new Date('2018-03-24').getTime(),
                y: 159
            }, {
                x: new Date('2018-03-25').getTime(),
                y: 164
            }, {
                x: new Date('2018-03-26').getTime(),
                y: 168
            }, {
                x: new Date('2018-03-27').getTime(),
                y: 172
            }, {
                x: new Date('2018-03-28').getTime(),
                y: 169
            }, {
                x: new Date('2018-03-29').getTime(),
                y: 163
            }, {
                x: new Date('2018-03-30').getTime(),
                y: 162
            }, {
                x: new Date('2018-04-01').getTime(),
                y: 158
            }, {
                x: new Date('2018-04-02').getTime(),
                y: 152
            }, {
                x: new Date('2018-04-03').getTime(),
                y: 147
            }, {
                x: new Date('2018-04-05').getTime(),
                y: 142
            }, {
                x: new Date('2018-04-06').getTime(),
                y: 147
            }, {
                x: new Date('2018-04-07').getTime(),
                y: 151
            }, {
                x: new Date('2018-04-08').getTime(),
                y: 155
            }, {
                x: new Date('2018-04-09').getTime(),
                y: 159
            }, {
                x: new Date('2018-04-11').getTime(),
                y: 162
            }, {
                x: new Date('2018-04-12').getTime(),
                y: 157
            }, {
                x: new Date('2018-04-13').getTime(),
                y: 161
            }, {
                x: new Date('2018-04-14').getTime(),
                y: 166
            }, {
                x: new Date('2018-04-15').getTime(),
                y: 169
            }, {
                x: new Date('2018-04-16').getTime(),
                y: 172
            }, {
                x: new Date('2018-04-17').getTime(),
                y: 177
            }, {
                x: new Date('2018-04-18').getTime(),
                y: 181
            }, {
                x: new Date('2018-04-20').getTime(),
                y: 178
            }, {
                x: new Date('2018-04-21').getTime(),
                y: 173
            }, {
                x: new Date('2018-04-22').getTime(),
                y: 169
            }, {
                x: new Date('2018-04-23').getTime(),
                y: 163
            }, {
                x: new Date('2018-04-24').getTime(),
                y: 159
            }, {
                x: new Date('2018-04-25').getTime(),
                y: 164
            }, {
                x: new Date('2018-04-26').getTime(),
                y: 168
            }, {
                x: new Date('2018-04-27').getTime(),
                y: 172
            }, {
                x: new Date('2018-04-28').getTime(),
                y: 169
            }, {
                x: new Date('2018-04-29').getTime(),
                y: 163
            }, {
                x: new Date('2018-04-30').getTime(),
                y: 162
            }, {
                x: new Date('2018-05-01').getTime(),
                y: 158
            }, {
                x: new Date('2018-05-02').getTime(),
                y: 152
            }, {
                x: new Date('2018-05-03').getTime(),
                y: 147
            }, {
                x: new Date('2018-05-04').getTime(),
                y: 142
            }, {
                x: new Date('2018-05-05').getTime(),
                y: 147
            }, {
                x: new Date('2018-05-07').getTime(),
                y: 151
            }, {
                x: new Date('2018-05-08').getTime(),
                y: 155
            }, {
                x: new Date('2018-05-09').getTime(),
                y: 159
            }, {
                x: new Date('2018-05-11').getTime(),
                y: 162
            }, {
                x: new Date('2018-05-12').getTime(),
                y: 157
            }, {
                x: new Date('2018-05-13').getTime(),
                y: 161
            }, {
                x: new Date('2018-05-14').getTime(),
                y: 166
            }, {
                x: new Date('2018-05-15').getTime(),
                y: 169
            }, {
                x: new Date('2018-05-16').getTime(),
                y: 172
            }, {
                x: new Date('2018-05-17').getTime(),
                y: 177
            }, {
                x: new Date('2018-05-18').getTime(),
                y: 181
            }, {
                x: new Date('2018-05-20').getTime(),
                y: 178
            }, {
                x: new Date('2018-05-21').getTime(),
                y: 173
            }, {
                x: new Date('2018-05-22').getTime(),
                y: 169
            }, {
                x: new Date('2018-05-23').getTime(),
                y: 163
            }, {
                x: new Date('2018-05-24').getTime(),
                y: 159
            }, {
                x: new Date('2018-05-25').getTime(),
                y: 164
            }, {
                x: new Date('2018-05-26').getTime(),
                y: 168
            }, {
                x: new Date('2018-05-27').getTime(),
                y: 172
            }, {
                x: new Date('2018-05-28').getTime(),
                y: 169
            }, {
                x: new Date('2018-05-29').getTime(),
                y: 163
            }, {
                x: new Date('2018-05-30').getTime(),
                y: 162
            }, ]
        }],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        colors: linechartZoomColors,
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            showAlways: true,
            labels: {
                show: true,
                formatter: function(val) {
                    return (val / 1000000).toFixed(0);
                },
            },
            title: {
                text: 'Price',
                style: {
                    fontWeight: 500,
                },
            },
        },
        xaxis: {
            type: 'datetime',

        },
        tooltip: {
            shared: false,
            y: {
                formatter: function(val) {
                    return (val / 1000000).toFixed(0)
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#line_chart_zoomable"), options);
    chart.render();
}


//  Line chart datalabel
var linechartDatalabelColors = getChartColorsArray("line_chart_datalabel");
if (linechartDatalabelColors) {
    var options = {
        chart: {
            height: 380,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: linechartDatalabelColors,
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [3, 3],
            curve: 'straight'
        },
        series: [{
                name: "High - 2018",
                data: [26, 24, 32, 36, 33, 31, 33]
            },
            {
                name: "Low - 2018",
                data: [14, 11, 16, 12, 17, 13, 12]
            }
        ],
        title: {
            text: 'Average High & Low Temperature',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2
            },
            borderColor: '#f1f1f1'
        },
        markers: {
            style: 'inverted',
            size: 6
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Temperature'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
            }
        }]
    }

    var chart = new ApexCharts(
        document.querySelector("#line_chart_datalabel"),
        options
    );
    chart.render();
}



//  Dashed line chart
var linechartDashedColors = getChartColorsArray("line_chart_dashed");
if (linechartDashedColors) {
    var options = {
        chart: {
            height: 380,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            }
        },
        colors: linechartDashedColors,
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [3, 4, 3],
            curve: 'straight',
            dashArray: [0, 8, 5]
        },
        series: [{
                name: "Session Duration",
                data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
            },
            {
                name: "Page Views",
                data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
            },
            {
                name: 'Total Visits',
                data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49]
            }
        ],
        title: {
            text: 'Page Statistics',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        markers: {
            size: 0,

            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                '10 Jan', '11 Jan', '12 Jan'
            ],
        },
        tooltip: {
            y: [{
                title: {
                    formatter: function(val) {
                        return val + " (mins)"
                    }
                }
            }, {
                title: {
                    formatter: function(val) {
                        return val + " per session"
                    }
                }
            }, {
                title: {
                    formatter: function(val) {
                        return val;
                    }
                }
            }]
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#line_chart_dashed"),
        options
    );

    chart.render();
}


// Line with Annotations

var linechartannotationsColors = getChartColorsArray("line_chart_annotations");
if (linechartannotationsColors) {
    var options = {
        series: [{
            data: series.monthDataSeries1.prices
        }],
        chart: {
            height: 350,
            type: 'line',
            id: 'areachart-2',
            toolbar: {
                show: false,
            }
        },
        annotations: {
            yaxis: [{
                y: 8200,
                borderColor: '#038edc',
                label: {
                    borderColor: '#038edc',
                    style: {
                        color: '#fff',
                        background: '#038edc',
                    },
                    text: 'Support',
                }
            }, {
                y: 8600,
                y2: 9000,
                borderColor: '#f7cc53',
                fillColor: '#f7cc53',
                opacity: 0.2,
                label: {
                    borderColor: '#f7cc53',
                    style: {
                        fontSize: '10px',
                        color: '#000',
                        background: '#f7cc53',
                    },
                    text: 'Y-axis range',
                }
            }],
            xaxis: [{
                x: new Date('23 Nov 2017').getTime(),
                strokeDashArray: 0,
                borderColor: '#564ab1',
                label: {
                    borderColor: '#564ab1',
                    style: {
                        color: '#fff',
                        background: '#564ab1',
                    },
                    text: 'Anno Test',
                }
            }, {
                x: new Date('26 Nov 2017').getTime(),
                x2: new Date('28 Nov 2017').getTime(),
                fillColor: '#51d28c',
                opacity: 0.4,
                label: {
                    borderColor: '#000',
                    style: {
                        fontSize: '10px',
                        color: '#fff',
                        background: '#000',
                    },
                    offsetY: -10,
                    text: 'X-axis range',
                }
            }],
            points: [{
                x: new Date('01 Dec 2017').getTime(),
                y: 8607.55,
                marker: {
                    size: 8,
                    fillColor: '#fff',
                    strokeColor: 'red',
                    radius: 2,
                    cssClass: 'apexcharts-custom-class'
                },
                label: {
                    borderColor: '#f34e4e',
                    offsetY: 0,
                    style: {
                        color: '#fff',
                        background: '#f34e4e',
                    },

                    text: 'Point Annotation',
                }
            }, {
                x: new Date('08 Dec 2017').getTime(),
                y: 9340.85,
                marker: {
                    size: 0
                },
                image: {
                    path: 'assets/images/logo-sm.png',
                    width: 40,
                    height: 40
                }
            }]
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: linechartannotationsColors,
        grid: {
            padding: {
                right: 30,
                left: 20
            }
        },
        title: {
            text: 'Line with Annotations',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        labels: series.monthDataSeries1.dates,
        xaxis: {
            type: 'datetime',
        },
    };

    var chart = new ApexCharts(document.querySelector("#line_chart_annotations"), options);
    chart.render();
}



// Brush Chart Generate series

function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

var data = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
    min: 30,
    max: 90
})

// Brush Chart

var brushchartLine2Colors = getChartColorsArray("brushchart_line2");
if (brushchartLine2Colors) {
    var options = {
        series: [{
            data: data
        }],
        chart: {
            id: 'chart2',
            type: 'line',
            height: 220,
            toolbar: {
                autoSelected: 'pan',
                show: false
            }
        },
        colors: brushchartLine2Colors,
        stroke: {
            width: 3
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        }
    };

    var chart = new ApexCharts(document.querySelector("#brushchart_line2"), options);
    chart.render();
}

var brushchartLineColors = getChartColorsArray("brushchart_line");
if (brushchartLineColors) {
    var optionsLine = {
        series: [{
            data: data
        }],
        chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush: {
                target: 'chart2',
                enabled: true
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: new Date('19 Jun 2017').getTime(),
                    max: new Date('14 Aug 2017').getTime()
                }
            },
        },
        colors: brushchartLineColors,
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
            }
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            tickAmount: 2
        }
    };

    var chartLine = new ApexCharts(document.querySelector("#brushchart_line"), optionsLine);
    chartLine.render();
}

// Stepline Charts
var steplineChartColors = getChartColorsArray("line_chart_stepline");
if (steplineChartColors) {
    var options = {
        series: [{
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
        }],
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            },
        },
        stroke: {
            curve: 'stepline',
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Stepline Chart',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        markers: {
            hover: {
                sizeOffset: 4
            }
        },
        colors: steplineChartColors
    };

    var chart = new ApexCharts(document.querySelector("#line_chart_stepline"), options);
    chart.render();
}

//   Gradient Line
var lineChartGradientColors = getChartColorsArray("line_chart_gradient");
if (lineChartGradientColors) {
    var options = {
        series: [{
            name: 'Likes',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            },
        },
        stroke: {
            width: 7,
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ['1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001', '7/11/2001', '8/11/2001', '9/11/2001', '10/11/2001', '11/11/2001', '12/11/2001', '1/11/2002', '2/11/2002', '3/11/2002', '4/11/2002', '5/11/2002', '6/11/2002'],
            tickAmount: 10,
        },
        title: {
            text: 'Social Media',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: lineChartGradientColors,
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            },
        },
        markers: {
            size: 4,
            colors: ["#038edc"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7,
            }
        },
        yaxis: {
            min: -10,
            max: 40,
            title: {
                text: 'Engagement',
            },
        }
    };

    var chart = new ApexCharts(document.querySelector("#line_chart_gradient"), options);
    chart.render();
}

//   Missing Data
var linechartMissingDataColors = getChartColorsArray("line_chart_missing_data");
if (linechartMissingDataColors) {
    var options = {
        series: [{
            name: 'Peter',
            data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9]
        }, {
            name: 'Johnny',
            data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null]
        }, {
            name: 'David',
            data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: false
            }
        },
        stroke: {
            width: [5, 5, 4],
            curve: 'straight'
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        title: {
            text: 'Missing data (null values)',
            style: {
                fontWeight: 500,
            },
        },
        xaxis: {},
        colors: linechartMissingDataColors
    };

    var chart = new ApexCharts(document.querySelector("#line_chart_missing_data"), options);
    chart.render();
}

// Realtime Charts

var lastDate = 0;
var data = [];
var TICKINTERVAL = 86400000;
var XAXISRANGE = 777600000;

function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        data.push({
            'x': x,
            'y': y
        });
        lastDate = baseval
        baseval += TICKINTERVAL;
        i++;
    }
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
    min: 10,
    max: 90
})

function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate

    for (var i = 0; i < data.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL
        data[i].y = 0
    }

    data.push({
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })
}

function resetData() {
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
    data = data.slice(data.length - 10, data.length);
}


// Realtime Charts

var linechartrealtimeColors = getChartColorsArray("line_chart_realtime");
if (linechartrealtimeColors) {
    var options = {
        series: [{
            data: data.slice()
        }],
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Dynamic Updating Chart',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        markers: {
            size: 0
        },
        colors: linechartrealtimeColors,
        xaxis: {
            type: 'datetime',
            range: XAXISRANGE,
        },
        yaxis: {
            max: 100
        },
        legend: {
            show: false
        },
    };

    var charts = new ApexCharts(document.querySelector("#line_chart_realtime"), options);
    charts.render();
}


window.setInterval(function () {
    getNewSeries(lastDate, {
        min: 10,
        max: 90
    })

    charts.updateSeries([{
        data: data
    }])
}, 1000)



// Syncing Charts

function generateDayWiseTimeSeriesline(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

var chartSyncingLine = getChartColorsArray("chart-syncing-line");
if (chartSyncingLine) {
    var optionsLine = {
        series: [{
            data: generateDayWiseTimeSeriesline(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 60
            })
        }],
        chart: {
            id: 'fb',
            group: 'social',
            type: 'line',
            height: 160,
            toolbar: {
                show: false
            },
        },
        colors: chartSyncingLine,
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        toolbar: {
            tools: {
                selection: false
            }
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        },
        tooltip: {
            followCursor: false,
            x: {
                show: false
            },
            marker: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        },
        grid: {
            clipMarkers: false
        },
        yaxis: {
            tickAmount: 2
        },
        xaxis: {
            type: 'datetime'
        }
    };
    var chartLine = new ApexCharts(document.querySelector("#chart-syncing-line"), optionsLine);
    chartLine.render();
}

var chartSyncingLine2 = getChartColorsArray("chart-syncing-line2");
if (chartSyncingLine2) {
    var optionsLine2 = {
        series: [{
            data: generateDayWiseTimeSeriesline(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 30
            })
        }],
        chart: {
            id: 'tw',
            group: 'social',
            type: 'line',
            height: 160,
            toolbar: {
                show: false
            },
        },
        colors: chartSyncingLine2,
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        toolbar: {
            tools: {
                selection: false
            }
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        },
        tooltip: {
            followCursor: false,
            x: {
                show: false
            },
            marker: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        },
        grid: {
            clipMarkers: false
        },
        yaxis: {
            tickAmount: 2
        },
        xaxis: {
            type: 'datetime'
        }
    };
    var chartLine2 = new ApexCharts(document.querySelector("#chart-syncing-line2"), optionsLine2);
    chartLine2.render();
}

var chartSyncingArea = getChartColorsArray("chart-syncing-area");
if (chartSyncingArea) {
    var optionsArea = {
        series: [{
            data: generateDayWiseTimeSeriesline(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 60
            })
        }],
        chart: {
            id: 'yt',
            group: 'social',
            type: 'area',
            height: 160,
            toolbar: {
                show: false
            },
        },
        colors: chartSyncingArea,
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        toolbar: {
            tools: {
                selection: false
            }
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        },
        tooltip: {
            followCursor: false,
            x: {
                show: false
            },
            marker: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        },
        grid: {
            clipMarkers: false
        },
        yaxis: {
            tickAmount: 2
        },
        xaxis: {
            type: 'datetime'
        }
    };
    var chartArea = new ApexCharts(document.querySelector("#chart-syncing-area"), optionsArea);
    chartArea.render();
}