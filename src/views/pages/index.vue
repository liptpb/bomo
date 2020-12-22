/**
 * 
 * @author: liptpb
 * @de 首页
 * @date: 2020-08-23 
 */
<template>
  <div class='indexAll'>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class='indextop'>
          <div class="topinfo">
            <div class='indextopName'>
             你好，{{info.empName}}
            </div>
            <div class='indextopInfo'>
              <div>{{info.mobile}}</div>
              <div class="tip"  @click="notFeedbackNumber()" v-if="info.notFeedbackNumber > 0">您还有<span style="font-weight: bold;">{{info.notFeedbackNumber}}</span>个项目未反馈!</div>
            </div>
            <div class='indextopbottom'>
                <div class="time">{{info.data}} {{info.week}}</div>
                <div>今日收入<span>{{info.jrsr}}</span>元</div>
            </div>
          </div>
          <div class='imgBox'>
              <img :src="info.picUrl"  alt="" />
          </div>
      </div>
      <div class="yuyue">
         <div class='yuyuwbox'>
           <div class='yuyuwboxAll'>
              <div class='yuyuwboxAllleft'>
                待服务
              </div>
              <!-- <div class='yuyuwboxAllright' @click="itemsInfo()" >
                全部订单
                <van-icon name="arrow" color="#FF9A00" style="vertical-align: middle;"/>
              </div> -->
           </div>
           <div class='yuyuwboxday'>
              <div class='yuyuwboxdayleft'>
                 <span @click="tabName('d')" :class="{'borderBottom':yuyue=='d'}">今日</span>/
                 <span @click="tabName('m')" :class="{'borderBottom':yuyue=='m'}">明日</span>/
                 <span @click="tabName('all')" :class="{'borderBottom':yuyue=='all'}">全部</span>
              </div>
              <div class='yuyuwboxdayright' @click="appoint()" v-if="info.isappt =='1'">
                 预约
              </div>
           </div>
           <div v-show="yuyue=='d'">
              <serviceInfo :serviceInfoData = "todayList" mess='今日无预约项目' ></serviceInfo>
           </div>
           <div v-show="yuyue=='m'">
              <serviceInfo :serviceInfoData = "tomList" mess='明日无预约项目'></serviceInfo>
           </div>
           <div v-show="yuyue=='all'">
              <serviceInfo :serviceInfoData = "apptList" mess='没有预约项目'></serviceInfo>
           </div>
         </div>
      </div>
      <div class="login-btn">
         <van-button color="#FF9900" :round="true" size="large" @click="seeFunctionNum()">查看诊断</van-button>
      </div>
      <van-tabs @click="onClick">
        
        <van-tab title="服务" >
         
        </van-tab>
        <van-tab title="提成" >
           
        </van-tab>
        <div v-if="infoshow">
            <div class='ticheng'>
             <serviceAll :mum='mum'></serviceAll>
            </div>
        </div>
        <div class="tcffff"  v-show="!infoshow">
           <div class='yuyuwboxdayleft'>
              <span @click="tabNameInfo('dd')" :class="{'borderBottom':yuyue1=='dd'}">今日</span>/
              <span @click="tabNameInfo('mm')" :class="{'borderBottom':yuyue1=='mm'}">昨天</span>/
              <span @click="tabNameInfo('allm')" :class="{'borderBottom':yuyue1=='allm'}">当月</span>
              <deductCom :tclist = "tclistData"></deductCom>
          </div>
        </div>
      </van-tabs>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import deductCom from '@/components/deductCom'
import deductComp from '@/components/deductComp'
import serviceInfo from '@/components/serviceInfo'
import serviceAll from '@/views/pages/serviceAll'
import noData from '@/components/noData'
import {formatDate} from '@/utils/index.js'
export default {
  components: {
    deductComp,
    noData,
    serviceInfo,
    serviceAll,
    deductCom
  },
  data() {
    return {
      info: {

      },
      tclist: [],
      tclistAeeray:[],
      todaytcList:[],
      yesterdaytcList:[],
      tclisttic:[],
      tclistData:[],
      yuyue: 'd' ,//预约
      yuyue1:'dd',
      todayList: [],
      tomList: [],
      apptList: [],
      refreshing: false, //加载完成后的提示文案
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完成
      infoshow: true,
      mum:1
    };
  },
  mounted() {
    this.infoData()
  },
  filters:{
    formatDate(time){
        var data = new Date(time);
        return formatDate(data,'yyyy-MM-dd hh:mm:ss');
    }
  },
  methods: {
    infoData(){
      this.loading = true;
      this.$get(this.HOST + '/index', {
       
      }).then((res) =>{
          this.loading = false;
          this.info = res
          this.tclistAeeray = res.tclist
           this.tclist = res.tclist
          this.todayList = res.todayList
          this.tomList = res.tomList
          this.apptList = res.apptList
          this.todaytcList = res.todaytcList
          this.yesterdaytcList = res.yesterdaytcList
          this.tclisttic = res.tclist
          this.$nextTick(() => {
            this.tclistData =  res.todaytcList
          });
          
        }).catch(function (error) {
            
        });
    },
    onRefresh() {
      console.log('触发下拉刷新');
      this.mum+= 1
      setTimeout(()=>{
      if(this.refreshing ){
          this.infoData()
          this.refreshing = false;
      }
       this.loading = false;
      },1000)
    },
    // 上拉加载
    onLoad() {
     
      this.loading = false;
    },
    onClick(event) {
  
        if(event==0){
           this.infoshow = true
        }else{
           this.infoshow = false
        }
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
    tabNameInfo(val){
       this.yuyue1 = val
       if(val == 'dd'){
         this.tclistData = this.todaytcList
       }else if(val == 'mm'){
          this.tclistData = this.yesterdaytcList
       } else if(val == 'allm'){
          this.tclistData = this.tclisttic
       }
    },
    tabName(val){
      this.yuyue = val
    },
    notFeedbackNumber(){
      this.$router.push({ path:'/serviceAll' ,query: {
      cusId: '43',type:'1'
      } })
    },
    itemsInfo(){
      this.$router.push({ path:'/serviceAll' ,query: {
      cusId: '43'
      } })
    },
    tichengFunction(){
      this.$router.push({ path:'/onRefresh'  })
    },
    seeFunction(id){
      this.$router.push({ path:'/otherSee' ,query: {
      cusId: id
      }  })
    },
     seeFunctionNum(cusId){
      this.$router.push({ path:'/otherSee' ,query: {
      cusId: cusId
      }  })
    },
    appoint(){
       this.$router.push({ path:'/appoint'  })
    }
  },
  created() {
    
  },
  computed: {},
  watch: {},
}
</script>

<style lang='less' scoped>
/deep/ .van-tabs__line{
   background-color: #FF9A00;
}
.activeName{
  margin-top: 30px;
  padding: 0 30px;
}
.indexAll{
  .indextop{
    //  width:750px;
     width:100% ;
     height:318px;
     background:linear-gradient(-90deg,#FF9A00,#FF9A00);  
     .topinfo{
         padding: 0 24px 24px 24px;
      .indextopName{
        font-size:48px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        width: 100%;
        padding-top: 62px;
        // margin-left: 24px;
        height:49px;
        line-height:32px;
        }
        .indextopInfo{
            font-size:28px;
            font-family:PingFang SC;
            font-weight: bold;
            color:rgba(255,255,255,1);
            height:25px;
            line-height:32px;
            width: 100%;
            margin: 20px 0;
            display: flex;
        }
        .tip{
          font-size:28px;
            font-family:PingFang SC;
            font-weight: bold;
            color:#fff;
            width: 100%;
            text-align: right;
            // height: 60px;
            // line-height: 60px;
        }
        .indextopbottom{
           font-size:28px;
            font-family:PingFang SC;
            font-weight: bold;
            color:rgba(255,255,255,1);
            height:60px;
            line-height:40px;
            width: 100%;
            // padding-left: 24px;
            // padding-right: 24px;
            display: flex;
            justify-content: space-between;
            align-content: space-between;  
            flex-wrap: wrap; 
            .time{
              margin-top: 7px;
            }
            span{
            font-size:48px;
            font-family:PingFang SC;
            font-weight:bold;
                vertical-align: middle;
            }
        }
     }
     .imgBox{
         width: 91px;
         height: 91px;
         position: absolute;
         top: 30px;
         right: 24px;
         border-radius: 50%;
         img{
             width: 100%;
             height: 100%;
             border-radius: 50%;
         }
     }
  }
  .yuyue{
     width:690px;
    // height:820px;
    background:rgba(255,255,255,1);
    border-radius:20px; 
    margin: -40px auto 0;
    z-index: 1000;
    .yuyuwbox{
        padding: 33px;
        .yuyuwboxAll{
          display: flex;
          justify-content: space-between;
            align-content: space-between;  
            flex-wrap: wrap; 
             .yuyuwboxAllleft{
              height:29px;
            font-size:30px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:32px;
            }
            .yuyuwboxAllright{
              font-size:28px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,154,0,1);
            line-height:32px;
            }
        }
        .yuyuwboxday{
          display: flex;
            justify-content: space-between;
            align-content: space-between;  
            flex-wrap: wrap; 
            margin: 30px 0 15px 0;
           .yuyuwboxdayleft{
                font-size:28px;
                font-family:PingFang SC;
                font-weight:bold;
                // color:rgba(255,154,0,1);
                line-height:58px;
                vertical-align: middle;
                span{
                    display:inline-block;
                    width: 70px;
                    text-align: center;
                }
                .borderBottom{
                    border-bottom: 2PX solid #FF9A00;
                    color:rgba(255,154,0,1);
                }
            }
            .yuyuwboxdayright{
              width:143px;
                height:58px;
                border:2px solid rgba(255,154,0,1);
                border-radius:29px;
                font-size:26px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,154,0,1);
                line-height: 58px;
                text-align: center;
            }
        }
    }
  }
  .tcffff{
    .yuyuwboxdayleft{
                width: 9.2rem;
                margin: 15px auto;
                font-size:28px;
                font-family:PingFang SC;
                font-weight:bold;
                // color:rgba(255,154,0,1);
                line-height:58px;
                vertical-align: middle;
                span{
                    display:inline-block;
                    width: 70px;
                    text-align: center;
                }
                .borderBottom{
                    border-bottom: 2PX solid #FF9A00;
                    color:rgba(255,154,0,1);
                }
            }
  }
  .login-btn {
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 0 24px;
    /deep/ .van-button{
        height:86px;
        background:linear-gradient(259deg,rgba(249,62,70,1),rgba(239,24,110,1));
        border-radius:43px;
        font-size:36px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1)
    }
  }
  .ticheng{
      // margin-top: 30px;
      .name{
          height:78px;
          line-height: 78px;
          font-size:28px;
          font-weight:bold;
          color:rgba(255,154,0,1);
          padding: 0 24px;
          .yuyuwboxAllright{
            font-size:28px;
            font-family:PingFang SC;
            font-weight:bold;
          }
      }
      .cont{
            // height:126px;
            padding: 20px 24px;
            font-size:28px;
            font-family:PingFang SC;
            background:rgba(255,255,255,1);
           box-shadow:1px 1px 0px 0px rgba(243,243,243,1);
           &:nth-child(2n){
            background:rgba(249,249,249,1);
           }
          .flexJue{
            font-weight:500;
            color:rgba(18,18,18,1);
          }
          .time{
            margin-top: 10px;
            font-weight:500;
            color:rgba(170,170,170,1);
          }
      }
      
  }
}
</style>