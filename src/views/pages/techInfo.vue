/**
* @author: liptpb
* @date: 2020/6/18 20:39
* @description：techInfo
* @update: 2020/6/18 20:39
*/
<template>
    <div>
        <div class="infoHeader">
          <div class="info-cell">
            <div class="info-cell-wrapper">
              <div class="info-cell-title flex">
                <img slot="icon" src="../../assets/logo.png" width="40" height="40">
                <div class="info-cell-imgspan">
                  <div>{{cumInfo.cusName}}</div>
                  <div>{{cumInfo.levelName}}</div>
                  <div>{{cumInfo.cityName}}&nbsp;&nbsp; {{cumInfo.hobby}}</div>
                </div>
              </div>
              <div class="info-cell-right font28">
                今日收入<span>{{cumInfo.total}}元</span>
              </div>
            </div>
          </div>
          <div class="info-cell">
            <div class="info-cell-wrapper">
              <div class="info-cell-title font28">
                {{cumInfo.weddingDay}}&nbsp;&nbsp;星期六 &nbsp;&nbsp;处暑
              </div>
              <div class="info-cell-right">

              </div>
            </div>
          </div>
        </div>
        <mt-cell title="待服务" is-link>
         <span style="color: green">已完成订单</span>
        </mt-cell>

      <!-- navbar -->
      <mt-navbar class="page-part borTop" v-model="selected">
        <mt-tab-item id="1">今日</mt-tab-item>
        <mt-tab-item id="2">明日</mt-tab-item>
        <mt-tab-item id="3">全部</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="info-cell bgfff borTop">
            <div class="info-cell-wrapper">
              <div class="info-cell-title flex">
                <img slot="icon" src="../../assets/logo.png" width="40" height="40">
                <div class="color2" style="flex: 2 1 auto;">
                  <div class="info-cell-wrapper linHight40">
                    <div class="info-cell-title color1 font28">
                      1医生
                    </div>
                    <div class="info-cell-right">

                    </div>
                  </div>
                  <div class="info-cell-wrapper borTop linHight20">
                    <div class="info-cell-title font28">
                      服务时间：<span class="color1">2010-22-22</span>
                    </div>
                    <div class="info-cell-right">

                    </div>
                  </div>
                  <div class="info-cell-wrapper linHight20">
                    <div class="info-cell-title font28">
                      服务项目：<span class="color1">针灸</span>
                    </div>
                    <div class="info-cell-right color3 font28">
                       *1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="info-cell bgfff borTop">
            <div class="info-cell-wrapper">
              <div class="info-cell-title flex">
                <img slot="icon" src="../../assets/logo.png" width="40" height="40">
                <div class="color2" style="flex: 2 1 auto;">
                  <div class="info-cell-wrapper linHight40">
                    <div class="info-cell-title color1">
                      2医生
                    </div>
                    <div class="info-cell-right">

                    </div>
                  </div>
                  <div class="info-cell-wrapper borTop linHight20">
                    <div class="info-cell-title">
                      服务时间：<span class="color1">2010-22-22</span>
                    </div>
                    <div class="info-cell-right">

                    </div>
                  </div>
                  <div class="info-cell-wrapper linHight20">
                    <div class="info-cell-title">
                      服务项目：<span class="color1">针灸</span>
                    </div>
                    <div class="info-cell-right color3">
                      *1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="info-cell bgfff borTop">
            <div class="info-cell-wrapper">
              <div class="info-cell-title flex">
                <img slot="icon" src="../../assets/logo.png" width="40" height="40">
                <div class="color2" style="flex: 2 1 auto;">
                  <div class="info-cell-wrapper linHight40">
                    <div class="info-cell-title color1">
                      3医生
                    </div>
                    <div class="info-cell-right">

                    </div>
                  </div>
                  <div class="info-cell-wrapper borTop linHight20">
                    <div class="info-cell-title">
                      服务时间：<span class="color1">2010-22-22</span>
                    </div>
                    <div class="info-cell-right">

                    </div>
                  </div>
                  <div class="info-cell-wrapper linHight20">
                    <div class="info-cell-title">
                      服务项目：<span class="color1">针灸</span>
                    </div>
                    <div class="info-cell-right color3">
                      *1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <mt-cell title="产品/项目"  class="bg3" style="margin-top: 40px">
        <span>金额/提成</span>
      </mt-cell>
      <mt-cell title="针灸" label="2020-22-22 13:23:23">
        <span style="color: green">280(元)/280(元)</span>
      </mt-cell>
    </div>
</template>
<script>
    export default {
        name: 'techInfo',
        data() {
            return {
              selected: '1',
              cumInfo:{}
            }
        },
        mounted() {
        },
        methods: {
            function() {

            }
        },
        created() {
          debugger
          this.$get(this.HOST + '/index', {
            
            }).then((res) =>{
                console.log(res)
              }).catch(function (error) {
                  console.log(error);
              });
        },
        watch: {
            cityName: {
                handler(newName, oldName) {
                },
                deep: true,
                immediate: true
            }
        },
        computed: {
            functio(arr) {
                return ''
            }
        }
    }
</script>
<style scoped>
  .infoHeader{
    width: 100%;
    height: 150px;
    background: #3ccecb;
    padding: 20px 0;
  }
  .info-cell{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    display: block;
    overflow: hidden;
    position: relative;
    color:#fff
  }
  .info-cell-wrapper{
    /*background-image:-webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
    /*background-image:linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
  }
  .info-cell-title{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .info-cell-text{
    vertical-align: middle;
  }
  .info-cell-wrapper img {
    vertical-align: middle;
    align-items: center;
    border-radius: 50%;
    border:1px solid #fff;
    margin: 10px 10px 0 0px;
  }
  .info-cell-imgspan div{
    margin-top: 10px;
    font-size: 28px;
  }
  .info-cell-right span{
    font-size: 36px;
    font-weight: 800;
  }
  .font28{
    font-size: 28px;
  }
</style>
