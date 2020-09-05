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
             你好，{{info.empName}}({{info.nickName}})
            </div>
            <div class='indextopInfo'>{{info.mobile}}</div>
            <div class='indextopbottom'>
                <div>{{info.data}} {{info.week}}</div>
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
              <div class='yuyuwboxAllright' @click="itemsInfo()" >
                全部订单
                <van-icon name="arrow" color="#FF9A00" style="vertical-align: middle;"/>
              </div>
           </div>
           <div class='yuyuwboxday'>
              <div class='yuyuwboxdayleft'>
                 <span @click="tabName('d')" :class="{'borderBottom':yuyue=='d'}">今日</span>/
                 <span @click="tabName('m')" :class="{'borderBottom':yuyue=='m'}">明日</span>/
                 <span @click="tabName('all')" :class="{'borderBottom':yuyue=='all'}">全部</span>
              </div>
              <div class='yuyuwboxdayright' @click="appoint()">
                 预约
              </div>
           </div>
           <div v-show="yuyue=='d'">
              <serviceInfo :serviceInfoData = "todayList"></serviceInfo>
           </div>
           <div v-show="yuyue=='m'">
              <serviceInfo :serviceInfoData = "tomList"></serviceInfo>
           </div>
           <div v-show="yuyue=='all'">
              <serviceInfo :serviceInfoData = "apptList"></serviceInfo>
           </div>
         </div>
      </div>
      <div class="login-btn">
         <van-button color="#FF9900" :round="true" size="large" @click="seeFunctionNum()">查看诊断</van-button>
      </div>
      <div class='ticheng'>
        <div class="flexJue bgH name">
            <div class="colorH">项目/产品/充卡</div>
            <div class='yuyuwboxAllright colorH' v-on:click="tichengFunction()">
              全部提成
              <van-icon name="arrow" color="#FF9A00" style="vertical-align: middle;"/>
            </div>
        </div>
        <deductComp :tclist = "tclist"></deductComp>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import deductComp from '@/components/deductComp'
import serviceInfo from '@/components/serviceInfo'
import noData from '@/components/noData'
import {formatDate} from '@/utils/index.js'
export default {
  components: {
    deductComp,
    noData,
    serviceInfo
  },
  data() {
    return {
      info: {

      },
      tclist: [],
      tclistAeeray:[],
      yuyue: 'd' ,//预约
      todayList: [],
      tomList: [],
      apptList: [],
      refreshing: false, //加载完成后的提示文案
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完成
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
          this.tclist = this.tclist.concat(this.arrTrans(5,res.tclist)[0])
          this.todayList = res.todayList
          this.tomList = res.tomList
          this.apptList = res.apptList
        }).catch(function (error) {
            
        });
    },
    onRefresh() {
      console.log('触发下拉刷新');
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
      console.log('触发上拉加载');
      this.loading = true;
      setTimeout(() => {
      if(this.tclistAeeray.length>this.tclist.length){
        let i=1
        i++
        this.tclist = this.tclist.concat(this.arrTrans(5,this.tclistAeeray)[i])
        this.loading = false;
      }else{
        this.loading = false;
        this.finished = true;
      }
      }, 1000);
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
    tabName(val){
      this.yuyue = val
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

.indexAll{
  .indextop{
    //  width:750px;
     width:100% ;
     min-height:318px;
     background:linear-gradient(-90deg,#FF9A00,#FF9A00);  
     .topinfo{
         padding: 24px;
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
            font-size:24px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            height:19px;
            line-height:32px;
            width: 100%;
            margin: 20px 0;
        }
        .indextopbottom{
            font-size:24px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            height:23px;
            line-height:32px;
            width: 100%;
            // padding-left: 24px;
            // padding-right: 24px;
            display: flex;
            justify-content: space-between;
            align-content: space-between;  
            flex-wrap: wrap; 
            span{
            font-size:48px;
            font-family:PingFang SC;
            font-weight:bold;
            }
        }
     }
     .imgBox{
         width: 91px;
         height: 91px;
         position: absolute;
         top: 62px;
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
              font-size:24px;
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
            margin: 30px 0 30px 0;
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
                border:1px solid rgba(255,154,0,1);
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