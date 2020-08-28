/**
 * 
 * @author: liptpb
 * @date: 2020-08-27 
 */
<template>
  <div class='appoint'>
      <div class='feedback_top'> 
        <div>
           <ul>
               <li>顾客姓名</li>
               <li><input type="text" name="fname" placeholder="请选择顾客姓名/手机/会员号"></li>
               <li>预约项目</li>
               <li><input type="text" name="fname" placeholder="请选择项目名"></li>
               <li>预约老师</li>
               <li><input type="text" name="fname" placeholder="请选择老师姓名/手机"></li>
               <li>预约方式</li>
               <li><input type="text" name="fname" placeholder="请选择预约方式"></li>
               <li>到店时间</li>
               <li><input type="text" name="fname" placeholder="请选择选择日期、时间"></li>
           </ul>
        </div>
      </div>
      <div class="login-btn">
        <van-button color="#FF9900" :round="true" size="large">预约报名</van-button>
     </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {

  },
  created() {

  },
  computed: {},
  watch: {},
}
</script>

<style lang='less' scoped>
.appoint{
    padding: 30px;
    .feedback_top{
        width:100%;
        min-height:312px;
       
        background:rgba(255,255,255,1);
        border-radius:20px;
        div{
             padding: 37px;
             li{
                display: block;
                font-size:30px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(154,154,154,1); 
                margin-bottom: 25px;
                input{
                    width: 95%;
                    height:84px;
                    background:rgba(244,244,244,1);
                    border-radius:9px;
                    padding-left: 30px;
                    &:-webkit-input-placeholder {
                      font-size:30px;
                      font-family:PingFang SC;
                      font-weight:500;
                      color:rgba(52,52,52,1);
                    }
                }
             }
        }
    }
    .login-btn {
      margin-top: 150px;
    }
}
</style>