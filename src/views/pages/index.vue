/**
 * 
 * @author: liptpb
 * @de 首页
 * @date: 2020-08-23 
 */
<template>
  <div class='indexAll'>
      <div class='indextop'>
          <div class="topinfo">
            <div class='indextopName'>
             你好，周老师(Annal）
            </div>
            <div class='indextopInfo'>13155667788</div>
            <div class='indextopbottom'>
                <div>2020-06-25 星期四</div>
                <div>今日收入<span>598</span>元</div>
            </div>
          </div>
          <div class='imgBox'>
              <img src="../../assets/7.png"  alt="" />
          </div>
      </div>
      <div class="yuyue">
         <div class='yuyuwbox'>
           <div class='yuyuwboxAll'>
              <div class='yuyuwboxAllleft'>
                待服务
              </div>
              <div class='yuyuwboxAllright'>
                全部订单
                <van-icon name="arrow" color="#FF9A00" />
              </div>
           </div>
           <div class='yuyuwboxday'>
              <div class='yuyuwboxdayleft'>
                 今日/明日/全部
              </div>
              <div class='yuyuwboxdayright'>
                 预约
              </div>
           </div>
           <div class='yuyuwboxInfo'>
             <div class="infoName">李子柒</div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>202020</span>
                </div>
                <div class='infotime'>
                   服务项目：<span>全身深度中医推拿</span>
                </div>
               </div> 
               <div class='zhenduan'>查看诊断</div>
             </div>
             <div class="border"></div>
           </div>
           <div class='yuyuwboxInfo'>
             <div class="infoName">李子柒</div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>202020</span>
                </div>
                <div class='infotime'>
                   服务项目：<span>全身深度中医推拿</span>
                </div>
               </div> 
               <div class='zhenduan'>查看诊断</div>
             </div>
             <div class="border"></div>
           </div>
           <div class='yuyuwboxInfo'>
             <div class="infoName">李子柒</div>
             <div class="infoboxInfo">
               <div class='infona'>
                <div class="infotime">
                    服务时间：<span>202020</span>
                </div>
                <div class='infotime'>
                   服务项目：<span>全身深度中医推拿</span>
                </div>
               </div> 
               <div class='zhenduan'>查看诊断</div>
             </div>
             <div class="border"></div>
           </div>
         </div>
      </div>
      <div class="login-btn">
         <van-button color="#FF9900" :round="true" size="large">查看诊断</van-button>
      </div>
      <div class='ticheng'>
        <div class="flexJue bgH name">
            <div class="colorH">项目/产品/充卡</div>
            <div class='yuyuwboxAllright colorH'>
              全部提成
              <van-icon name="arrow" color="#FF9A00" />
            </div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
        </div>
        <div class="cont">
            <div class="flexJue">
               <div class="">小儿综合调理</div>
                <div class='yuyuwboxAllright'>
                20元
                </div>
             </div>
            <div class="time">2020-06-26 11:32</div>
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
.indexAll{
  .indextop{
    //  width:750px;
     width:100% ;
     height:318px;
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
        padding: 33px 33px 0 33px;
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
            margin-top: 20px;
           .yuyuwboxdayleft{
                font-size:28px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(255,154,0,1);
                line-height:58px;
                vertical-align: middle;
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
            }
            .infoboxInfo{
               display: flex;
               justify-content: space-between;
               align-content: space-between;  
               flex-wrap: wrap; 
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
            .border{
                  width:620px;
                    height:16px;
                    margin-top: 20px;
                    background:rgba(255,249,232,1); 
               }
         }
    }
  }
  .login-btn {
    margin-top: 47px;
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
      margin-top: 30px;
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