<template>
	<div>
		<van-form @submit="onSubmit" style='margin-top:200px'>
      <van-field v-model="mobile" :rules="rules.mobile" placeholder="手机号"> </van-field>
      <van-field v-model="code"  :rules="rules.code" placeholder="验证码">  
        <template #button>
           <van-count-down :time="1000 * 60"  format="ss s" @finish="isSendCode= false"  v-if="isSendCode" />
           <van-button v-else  @click="onSendSms" round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>  
      <div style="margin: 16px;">
        <van-button round  block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <van-overlay v-show="show" bind:click="onClickHide" />
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
	export default{
    name: 'techInfo',
    data () {
      return {
        mobile: '',
        code: '',
        rules: {
         mobile: [
          {
            required: true,
             message: '手机号不能为空'
          }, 
         {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
         }
         ],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{4}$/,
          message: '验证码格式错误'
        }]
      },
      isSendCode: false,
      show: true
     }
    },
    computed: {
      phoneStyle() {
          let reg = /(^1[3|4|5|8][0-9]\d{4,8}$)|(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)/
          if (!reg.test(this.mobile)) {
              return false
          }
          return true
      },
    },
    mounted() {
            
        },
		methods:{
      ...mapMutations(['changeLogin']), 
			onSubmit (values) {
        this.$router.push('/techInfo')
        return
      if (this.phoneStyle) {
        this.$post(this.HOST + '/login', {
            "mobile" : this.mobile,vc: this.code})
            .then((res) =>{
              console.log(res)
              if(res.code == 0){
                console.log(res.data)
                // this.changeLogin({ userToken: res.data });
                localStorage.setItem('userToken', JSON.stringify(res.data))
                 this.$toast('登录成功');
                 this.$router.push('/techInfo')
              }else{
                 this.$toast(res.msg);
              }
             
               
              //  this.$router.push('/techInfo')
            }).catch((error) => {
               this.$toast(error);
            });  
      } else {
        this.$toast('手机号或验证码错误')
      }
    },
    onSendSms () {
      if (this.phoneStyle){
        this.show = true
        this.isSendCode= !this.isSendCode
        this.$post(this.HOST + '/login/vc', {
            "mobile" : this.mobile})
            .then((res) =>{
              if(res.code == 0){
                 this.$toast('信息已发送,请稍等');
              }else{
                 this.$toast(res.msg);
              }
              
            }).catch((error) => {
               this.$toast(error);
            });             
      } else {
          this.$toast("手机格式不正确");
      }
    }
	}
}
</script>

<style>
</style>
