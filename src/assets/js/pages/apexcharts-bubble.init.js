/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Bubble Chart init js
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


// Bubble Charts Generate Data
function generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}

// Simple Bubble
var chartBubbleSimpleColors = getChartColorsArray("simple_bubble");
if (chartBubbleSimpleColors) {
    var options = {
        series: [{
                name: 'Bubble1',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble2',
                data: generateData(new Date('12 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble3',
                data: generateData(new Date('13 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble4',
                data: generateData(new Date('14 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
        ],
        chart: {
            height: 350,
            type: 'bubble',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 0.8
        },
        title: {
            text: 'Simple Bubble Chart',
            style: {
                fontWeight: 500,
            },
        },
        xaxis: {
            tickAmount: 12,
            type: 'category',
        },
        yaxis: {
            max: 70
        },
        colors: chartBubbleSimpleColors
    };

    var chart = new ApexCharts(document.querySelector("#simple_bubble"), options);
    chart.render();
}

// 3D Bubble
var chartBubbleColors = getChartColorsArray("bubble_chart");
if (chartBubbleColors) {
    var options = {
        series: [{
                name: 'Product1',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product2',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product3',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product4',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
        ],
        chart: {
            height: 350,
            type: 'bubble',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
        },
        title: {
            text: '3D Bubble Chart',
            style: {
                fontWeight: 500,
            },
        },
        xaxis: {
            tickAmount: 12,
            type: 'datetime',
            labels: {
                rotate: 0,
            }
        },
        yaxis: {
            max: 70
        },
        theme: {
            palette: 'palette2'
        },
        colors: chartBubbleColors
    };

    var chart = new ApexCharts(document.querySelector("#bubble_chart"), options);
    chart.render();
}