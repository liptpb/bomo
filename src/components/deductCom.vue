/**
 * 
 * @author: liptpb
 * @date: 2020-08-24 
 */
<template>
   <div class="yuyue">
         <div class='yuyuwbox'>
        <div class='yuyuwboxInfo' v-for="(item, index) in tclistArray" :key="index">
             <!-- <div class="infoName flexJue" >
                 <div>{{item.name}}</div>
                  <div class='zhenduan' @click="seeFunctionNum(item.consumer)">查看诊断</div> 
             </div> -->
             <div class="infoboxInfo">
               <div class='infona'>
          
                <div class='infotime flexJue'>
                   <div>服务项目：{{item.name}}</div> 
                   <div class="colorH">{{item.quantity}}</div>
                </div>
               </div> 
             </div>
             <div class='mony flexJue'>
                   <p>提成<span>￥{{item.tcmoney}}</span></p>
                   <!-- <div class='fankui' v-if="item.feedback =='0'" @click="feedback(item.consumer, item.empId, item.itemOrderTime,item.orderNo)">效果反馈</div> -->
             </div>
             <div class="border" v-if='index < tclistArray.length-1'></div>
           </div>
        <noData mess="无数据" v-show="tclistArray.length<1" :icon="true"></noData>
         </div>
  </div>
</template>

<script>
import noData from '@/components/noData'
export default {
  components: {noData},
  data() {
    return {
      tclistArray: []
    };
  },
  props: {
    tclist: {
        type: Array,                
        default: []     
    }
  },
  mounted() {

  },
  methods: {

  },
  created() {

  },
  computed: {
  },
  watch: {
    tclist(val) {
      this.tclistArray = val;
    }
  },
}
</script>

<style lang='less' scoped>
.indexAll{
    padding-top: 20px;
  .yuyue{
     width:690px;
    // height:820px;
    background:rgba(255,255,255,1);
    border-radius:20px; 
    margin: 0px auto 0;
    z-index: 1000;
    .yuyuwbox{
        padding: 33px 33px 0 33px;
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
                .zhenduan{
                  width:140px;
                height:56px;
                border:1px solid rgba(255,154,0,1);
                border-radius:10px; 
                text-align: center;
                line-height:56px;
                font-size:26px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,153,0,1);
               }
            }
            .infoboxInfo{
            //    display: flex;
            //    justify-content: space-between;
            //    align-content: space-between;  
            //    flex-wrap: wrap; 
               .infona{
                 .infotime{
                        height:23px;
                        line-height:32px;
                        font-size:28px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(52,52,52,1);
                        margin-bottom: 10px;
                        span{
                            color:rgba(255,154,0,1);
                        }
                 }
               }
               
            }
            .mony{
               font-size:28px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1); 
                padding: 20px 0;
                 margin-top: 20px;
                border-top: 1px solid rgba(244,244,244,1);
                p{
                    line-height:56px;
                    span{
                      color: #F51414;
                    }
                }
                .fankui{
                    width:143px;
                    height:56px;
                    background:rgba(255,153,0,1);
                    border-radius:10px;
                    font-size:26px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    text-align: center;
                     line-height:56px;
                }
            }
            .border{
                  width:620px;
                    height:16px;
                    background:rgba(255,249,232,1); 
               }
         }
    }
  }   
}
</style>