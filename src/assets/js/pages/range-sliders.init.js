/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Range sliders Js File
*/

/*********************
  basic example
**********************/
var sliderColorScheme = document.querySelectorAll('[data-rangeslider]');
if (sliderColorScheme)
    Array.from(sliderColorScheme).forEach(function (slider) {
        noUiSlider.create(slider, {
            start: 127,
            connect: 'lower',
            range: {
                'min': 0,
                'max': 255
            },
        });
    });

/*********************
  multi range handle
**********************/

var multielementslider = document.querySelectorAll('[data-multielement]');
if (multielementslider)
    Array.from(multielementslider).forEach(function (slider) {
        noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
    });

/*********************
  Colorpicker
**********************/

var resultElement = document.getElementById('result');
var sliders = document.getElementsByClassName('sliders');
var colors = [0, 0, 0];
if (sliders)
    Array.from([].slice.call(sliders)).forEach(function (slider, index) {

        noUiSlider.create(slider, {
            start: 127,
            connect: [true, false],
            orientation: "vertical",
            range: {
                'min': 0,
                'max': 255
            },
            format: wNumb({
                decimals: 0
            })
        });

        // Bind the color changing function to the update event.
        slider.noUiSlider.on('update', function () {

            colors[index] = slider.noUiSlider.get();

            var color = 'rgb(' + colors.join(',') + ')';

            resultElement.style.background = color;
            resultElement.style.color = color;
        });
    });

/*********************
  Using HTML5 input elements
**********************/

var select = document.getElementById('input-select');
// Append the option elements
for (var i = -20; i <= 40; i++) {
    var option = document.createElement("option");
    option.text = i;
    option.value = i;
    select.appendChild(option);
}

var html5Slider = document.getElementById('html5');
if (html5Slider)
    noUiSlider.create(html5Slider, {
        start: [10, 30],
        connect: true,
        range: {
            'min': -20,
            'max': 40
        }
    });

var inputNumber = document.getElementById('input-number');
if (inputNumber && html5Slider) {
    html5Slider.noUiSlider.on('update', function (values, handle) {

        var value = values[handle];

        if (handle) {
            inputNumber.value = value;
        } else {
            select.value = Math.round(value);
        }
    });

    select.addEventListener('change', function () {
        html5Slider.noUiSlider.set([this.value, null]);
    });

    inputNumber.addEventListener('change', function () {
        html5Slider.noUiSlider.set([null, this.value]);
    });
}

/*********************
  Non linear slider
**********************/
var nonLinearSlider = document.getElementById('nonlinear');
if (nonLinearSlider)
    noUiSlider.create(nonLinearSlider, {
        connect: true,
        behaviour: 'tap',
        start: [500, 4000],
        range: {
            // Starting at 500, step the value by 500,
            // until 4000 is reached. From there, step by 1000.
            'min': [0],
            '10%': [500, 500],
            '50%': [4000, 1000],
            'max': [10000]
        }
    });

var nodes = [
    document.getElementById('lower-value'), // 0
    document.getElementById('upper-value') // 1
];

// Display the slider value and how far the handle moved
// from the left edge of the slider.
nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
    nodes[handle].innerHTML = values[handle] + ', ' + positions[handle].toFixed(2) + '%';
});

/*********************
  Locking sliders together
**********************/
var lockedState = false;
var lockedSlider = false;
var lockedValues = [60, 80];

var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');

var lockButton = document.getElementById('lockbutton');
var slider1Value = document.getElementById('slider1-span');
var slider2Value = document.getElementById('slider2-span');

// When the button is clicked, the locked state is inverted.
if (lockButton)
    lockButton.addEventListener('click', function () {
        lockedState = !lockedState;
        this.textContent = lockedState ? 'unlock' : 'lock';
    });

function crossUpdate(value, slider) {

    // If the sliders aren't interlocked, don't
    // cross-update.
    if (!lockedState) return;

    // Select whether to increase or decrease
    // the other slider value.
    var a = slider1 === slider ? 0 : 1;

    // Invert a
    var b = a ? 0 : 1;

    // Offset the slider value.
    value -= lockedValues[b] - lockedValues[a];

    // Set the value
    slider.noUiSlider.set(value);
}

noUiSlider.create(slider1, {
    start: 60,

    // Disable animation on value-setting,
    // so the sliders respond immediately.
    animate: false,
    range: {
        min: 50,
        max: 100
    }
});

noUiSlider.create(slider2, {
    start: 80,
    animate: false,
    range: {
        min: 50,
        max: 100
    }
});

if (slider1 && slider2) {
    slider1.noUiSlider.on('update', function (values, handle) {
        slider1Value.innerHTML = values[handle];
    });
    slider2.noUiSlider.on('update', function (values, handle) {
        slider2Value.innerHTML = values[handle];
    });


    function setLockedValues() {
        lockedValues = [
            Number(slider1.noUiSlider.get()),
            Number(slider2.noUiSlider.get())
        ];
    }

    slider1.noUiSlider.on('change', setLockedValues);
    slider2.noUiSlider.on('change', setLockedValues);

    slider1.noUiSlider.on('slide', function (values, handle) {
        crossUpdate(values[handle], slider2);
    });

    slider2.noUiSlider.on('slide', function (values, handle) {
        crossUpdate(values[handle], slider1);
    });
}

/*********************
    mergingTooltipSlider
**********************/
var mergingTooltipSlider = document.getElementById('slider-merging-tooltips');
if (mergingTooltipSlider) {
    noUiSlider.create(mergingTooltipSlider, {
        start: [20, 75],
        connect: true,
        tooltips: [true, true],
        range: {
            'min': 0,
            'max': 100
        }
    });

    mergeTooltips(mergingTooltipSlider, 5, ' - ');
}

/**
 * @param slider HtmlElement with an initialized slider
 * @param threshold Minimum proximity (in percentages) to merge tooltips
 * @param separator String joining tooltips
 */
function mergeTooltips(slider, threshold, separator) {

    var textIsRtl = getComputedStyle(slider).direction === 'rtl';
    var isRtl = slider.noUiSlider.options.direction === 'rtl';
    var isVertical = slider.noUiSlider.options.orientation === 'vertical';
    var tooltips = slider.noUiSlider.getTooltips();
    var origins = slider.noUiSlider.getOrigins();

    // Move tooltips into the origin element. The default stylesheet handles this.
    Array.from(tooltips).forEach(function (tooltip, index) {
        if (tooltip) {
            origins[index].appendChild(tooltip);
        }
    });
    if (slider)
        slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {

            var pools = [
                []
            ];
            var poolPositions = [
                []
            ];
            var poolValues = [
                []
            ];
            var atPool = 0;

            // Assign the first tooltip to the first pool, if the tooltip is configured
            if (tooltips[0]) {
                pools[0][0] = 0;
                poolPositions[0][0] = positions[0];
                poolValues[0][0] = values[0];
            }

            for (var i = 1; i < positions.length; i++) {
                if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
                    atPool++;
                    pools[atPool] = [];
                    poolValues[atPool] = [];
                    poolPositions[atPool] = [];
                }

                if (tooltips[i]) {
                    pools[atPool].push(i);
                    poolValues[atPool].push(values[i]);
                    poolPositions[atPool].push(positions[i]);
                }
            }

            Array.from(pools).forEach(function (pool, poolIndex) {
                var handlesInPool = pool.length;

                for (var j = 0; j < handlesInPool; j++) {
                    var handleNumber = pool[j];

                    if (j === handlesInPool - 1) {
                        var offset = 0;

                        Array.from(poolPositions[poolIndex]).forEach(function (value) {
                            offset += 1000 - value;
                        });

                        var direction = isVertical ? 'bottom' : 'right';
                        var last = isRtl ? 0 : handlesInPool - 1;
                        var lastOffset = 1000 - poolPositions[poolIndex][last];
                        offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;

                        // Center this tooltip over the affected handles
                        tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
                        tooltips[handleNumber].style.display = 'block';
                        tooltips[handleNumber].style[direction] = offset + '%';
                    } else {
                        // Hide this tooltip
                        tooltips[handleNumber].style.display = 'none';
                    }
                }
            });
        });
}

/*********************
    tooltip
**********************/
var hidingTooltipSlider = document.getElementById('slider-hide');
if (hidingTooltipSlider)
    noUiSlider.create(hidingTooltipSlider, {
        range: {
            min: 0,
            max: 100
        },
        start: [20, 80],
        tooltips: true
    });

/*********************
    pipe - scale
**********************/
var pipsSlider = document.getElementById('slider-pips');
if (pipsSlider)
    noUiSlider.create(pipsSlider, {
        range: {
            min: 0,
            max: 100
        },
        start: [50],
        pips: {
            mode: 'count',
            values: 5
        }
    });

var pips = pipsSlider.querySelectorAll('.noUi-value');

function clickOnPip() {
    var value = Number(this.getAttribute('data-value'));
    pipsSlider.noUiSlider.set(value);
}
if (pips)
    Array.from(pips).forEach(function (ele) {
        // For this example. Do this in CSS!
        ele.style.cursor = 'pointer';
        ele.addEventListener('click', clickOnPip);
    });

/*********************
  Colored Connect Elements
**********************/
var slider = document.getElementById('slider-color');
if (slider)
    noUiSlider.create(slider, {
        start: [4000, 8000, 12000, 16000],
        connect: [false, true, true, true, true],
        range: {
            'min': [2000],
            'max': [20000]
        }
    });

var connect = slider.querySelectorAll('.noUi-connect');
var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

var i = 0;
Array.from(connect).forEach(function (ele) {
    ele.classList.add(classes[i]);
    i ++;
});

/*********************
    toggle slider
**********************/
var toggleSlider = document.getElementById('slider-toggle');
if (toggleSlider) {
    noUiSlider.create(toggleSlider, {
        orientation: "vertical",
        start: 0,
        range: {
            'min': [0, 1],
            'max': 1
        },
        format: wNumb({
            decimals: 0
        })
    });

    toggleSlider.noUiSlider.on('update', function (values, handle) {
        if (values[handle] === '1') {
            toggleSlider.classList.add('off');
        } else {
            toggleSlider.classList.remove('off');
        }
    });
}

/*********************
    Soft limits
**********************/
var softSlider = document.getElementById('soft');
if (softSlider) {
    noUiSlider.create(softSlider, {
        start: 50,
        range: {
            min: 0,
            max: 100
        },
        pips: {
            mode: 'values',
            values: [20, 80],
            density: 4
        }
    });

    softSlider.noUiSlider.on('change', function (values, handle) {
        if (values[handle] < 20) {
            softSlider.noUiSlider.set(20);
        } else if (values[handle] > 80) {
            softSlider.noUiSlider.set(80);
        }
    });
}