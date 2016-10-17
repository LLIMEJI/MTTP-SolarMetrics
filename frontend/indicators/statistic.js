function requestData(chartToUpdate,url) {
    $.getJSON('http://sosvetom.ru/_api/get_metrics/?offset='+url,
        function(data){
            var chart = chartToUpdate.series[0];
            chart.setData(data);
            chartToUpdate.redraw();
        }
    );
}

$(document).ready(function() {
    Highcharts.setOptions({ global: { useUTC : false} })
    //Статистика за день
    $('#chart_24h').highcharts({
        credits: {
            enabled: false
        },
        exporting: { 
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
            tickInterval: 3600 * 1000
        },
        yAxis: {
            title: {text: 'Мощность электроэнергии(Вт)'},
            labels: {enabled: false}
        },
        legend: {
            enabled: false
        },
        series: [{ 
            name: 'Мощность',

        }]
    },
    // Обновление значений
    function (chart) {
        var request = 'day'
        if (!chart.renderer.forExport) {
            requestData(chart,request);
            setInterval(function () {
                requestData(chart,request);
            }, 60000);
        }
    }); 

    //Статистика за месяц
    $('#chart_month').highcharts({
        credits: {
            enabled: false
        },
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'column', 
            backgroundColor: null
        },
        title: {
            text: 'Статистика работы за месяц'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 30 * 3600 * 1000
        },
        yAxis: {
            title: {text: 'Мощность электроэнергии(Вт)'},
            labels: {enabled: false}
        },
        legend: {
            enabled: false
        },
        series: [{ 
            name: 'Мощность',

        }]
    },

    function (chart) {
        var request = 'month'
        if (!chart.renderer.forExport) {
            requestData(chart,request);
            setInterval(function () {
                requestData(chart,request);
            }, 60000);
        }
    }); 

    //Статистика за год
    $('#chart_year').highcharts({
        credits: {
            enabled: false
        },
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'column', 
            backgroundColor: null
        },
        title: {
            text: 'Статистика работы за год'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 30 * 24 * 3600 * 1000
        },
        yAxis: {
            title: {text: 'Мощность электроэнергии(Вт)'},
            labels: {enabled: false}
        },
        legend: {
            enabled: false
        },
        series: [{ 
            name: 'Мощность',

        }]
    },
    
    function (chart) {
        var request = 'year'
        if (!chart.renderer.forExport) {
            requestData(chart,request);
            setInterval(function () {
                requestData(chart,request);
            }, 60000);
        }
    }); 
})
