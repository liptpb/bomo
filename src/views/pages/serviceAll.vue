/**
 * 
 * @author: liptpb
 * @date: 2020-08-25 
 */
<template>
  <div class='indexAll'>
      <div class="yuyue">
         <div class='yuyuwbox'>
           <div class='yuyuwboxInfo'>
             <div class="infoName flexJue">
                 <div>李子柒</div>
                 <div class='zhenduan' @click="seeFunction('1111')">查看诊断</div>
             </div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>202020</span>
                </div>
                <div class='infotime flexJue'>
                   <div>服务项目：<span>全身深度中医推拿</span></div>
                   <div class="colorH">x1</div>
                </div>
               </div> 
             </div>
             <div class='mony flexJue'>
                   <p>提成￥<span>98.00</span></p>
                   <div class='fankui'>效果反馈</div>
             </div>
             <div class="border"></div>
           </div>
           <div class='yuyuwboxInfo'>
             <div class="infoName flexJue">
                 <div>李子柒</div>
                 <div class='zhenduan' @click="seeFunction('1111')">查看诊断</div>
             </div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>202020</span>
                </div>
                <div class='infotime flexJue'>
                   <div>服务项目：<span>全身深度中医推拿</span></div>
                   <div class="colorH">x1</div>
                </div>
               </div> 
             </div>
             <div class='mony flexJue'>
                   <p>提成￥<span>98.00</span></p>
                   <div class='fankui'>效果反馈</div>
             </div>
             <div class="border"></div>
           </div>
           <div class='yuyuwboxInfo'>
             <div class="infoName flexJue">
                 <div>李子柒</div>
                 <div class='zhenduan' @click="seeFunction('1111')">查看诊断</div>
             </div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>202020</span>
                </div>
                <div class='infotime flexJue'>
                   <div>服务项目：<span>全身深度中医推拿</span></div>
                   <div class="colorH">x1</div>
                </div>
               </div> 
             </div>
             <div class='mony flexJue'>
                   <p>提成￥<span>98.00</span></p>
                   <div class='fankui'>效果反馈</div>
             </div>
             <div class="border"></div>
           </div>
         </div>
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
                  width:143px;
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