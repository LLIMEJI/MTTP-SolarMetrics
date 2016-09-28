$(document).ready(function() {
    Highcharts.setOptions({ global: { useUTC : false} })
  $.getJSON('http://sosvetom.ru/_api/get_metrics/?num=300&col=72', function (data) {
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
    },
    // Обновление значений
    function (chart) {
        if (!chart.renderer.forExport) {
            var point = chart.series[0];
            setInterval(function () {
                $.getJSON('http://sosvetom.ru/_api/get_metrics/?num=300&col=1', function (newValue) {
                    point.addPoint(newValue, true, true);
                });
            }, 60000);
        }
    }); 
})
})
