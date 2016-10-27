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
    Highcharts.setOptions({
        global: { useUTC : false},
        lang: {
            loading: 'Загрузка...',
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
            rangeSelectorZoom: ['Увеличить:']
        }
    })
    //Онлайн профиль генерации
    $('#chart_24h').highcharts('StockChart',{
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
        rangeSelector: {
                buttons: [{
                    type: 'hour',
                    count: 24,
                    text: '1 день'
                }, {
                    type: 'all',
                    text: 'Показать всё'
                }],
                buttonTheme: {
                    width: 100
                },
                selected: 1,
                inputEnabled: false
        },
        title: {
            text: 'Онлайн профиль генерации'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 3600 * 1000
        },
        yAxis: {
            title: {text: 'Мощность генерации (Вт)'},
            labels: {enabled: false}
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                lineWidth: 3,
                fillOpacity: 0.5,
                marker: {
                    enabled: false
                }
            },
        },
        navigator: {
            enabled: false
        },
        series: [{
            name: 'Мощность генерации',
            color: '#ffaa30'
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

    //Посуточный график генерации
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
            text: 'Посуточный график генерации (Вт*Ч/день)'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 30 * 3600 * 1000
        },
        yAxis: {
            title: {text: 'Мощность генерации (Вт)'},
            labels: {enabled: false}
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                groupPadding: 0
            }
        },
        series: [{
            name: 'Мощность генерации',
            color: '#9ac361'
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

    //Статистика с момента запуска сервиса
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
            text: 'Статистика с момента запуска сервиса'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 30 * 24 * 3600 * 1000
        },
        yAxis: {
            title: {text: 'Мощность генерации (Вт)'},
            labels: {enabled: false}
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointWidth: 50,
                groupPadding: 0
            }
        },
        series: [{
            name: 'Мощность генерации',
            color: '#554176'
        }],
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
