<template>
  <div class="echart_cont">
       <div class="echart_contTiitle">{{headline}}</div>
       <div class="echart_contcont">
          <div class="echart_IndexTitle">
             <div class="echart_IndexTitleLeft imgBoxOut1">
                <div class='imgBoxOut' >
                  <div class='imgBoxOutImg'></div>
                </div>
                <div :class="[{ blodText: classBlack }, 'imgBoxOuttext']"  @click="blodText('sk')" v-show="empId==1||empId==5">蛇口店</div>
                <div :class="[{ blodText: !classBlack }, 'imgBoxOuttext']"  @click="blodText('xl')" v-show="empId==27||empId==5">西丽店</div>
             </div>
             <div class="echart_IndexTitleRight imgBoxOut1" style="justify-content: flex-end">
                 <!-- <img :src="require(`${imgUrl}`)"/> -->
                  <img :src="imgUrl"/>
                <div class='imgBoxOuttext'>{{echaerts.total}}</div>
             </div>
          </div>
           <div class='yourClassName' ref="myEchart1" v-show="noData">
            
           </div>
           <noData mess="无数据" v-show="!noData"></noData>
       </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import noData from '@/components/noData'
export default {
  components: {noData},
  data() {
    return {
      classBlack: true,
      echartDataxi:{},
      echartDatask:{},
      echaerts:{},
      noData:true
    };
  },
  props: {
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
        type: Array,
    }
  },
  mounted() {
     
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
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
    initChart(val) {
      let calData=val.data?val.data:[]
      if(calData.length>0){
        this.noData = true
      }else{
        this.noData = false
      }
      let selected = {}
      let title=calData.map(v => v.name)
      for(var i =0;i<title.length;i++){
        if(i<5){
          selected[title[i]] =  true
        }else{
          selected[title[i]] =  false
        }
      }
      let color = ['#F5DF4D','#aab3ec','#e95764','#faa7d1','#b21a1d','#b21a65','#ab06a9','#7a06ab','#4c06ab','#ad4e15','#dc7639','#b73011','#b78611','#86b711','#4fb711',
'#11b74b','#33c63a','#e9a91e','#d5df62','#62dfa6','#88ea91','#c3c666','#c6a366','#949597'];
      this.chart = echarts.init(this.$refs.myEchart1);
      this.chart.setOption({
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)',
              position:function(p, params, dom, rect, size){  
	              return dom.style.transform = 'translateZ(0)';
            	}
          },
          legend: {
              type: 'scroll',
              orient: 'horizontal',
              itemHeight: 10,
              itemWidth: 10,
              icon:'rect',
              right: 10,
              bottom: 45,
              // left:10,
              data: title,
              selected:selected
          },
          series: [
              {
                  name: '',
                  type: 'pie',
                  selectedMode: 'single',
                  center:['50%','35%'],
                  radius: [0, '30%'],
                  hoverAnimation: false, 
                  color: color,  
                  label: {
                      position: 'inner'
                  },
                  labelLine: {
                      show: false
                  },
                  data: val.data
              },
              {
                  name: '',
                  type: 'pie',
                  center:['50%','35%'],
                  radius: ['40%', '55%'],
                  label: {                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
                      normal: {
                          show: true,             // 是否显示标签[ default: false ]
                          position: 'outside',    // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                          formatter:function(params){   //让series 中的文字进行换行
                            return params.name+":"+params.value;
                          },  
                      }
                  },
                  labelLine: {                    // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
                      normal: {
                          show: true,             // 是否显示视觉引导线。
                          length: 15,             // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
                          length2: 10,            // 视觉引导项第二段的长度。
                          lineStyle: {            // 视觉引导线的样式
                              //color: '#000',
                              //width: 1
                          }
                      }
                  },
                  data: val.newcusdata
              }
          ]
      })
    },
  },
  created() {

  },
  computed: {},
  watch: {
    option:{
      handler:function(val,oldval){
          this.echartDataxi = val.find((v) => {
              return v.orgId == 3;
          })
          this.echartDatask =val.find((v) => {
              return v.orgId == 2;
          })
          if(val.length==2){
              if(this.empId == 27){
                this.classBlack = false
                this.echaerts = this.echartDataxi
              }else{
                this.classBlack = true
                this.echaerts = this.echartDatask
              }
          }
          if(val.length==1){
            if(!this.echartDataxi || Object.keys(this.echartDataxi).length == 0){
                this.echaerts = this.echartDatask
              }
              if( !this.echartDatask || Object.keys(this.echartDatask).length == 0){
                this.echaerts = this.echartDataxi
              }
          }
      },
      // deep:true
    },
    echaerts:function(val,oldval){
      this.initChart(val);
    }
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
        // .echart_IndexTitleLeft{
          
        // }
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