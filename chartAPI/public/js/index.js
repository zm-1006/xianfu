/**
 * Created by zm on 2018/3/11.
 */
//  var path = 'http://192.168.1.175:3000'
Vue.prototype.bytesToGB = function(val) {
    return (parseInt(val) / 1073741824).toFixed(3)
}
var vm = new Vue({
    el: '.ad-container',
    data: {
        a: 10,
        data1: {
            good: 0,
            bad: 0,
            bad_monthly: 0,
            bad_until_now: 0
        },
        data2: [
            {
                cluster: 0,
                nodes: 6,
                cores: 6,
                memory: 6,
                disk: 6
            },
            {
                cluster: 0,
                nodes: 6,
                cores: 6,
                memory: 6,
                disk: 6
            },
            {
                cluster: 0,
                nodes: 6,
                cores: 6,
                memory: 6,
                disk: 6
            }
        ],
        data3: [
            [
                {
                    timestamp: 123445678754,
                    cpu_percent: 0.3,
                    mem_used: 123849,
                    disk_used: 32842812,
                    disk_input: 3829.2,
                    disk_output: 1382.1,
                    net_input: 32901.4,
                    net_output: 4930.8,
                    health: 0
                }
            ],
            [
                {
                    timestamp: 123445678754,
                    cpu_percent: 0.3,
                    mem_used: 123849,
                    disk_used: 32842812,
                    disk_input: 3829.2,
                    disk_output: 1382.1,
                    net_input: 32901.4,
                    net_output: 4930.8,
                    health: 0
                }
            ],
            [
                {
                    timestamp: 123445678754,
                    cpu_percent: 0.3,
                    mem_used: 123849,
                    disk_used: 32842812,
                    disk_input: 3829.2,
                    disk_output: 1382.1,
                    net_input: 32901.4,
                    net_output: 4930.8,
                    health: 0
                }
            ]
        ],
        data4: []
    },
    /*filters:{
        bytesToGB:function(val) {
            return (parseInt(val) / 1073741824).toFixed(3)
        }
    },*/
    computed: {

    },
    beforeCreate:function(){
        this.$nextTick(function () {
        })
    },
    created: function () {
        this.$nextTick(function () {
            //this.getJkzk()
            this.getJqzl(0)
            this.getJqzl(1)
            this.getJqzl(2)
            //this.getData2()
        })

    },
    mounted: function () {
        this.$nextTick(function () {

            /*
             * ct：cluster
             0->采集集群
             1->消息队列集群
             2->计算存储集群
             * */
            /*
             * n：返回数据长度
             * */
            /*this.getJkzk()
             this.getJqzl(2)
             this.getJqsy(2,5)
             this.getJqzt(1)
             this.getJqls(1,10)
             this.getJqsjzt(2,5)
             this.getJqzyzl()
             this.getJqzysy(5)
             this.getJquse()*/

//        this.getJqzl(0)

//      this.getData2()

            /*opts={
             ct:0,
             n:0,
             fn:function(){}
             }*/
        })
    },
    methods: {
        getData2: function () {
            var len = 0
            while (len < 3) {
                this.getJqzl(len)
                len++
            }
            //console.log(`data2:${this.data2}`)
            //console.log(this.data2)

        },
        // this.$http.get('/someUrl', [options]).then(function(response){}
        getJkzk: function () { // 健康状况
            var that = this
            this.$http.get('/api/v1/hostStatus').
                then(function (res) {
                    that.data1 = res.body.data
                    console.log(that.data1)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqzl: function (ct) { // 集群资源总量
            var that = this
            this.$http.get('/api/v1/' + ct + '/resource').
                then(function (res) {
                    console.log(res.body)
                    that.data2.splice(ct,ct+1,res.body.data)
                    console.log('****')
                    console.log(that.data2)
                    console.log('****')
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqsy: function (ct, n) { // 集群资源使用情况
            this.$http.get('/api/v1/' + ct + '/resource/usage?range=' + n).
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqzt: function (ct) { // 集群服务当前运行状态
            this.$http.get('/api/v1/' + ct + '/serviceStatus').
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqls: function (ct, n) { // 5.获取集群服务运行状态历史
            this.$http.get('/api/v1/' + ct + '/serviceStatus/history?range=' + n).
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqsjzt: function (ct, n) { // 6.获取集群数据状态
            this.$http.get('/api/v1/' + ct + '/dataStatus?range=' + n).
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqzyzl: function () { // 7.获取计算存储集群虚拟资源总量
            this.$http.get('/api/v1/virtualResource').
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJqzysy: function (n) { // 8.获取计算存储集群资源使用情况
            this.$http.get('/api/v1/virtualResource/usage?range=' + n).
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        },
        getJquse: function () { // 9.获取用户使用资源情况
            this.$http.get('/api/v1/users/statistic').
                then(function (res) {
                    console.log(res.body)
                }, function (res) {
                    console.log(res.body.msg)
                    // 响应错误回调
                });
        }
    }
})


var option1 = {
    grid: {
        x: 30,
        y: 50,
        x2: 30,
        y2: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['磁盘IO', '网络IO', 'CPU使用率'],
        y: 10,
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            position: 'bottom',
//            splitNumber: 5,
            boundaryGap: false, // 从0开始绘制
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 10,
                lineStyle: {
//                color: 'red',
                    type: 'none',
//                type: 'solid',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 'auto',    // {number}
//              rotate: 45,
                margin: 10,
                formatter: '{value}',
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
//              formatter: '{value}月',
                /*textStyle: {
                 color: 'blue',
                 fontFamily: 'sans-serif',
                 fontSize: 15,
                 fontStyle: 'italic',
                 fontWeight: 'bold'
                 }*/
            },
            splitLine: {
                show: true,
                lineStyle: {
//                color: '#483d8b',
                    type: 'none',
//                type: 'dashed',
//                width: 1
                }
            }, /*
         splitArea : {
         show: true,
         areaStyle:{
         color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
         }
         },*/
            data: [
                '1', '2', '3'
                /*{
                 value:'6',
                 textStyle: {
                 color: 'red',
                 fontSize: 30,
                 fontStyle: 'normal',
                 fontWeight: 'bold'
                 }
                 },*/
            ]
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '%',
            position: 'left',
            //min: 0,
            //max: 300,
            //splitNumber: 5,
            boundaryGap: [0, 0.1],
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
//                type: 'none',
//                type: 'dashed',
                    width: 1
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 'auto',    // {number}
//              rotate: -45,
                margin: 5,
                formatter: '{value}',    // Template formatter!
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            /*splitLine : {
             show:true,
             lineStyle: {
             color: '#483d8b',
             type: 'dotted',
             width: 2
             }
             },
             splitArea : {
             show: true,
             areaStyle:{
             color:['rgba(205,92,92,0.3)','rgba(255,215,0,0.3)']
             }
             }*/
        },
        {
            type: 'value',
            name: 'Byte/s',
            splitNumber: 5,
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            splitLine: {
                show: true
            }
        }
    ],
    series: [
        {
            name: '磁盘IO',
            type: 'line',
            smooth: true,
            data: [10, 55, 80]
        },
        {
            name: '网络IO',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [38, 62, 91]
        },
        {
            name: 'CPU使用率',
            type: 'line',
            smooth: true,
//            xAxisIndex: 1,
//            yAxisIndex: 1,
            data: [20, 77, 50]
        }
    ]
};

var option2 = {
    color: ['#FBC31A', '#258BFF'],
    title: {
        text: '内存占用',
        x: 'center',
        y: 'bottom',
        textStyle: {
            color: '#5797D6',
            fontSize: 12,
            fontStyle: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        y: 10,
        data: ['已用', '空闲'],
        textStyle: {
            color: '#fff'
        }
    },
    series: [
        {
            name: '使用率',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
//                  length : 10,
                    }
                }
            },
            data: [
                {value: 335, name: '已用'},
                {value: 1548, name: '空闲'}
            ]
        }
    ]
};

var option3 = {
    color: ['#FBC31A', '#258BFF'],
    title: {
        text: '磁盘占用',
        x: 'center',
        y: 'bottom',
        textStyle: {
            color: '#5797D6',
            fontSize: 12,
            fontStyle: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name: '使用率',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
//                  length : 10,
                    }
                }
            },
            data: [
                {value: 335, name: '已用'},
                {value: 1548, name: '空闲'}
            ]
        }
    ]
};

var option4 = {
    color: ['#3FC3EC'],
    grid: {
        x: 50,
        y: 30,
        x2: 50,
        y2: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'verdana',
                    fontSize: 12,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六']
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Byte',
            position: 'left',
            //min: 0,
            //max: 300,
            //splitNumber: 5,
            boundaryGap: [0, 0.1],
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
                    width: 1
                }
            },
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'verdana',
                    fontSize: 12,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            }
        }
    ],
    series: [
        {
            name: '成交',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [70, 200, 70, 150, 90, 300]
        }
    ]
};

var option5 = {
    grid: {
        x: 30,
        y: 50,
        x2: 30,
        y2: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['磁盘IO', '网络IO', 'CPU使用率'],
        y: 10,
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            position: 'bottom',
//            splitNumber: 5,
            boundaryGap: false, // 从0开始绘制
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 10,
                lineStyle: {
//                color: 'red',
                    type: 'none',
//                type: 'solid',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 'auto',    // {number}
//              rotate: 45,
                margin: 10,
                formatter: '{value}',
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
//              formatter: '{value}月',
                /*textStyle: {
                 color: 'blue',
                 fontFamily: 'sans-serif',
                 fontSize: 15,
                 fontStyle: 'italic',
                 fontWeight: 'bold'
                 }*/
            },
            splitLine: {
                show: true,
                lineStyle: {
//                color: '#483d8b',
                    type: 'none',
//                type: 'dashed',
//                width: 1
                }
            }, /*
         splitArea : {
         show: true,
         areaStyle:{
         color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
         }
         },*/
            data: [
                '1', '2', '3'
                /*{
                 value:'6',
                 textStyle: {
                 color: 'red',
                 fontSize: 30,
                 fontStyle: 'normal',
                 fontWeight: 'bold'
                 }
                 },*/
            ]
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '%',
            position: 'left',
            //min: 0,
            //max: 300,
            //splitNumber: 5,
            boundaryGap: [0, 0.1],
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
//                type: 'none',
//                type: 'dashed',
                    width: 1
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 'auto',    // {number}
//              rotate: -45,
                margin: 5,
                formatter: '{value}',    // Template formatter!
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            /*splitLine : {
             show:true,
             lineStyle: {
             color: '#483d8b',
             type: 'dotted',
             width: 2
             }
             },
             splitArea : {
             show: true,
             areaStyle:{
             color:['rgba(205,92,92,0.3)','rgba(255,215,0,0.3)']
             }
             }*/
        },
        {
            type: 'value',
            name: 'Byte/s',
            splitNumber: 5,
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            splitLine: {
                show: true
            }
        }
    ],
    series: [
        {
            name: '磁盘IO',
            type: 'line',
            smooth: true,
            data: [10, 55, 80]
        },
        {
            name: '网络IO',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [38, 62, 91]
        },
        {
            name: 'CPU使用率',
            type: 'line',
            smooth: true,
//            xAxisIndex: 1,
//            yAxisIndex: 1,
            data: [20, 77, 50]
        }
    ]
};

var option6 = {
    color: ['#FBC31A', '#258BFF'],
    title: {
        text: '内存占用',
        x: 'center',
        y: 'bottom',
        textStyle: {
            color: '#5797D6',
            fontSize: 12,
            fontStyle: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        y: 10,
        data: ['已用', '空闲'],
        textStyle: {
            color: '#fff'
        }
    },
    series: [
        {
            name: '使用率',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
//                  length : 10,
                    }
                }
            },
            data: [
                {value: 335, name: '已用'},
                {value: 1548, name: '空闲'}
            ]
        }
    ]
};

var option7 = {
    color: ['#FBC31A', '#258BFF'],
    title: {
        text: '磁盘占用',
        x: 'center',
        y: 'bottom',
        textStyle: {
            color: '#5797D6',
            fontSize: 12,
            fontStyle: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name: '使用率',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
//                  length : 10,
                    }
                }
            },
            data: [
                {value: 335, name: '已用'},
                {value: 1548, name: '空闲'}
            ]
        }
    ]
};

var option8 = {
    color: ['#3FC3EC'],
    grid: {
        x: 50,
        y: 30,
        x2: 50,
        y2: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'verdana',
                    fontSize: 12,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六']
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Byte',
            position: 'left',
            //min: 0,
            //max: 300,
            //splitNumber: 5,
            boundaryGap: [0, 0.1],
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
                    width: 1
                }
            },
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'verdana',
                    fontSize: 12,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            }
        }
    ],
    series: [
        {
            name: '成交',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [70, 200, 70, 150, 90, 300]
        }
    ]
};

var option9 = {
    grid: {
        x: 30,
        y: 50,
        x2: 30,
        y2: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['磁盘IO', '网络IO', 'CPU使用率'],
        y: 10,
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            position: 'bottom',
//            splitNumber: 5,
            boundaryGap: false, // 从0开始绘制
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 10,
                lineStyle: {
//                color: 'red',
                    type: 'none',
//                type: 'solid',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 'auto',    // {number}
//              rotate: 45,
                margin: 10,
                formatter: '{value}',
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
//              formatter: '{value}月',
                /*textStyle: {
                 color: 'blue',
                 fontFamily: 'sans-serif',
                 fontSize: 15,
                 fontStyle: 'italic',
                 fontWeight: 'bold'
                 }*/
            },
            splitLine: {
                show: true,
                lineStyle: {
//                color: '#483d8b',
                    type: 'none',
//                type: 'dashed',
//                width: 1
                }
            }, /*
         splitArea : {
         show: true,
         areaStyle:{
         color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
         }
         },*/
            data: [
                '1', '2', '3'
                /*{
                 value:'6',
                 textStyle: {
                 color: 'red',
                 fontSize: 30,
                 fontStyle: 'normal',
                 fontWeight: 'bold'
                 }
                 },*/
            ]
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '%',
            position: 'left',
            //min: 0,
            //max: 300,
            //splitNumber: 5,
            boundaryGap: [0, 0.1],
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
//                type: 'none',
//                type: 'dashed',
                    width: 1
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 'auto',    // {number}
//              rotate: -45,
                margin: 5,
                formatter: '{value}',    // Template formatter!
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            /*splitLine : {
             show:true,
             lineStyle: {
             color: '#483d8b',
             type: 'dotted',
             width: 2
             }
             },
             splitArea : {
             show: true,
             areaStyle:{
             color:['rgba(205,92,92,0.3)','rgba(255,215,0,0.3)']
             }
             }*/
        },
        {
            type: 'value',
            name: 'Byte/s',
            splitNumber: 5,
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#2F95BF',
                    fontFamily: 'verdana',
                    fontSize: 10,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            splitLine: {
                show: true
            }
        }
    ],
    series: [
        {
            name: '磁盘IO',
            type: 'line',
            smooth: true,
            data: [10, 55, 80]
        },
        {
            name: '网络IO',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [38, 62, 91]
        },
        {
            name: 'CPU使用率',
            type: 'line',
            smooth: true,
//            xAxisIndex: 1,
//            yAxisIndex: 1,
            data: [20, 77, 50]
        }
    ]
};

var option10 = {
    color: ['#FBC31A', '#258BFF'],
    title: {
        text: '内存占用',
        x: 'center',
        y: 'bottom',
        textStyle: {
            color: '#5797D6',
            fontSize: 12,
            fontStyle: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        y: 10,
        data: ['已用', '空闲'],
        textStyle: {
            color: '#fff'
        }
    },
    series: [
        {
            name: '使用率',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
//                  length : 10,
                    }
                }
            },
            data: [
                {value: 335, name: '已用'},
                {value: 1548, name: '空闲'}
            ]
        }
    ]
};

var option11 = {
    color: ['#FBC31A', '#258BFF'],
    title: {
        text: '磁盘占用',
        x: 'center',
        y: 'bottom',
        textStyle: {
            color: '#5797D6',
            fontSize: 12,
            fontStyle: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name: '使用率',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
//                  length : 10,
                    }
                }
            },
            data: [
                {value: 335, name: '已用'},
                {value: 1548, name: '空闲'}
            ]
        }
    ]
};

var option12 = {
    color: ['#3FC3EC'],
    grid: {
        x: 50,
        y: 30,
        x2: 50,
        y2: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'verdana',
                    fontSize: 12,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六']
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Byte',
            position: 'left',
            //min: 0,
            //max: 300,
            //splitNumber: 5,
            boundaryGap: [0, 0.1],
            axisLine: {    // 轴线
                show: true,
                lineStyle: {
                    color: '#2F95BF',
                    width: 1
                }
            },
            axisLabel: {
                formatter: function (value) {
                    // Function formatter
//                return value + ' °C'
                    return value
                },
                margin: 10,
                textStyle: {
                    color: '#fff',
                    fontFamily: 'verdana',
                    fontSize: 12,
                    fontStyle: 'normal',
//                fontWeight: 'bold'
                }
            },
            axisTick: {    // 轴标记
                show: true,
                length: 3,
                lineStyle: {
                    color: '#2F95BF',
                    type: 'solid',
                    width: 1
                }
            }
        }
    ],
    series: [
        {
            name: '成交',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [70, 200, 70, 150, 90, 300]
        }
    ]
};

// 基于准备好的dom，初始化echarts图表
var myChart1 = echarts.init(document.getElementById('myChart1'));
var myChart2 = echarts.init(document.getElementById('myChart2'));
var myChart3 = echarts.init(document.getElementById('myChart3'));
var myChart4 = echarts.init(document.getElementById('myChart4'));
var myChart5 = echarts.init(document.getElementById('myChart5'));
var myChart6 = echarts.init(document.getElementById('myChart6'));
var myChart7 = echarts.init(document.getElementById('myChart7'));
var myChart8 = echarts.init(document.getElementById('myChart8'));
var myChart9 = echarts.init(document.getElementById('myChart9'));
var myChart10 = echarts.init(document.getElementById('myChart10'));
var myChart11 = echarts.init(document.getElementById('myChart11'));
var myChart12 = echarts.init(document.getElementById('myChart12'));

// 为echarts对象加载数据
myChart1.setOption(option1);
myChart2.setOption(option2);
myChart3.setOption(option3);
myChart4.setOption(option4);
myChart5.setOption(option5);
myChart6.setOption(option6);
myChart7.setOption(option7);
myChart8.setOption(option8);
myChart9.setOption(option9);
myChart10.setOption(option10);
myChart11.setOption(option11);
myChart12.setOption(option12);