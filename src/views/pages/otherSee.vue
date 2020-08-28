/**
 * 
 * @author: liptpb
 * @date: 2020-08-20 
 */
<template>
  <div>
     <div class='indexAll'>
        <div class='search'>
           <van-search
            shape="round"
            background="transparent"
            placeholder="请输入搜索关键词"
          />
        </div>
        <div class='cusNameInfo'>
           <ul>
             <li class="flexJue">
               <p>顾客编号: {{cusInfo.cusCode}}</p>
               <p>顾客:{{cusInfo.cusName}}</p>
             </li>
             <li>会员级别: {{cusInfo.levelName}}  {{cusInfo.rate}}折</li>
             <li>电话: {{cusInfo.mobile}}</li>
             <li>年龄: {{cusInfo.age}}岁</li>
             <li>开卡时间: {{cusInfo.kksj}}</li>
           </ul>
        </div>
        <div class='tabName'>
          <div v-bind:class="{ active: tabShow }"  @click="tabName('a')">
             <span>诊断</span>
            </div>
          <div v-bind:class="{ active: !tabShow }"  @click="tabName('b')"><span>效果反馈</span></div>
        </div>
        <div class='zhenduan' v-show="!tabShow">
          <div v-for="(item, index) in fbs" :key="index">
             <div class='zhenduanbox'>
              <ul>
                 <li>
                   {{item.cont}}
                </li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：{{item.empName}} 
                <p>{{item.createTimeStr}}</p>
            </div>
            <div class="border"></div>
          </div>
          <noData mess="无反馈效果记录" v-show="fbs.length<1"></noData>
        </div>
        <div class='zhenduan' v-show="tabShow">
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
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：{{item.zlsName}} 跟诊：{{item.zdsName}}</p>
                <p>{{item.zdTime}}</p>
            </div>
            <div class="border"></div>
          </div>
          <noData mess="无诊断记录" v-show="imps.length<1"></noData>
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
     tabShow: true,
     cusInfo: {},
     imps: [],
     fbs: [],
    };
  },
  mounted() {
    let id = this.$route.query.cusId
    this.$get(this.HOST + '/cbi/' + id, {
       
      }).then((res) =>{
          console.log(res)
          this.cusInfo = res
          this.fbs = res.fbs
          this.imps = res.imps
        }).catch(function (error) {
            console.log(error);
        });
  },
  methods: {
    tabName(id){
      if(id=='a'){
        this.tabShow = true
      }else{
        this.tabShow = false
      }
    }
  },
  created() {

  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang='less'>
.indexAll{
   padding: 0 24px;
   .search{
     padding: 10px 0;
   }
   .cusNameInfo{
     width:690px;
      height:294px;
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
        }
        .flexJue{
          margin-top: 0;
          font-size:32px;
         font-weight:bold;
         color:rgba(51,51,51,1);
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
         margin-bottom: 5px;
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