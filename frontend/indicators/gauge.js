function updateValue(chartToUpdate) {
    $.getJSON('http://sosvetom.ru/_api/get_metrics/?offset=last',
        function(data){
            var point = chartToUpdate.series[0].points[0];
            var newVal = data[0][1];
            if (newVal >= chartToUpdate.yAxis[0].max) {
                chartToUpdate.yAxis[0].setExtremes(0,newVal);
            } else {
                chartToUpdate.yAxis[0].setExtremes(0,chartToUpdate.yAxis[0].max);
            }
            drawPlotBand(chartToUpdate);
            point.update(newVal);
        }
    );     
    getWeather();
}

//Отрисовка зелёного plotBand
function drawPlotBand(chart) {
    chart.yAxis[0].removePlotBand('addgreen');
    chart.yAxis[0].addPlotBand({
        from: 1100,
        to: chart.yAxis[0].max,
        color: '#9adb8a', // green
        id: 'addgreen'
    });
}

function getWeather() {
    var requestWeather = 'http://apidev.accuweather.com/currentconditions/v1/294021.json?language=ru&apikey=hoArfRosT1215';
    $.getJSON(requestWeather, function(data){
        $('#weather').html('<img src="img/'+data[0].WeatherIcon+'.svg" height="50">'+Math.round(data[0].Temperature.Metric.Value)+'°C');
    });
}

$(document).ready(function() {

    //Тахометр
    $('#gauge').highcharts({
        chart: {
            type: 'gauge',
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Текущее значение генерации'
        },

        tooltip: {
                enabled: false
        },

        exporting: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 1100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                useHTML: true,
                text: '<div id=weather></div>'
            },
            plotBands: [{
                from: 0,
                to: 300,
                color: '#DF5353', // red
                id: 'red'
            }, {
                from: 300,
                to: 800,
                color: '#DDDF0D', // yellow
                id: 'yellow'
            }, {
                from: 800,
                to: 1100,
                color: '#55BF3B', // green
                id: 'green'
            }]
        },

        series: [{
            name: null,
            data: [0],
            dataLabels: {
                 borderWidth: 0,
                 style: {
                    'color': '#707070',
                    'fontSize': '12pt'
                 },
            format: '{y} Вт'
            }
        }]

    },
    // Обновление значений
    function (chart) {
        if (!chart.renderer.forExport) {
            updateValue(chart);
            setInterval(function () {
                updateValue(chart);
            }, 60000);
        }
    });
})
