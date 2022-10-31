var myChart1 = echarts.init(document.getElementById("main1"));





var option1;
let dataAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
// prettier-ignore
let data = [100, 15, 120, 160, 10, 320, 10];
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}
option1 = {
    //   title: {
    //     text: '特性示例：渐变色 阴影 点击缩放',
    //     subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    //   },
    grid: {
        // left: "3%",
        // right: "4%",
        // bottom: "3%",
        top: "10%",
        width: "80%",//设置长款
        height: "80%",
        containLabel: true
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: true,
            color: '#fff'
        },
        axisTick: {
            show: false,
            color: '#fff'
        },
        axisLine: {
            show: false,
            color: '#fff'
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false,
            color: '#fff'
        },
        axisTick: {
            show: false,
            color: '#fff'
        },
        axisLabel: {
            color: '#999',
            color: '#fff'
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        {
            type: 'bar',
            showBackground: true,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                    ])
                }
            },
            data: data
        }
    ]
};
// Enable data zoom when user click bar.
const zoomSize = 6;
myChart1.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart1.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
}); 

myChart1.setOption(option1);


var chartDom2 = document.getElementById('main2');
var myChart2 = echarts.init(chartDom2);
var option2;
option2 = {
    grid: {
        // left: "3%",
        // right: "4%",
        // bottom: "3%",
        // top:"50%",
        width: "80%",//设置长款
        height: "70%",
        // containLabel: true
    },
    series: [
        {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '70%'],
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
                lineStyle: {
                    width: 6,
                    color: [
                        [0.25, '#FF6E76'],
                        [0.5, '#FDDD60'],
                        [0.75, '#58D9F9'],
                        [1, '#7CFFB2']
                    ]
                }
            },
            pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 30,
                offsetCenter: [0, '-40%'],
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                length: 12,
                lineStyle: {
                    color: 'auto',
                    width: 2
                }
            },
            splitLine: {
                length: 20,
                lineStyle: {
                    color: 'auto',
                    width: 5
                }
            },
            axisLabel: {
                color: '#FFFFFF',
                fontSize: 12,
                distance: -60,
                rotate: 'tangential',
                formatter: function (value) {
                    if (value === 0.875) {
                        return '正常';
                    } else if (value === 0.625) {
                        return '人数较少';
                    } else if (value === 0.375) {
                        return '需要增加';
                    } else if (value === 0.125) {
                        return '急需';
                    }
                    return '';
                }
            },
            title: {
                offsetCenter: [0, '-10%'],
                fontSize: 15
            },
            detail: {
                fontSize: 20,
                offsetCenter: [0, '-35%'],
                valueAnimation: true,
                formatter: function (value) {
                    return Math.round(value * 10);
                },
                color: 'auto'
            },
            data: [
                {
                    value: 0.7,
                    name: '目前状态'
                }
            ]
        }
    ]
};

setInterval(function () {
    myChart2.setOption({
        series: [
            {
                data: [
                    {
                        value: +(Math.random() * 10).toFixed(2)
                    }
                ]
            }
        ]
    });
}, 2000);
// myChart2.resize("100%", "100%")

myChart2.setOption(option2);

// let m1 = document.querySelector("#main2>div")
// m1.style.width = "100%" 
// m1.style.height = "100%"
// let m22 = document.querySelector("#main2>div>canvas")
// m22.style.width = "100%"
// m22.style.height = "100%"


var chartDom3 = document.getElementById('main3');
var myChart3 = echarts.init(chartDom3);
var option3 = {
    grid: {
        top:"10%",
        left: "15%",
        width: "80%",//设置长款
        height: "70%",
        // containLabel: true
    },
    xAxis: {
        type: 'category',
        lineStyle: {
            color: 'auto',
            width: 5
        },
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        lineStyle: {
            color: 'auto',
            width: 5
        },
        color: '#fff'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }
    ]
};

myChart3.setOption(option3);



// let m1 = document.querySelector("#main3>div")
// m1.style.width = "100%"
// m1.style.height = "100%"

// let m11 = document.querySelector("#main3>div>canvas")
// m11.style.width = "100%"
// m11.style.height = "100%"
console.log(m1);