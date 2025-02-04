// get colors array from the string
function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        if (colors) {
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
        } else {
            console.warn('data-colors atributes not found on', chartId);
        }
    }
}

// mini-1
var vectorMapWorldLineColors = getChartColorsArray("mini-chart1");
if (vectorMapWorldLineColors) {
    var options = {
        series: [60, 40],
        chart: {
            type: 'donut',
            height: 110,
        },
        colors: vectorMapWorldLineColors,
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        }
    };

    var chart = new ApexCharts(document.querySelector("#mini-chart1"), options);
    chart.render();
}


// mini-2
var vectorMapWorldLineColors = getChartColorsArray("mini-chart2");
if (vectorMapWorldLineColors) {
    var options = {
        series: [35, 80],
        chart: {
            type: 'donut',
            height: 110,
        },
        colors: vectorMapWorldLineColors,
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        }
    };

    var chart = new ApexCharts(document.querySelector("#mini-chart2"), options);
    chart.render();
}

// mini-3
var vectorMapWorldLineColors = getChartColorsArray("mini-chart3");
if (vectorMapWorldLineColors) {
    var options = {
        series: [70, 30],
        chart: {
            type: 'donut',
            height: 110,
        },
        colors: vectorMapWorldLineColors,
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        }
    };

    var chart = new ApexCharts(document.querySelector("#mini-chart3"), options);
    chart.render();
}


// stacked column chart
var linechartBasicColors = getChartColorsArray("stacked-column-chart");
if (linechartBasicColors) {
    var options = {
        chart: {
            height: 362,
            type: 'bar',
            // stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded'
            },
        },

        dataLabels: {
            enabled: false
        },
        series: [{
            name: 'Income',
            data: [38, 48, 41, 52, 22, 43, 36, 48, 24, 28, 36, 44]
        }, {
            name: 'Outcome',
            data: [13, 20, 20, 8, 13, 27, 18, 22, 15, 16, 24, 22]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        grid:{
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: false
                }
            }, 
          },
        colors: linechartBasicColors,
        legend: {
            show: false
        },
        fill: {
            opacity: 1
        },
    }

    var chart = new ApexCharts(
        document.querySelector("#stacked-column-chart"),
        options
    );

    chart.render();
}


// Saleing Categories

var barchartColors = getChartColorsArray("structure-widget");
if (barchartColors) {
var options = {
  chart: {
      height: 300,
      type: 'donut',
  }, 
  series: [40, 18, 13],
  labels: ["Invoiced", "Collected", "Outstanding"],
  colors: barchartColors,
  plotOptions: {
    pie: {
        startAngle: 25,
        donut: {
        size: '78%',
        }
    }
  },

  legend: {
      show: false,
  },

  dataLabels: {
        style: {
          fontSize: '11px',
          fontFamily: 'DM Sans,sans-serif',
          colors: undefined
         },
    
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 1,
        },
  },
  responsive: [{
      breakpoint: 600,
      options: {
          chart: {
              height: 240
          },
          legend: {
              show: false
          },
      }
  }]
  }
  
  var chart = new ApexCharts(
  document.querySelector("#structure-widget"),
  options
  );
  
  chart.render();

}



// payment-overview
var barchartColors = getChartColorsArray("payment-overview");
if (barchartColors) {
var options1 = {
  chart: {
    type: 'area',
    height: 341,
    toolbar: {
      show: false
    },
  },
  series: [{
    name: 'Received Amount',
    data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75]
  }, {
    name: 'Due Amount',
    data: [15, 09, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62]
  }
  ],
  stroke: {
    curve: 'smooth',
    width: ['3.5', '3.5'],
  },
  grid:{
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
  colors: barchartColors,
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now','Des'],
  },
  legend: {
      show: false,
  },

  fill: {
      type: 'gradient',
      gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.40,
          opacityTo: 0.1,
          stops: [30, 100, 100, 100]
        },
    },
    dataLabels: {
      enabled: false
    },
  tooltip: {
    fixed: {
      enabled: false
    }
    ,
    x: {
      show: false
    }
    ,
    y: {
      title: {
        formatter: function (seriesName) {
          return ''
        }
      }
    }
    ,
    marker: {
      show: false
    }
  }
}
new ApexCharts(document.querySelector("#payment-overview"), options1).render();

}

// world map with markers
var worldemapmarkers = new jsVectorMap({
	map: 'world_merc',
	selector: '#world-map-markers',
	zoomOnScroll: false,
	zoomButtons: false,
	selectedMarkers: [0, 2],
	markersSelectable: true,
  regionStyle : {
    initial : {
        fill : '#ddeae7'
    }
},
	markers:[
	  { name: "United States", coords: [37.0902, -95.7129] },
	  { name: "Italy", coords: [61.524,105.3188] },
	  { name: "French", coords: [56.1304,-106.3468] },
	  { name: "Spain", coords: [71.7069,-42.6043] },
      { name: "Russia", coords: [35.8617, 104.1954] },
	  { name: "Arabic", coords: [48.373, 31.168] },
	],
	markerStyle:{
	  initial: { fill: "#438a7a" },
	  selected: { fill: "#438a7a" }
	},
	labels: {
	  	markers: {
			render: function(marker){
				return marker.name
			}
	  	}
	}
})