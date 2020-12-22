/**
 * 
 * @author: liptpb
 * @date: 2020-08-20 
 */
<template>
  <div>
     <div class='indexAll'>
        <div class='search'  @click="onSearch('cus')">
           <van-search
            shape="round"
            background="transparent"
            placeholder="输入顾客姓名/手机号/会员编号/进行搜索"
          />
        </div>
         <van-popup v-model="popupshow" v-if="popupshow" :visible.sync="popupshow" position="right" :style="{ height: '100%',width:'100%'}">
          <search :searchtype = 'search1' @getdata="receive" > </search>
       </van-popup> 
       <div v-if="cusId">
        <div class='cusNameInfo' v-show="flexJue">
           <ul>
             <li class="flexJue">
               <p>顾客姓名:{{cusInfo.cusName}}</p>
               <p class='nameflex'>顾客编号: {{cusInfo.cusCode}}</p>
              
             </li>
              <!-- <li>服务项目: {{cusInfo.mobile}}</li> -->
             <li>会员级别: {{cusInfo.levelName}} </li>
             <li>电话: {{cusInfo.mobile}}</li>
             <li>年龄: {{cusInfo.age}}</li>
             <li>开卡时间: {{cusInfo.kksj}}</li>
           </ul>
        </div>
        <div class='tabName' v-show="flexJue">
          <div v-bind:class="{ active: tabShow }"  @click="tabName('a')">
             <span>诊断</span>
            </div>
          <div v-bind:class="{ active: !tabShow }"  @click="tabName('b')"><span>效果反馈</span></div>
        </div>
        <div class='zhenduan' v-show="!tabShow && flexJue">
          <div v-for="(item, index) in fbs" :key="index">
             <div class='zhenduanbox'>
              <ul>
                 <li>
                   {{item.cont}}
                </li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue' style="padding-bottom:0">
                <p>治疗师：{{item.empName}} 
                <p>{{reversedMessage(item.createTimeStr)}}</p>
            </div>
             <div class='flexJue' style="padding-top:0">
                <p>服务项目：{{item.itemName}} </p>
            </div>
            <div class="border"></div>
          </div>
          <noData mess="无反馈效果记录" v-show="fbs.length<1"></noData>
        </div>
        <div class='zhenduan' v-show="tabShow && flexJue">
          <div v-for="(item, index) in imps" :key="index">
             <div class='zhenduanbox'>
              <ul>
                 <li><span class='colorH'>自述：</span>
                 {{item.disease}}</li>
                 <li><span class='colorH'>面诊：</span>
                 {{item.mianz}}</li>
                 <li><span class='colorH'>舌诊：</span>
                 {{item.shez}}</li>
                 <li><span class='colorH'>手诊：</span>
                 {{item.shouz}}</li>
                 <li><span class='colorH'>脉诊：</span>
                 {{item.maiz}}</li>
                 <li><span class='colorH'>治疗方案：</span>
                 {{item.treatment}}</li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>诊断老师：{{item.zdsName}}&nbsp;&nbsp;&nbsp;&nbsp;跟诊老师：{{item.zlsName}}</p>
                <p>{{reversedMessage(item.zdTime) }}</p>
            </div>
             <!-- <div class='flexJue'  style="padding-top:0">
                <p>服务项目：{{item.itemName}} </p>
            </div> -->
            <div class="border"></div>
          </div>
          <noData mess="无诊断记录" v-show="imps.length<1"></noData>
        </div>
       </div>
       <div v-else>
         <noData mess="请搜索会员信息"></noData>
       </div>  
     </div>
  </div>
</template>

<script>
import search from '@/components/search'
 import noData from '@/components/noData'
export default {
  components: {noData,search},
  data() {
    return {
     tabShow: true,
     cusInfo: {},
     imps: [],
     fbs: [],
     popupshow: false,
     search1: 'cus',
     flexJue: true,
     cusId:false
    };
  },
  mounted() {
    let id = this.$route.query.cusId
    if(this.$route.query.com){
      this.tabShow = false
    }
    if(id){
      this.dataName(id)
      this.cusId = true
    }else{
      this.cusId = false
    }
  },
  methods: {
    dataName(id){
     if(!id){
       this.flexJue = false
       return
     }else{
      this.flexJue = true
     }
     this.$get(this.HOST + '/cbi/' + id, {
       
      }).then((res) =>{
          this.cusInfo = res
          this.fbs = res.fbs
          this.imps = res.imps
        }).catch(function (error) {
            console.log(error);
        });
    },
    tabName(id){
      if(id=='a'){
        this.tabShow = true
      }else{
        this.tabShow = false
      }
    },
    onSearch(){
      this.popupshow = true
    },
    receive(data){
      if(data&&data.id){
         this.dataName(data.id)
         this.cusId = true
      }
      this.popupshow = false
    },
    reversedMessage:  (data) => {
      // `this` 指向 vm 实例
      return data? data.split(' ')[0] : ''
    }
  },
  created() {

  },
  computed: {
    // 计算属性的 getter
    
  },
  watch: {},
}
</script>

<style scoped lang='less'>
// /deep/ .van-search .van-cell{
// //   padding: 10px;
//   height: 50px;
//     line-height: 50px; 
// }
/deep/ .van-search__content{
   background:rgba(255,255,255,1);
}
.indexAll{
   padding: 0 24px;
   .search{
     padding: 10px 0;
   }
   .cusNameInfo{
     width:690px;
      min-height:294px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      font-size:24px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
      ul{
        padding: 40px 37px;
        li{
          margin-top: 10px;         
          
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #343434;
        }
        .nameflex{
          font-size: 24px;
          padding-top: 8px;
        }
        .flexJue{
          
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #343434;
        }
      }
   }
   .tabName{
       font-size:32px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        display: flex;
        padding: 20px 0;
        div{
          flex: 1;
          text-align: center;
        }
        .active{
          span{
              display: inline-block;
              border-bottom: 1px solid #ff9900;
              color:rgba(255,153,0,1);
          }
        }
   }
   .zhenduan{
     width:690px;
     background:rgba(255,255,255,1);
     border-radius:20px;
     font-size: 24px;
     color:#333333;
     font-family:PingFang SC;
     font-weight:500;
     .zhenduanbox{
       padding: 37px 37px 20px 37px;
       li{
         margin-bottom: 15px;word-break:break-all;
       }
     }
     .hr{
       padding: 0;
       height:1px;
       background:rgba(244,244,244,1);
     }
     .flexJue{
       padding: 20px 37px;
     }
     .border{
        width:630px;
        height:16px;
        margin-top: 20px;
        background:rgba(255,249,232,1); 
        margin: 0 auto;
      }
   }
}
</style>