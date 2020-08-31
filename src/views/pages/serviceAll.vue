/**
 * 
 * @author: liptpb
 * @date: 2020-08-25 
 */
<template>
  <div class='indexAll'>
      <div class="yuyue">
         <div class='yuyuwbox'>
           <div class='yuyuwboxInfo' v-for="(item, index) in items" :key="index">
             <div class="infoName flexJue" >
                 <div>{{item.cusName}}</div>
                 <div class='zhenduan' @click="seeFunctionNum(item.consumer)">查看诊断</div>
             </div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>{{item.itemOrderTime}}</span>
                </div>
                <div class='infotime flexJue'>
                   <div>服务项目：<span>{{item.itemName}}</span></div> 
                   <div class="colorH">x{{item.quantity}}</div>
                </div>
               </div> 
             </div>
             <div class='mony flexJue'>
                   <p>提成￥<span>{{item.money}}</span></p>
                   <div class='fankui' v-if="item.feedback =='0'" @click="feedback(item.consumer, item.empid, item.itemOrderTime)">效果反馈</div>
             </div>
             <div class="border" v-if='index < items.length-1'></div>
           </div>
           <noData mess="无服务项目" v-show="items.length<1"></noData>
         </div>
      </div>
  </div>
</template>

<script>
import noData from '@/components/noData'
export default {
  components: {noData},
  data() {
    return {
      items: []
    };
  },
  mounted() {
    let id = this.$route.query.cusId
    this.$get(this.HOST + '/cbi/itemsbycus', {
       
      }).then((res) =>{
          console.log(res)
          this.items = res
        }).catch(function (error) {
            console.log(error);
        });
  },
  methods: {
    feedback(cusId, empid, data){
      this.$router.push({ path:'/feedback' ,query: {
      cusid: cusId,
      empid: '43',
      date : data ? data.trim().split(/\s+/)[0] : ''
      } })
    },
     seeFunctionNum(cusId){
      this.$router.push({ path:'/otherSee' ,query: {
      cusId: cusId
      }  })
    },
  },
  created() {

  },
  computed: {},
  watch: {},
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
            .infoboxInfo{
            //    display: flex;
            //    justify-content: space-between;
            //    align-content: space-between;  
            //    flex-wrap: wrap; 
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
               
            }
            .mony{
               font-size:24px;
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