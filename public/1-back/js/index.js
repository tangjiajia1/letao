
// 基于准备好的dom，初始化echarts实例
var echarts_left = echarts.init(document.querySelector('.echarts_left'));

// 指定图表的配置项和数据
var option1 = {
  //标题
    title: {
        text: '2018年注册人数'
    },
    //提示框组件
    tooltip: {},
    //图例
    legend: {
        data:['销量',"人数"],
    },
    //x轴
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴的数据刻度, 需要通过数据的值, 动态生成
    yAxis: {},
  
    series: [{
        name: '销量',
        type: 'bar',//bar 柱状图  line线性图 pie饼图
        data: [5, 20, 36, 10, 10, 20],
    },
     {
        name: '人数',
        type: 'bar',//bar 柱状图  line线性图 pie饼图
        data: [15, 10, 16, 20, 20, 10],
    }]
};

// 使用刚指定的配置项和数据显示图表。
echarts_left.setOption(option1);

// 饼图

// 基于准备好的dom，初始化echarts实例
var echarts_right = echarts.init(document.querySelector('.echarts_right'));

// 指定图表的配置项和数据
var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年11月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        data: ["耐克","阿迪","李宁","特别","花花公子","360"]
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '50%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'李宁'},
                {value:135, name:'特别'},
                {value:1548, name:'花花公子'},
                {value:1548, name:'360'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 20,
                    shadowOffsetX: 10,
                    shadowColor: 'rgba(0, 0, 255, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
echarts_right.setOption(option2);


