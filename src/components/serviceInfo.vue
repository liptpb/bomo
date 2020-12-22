/**
 * 
 * @author: liptpb
 * @date: 2020-09-05
 */
<template>
  <div class='serviceAll'>
        <div class='yuyuwboxInfo' v-for="(item, index) in tclistArray" :key="index">
        <div class="infoName">{{item.cusName}}</div>
        <div class="infoboxInfo">
            <div class='infona'>
            <div class="infotime">
            服务时间：<span>{{item.apptBegin|formatDate1}} {{item.apptBegin|formatDate}}-{{item.apptEnd|formatDate}}</span>
            </div>
            <div class='infotime'>
            服务项目：<span>{{item.itemName}}</span>
            </div>
            </div> 
            <div class='zhenduan' @click="seeFunction(item.cusId)">查看诊断</div>
        </div>
        <div class="lsfu">服务老师：<span>{{item.createName}}</span></div>
        <div class="border" v-if='index < tclistArray.length-1'></div>
        </div>
        <div class="more" v-if='tclistArrayOld.length > 3' @click="moreClick()" ><van-icon :name=name style="vertical-align: middle;"/> {{text}}</div>
        <noData :mess="mess" v-show="tclistArrayOld.length<1" :icon="false"></noData>
  </div>
</template>

<script>
import noData from '@/components/noData'
import {formatDate,formatDate1} from '@/utils/index.js'
export default {
  components: {noData},
  data() {
    return {
      tclistArray: [],
      tclistArrayOld: [],
      name:"arrow-down",
      text:'查看更多预约'
    };
  },
  props: {
    serviceInfoData: {
        type: Array,                
        default: []     
    },
    mess: {
        type: String,                
        default: []     
    },
  },
  mounted() {
  
  },
  filters:{
    formatDate(time){
        var data = new Date(time);
        return formatDate(data,'hh:mm');
    },
    formatDate1(time){
        var data = new Date(time);
        return formatDate1(data,'MM-dd');
    }
  },
  methods: {
   moreClick(){
     if(this.tclistArray.length<4){
       this.tclistArray =  this.tclistArrayOld
       this.name = "arrow-up"
       this.text = "收起"
     }else{
       this.tclistArray =  this.arrTrans(3,this.tclistArrayOld)[0]
       this.name = "arrow-down"
       this.text = "查看更多预约"
     }
   },
   seeFunction(id){
      this.$router.push({ path:'/otherSee' ,query: {
      cusId: id
      }  })
    },
    inoData(val){
      this.tclistArray = val.length > 3 ? this.arrTrans(3,val)[0] : val
      this.tclistArrayOld = val
    },
    arrTrans(num, arr) { 
      if(arr.length<1){
        return []
      }
      const iconsArr = []; 
      arr.forEach((item, index) => {
        const page = Math.floor(index / num);
        if (!iconsArr[page]) { 
          iconsArr[page] = [];
        }
        iconsArr[page].push(item);
      });
      return iconsArr;
    },
  },
  created() {

  },
  computed: {
  },
  watch: {
    serviceInfoData(val) {
      this.inoData(val)
    }
  },
}
</script>

<style lang='less' scoped>
.flexJue{
  display: flex;
  justify-content: space-between;
  align-content: space-between;  
  flex-wrap: wrap;
}
.colorH{
  color:#FF9A00
}
.bgH{
  background:#FFF4E3;
}
.serviceAll{
      // margin-top: 30px;
      .yuyuwboxInfo{
            padding: 20px 0;
            .infoName{
                height:31px;
                font-size:32px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(52,52,52,1);
                line-height:32px;
                margin-bottom: 20px;
            }
            .infoboxInfo{
               display: flex;
               justify-content: space-between;
               align-content: space-between;  
               flex-wrap: wrap; 
               .infona{
                 .infotime{
                        height:23px;
                        line-height:32px;
                        font-size:24px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(52,52,52,1);
                        margin-bottom: 10px;
                        span{
                            color:rgba(255,154,0,1);
                        }
                 }
               }
               .zhenduan{
                  width:143px;
                height:56px;
                border:2px solid rgba(255,154,0,1);
                border-radius:10px; 
                text-align: center;
                line-height:56px;
                font-size:26px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,153,0,1);
               }
            }
            .lsfu{
              height: 0.30667rem;
              line-height: 0.42667rem;
              font-size: 0.32rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: #343434;
              margin-bottom: 0.13333rem;
               span{
                 color: #ff9a00;
               }
            }
            .border{
                  width:620px;
                    height:16px;
                    margin-top: 20px;
                    background:rgba(255,249,232,1); 
               }
           
         }
          .more{
                width: 100%;
                text-align: center;
                font-size:30px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,153,0,1);
                line-height:56px;
                margin-top: 10px;
            }
  }
</style>