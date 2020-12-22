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
               <li><input type="text"  v-model="info.cusName" placeholder="请选择顾客姓名/手机/会员号" @click="onSearch('cus','请选择顾客姓名/手机/顾客会员号')" readonly='readonly' ></li>
               <li>预约项目</li>
               <li><input type="text"  v-model="info.itemName" placeholder="请选择项目名" readonly='readonly' @click="onSearch('item','请选择项目名')" ></li>
               <li>预约老师</li>
               <li><input type="text"  v-model="info.empName" placeholder="请选择老师姓名/手机" readonly='readonly' @click="onSearch('emp','请选择老师姓名/手机')" ></li>
               <li>预约方式</li>
               <li><input type="text"  v-model="info.apptTypeName" placeholder="请选择预约方式" @click="onSearch('type')" readonly='readonly' ></li>
               <li>预约开始日期</li>
               <li><input type="text" v-model="apptBegin1" placeholder="请选择选择日期、时间" readonly='readonly' @click="onSearch('apptBegin')" ></li>
               <!-- <li>预约结束日期</li>
               <li><input type="text" v-model="info.apptEnd" placeholder="请选择选择日期、时间" readonly='readonly' @click="onSearch('endBegin')" ></li> -->
           </ul>
        </div>
      </div>
       <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" round @cancel="toCancel" @select="onSelect" />
       <!-- <van-popup v-model="showTime" position="bottom" :style="{ height: '40%' }" bind:close="onClose" closeable >
         <van-datetime-picker v-model="currentDate" type="datetime" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
       </van-popup> -->
       <van-calendar v-model="showTime"  :show-confirm="false" @close="onClose" @confirm="onConfirm"/>
       <van-popup v-model="popupshow" v-if="popupshow" :visible.sync="popupshow" position="bottom" :style="{ height: '75%' }" bind:close="onClose" closeable close-icon="close">
          <search :searchtype = 'search' :placeholder = 'placeholder' @getdata="receive" v-if="searchShow"> </search>
          <div v-if="searchDiv">
            <selectName :facilityList = 'select' :timeFormatData= 'timeFormatData' @getdata="getdataRe" ></selectName>
          </div>
       </van-popup>
      <div class="login-btn">
        <van-button color="#FF9900" :round="true" size="large" @click="cusappt()">预约报名</van-button>
     </div>
  </div>
</template>

<script>
import search from '@/components/search'
import selectName from '@/components/select'
import { Notify,Toast  } from 'vant';

export default {
  components: {search,Notify,Toast,selectName},
  data() {
    return {
      show: false,
      showTime: false,
      searchDiv: false,
      searchShow:false,
      time:'',
      actions: [
      ],
      info:{

      },
      apptBegin1:'',
      currentDate: new Date(),
      changeDate: new Date(),
      popupshow: false,
      search: '',
      placeholder: '',
      select: [],
      timeFormatData:''
    };
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
     }
    // this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date());
    this.$get(this.HOST + '/cusappt/appttype',{}).then((res) =>{
 
      res.forEach(element => {
        element.id = element.name
        element.name = element.value
      });
     
      this.actions  = res
    }).catch(function (error) {
       
    });
  },
  methods: {
    goBack(){
      this.$router.replace({path: '/index'});
    },
    getdataRe(a,b) {
       this.apptBegin1 = a.trim().split(" ")[1] + '-' + b.trim().split(" ")[1]
       this.info.apptBegin = a
       this.info.apptEnd = b
        this.popupshow = false
       this.showTime = false
    },
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
         if(res.code == 0){
          Toast({
            type: 'success',
            message: '预约成功',
            mask:true
          });
          setTimeout(() => { 
            this.$router.push({ path:'/index' })
          }, 2000)
         }else{
            Toast.fail(res.msg)
         }
        }).catch((error) => {
           Toast.fail('预约失败,请联系管理员')
        });
    },
    onSearch(type,placeholder){
       this.placeholder = placeholder
     
      if(type == 'type'){
        this.show = true
      }else if(type == 'apptBegin' ||type ==  'endBegin'){
        this.time = type
       this.showTime = true
      }else{
        this.popupshow = true
        this.searchShow = true
         this.searchDiv = false
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
        
          this.info.apptTypeName = item.name
          this.info.apptType = item.id
          this.show = false;
    },
    onClose() {
    this.showTime = false
   },
    formatDate(date) {
      date = new Date(date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(event) {
      
      this.showTime = false
      this.searchShow = false
      this.searchDiv = true
      this.popupshow = true
      this.timeFormatData = this.timeFormat(event)
       this.$get(this.HOST + '/cusappt/sch',{date:this.timeFormat(event),empId:this.info.empId}).then((res) =>{
          this.select = res
        }).catch(function (error) {
            console.log(error);
        });
    },

    toCancel(){
      this.show = false
    },
     showPopup() {
        this.show = true;
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
        var d = new Date(time);
        var datetime=this.formatDa(d)
        return datetime
      },
      formatDa(date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d;  
    }
       
  },
  created() {

  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang='less' scoped>
/deep/ .van-calendar__selected-day {
      background-color: #FF9A00;
}
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