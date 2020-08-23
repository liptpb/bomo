<template>
  <div class="login-box">
      <div class="login-top"></div>
      <div class="login-content">
          <div class="login-item flex alignCenter">
              <div class="item-left">+86</div>
              <div class="input-box flex_1 flex alignCenter">
                    <input class="input" type="number" @input="mobile=mobile.slice(0,11)" v-model="mobile" @blur="$blur" placeholder="请输入手机号">
              </div>
              <div class="item-right">{{waitTime == 60 ? '发送验证码' : `${waitTime}s`}}</div>
          </div>
           <div class="login-item flex alignCenter">
              <div class="item-left">验证码</div>
              <div class="input-box flex_1 flex alignCenter">
                    <input class="input" type="number" v-model="code" @blur="$blur" placeholder="请输入验证码">
              </div>
          </div>
          <div class="login-btn">
              <van-button color="#FF9900" :round="true" size="large">登录</van-button>
          </div>
      </div>
  </div>
</template>

<script>
    const mobileReg= /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

    export default {
        name: 'Login',
        data() {
            return {
                mobile: '',
                code: '',
                timer: null,
                waitTime: 60,
                repeatText: '',
            }
        }
    };
</script>

<style lang="less" scoped>
    .login-box {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        .login-top {
            width: 100%;
            height: 241px;
            background: url("./img/logo@2x.png") no-repeat center;
            background-size: 102px auto;
            background-color: rgba(255, 154, 0, 1);
            border-radius: 0 0 50% 50%;
        }
        .login-content {
            padding: 110px 43px 0;
            height: calc(100% - 351px);
            .login-item {
                height: 40px;
                border-bottom: 2px solid #ECECEC;
                .item-left {
                    width: 45px;
                    color: #666666;
                    font-size: 15px;
                    font-weight: 600;
                    margin-right: 25px;
                }
                .input-box {
                    input {
                        width: 100%;
                        font-size: 15px;
                        color: #666666;
                    }
                }
                .item-right {
                    color: #C8B29C;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                }
            }
            .login-item:nth-child(1) {
                margin-bottom: 35px;
            }
            .login-btn {
                margin-top: 47px;
            }
        }
    }
</style>
