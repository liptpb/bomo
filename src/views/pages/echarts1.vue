<template>
  <div class='echarts1'>
     <!-- <van-loading type="spinner" color="#1989fa" />   -->
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
     <pie-one id='myEchart1'  :headline= "typeName + '总收入'" :type='type' :empId='empId1' :option='data1' v-if='data1'></pie-one>
     <pie-ring id='myEchart2' :headline="typeName + '客流量'" :type='type' :empId='empId2' :option='data2'  :imgUrl='img2' v-if='data2'></pie-ring>

     <pie-one id='myEchart3' :headline="typeName + '服务项目个数汇总'" :type='type' :empId='empId3' :option='data3' :imgUrl='img1' v-if='data3'></pie-one>
     <pie-one id='myEchart4' :headline="typeName + '项目结算方式个数汇总'" :type='type' :empId='empId4' :option='data4' :imgUrl='img1' v-if='data4'></pie-one>
     <pie-one id='myEchart5' :headline="typeName + '产品销售数汇总'" :type='type' :empId='empId5' :option='data5' :imgUrl='img1' v-if='data5'></pie-one>
     <cateGory id='myEchart6' :headline="'两店铺' + typeName1 + '总收入'" :type='type' :empId='empId6' :option='data6' v-if='data6'></cateGory>
     <cateGory id='myEchart7' headline='店铺客流量' :type='type' :empId='empId7' :option='data7' v-if='data7'></cateGory>
     <cateGory id='myEchart8' headline='店铺客流总人数' :type='type' :empId='empId8' :option='data8' v-if='data8'></cateGory>
     <cateGoryInfo id='myEchart9' headline='店铺客流对比图' :type='type' :empId='empId9' :option='data9' v-if='data9'></cateGoryInfo>
     <cateGoryInfo id='myEchart10' :headline="'店铺' + typeName1 + '项目个数走势'" :type='type' :empId='empId10' :option='data10' v-if='data10'></cateGoryInfo>
     <cateGoryInfo id='myEchart11' :headline="data11Name  + '项目结算个数对比'" :type='type' :empId101='empId141' :empId='empId11' :option='data11' v-if='data11' :selectType='true' :selectData='itemData' target='11'></cateGoryInfo>
     <cateGoryInfo id='myEchart12' :headline="'店铺' + typeName1 + '项目结算类型个数走势'" :type='type' :empId='empId12' :option='data12' v-if='data12'></cateGoryInfo>
     <cateGoryInfo id='myEchart13' :headline="data13Name + '项目结算类型个数对比'" :type='type' :empId101='empId141' :empId='empId13' :option='data13' v-if='data13' :selectType='true' :selectData='payeData' target='13'></cateGoryInfo>
     <cateGoryInfo id='myEchart14' :headline="'店铺' + typeName1 + '产品销售个数走势'" :type='type' :empId='empId14' :option='data14' v-if='data14' ></cateGoryInfo>
     <cateGoryInfo id='myEchart15' :headline="data15Name + '产品销售个数对比'" :type='type' :empId101='empId141' :empId='empId14' :option='data15' v-if='data15' :selectType='true' :selectData='proData' target='15'></cateGoryInfo>
  </div> 
  
</template>

<script>
import { Notify,Toast,Dialog  } from 'vant';
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
       typeName1:'',
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
       empId1:'',
       empId2:'',
       empId3:'',
       empId4:'',
       empId5:'',
       empId6:'',
       empId7:'',
       empId8:'',
       empId9:'',
       empId10:'',
       empId11:'',
       empId12:'',
       empId13:'',
       empId14:'',
       empId15:'',
       empId141:''
    };
  },
  components: {PieOne,pieRing,cateGory,cateGoryInfo},
  mounted() {
    let query = this.$route.query
    // this.target = query.target
    // 公众号报表，现在改为晚上9点推送当天日报，
    // 其他不变，公众号页面上，有几个文字是昨日，
    // 这里改成 年月日，这样就不会歧义。
    // 周的就是显示周的开始和周的结束，月的就yyyymm
    this.type = query.type
    this.date = query.date
     var data = query.date  
    
    if(this.type==1){
       var day1 = new Date(data);
       day1.setTime(day1.getTime()-24*60*60*1000);
       var oYear = day1.getFullYear();
        var oMoth = (day1.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = day1.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        data = oYear  + oMoth  + oDay;
       data=this.insertStr(data,4,"年");
       data=this.insertStr(data,7,"月");
      data=this.insertStr(data,11,"日");
      document.title = '日报表'
      this.typeName = query.datestr
      this.typeName1 = '近7日'
    }else if(this.type==2){
      var a = this.getTime(7,data)
      var b = this.getTime(0,data)
      document.title = '周报表'
      this.typeName = query.datestr
      this.typeName1 = '近4周'
    }else if(this.type==3){
      if(data){//20201102
      data =data.replace(/-/ig, "");
       }
      data= data.substring(0,data.length - 2)
       data=this.insertStr(data,4,"年");
       data=this.insertStr(data,7,"月");
      document.title = '月报表'
      this.typeName = query.datestr
      this.typeName1 = '近4月'
    }
    
    this.empId141 = query.empId
    
    this.$get(this.HOST + '/report/echarts?type='+this.type+'&empId=' + this.empId141+'&date=' + this.date).then((res) =>{
      this.event = res.event?res.event:'无'
      this.solar = res.solar?res.solar:'无'
      this.data1 = res['1']?res['1']:''
      if(this.data1){
        this.empId1 = this.emRtuern(this.data1)
      }
      this.data2 = res['2']?res['2']:''
      if(this.data2){
        this.empId2 = this.emRtuern(this.data2)
      }
      this.data3 = res['3']?res['3']:''
      if(this.data3){
        this.empId3 = this.emRtuern(this.data3)
      }
      
      this.data4 = res['4']?res['4']:''
      if(this.data4){
        this.empId4 = this.emRtuern(this.data4)
      }
      this.data5 = res['5']?res['5']:''
      if(this.data5){
        this.empId5 = this.emRtuern(this.data5)
      }
      this.data6 = res['6']?res['6']:''
      this.data7 = res['7']?res['7']:''
      this.data8 = res['8']?res['8']:''
      this.data9 = res['9']?res['9']:''
      if(this.data9){
        this.empId9 = this.emRtuern(this.data9)
      }
      this.data10 = res['10']?res['10']:''
      if(this.data10){
        this.empId10 = this.emRtuern(this.data10)
      }
      this.data11 = res['11']?res['11']:''
      this.data12 = res['12']?res['12']:''
      if(this.data12){
        this.empId12 = this.emRtuern(this.data12)
      }
      this.data13 = res['13']?res['13']:''
      this.data14 = res['14']?res['14']:''
      if(this.data14){
        this.empId14 = this.emRtuern(this.data14)
      }
      this.data15 = res['15']?res['15']:''
      if(this.data15){
        if(this.data15){
        this.empId15 = this.emRtuern(this.data15)
        }
        this.data15Name = this.data15[0].data.legend ? this.data15[0].data.legend[0] + '/' + this.data15[0].data.legend[1] : ''
        this.$get(this.HOST + '/report/getProList').then((res) =>{
          this.proData = res
        })
      }
      if(this.data13){
        if(this.data13){
        this.empId13 = this.emRtuern(this.data13)
        }
        this.data13Name = this.data13[0].data.legend ? this.data13[0].data.legend[0] + '/' + this.data13[0].data.legend[1] : ''
        this.$get(this.HOST + '/report/getPayTypeList').then((res) =>{
           this.payeData = res
        })
      }
      if(this.data11){
        if(this.data11){
          this.empId11 = this.emRtuern(this.data11)
        }
        this.data11Name = this.data11[0].data.legend ? this.data11[0].data.legend[0] + '/' + this.data11[0].data.legend[1] : ''
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
    emRtuern(val){
      if(val.length==2){
         return '5'
        }
        let echartDataxi = val.find((v) => {
                return v.orgId == 3;
            })
        let echartDatask =val.find((v) => {
                return v.orgId == 2;
            })  
        if(val.length==1){
          if(!echartDatask){
             return '27'
          }
          if(!echartDataxi){
             return '1'
          }
        }
    },
    insertStr(soure, start, newStr){   
      return soure.slice(0, start) + newStr + soure.slice(start);
    },
    getTime(n,d) {
      var now = new Date(d);
      var year = now.getFullYear();
      //因为月份是从0开始的,所以获取这个月的月份数要加1才行
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var day = now.getDay();
      console.log(date);
      //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
      if (day !== 0) {
        n = n + (day - 1);
      } else {
        n = n + day;
      }
      if (day) {
        //这个判断是为了解决跨年的问题
        if (month > 1) {
          month = month;
        }
        //这个判断是为了解决跨年的问题,月份是从0开始的
        else {
          year = year - 1;
          month = 12;
        }
      }
      now.setDate(now.getDate() - n);
      year = now.getFullYear();
      month = now.getMonth() + 1;
      date = now.getDate();
      // console.log(n);
      var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
      return s;
    }
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
        // .echart_IndexTitleLeft{
          
        // }
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