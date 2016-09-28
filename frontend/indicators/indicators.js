$(document).ready(function() {

    function getData(chartToUpdate) {
        $.getJSON('http://sosvetom.ru/_api/get_metrics/?num=100&col=1',
            function(data){
                var point = chartToUpdate.series[0].points[0];
                var newVal = data[0][1];
                if (newVal >= 1100) {
                    chartToUpdate.yAxis[0].setExtremes(0,newVal+100);
                } else {
                    chartToUpdate.yAxis[0].setExtremes(0,1100);
                }
                point.update(newVal);
            });  
    }

    function getWeather() {
        var requestWeather = 'http://apidev.accuweather.com/currentconditions/v1/294021.json?language=ru&apikey=hoArfRosT1215';
        $.getJSON(requestWeather, function(data){
            $('#weather').html('<img src="img/'+data[0].WeatherIcon+'.svg" height="50">'+Math.round(data[0].Temperature.Metric.Value)+'°C');
        });
    }

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
            text: 'Номинальная мощность электроэнергии'
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
                color: '#DF5353' // red
            }, {
                from: 300,
                to: 800,
                color: '#DDDF0D' // yellow
            }, {
                from: 800,
                to: 1100,
                color: '#55BF3B' // green
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
            getData(chart);
            getWeather();
            setInterval(function () {
                getData(chart);
                getWeather();       
            }, 60000);
        }
    }); 

    //График за день
    Highcharts.setOptions({ global: { useUTC : false} })
  $.getJSON('http://sosvetom.ru/_api/get_metrics/?num=100&col=150', function (data) {
    $('#chart_24h').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'column', 
            backgroundColor: null
        },
        title: {
            text: 'Статистика работы за день'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 3600 * 1000,
            //min: ,
            //max: ,
        },
        yAxis: {
            title: {text: 'Мощность электроэнергии(Вт)'},
            labels: {enabled: false},
            gridLineColor: 'transparent', 
            lineColor: 'transparent'
        },
        legend: {
            enabled: false
        },
        series: [{ 
            name: 'Мощность', 
            data: data,
        }]
    });
  });

})
