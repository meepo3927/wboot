let tool = require('util/tool');

const getTooltipDotHtml = function (color) {
    if (typeof color === 'object' && color.color) {
        color = color.color;
    }
    let style = [
        'display:inline-block',
        'margin-right: 5px',
        'border-radius: 10px',
        'width: 9px',
        'height:9px',
        'background-color:' + color
    ].join(';')
    return '<span style="' + style + '"></span> ';
};
const methods = {
    getTooltipDotHtml
};
// 柱状图tooltip
methods.getBarTooltip = function() {
    return {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    }
};
// areaStyle.color 渐变
methods.getChartAreaGradient = function (fromColor, toColor) {
    return  {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: fromColor || '#666666'
        }, {
            offset: 1, color: toColor || '#ffffff'
        }]
    }
};
// 折线图：最大最小 markPoint: this.getMinMaxMarkPoint()
methods.getMinMaxMarkPoint = function () {
    return {
        data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
        ]
    }
};
// 桑基图
methods.getSankeyChartOption = function (o) {
    return tool.extend({
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'sankey',
            layout: 'none',
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#aaa'
                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.5
                }
            }
        }]
    }, o);
};

module.exports = {
    methods
};