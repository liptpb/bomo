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
               <li>会员姓名</li>
               <li><input type="text"  v-model="info.cusName" placeholder="请选择会员姓名/手机/会员号" @click="onSearch('cus')" readonly='readonly'></li>
               <li>预约项目</li>
               <li><input type="text"  v-model="info.itemName" placeholder="请选择项目名" readonly='readonly' @click="onSearch('item')"></li>
               <li>预约老师</li>
               <li><input type="text"  v-model="info.empName" placeholder="请选择老师姓名/手机" readonly='readonly' @click="onSearch('emp')"></li>
               <li>预约方式</li>
               <li><input type="text"  v-model="info.apptTypeName" placeholder="请选择预约方式" @click="onSearch('type')" readonly='readonly'></li>
               <li>预约开始日期</li>
               <li><input type="text" v-model="info.apptBegin" placeholder="请选择选择日期、时间" readonly='readonly' @click="onSearch('apptBegin')"></li>
               <li>预约结束日期</li>
               <li><input type="text" v-model="info.apptEnd" placeholder="请选择选择日期、时间" readonly='readonly' @click="onSearch('endBegin')"></li>
           </ul>
        </div>
      </div>
       <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" round @cancel="toCancel" @select="onSelect" />
       <van-popup v-model="showTime" position="bottom" :style="{ height: '40%' }">
         <van-datetime-picker v-model="currentDate" type="datetime" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
       </van-popup>
       <van-popup v-model="popupshow" position="right" :style="{ height: '100%',width:'100%'}">
          <search :searchtype = 'search' @getdata="receive" > </search>
       </van-popup>
      <div class="login-btn">
        <van-button color="#FF9900" :round="true" size="large" @click="cusappt()">预约报名</van-button>
     </div>
  </div>
</template>

<script>
import search from '@/components/search'
import { Notify,Toast  } from 'vant';

export default {
  components: {search,Notify,Toast},
  data() {
    return {
      show: false,
      showTime: false,
      time:'',
      actions: [
      ],
      info:{

      },
      currentDate: new Date(),
      changeDate: new Date(),
      popupshow: false,
      search: ''
    };
  },
  mounted() {
    this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date());
    this.$get(this.HOST + '/cusappt/appttype',{}).then((res) =>{
      console.log(res)
      res.forEach(element => {
        element.id = element.name
        element.name = element.value
      });
      console.log(res)
      this.actions  = res
    }).catch(function (error) {
        console.log(error);
    });
  },
  methods: {
    cusappt(){
      if(!this.info.cusId){
        Notify({ type: 'warning', message: '请选择会员' });
        return
      }else if(!this.info.apptType){
        Notify({ type: 'warning', message: '请选择预约方式' });
        return
      }else if(!this.info.apptBegin){
        Notify({ type: 'warning', message: '请选择预约开始时间' });
        return
      }
      this.$post(this.HOST + '/cusappt', this.info).then((res) =>{
          Toast({
            type: 'success',
            message: '预约成功',
            mask:true
          });
          setTimeout(() => { 
            this.$router.push({ path:'/index' })
          }, 2000)
        }).catch((error) => {
           Toast.fail('预约失败,请联系管理员')
        });
    },
    onSearch(type){
	
      if(type == 'type'){
        this.show = true
      }else if(type == 'apptBegin' ||type ==  'endBegin'){
        this.time = type
       this.showTime = true
      }else{
        this.popupshow = true
        this.search = type
      }
    },
    receive(data){
      this.popupshow = false
      if(!data){
        return
      }
      if(this.search =='cus'){
        this.info.cusName = data.cusName
        this.info.cusId = data.id
      }
      if(this.search =='emp'){
        this.info.empName = data.empName
        this.info.empId = data.id
      }
      if(this.search =='item'){
        this.info.itemName = data.itemName
        this.info.itemId = data.id
      }
      
    },
    onSelect(item){
          console.log(item);
          this.info.apptTypeName = item.name
          this.info.apptType = item.id
          this.show = false;
    },
    toCancel(){
      this.show = false
    },
     showPopup() {
        this.show = true;
      },
      changeFn() { // 值变化是触发
        this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
      },
      confirmFn() { // 确定按钮
      if(this.time =='apptBegin'){
        this.info.apptBegin = this.dateFormat("YYYY-mm-dd HH:MM:SS",this.currentDate);
      }else{
        this.info.apptEnd = this.dateFormat("YYYY-mm-dd HH:MM:SS",this.currentDate);
      }
        
        this.showTime = false;
      },
      cancelFn(){
        this.showTime = false;
      },
      timeFormat(time) { // 时间格式化 2019-09-08
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return year + '-' + month + '-' + day
      },
       dateFormat(fmt, date) {
          let ret;
          const opt = {
              "Y+": date.getFullYear().toString(),        // 年
              "m+": (date.getMonth() + 1).toString(),     // 月
              "d+": date.getDate().toString(),            // 日
              "H+": date.getHours().toString(),           // 时
              "M+": date.getMinutes().toString(),         // 分
              "S+": date.getSeconds().toString()          // 秒
              // 有其他格式化字符需求可以继续添加，必须转化成字符串
          };
          for (let k in opt) {
              ret = new RegExp("(" + k + ")").exec(fmt);
              if (ret) {
                  fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
              };
          };
          return fmt;
       }
  },
  created() {

  },
  computed: {
    
  },
  watch: {},
}
</script>

<style lang='less' scoped>

// /deep/  .van-picker__toolbar{
//   height: 60px;
//   line-height: 60px;
//   font-size: 36px;
//   font-weight: bold;
// }
// /deep/  .van-picker__cancel{
//    font-size: 30px;
// }
// /deep/  .van-picker__confirm{
//    font-size: 30px;
// }
// /deep/  .van-picker-column {
//    font-size: 36px;
// }
// /deep/  .van-action-sheet__item {
//     line-height: 40px;
//     font-size: 30px;
// }
// /deep/  .van-action-sheet__cancel {
//     line-height: 50px;
//     font-size: 30px;
// }
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
                    color: #343434;
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
    margin-top:30px;
    // margin-bottom: 47px;
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