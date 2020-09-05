<template>
  <div class='ticheng'>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="flexJue bgH name">
          <div class="colorH">项目/产品/充卡</div>
           <div class='yuyuwboxAllright colorH'>
            提成
           </div>
        </div>
        <div class="cont" v-for="(item, index) in list" :key="index">
            <div class="flexJue">
               <div class="">{{item.name}}</div>
                <div class='yuyuwboxAllright'>
                {{item.tcmoney}}元
                </div>
             </div>
            <div class="time">{{item.time}}</div>
        </div>
        <noData mess="今日无提成项目" v-show="list.length<1"></noData>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import noData from '@/components/noData'
export default {
  data() {
    return {
      order_status: 1, //标签默认
      pagenum: 1, //当前页数
      total: null, //总条数
      list: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完成
      refreshing: false //加载完成后的提示文案
    };
  },
  components: {Toast,noData},
  mounted() {
    this.getlist()
  },
  methods: {
    // 页面首次加载数据列表
    getlist() {
      this.loading = true;
       this.$get(this.HOST + '/index/tc?page='+ this.pagenum, {
        // params: {
        //   order_status: Number(this.order_status),
        //   page: this.pagenum
        // }
      }).then(res => {
        this.loading = false; // 加载状态结束
        this.total = res.length;
        this.list=this.list.concat(res)
        console.log('*页面首次加载数据列表*',this.list);
        this.refreshing = false;
        this.pagenum += 1;
      });
    },
    // 下拉刷新
    onRefresh() {
      console.log('触发下拉刷新');
      setTimeout(()=>{
      if(this.refreshing){
          this.list = this.list;
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
      if(this.list.length<this.total ){
        this.getlist();
        this.loading = false;
      }else{
        this.loading = false;
        this.finished = true;
      }
      }, 1000);
    },

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
</style>