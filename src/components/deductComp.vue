/**
 * 
 * @author: liptpb
 * @date: 2020-08-24 
 */
<template>
  <div class=''>
        <div class="cont" v-for="(item, index) in tclistArray" :key="index">
            <div class="flexJue">
               <div class="">{{item.name}}</div>
                <div class='yuyuwboxAllright'>
                {{item.tcmoney}}元
                </div>
             </div>
            <div class="time">{{item.time}}</div>
        </div>
        <noData mess="无数据" v-show="tclistArray.length<1"></noData>
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