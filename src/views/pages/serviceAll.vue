/**
 * 
 * @author: liptpb
 * @date: 2020-08-25 
 */
<template>
  <div class='indexAll'>
     <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="yuyue">
         <div class='yuyuwbox'>
           <div class='yuyuwboxInfo' v-for="(item, index) in items" :key="index">
             <div class="infoName flexJue" >
                 <div>{{item.consumerName}}</div>
                 <div class='zhenduan' @click="seeFunctionNum(item.consumer)">查看诊断</div>
             </div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>{{item.itemOrderTime}}</span>
                </div>
                <div class='infotime flexJue'>
                   <div>服务项目：{{item.itemName}}</div> 
                   <div class="colorH">X{{item.quantity}}</div>
                </div>
               </div> 
             </div>
             <div class='mony flexJue'>
                   <p>提成<span>￥{{item.money}}</span> &nbsp;&nbsp;<b  v-if="item.extMoney > 0">额外激励</b><span  v-if="item.extMoney > 0">￥{{item.extMoney}}</span></p>
                   
                   <div class='fankui'  v-if="item.feedback =='0'" @click="feedback(item.consumer, item.empId, item.itemOrderTime,item.orderNo)">效果反馈</div>
             </div>
             <div class="border" v-if='index < items.length-1'></div>
           </div>
           <noData mess="无服务项目" v-show="items.length<1"></noData>
         </div>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast,Notify } from "vant";
import noData from '@/components/noData'
export default {
  components: {noData,Toast,Notify},
  data() {
    return {
      items: [],
      pagenum: 1, //当前页数
      total: null, //总条数
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完成
      refreshing: false, //加载完成后的提示文案
      cusId:'',
      type:''
    };
  },
  props: {
    mum: {
      type: Number,
    }
  },
  mounted() {
     let id = this.$route.query.cusId
     this.type = !this.$route.query.type ? '' :'1' 
    this.getlist()
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
  },
  methods: {
    getlist() {
      this.loading = true;
      this.$get(this.HOST + '/cbi/itemsbycus?type='+this.type+'&page='+ this.pagenum, {
       
      }).then((res) =>{
          if(res.length>0){
             this.loading = false; // 加载状态结束
              this.total = res.length;
              this.items = this.items.concat(res)
              this.refreshing = false;
              this.pagenum += 1;
          }
         
        }).catch(function (error) {
           
        });
    },
    // 下拉刷新
    onRefresh() {
      
      console.log('触发上拉加载触');
      this.pagenum = 1
      // this.getlist()

      setTimeout(()=>{
      // if(this.refreshing){
      //     this.items = this.items;
      //     this.refreshing = false;
      // }
       this.loading = false;
      },1000)
    },
    onLoad() {
      console.log('发下拉刷新');
      this.loading = true;
      this.getlist()
      setTimeout(() => {
      if(this.items.length<this.total ){
        this.getlist();
        this.loading = false;
      }else{
        this.loading = false;
        this.finished = true;
      }
      }, 1000);
    },
    feedback(cusId, empid, data,orderNo){
      if(!cusId){
        Notify({ type: 'warning', message: '无项目信息!' });
        return
      }else if(!empid){
        Notify({ type: 'warning', message: '无服务项目信息!' });
        return
      }else if(!data){
        Notify({ type: 'warning', message: '无服务时间信息!' });
        return
      }
      this.$router.push({ path:'/feedback' ,query: {
      cusid: cusId,
      empid: empid,
      orderNo:orderNo,
      date : data ? data.trim().split(/\s+/)[0] : '',
      type: 0
      } })
    },
     seeFunctionNum(cusId){
      if(!cusId){
        Notify({ type: 'warning', message: '无会员信息!' });
        return
      }
      this.$router.push({ path:'/otherSee' ,query: {
      cusId: cusId
      }  })
    },
  },
  created() {

  },
  computed: {},
  watch: {
    mum(val) {
       if(val>1){
         this.pagenum = 1
         this.getlist()
       }
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