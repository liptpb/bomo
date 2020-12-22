<template>
  <div class=''>
     <div class="relFacilityTitcon">
      <i v-for="(item,index) in facilityList" :key="index" @click="changeSpan(index,item.isappt);" 
        :class="{ 'bgcolor':spanIndex.indexOf(index)>-1,'bguleolor': item.isappt==1}"
        >{{item.name}}</i>
    </div>
    <div class="filexBottom">
        <div class="login-btn">
        <van-button color="#FF9900" :round="true" size="large" @click="cusappt()">确定</van-button>
     </div>
    </div>
  </div>
</template>

<script>
import { Notify,Toast  } from 'vant';
export default {
  components: {Notify,Toast},
  data() {
    return {
       spanIndex:[],
    //    facilityList:[
    //        '8:00-8:30','8:00-8:30','8:00-8:30','8:00-8:30','8:00-8:30'
    //    ]
    };
  },
  props: {
    facilityList: {
      type: Array,
    },
    timeFormatData:{
      type: String
    }
  },
  components: {},
  mounted() {

  },
  methods: {
   changeSpan(index,isappt){
       if(isappt!=1){
         let arrIndex = this.spanIndex.indexOf(index);
          if(arrIndex>-1){
              this.spanIndex.splice(arrIndex,1);
          }else{
             if(this.spanIndex.length<2){
               this.spanIndex.push(index);
               let array1 = [...new Set(this.spanIndex)]
               array1.sort((a, b)=>{
                return a - b;
               })
               this.spanIndex = array1
             }
          } 
       }
        
    },
    cusappt(){
      let first ,second
      if(this.spanIndex.length>1){
        if(this.spanIndex[0] < this.spanIndex[1]){
          first = this.facilityList.find((item,index) => {
             return index == this.spanIndex[0]
          })
          second = this.facilityList.find((item,index) => {
             return index == this.spanIndex[1]
          })
       }else{
          first = this.facilityList.find((item,index) => {
             return index == this.spanIndex[1]
          })
          second = this.facilityList.find((item,index) => {
             return index == this.spanIndex[0]
          })
       }
      }else{
         first = this.facilityList.find((item,index) => {
             return index == this.spanIndex[0]
          })
          second = null
      }
       
       let aaa = this.timeFormatData + ' ' + first.value.split('-')[0]
       let bbb = second ? this.timeFormatData + ' ' + second.value.split('-')[1] : this.timeFormatData + ' ' + first.value.split('-')[1]
       this.$emit('getdata',aaa,bbb)
    },
   facilityListWath(data){
    let arr2 = []
    for(var i=0;i<data.length;i++){
       
      if(data[i].isappt == 1){
        arr2.push(i)
      }
    }
    this.spanIndex = arr2
   },
   spanIndexNme(val){
     if(val.length == 1){
      //  Toast('请选择结束时间')
     }else if(val.length == 2){
        if(val[0] < val[1]){
           for(var i = val[0]; i< val[1]; i++ ){
              this.spanIndex.push(i)
           }
        }else{
           for(var i = val[1]; i< val[0].length; i++ ){
              this.spanIndex.push(i)
           }
        }
     }
   }
  },
  created() {

  },
  computed: {},
  watch: {
    spanIndex:{
      handler:function(val,oldval){
         this.spanIndexNme(val)
       },
       deep:true
     },
  }
}
</script>

<style lang='less' scoped>

 .relFacilityTitcon {

    /* border: 1px solid red; */
    /* line-height: 20px; */
    padding: 100px 20px 160px 30px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
  }

   .relFacilityTitcon i {
       width: 22%;
       text-align: center;
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(154,154,154,1); 
    border-radius: 10px;
    border: 2px solid rgba(154,154,154,1); 
    margin-right: 15px;
    margin-top: 20px;
    font-style: normal;
    padding: 5px 0px;
  }
   .relFacilityTitcon .bgcolor {
    border: 2px solid orange;
    color: #fff;
    background: orange;
  }
   .relFacilityTitcon .bgcolorNa {
    border: 2px solid rgb(153, 139, 9);
    color: #fff;
    background: rgb(153, 139, 9);;
  }
  .relFacilityTitcon .bguleolor{
    // border: 2px solid rgb(153, 139, 9);
    color: #9c9c9c;
    background: #D9D9D9;
  }
  .relFacilityTitcon i:last-child {
    margin-right: 0;
  }
  .filexBottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 150px;
    border: 0px solid #333;
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
</style>