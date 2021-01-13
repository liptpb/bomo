<template>
  <div class='echarts1'>
    <div class='echarts1_top'>
      <!-- <div class='imgBoxOut1 b-title'>
          <div class='imgBoxOuttext'>{{date}}</div>
          <div class='imgBoxOut' >
            <div class='imgBoxOutImg'></div>
          </div>  
           
      </div> -->
      <div class='b-title'>活动：{{event}}</div>
      <div class='b-title'>节气：{{solar}}</div>
    </div>
     <pie-one id='myEchart1'  :headline= "typeName + '总收入'" :type='type' :empId='empId' :option='data1' v-if='data1'></pie-one>
     <pie-ring id='myEchart2' :headline="typeName + '客流量'" :type='type' :empId='empId' :option='data2'  :imgUrl='img2' v-if='data2'></pie-ring>

     <pie-one id='myEchart3' :headline="typeName + '服务项目个数汇总'" :type='type' :empId='empId' :option='data3' :imgUrl='img1' v-if='data3'></pie-one>
     <pie-one id='myEchart4' :headline="typeName + '项目结算方式个数汇总'" :type='type' :empId='empId' :option='data4' :imgUrl='img1' v-if='data4'></pie-one>
     <pie-one id='myEchart5' :headline="typeName + '产品销售数汇总'" :type='type' :empId='empId' :option='data5' :imgUrl='img1' v-if='data5'></pie-one>
     <cateGory id='myEchart6' headline='两店铺近四月总收入' :type='type' :empId='empId' :option='data6' v-if='data6'></cateGory>
     <cateGory id='myEchart7' headline='店铺客流量' :type='type' :empId='empId' :option='data7' v-if='data7'></cateGory>
     <cateGory id='myEchart8' headline='店铺客流总人数' :type='type' :empId='empId' :option='data8' v-if='data8'></cateGory>
     <cateGoryInfo id='myEchart9' headline='店铺客流对比图' :type='type' :empId='empId' :option='data9' v-if='data9'></cateGoryInfo>
     <cateGoryInfo id='myEchart10' headline='店铺近四月项目个数走势' :type='type' :empId='empId' :option='data10' v-if='data10'></cateGoryInfo>
     <cateGoryInfo id='myEchart11' :headline="data11Name[0] +'/'+ data11Name[1] + '项目结算个数对比'" :type='type' :empId='empId' :option='data11' v-if='data11' :selectType='true' :selectData='itemData' target='11'></cateGoryInfo>
     <cateGoryInfo id='myEchart12' headline='店铺近四月项目结算类型个数走势' :type='type' :empId='empId' :option='data12' v-if='data12'></cateGoryInfo>
     <cateGoryInfo id='myEchart13' :headline="data13Name[0] +'/'+ data13Name[1] + '项目结算类型个数对比'" :type='type' :empId='empId' :option='data13' v-if='data13' :selectType='true' :selectData='payeData' target='13'></cateGoryInfo>
     <cateGoryInfo id='myEchart14' headline='店铺四月产品销售个数走势' :type='type' :empId='empId' :option='data14' v-if='data14' ></cateGoryInfo>
     <cateGoryInfo id='myEchart15' :headline="data15Name[0] +'/'+ data15Name[1] + '产品销售个数对比'" :type='type' :empId='empId' :option='data15' v-if='data15' :selectType='true' :selectData='proData' target='15'></cateGoryInfo>
  </div>   
</template>

<script>
import echarts from 'echarts'
import PieOne from './echart/pieOne.vue';
import pieRing from './echart/pieRing.vue';
import cateGory from './echart/cateGory.vue';
import cateGoryInfo from './echart/cateGoryInfo.vue';
export default {
  data() {
    return {
      chart: null,
      target:'',
       type :'',
       typeName:'',
       date :'',
       empId:'',
       solar:'',
       event:'',
       data1:[],
       data2:[],
       data3:[],
       data4:[],
       data5:[],
       data6:{},
       data7:{},
       data8:{},
       data9:[],
       data10:[],
       data11:[],
       data12:[],
       data13:[],
       data14:[],
       data15:[],
       img1:require("@/assets/287_slices/3 (2).png"),
       img2:require("@/assets/287_slices/2 (2).png"),
       itemData:[],
       proData:[],
       payeData:[],
       data15Name:[],
       data13Name:[],
       data11Name:[],
    };
  },
  components: {PieOne,pieRing,cateGory,cateGoryInfo},
  mounted() {
    let query = this.$route.query
    // this.target = query.target
    this.type = query.type
    if(this.type==1){
      this.typeName = '昨日'
    }else if(this.type==2){
      this.typeName = '上周'
    }else if(this.type==3){
      this.typeName = '上月'
    }
    this.date = query.date
    this.empId = query.empId
    
    this.$get(this.HOST + '/report/echarts?type='+this.type+'&empId=' + this.empId).then((res) =>{
      this.event = res.event?res.event:'无'
      this.solar = res.solar?res.solar:'无'
      this.data1 = res['1']?res['1']:''
      this.data2 = res['2']?res['2']:''
      this.data3 = res['3']?res['3']:''
      this.data4 = res['4']?res['4']:''
      this.data5 = res['5']?res['5']:''
      this.data6 = res['6']?res['6']:''
      this.data7 = res['7']?res['7']:''
      this.data8 = res['8']?res['8']:''
      this.data9 = res['9']?res['9']:''
      this.data10 = res['10']?res['10']:''
      this.data11 = res['11']?res['11']:''
      this.data12 = res['12']?res['12']:''
      this.data13 = res['13']?res['13']:''
      this.data14 = res['14']?res['14']:''
      this.data15 = res['15']?res['15']:''
      if(this.data15){
        this.data15Name = this.data15[0].data.legend
        this.$get(this.HOST + '/report/getProList').then((res) =>{
          this.proData = res
        })
      }
      if(this.data13){
        this.data13Name = this.data13[0].data.legend
        this.$get(this.HOST + '/report/getPayTypeList').then((res) =>{
           this.payeData = res
        })
      }
      if(this.data11){
        this.data11Name = this.data11[0].data.legend
        this.$get(this.HOST + '/report/getItemList').then((res) =>{
          this.itemData = res
        })
      }
      
      
        }).catch(function (error) {
            console.log(error);
        });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
  },
  created() {

  },
  computed: {},
  watch: {
 childrens:{
 handler:function(val,oldval){
   console.log(val.name)
 },
 deep:true
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
.echarts1{
  background: #F7F8FA;
  overflow: hidden;
  opacity: 1;
  .echarts1_top{
    background: #FFFFFF;
    padding: 15px 24px;
      // display: flex;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #8A8A8D;
    opacity: 1;
    height: 30px;
    display: block;
   .b-title {
            flex: 1;
            float: left;
            margin-right: 15px;

            // align-items: center;
            // justify-content: center;
            }
    .imgBoxOut1{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
          .imgBoxOut{
            width: 30px;
            height: 30px;
            .imgBoxOutImg{
              width: 100%;
              height: 100%;
                background-image: url("../../assets/2882.png");
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
          .imgBoxOuttext{
              font-size: 26px;
              font-family: PingFang SC;
              font-weight: 500;
                margin-right: 5px;
            }
    }

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
                background-image: url("../../assets/287_slices/287@2x.png");
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
                background-image: url("../../assets/287_slices/290@2x.png");
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
          .imgBoxOuttext{
              font-size: 26px;
              font-family: PingFang SC;
              font-weight: 500;
                margin-right: 5px;
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
}
</style>