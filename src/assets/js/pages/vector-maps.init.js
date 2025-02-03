/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Vector Maps init Js File
*/

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
            console.warn('data-colors Attribute not found on:', chartId);
        }
    }
}

// world map with line & markers
var vectorMapWorldLineColors = getChartColorsArray("world-map-line-markers");
if (vectorMapWorldLineColors)
    var worldlinemap = new jsVectorMap({
        map: "world_merc",
        selector: "#world-map-line-markers",
        zoomOnScroll: false,
        zoomButtons: false,
        markers: [{
                name: "Greenland",
                coords: [72, -42]
            },
            {
                name: "Canada",
                coords: [56.1304, -106.3468]
            },
            {
                name: "Brazil",
                coords: [-14.2350, -51.9253]
            },
            {
                name: "Egypt",
                coords: [26.8206, 30.8025]
            },
            {
                name: "Russia",
                coords: [61, 105]
            },
            {
                name: "China",
                coords: [35.8617, 104.1954]
            },
            {
                name: "United States",
                coords: [37.0902, -95.7129]
            },
            {
                name: "Norway",
                coords: [60.472024, 8.468946]
            },
            {
                name: "Ukraine",
                coords: [48.379433, 31.16558]
            },
        ],
        lines: [{
                from: "Canada",
                to: "Egypt"
            },
            {
                from: "Russia",
                to: "Egypt"
            },
            {
                from: "Greenland",
                to: "Egypt"
            },
            {
                from: "Brazil",
                to: "Egypt"
            },
            {
                from: "United States",
                to: "Egypt"
            },
            {
                from: "China",
                to: "Egypt"
            },
            {
                from: "Norway",
                to: "Egypt"
            },
            {
                from: "Ukraine",
                to: "Egypt"
            },
        ],
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapWorldLineColors,
                fillOpacity: 1,
            },
        },
        lineStyle: {
            animation: true,
            strokeDasharray: "6 3 6",
        },
    });

// world map with markers
var vectorMapWorldMarkersColors = getChartColorsArray("world-map-line-markers");
if (vectorMapWorldMarkersColors)
    var worldemapmarkers = new jsVectorMap({
        map: 'world_merc',
        selector: '#world-map-markers',
        zoomOnScroll: false,
        zoomButtons: false,
        selectedMarkers: [0, 2],
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapWorldMarkersColors,
                fillOpacity: 1,
            },
        },
        markersSelectable: true,
        markers: [{
                name: "Palestine",
                coords: [31.9474, 35.2272]
            },
            {
                name: "Russia",
                coords: [61.524, 105.3188]
            },
            {
                name: "Canada",
                coords: [56.1304, -106.3468]
            },
            {
                name: "Greenland",
                coords: [71.7069, -42.6043]
            },
        ],
        markerStyle: {
            initial: {
                fill: "#038edc"
            },
            selected: {
                fill: "red"
            }
        },
        labels: {
            markers: {
                render: function (marker) {
                    return marker.name
                }
            }
        }
    })

// world map with image markers
var vectorMapWorldMarkersImageColors = getChartColorsArray("world-map-markers-image");
if (vectorMapWorldMarkersImageColors)
    var worldemapmarkersimage = new jsVectorMap({
        map: 'world_merc',
        selector: '#world-map-markers-image',
        zoomOnScroll: false,
        zoomButtons: false,
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapWorldMarkersImageColors,
                fillOpacity: 1,
            },
        },
        selectedMarkers: [0, 2],
        markersSelectable: true,
        markers: [{
                name: "Palestine",
                coords: [31.9474, 35.2272]
            },
            {
                name: "Russia",
                coords: [61.524, 105.3188]
            },
            {
                name: "Canada",
                coords: [56.1304, -106.3468]
            },
            {
                name: "Greenland",
                coords: [71.7069, -42.6043]
            },
        ],
        markerStyle: {
            initial: {
                image: "assets/images/logo-sm.png"
            }
        },
        labels: {
            markers: {
                render: function (marker) {
                    return marker.name
                }
            }
        }
    })

// US Map
var vectorMapUsaColors = getChartColorsArray("usa-vectormap");
if (vectorMapUsaColors)
    var usmap = new jsVectorMap({
        map: 'us_merc_en',
        selector: "#usa-vectormap",
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapUsaColors,
                fillOpacity: 1,
            },
        },
        zoomOnScroll: false,
        zoomButtons: false,
    });


// canada Map
var vectorMapCanadaColors = getChartColorsArray("canada-vectormap");
if (vectorMapCanadaColors)
    var canadamap = new jsVectorMap({
        map: 'canada',
        selector: "#canada-vectormap",
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapCanadaColors,
                fillOpacity: 1,
            },
        },
        zoomOnScroll: false,
        zoomButtons: false,
    });

// russia Map
var vectorMapRussiaColors = getChartColorsArray("russia-vectormap");
if (vectorMapRussiaColors)
    var russiamap = new jsVectorMap({
        map: 'russia',
        selector: "#russia-vectormap",
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapRussiaColors,
                fillOpacity: 1,
            },
        },
        zoomOnScroll: false,
        zoomButtons: false,
    })

// spain Map
var vectorMapSpainColors = getChartColorsArray("spain-vectormap");
if (vectorMapSpainColors)
    var spainmap = new jsVectorMap({
        map: 'spain',
        selector: "#spain-vectormap",
        regionStyle: {
            initial: {
                stroke: "#9599ad",
                strokeWidth: 0.25,
                fill: vectorMapSpainColors,
                fillOpacity: 1,
            },
        },
        zoomOnScroll: false,
        zoomButtons: false,
    })