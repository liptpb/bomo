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
             <li class='itemInfo1'>顾客姓名：<span>{{items[0]&&items[0].cusName}}</span></li>
             <li class='itemInfo1'>服务日期：<span>{{datainfo}}</span></li>
             <li class='itemInfo'><p>服务项目：</p>
                 <table>
                     <tr v-for="(item, index) in items" :key="index">
                         <td class="td1">{{item.itemName}}</td>
                         <td class="td2"></td>
                         <td class="td3">X{{item.quantityUse}}</td>
                     </tr>
                 </table>
             </li>
         </ul>
        </div>
     </div>
     <div class='feedback_cont'>
       <div class='textarea'>
         <!-- <van-cell-group>
              <van-field
                value=""
                type="textarea"
                placeholder="请客观填写本次治疗反馈！"
                v-model="cont"
             />
         </van-cell-group> -->
         <textarea placeholder="请客观填写本次治疗反馈！"  v-model="cont"> 
         </textarea>
       </div>
     </div>
     <div class="feedback_bottom"> 
         <ul>
             <li>1.如实填写治疗情况方便跟踪用户身体状态</li>
             <li>2.下次治疗时可跟进历史治疗效果从而改变治疗方案</li>
         </ul>
     </div>
    <div class="login-btn">
        <van-button color="#FF9900" :round="true" size="large" @click="sumitClick()">提交反馈</van-button>
    </div>
  </div>
</template>

<script>
import { Notify,Toast  } from 'vant';
export default {
  components: {Notify,Toast},
  data() {
    return {
      cont: '',
      items: [],
      datainfo: '',
      feedbackNum: '',
      feedbackNumold:true,
      orderNum:''
    };
  },
  created(){
    // console.log('22222222')
    // let query = this.$route.query
    // this.$get(this.HOST + '/cbi/items', query).then((res) =>{
    //   console.log('22222222')
    //   console.log(res)
    //   console.log(res[0].feedback)
    //    this.feedbackNum = res[0].feedback
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
  },
  mounted() {
    // this.getDeleteComment()
   if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.goBack, false);
   }

   
    let query = this.$route.query
   this.$get(this.HOST + '/cbi/items', query).then((res1) =>{
     this.feedbackNum = res1[0].feedback
     let orderNoName = []
     for(var i=0;i<res1.length;i++){
       orderNoName.push(res1[i].subOrderNo)
     }
     this.orderNum = orderNoName.join('_')
    if(this.feedbackNum  == '1' && this.$route.query.cusid){
       setTimeout(() => { 
            this.$router.push({ path:'/otherSee' ,query: {
            cusId: this.$route.query.cusid,com:'com'}
           })  
         })
    }else{
    this.$get(this.HOST + '/cbi/items', query).then((res) =>{
          this.items = res
          // console.log(this.setNowTimes(this.items[0].date))
          this.datainfo = this.setNowTimes(this.items[0].date)
         
        }).catch(function (error) {
            console.log(error);
        });
    }
    });
  },
  
// destroyed(){
//   window.removeEventListener('popstate', this.goBack, false);
// },
  methods: {
    goBack(){
      this.feedbackNum = ''
      this.feedbackNumold = false
      this.$router.replace({path: '/index'});
    
    },
    async getDeleteComment () {
      let query = this.$route.query
      query.orderNo = this.orderNum
      const resp = await this.$get(this.HOST + '/cbi/items', query).then((res) =>{
          this.feedbackNum = res[0].feedback
         
        }).catch(function (error) {
            console.log(error);
        });
    
    },
    sumitClick(){
    let id = this.$route.query.cusid
    let orderNo = this.$route.query.orderNo
    let orderTimeStr = this.$route.query.date
     let type = this.$route.query.type
    let data = {
     'empid' : id ,
     'cont' : this.cont
    }
    if(this.cont.length<=0){
        Notify({ type: 'warning', message: '请客观填写本次治疗反馈~' });
        return
    }
    // let data1 = JSON.parse(data)
    this.$post(this.HOST + '/cbi/feekback', {cusId:id, cont: this.cont,orderNo:this.orderNum,orderTimeStr:orderTimeStr,type:type}).then((res) =>{
      if(res.code == 0){
        Toast({
            type: 'success',
            message: '反馈成功',
            mask:true
          });
          setTimeout(() => { 
            this.$router.push({ path:'/otherSee' ,query: {
            cusId: this.$route.query.cusid,com:'com'
      }  })
          }, 2000)
      }else{
        Toast.fail(res.msg)
      }
          
        }).catch((error) => {
          Toast.fail('反馈失败,请联系管理员')
        });
    },
    setNowTimes (da) {
      let dat1 = da.split("月")
      let dat2 = dat1[1].split("日")[0]
      let myDate1 = new Date()
      let yy1 = String(myDate1.getFullYear())
      let myDate = new Date(yy1,dat1[0]-1,dat2)
      let wk = myDate.getDay()
      let yy = String(myDate.getFullYear())
      let mm = myDate.getMonth() + 1
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let week = weeks[wk]
      return  yy + '-' + mm + '-' + dd +' ' + week
    }
  },
  computed: {},
  watch: {},
}
</script>
<style lang='less' scoped>

.feedback{
    padding: 30px 30px 30px 30px;
    .feedback_top{
        width:100%;
        min-height:180px;
       
        background:rgba(255,255,255,1);
        border-radius:20px;
        div{
             padding: 37px 37px 30px 37px;
          ul{
            li{
              height:auto;
                font-size:32px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(52,52,52,1);
                
                // margin-bottom: 20px;
                span{
                  font-weight:500;
                  color:#FF9900;
                }
            }
            .itemInfo1{
              //  line-height:32px; 
            }
            .itemInfo{
               display: flex;
               justify-content: space-between;
               font-weight:500;
               color:#FF9900;
               line-height:auto !important;
               p{
                  font-weight:bold;
                color:rgba(52,52,52,1); 
               }
               table{
                  position: relative;
                 width: 70%;
                 tr{
                   margin-bottom: 10px;
                   .td1{
                   max-width: 50%;
                   vertical-align: text-bottom;
                 }
                 .td2{
                    width: 20%;
                    vertical-align: text-bottom;
                 }
                 .td3{
                    width: 30%;
                    text-align: right;
                 }
                 }
                 
               }
            }
          }
        }
    }
    .feedback_cont{
        width:690px;
        height:270px;
        margin-top: 30px;
        // background:rgba(255,255,255,1);
        border-radius:20px;
        .textarea{
          // padding: 37px;
           border-radius:20px;
           height: 3.6rem !important;
           textarea{
             width: 650px;
             font-size: 30px;
              height: 266px;
              background: #FFFFFF;
              border-radius: 20px;
              border:0px;
              padding: 20px;
           }
           /deep/ .van-cell-group{
            border-radius:20px !important;
           }
          /deep/ .van-cell{
            padding: 0 !important;
            border-radius:20px !important;
            /deep/ .van-field__control{
              // height:270px !important;
               height: 3.6rem !important;
              border-radius:20px;
              padding: 15px 0 0 34px; 
          }
          }
           
        }
    }
    .feedback_bottom{
        margin-top:80px ;
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
    margin-top:300px;
    margin-bottom: 47px;
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
}
</style>