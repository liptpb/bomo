/**
 * 
 * @author: liptpb
 * @date: 2020-08-27 
 */
<template>
  <div class='feedback'>
     <div class='feedback_top'> 
        <div>
          <ul>
             <li>顾客：<span>周树人</span></li>
             <li>服务日期：<span>8月22日 上午</span></li>
             <li class='itemInfo'><p>服务项目：</p>
                 <table>
                     <tr>
                         <td>3333333</td>
                         <td>3</td>
                         <td>郑老师</td>
                     </tr>
                     <tr>
                         <td>3333333</td>
                         <td>3</td>
                         <td>郑老师</td>
                     </tr>
                     <tr>
                         <td>3333333</td>
                         <td>3</td>
                         <td>郑老师</td>
                     </tr>
                 </table>
             </li>
         </ul>
        </div>
     </div>
     <div class='feedback_cont'>
       <div class='textarea'>
         <van-cell-group>
              <van-field
                value=""
                type="textarea"
                placeholder="评论一下本次服务吧~"
                autosize
                border="false"
                height="150"
             />
         </van-cell-group>
       </div>
     </div>
     <div class="feedback_bottom"> 
         <ul>
             <li>1.如实填写治疗情况方便跟踪用户身体状态</li>
             <li>2.下次治疗时可跟进历史治疗效果从而改变治疗方案</li>
         </ul>
     </div>
    <div class="login-btn">
        <van-button color="#FF9900" :round="true" size="large">提交反馈</van-button>
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
.feedback{
    padding: 30px;
    .feedback_top{
        width:100%;
        min-height:312px;
       
        background:rgba(255,255,255,1);
        border-radius:20px;
        div{
             padding: 37px;
          ul{
            li{
              height:31px;
                font-size:32px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(52,52,52,1);
                line-height:32px;  
                margin-bottom: 25px;
                span{
                  font-weight:500;
                  color:#FF9900;
                }
            }
            .itemInfo{
               display: flex;
               font-weight:500;
               color:#FF9900;
               p{
                  font-weight:bold;
                color:rgba(52,52,52,1); 
               }
            }
          }
        }
    }
    .feedback_cont{
        width:690px;
        height:266px;
        margin-top: 30px;
        background:rgba(255,255,255,1);
        border-radius:20px;
        .textarea{
          padding: 37px;
         /deep/ .van-field__control{
             height: 188px !important;
             padding: 10px; 
          }  
        }
    }
    .feedback_bottom{
        margin-top:20px ;
       ul{
            li{
               font-size:28px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(154,154,154,1); 
            }
        }
    }
    .login-btn {
      margin-top: 150px;
    }
}
</style>