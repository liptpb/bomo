/**
 * 
 * @author: liptpb
 * @date: 2020-08-24
 *  提成组件
 */
<template>
  <div class='ticheng'>
     <div class="flexJue bgH name">
        <div class="colorH">项目/产品/充卡</div>
        <div class='yuyuwboxAllright colorH'>
          提成
        </div>
      </div>
     <deductComp :tclist = "tclist"></deductComp>
  </div>
</template>

<script>
import deductComp from '@/components/deductComp'
export default {
  components: {
    deductComp
  },
  data() {
    return {
      tclist: Array
    };
  },
  mounted() {
   this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
  },
  methods: {

  },
  created() {
   this.$get(this.HOST + '/index/tc?page=1', {
       
      }).then((res) =>{
          this.tclist = res
        }).catch(function (error) {
            console.log(error);
        });
  },
  computed: {},
  watch: {},
}
</script>

<style scoped  lang='less'>
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
}
</style>