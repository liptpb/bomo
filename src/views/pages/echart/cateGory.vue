<template>
  <div class="echart_cont">
       <div class="echart_contTiitle">{{headline}}</div>
       <div class="echart_contcont">
          <div class="echart_IndexTitle" v-show="imgtype">
             <div class="echart_IndexTitleLeft imgBoxOut1" style="display: none;">
                <div class='imgBoxOut' >
                  <div class='imgBoxOutImg'></div>
                </div>
                <div :class="[{ blodText: classBlack }, 'imgBoxOuttext']"  @click="blodText('sk')">蛇口店</div>
                <div :class="[{ blodText: !classBlack }, 'imgBoxOuttext']"  @click="blodText('xl')">西丽店</div>
             </div>
             <div class="echart_IndexTitleRight imgBoxOut1" style="justify-content: flex-end" >
                 <!-- <img :src="require(`${imgUrl}`)"/> -->
                  <img :src="imgUrl"/>
                <div class='imgBoxOuttext'>{{echaerts.total}}</div>
             </div>
          </div>
           <div class='yourClassName' ref="myEchart">
            
           </div>
       </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      classBlack: true,
      echartDataxi:{},
      echartDatask:{},
      echaerts:{},
      series:'',
      xAxis:'',
      legend:''
    };
  },
  props: {
    imgtype: {
      type: Boolean,
      default: false
    },
    headline: {
        type: String,
        required: true,
    },  
    type: {
        type: String,
        required: true,
    },
    empId: {
        type: String,
        required: true,
        default: '5',
    },
    imgUrl: {
        type: String,
        // required: true,
        default: require("@/assets/287_slices/290@2x.png")
    },
    option:{
        type: Object,
        default: () => ({})
    }
  },
  components: {},
  mounted() {
     
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    blodText(a){
      if(a=='sk'){
          this.classBlack = true
          this.echaerts = this.echartDatask
      }else if(a=='xl'){
          this.classBlack = false
          this.echaerts = this.echartDataxi
      }
    }  ,
    initChart(series,xAxis,legend) {
      let seriesOld=
        {
           type: 'line',
        }
         let seriesOld1=
        {
           type: 'line',
            itemStyle:{
                  normal:{
                      lineStyle:{
                          width:2,
                          type:'dotted'  //'dotted'虚线 'solid'实线
                      }
                  }
              },
        }
      
        let color = ['#F5DF4D','#aab3ec','#e95764','#faa7d1','#b21a1d','#b21a65','#ab06a9','#7a06ab','#4c06ab','#ad4e15','#dc7639','#b73011','#b78611','#86b711','#4fb711',
'#11b74b','#33c63a','#e9a91e','#d5df62','#62dfa6','#88ea91','#c3c666','#c6a366','#949597'];
      
      if(series&&xAxis&&legend){
        let aaa = series
        let selected = {}
        for(var i =0;i<legend.length;i++){
        if(i<5){
          selected[legend[i]] =  true
        }else{
          selected[legend[i]] =  false
        }
      }
       for(var i=0;i<aaa.length;i++){
          aaa[i].color = color[i]
          // seriesOld.areaStyle.normal.color.colorStops[0].color = color[i]
          // seriesOld.areaStyle.normal.color.colorStops[1].color = color[i]
          if(aaa[i].type=='dotted'){
            Object.assign(aaa[i], seriesOld1)
          }else{
            Object.assign(aaa[i], seriesOld)
          }
          
      }
      let chart = echarts.init(this.$refs.myEchart);
      chart.setOption({
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            position:function(p, params, dom, rect, size){  
	            return dom.style.transform = 'translateZ(0)';
	          },
        },
        legend: {
            type: 'scroll',
              orient: 'horizontal',
              itemHeight: 10,
              itemWidth: 10,
              icon:'rect',
              right: 10,
              bottom: 0,
              // left:10,
              data: legend,
              selected:selected
        },
        grid: {
            top:'20',
            left: '3%',
            right: '3%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xAxis,
            axisLabel: {
              textStyle: {
                color: '#D0D0D0', //坐标的字体颜色
              },
            },
            axisLine: {
                lineStyle: {
                    color: '#D0D0D0',
                    width: 1, //这里是为了突出显示加上的  
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#D0D0D0', //坐标的字体颜色
              },
            },
            axisLine: {
                lineStyle: {
                    color: '#D0D0D0',
                    width: 1, //这里是为了突出显示加上的  
                }
            },
        },
        label:{
          show:true  
        },
        // series: [
        //     {
        //         name: series[0].name,
        //         type: 'line',
        //         areaStyle: {
        //         normal: {
        //             color: {
        //             x: 0,
        //             y: 0,
        //             x2: 0,
        //             y2: 1,
        //             colorStops: [{
        //                 offset: 0,
        //                 color: "#FEC171" // 0% 处的颜色
        //                 }, {
        //                 offset: 0.7,
        //                 color: "#FEC171" // 100% 处的颜色
        //                 }],
        //                 globalCoord: false // 缺省为 false
        //                 }
        //             }
        //         },
        //         color:'#FEC171',
        //         data: series[0].data
        //     },
        //     {
        //             name: series[1].name,
        //             type: 'line',
        //             color:'#9461FE',
        //             areaStyle: {
        //             normal: {
        //                 color: {
        //                 x: 0,
        //                 y: 0,
        //                 x2: 0,
        //                 y2: 1,
        //                 colorStops: [{
        //                     offset: 0,
        //                     color: "#9461FE" // 0% 处的颜色
        //                     }, {
        //                     offset: 0.7,
        //                     color: "#9461FE" // 100% 处的颜色
        //                     }],
        //                     globalCoord: false // 缺省为 false
        //                     }
        //                 }
        //             },
        //             data: series[1].data
        //         }
        //     ]
        //  series: {
        //    type: 'bar', // 添加该属性
        //    data:series
        //  }
            series:aaa
        },true)
      window.addEventListener('resize', () => {
                // 自动渲染echarts
                chart.resize();
            })
            }
    },
  },
  created() {

  },
  computed: {
   series1() {
　　　　return this.option.series
　　},
    xAxis1() {
　　　　return this.option.xAxis
　　},
    legend1() {
    　　return this.option.legend
    },
  },
  watch: {
    series1:{
      handler:function(val,oldval){
           this.series = val
           this.initChart(this.series,this.xAxis,this.legend)
      },
      // deep:true
    },
    xAxis1:{
      handler:function(val,oldval){
           this.xAxis = val
           this.initChart(this.series,this.xAxis,this.legend)
      },
      // deep:true
    },
    legend1:{
      handler:function(val,oldval){
           this.legend = val
           this.initChart(this.series,this.xAxis,this.legend)
      },
      // deep:true
    },
  },
}
</script>

<style lang='less' scoped>
.blodText{
    font-size: 30px !important;
    font-family: PingFang SC !important;
    font-weight: bold !important;
    line-height: 42px !important;
    color: #171717 !important;
    opacity: 1 !important;
}
.echart_cont{
    .echart_contTiitle{
      width: 100%;
      // height: 22px;
      font-size:32px;
      font-family: PingFang SC;
      font-weight: 500;
      // line-height: 22px;
      color: #333333;
      opacity: 1;
      margin: 48px 0 0 24px;
    }
    .echart_contcont{
      width: 702px;
      height: 500px;
      background: #FFFFFF;
      opacity: 1;
      border-radius: 10px;
      margin: 24px;
      .echart_IndexTitle{
        display: flex;
        padding: 24px;
        .imgBoxOut1{
                flex: 1;
                display: flex;
                align-items: center;
                // justify-content: center;
          .imgBoxOut{
            width: 30px;
            height: 30px;
            .imgBoxOutImg{
              width: 100%;
              height: 100%;
                background-image: url("../../../assets/287_slices/287@2x.png");
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
          .imgBoxOuttext{
              font-size: 26px;
              font-family: PingFang SC;
              font-weight: 500;
                margin-left: 8px;
                 margin-right: 8px;
            }
        }
        .echart_IndexTitleLeft{
          
        }
        .echart_IndexTitleRight{
          .imgBoxOut{
            width: 30px;
            height: 30px;
            .imgBoxOutImg{
              width: 100%;
              height: 100%;
                background-image: url("../../../assets/287_slices/290@2x.png");
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
           img {
                float: left;
                margin-right: 0px;
                width: 30px;
                height: 30px;
            }
    //         p {
    //     width: 200px;
    //     height: 100px;
    //     line-height: 20px;
    //     overflow: hidden;
    // }
          .imgBoxOuttext{
              font-size: 26px;
              font-family: PingFang SC;
              font-weight: 500;
                margin-right: 5px;overflow: hidden;
            }
        }
      }
      .yourClassName{
        width:702px;
        height: 500px;
        margin: 0 0px 0 0px;
      }

    }

  }
</style>