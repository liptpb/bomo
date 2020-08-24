/**
 * 
 * @author: liptpb
 * @date: 2020-08-20 
 */
<template>
  <div>
     <div class='indexAll'>
        <div class='search'>
           <van-search
            shape="round"
            background="transparent"
            placeholder="请输入搜索关键词"
          />
        </div>
        <div class='cusNameInfo'>
           <ul>
             <li class="flexJue">
               <p>顾客编号: 23659865</p>
               <p>顾客:333333</p>
             </li>
             <li>会员级别: 白金会员 0.88折</li>
             <li>电话: 13856896986</li>
             <li>年龄: 35岁</li>
             <li>开卡时间: 2020-07-18</li>
           </ul>
        </div>
        <div class='tabName'>
          <div v-bind:class="{ active: tabShow }"  @click="tabName('a')">
             <span>诊断</span>
            </div>
          <div v-bind:class="{ active: !tabShow }"  @click="tabName('b')"><span>效果反馈</span></div>
        </div>
        <div class='zhenduan' v-show="!tabShow">
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本
                </li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
            </div>
            <div class="border"></div>
          </div>
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本
                </li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
            </div>
            <div class="border"></div>
          </div>
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本
                </li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
            </div>
            <div class="border"></div>
          </div>
        </div>
        <div class='zhenduan' v-show="tabShow">
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
            </div>
            <div class="border"></div>
          </div>
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
            </div>
            <div class="border"></div>
          </div>
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
            </div>
            <div class="border"></div>
          </div>
          <div>
             <div class='zhenduanbox'>
              <ul>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
                 <li><span class='colorH'>自述：</span>
                 五年前的一天，我感觉到左侧面眼皮上，防止跳动 可是根本就没用！后来可是根本就没用，后来，可是根本</li>
              </ul>
            </div>
            <div class='hr'></div>
            <div class='flexJue'>
                <p>治疗师：周康 跟诊：郑娥</p>
                <p>2020-08-18 12:23:20</p>
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
     tabShow: true
    };
  },
  mounted() {

  },
  methods: {
    tabName(id){
      if(id=='a'){
        this.tabShow = true
      }else{
        this.tabShow = false
      }
    }
  },
  created() {

  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang='less'>
.indexAll{
   padding: 0 24px;
   .search{
     padding: 10px 0;
   }
   .cusNameInfo{
     width:690px;
      height:294px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      font-size:24px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
      ul{
        padding: 40px 37px;
        li{
          margin-top: 10px;
        }
        .flexJue{
          margin-top: 0;
          font-size:32px;
         font-weight:bold;
         color:rgba(51,51,51,1);
        }
      }
   }
   .tabName{
       font-size:32px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        display: flex;
        padding: 20px 0;
        div{
          flex: 1;
          text-align: center;
        }
        .active{
          span{
              display: inline-block;
              border-bottom: 1px solid #ff9900;
              color:rgba(255,153,0,1);
          }
        }
   }
   .zhenduan{
     width:690px;
     background:rgba(255,255,255,1);
     border-radius:20px;
     font-size: 24px;
     color:#333333;
     font-family:PingFang SC;
     font-weight:500;
     .zhenduanbox{
       padding: 37px 37px 20px 37px;
       li{
         margin-bottom: 5px;
       }
     }
     .hr{
       padding: 0;
       height:1px;
       background:rgba(244,244,244,1);
     }
     .flexJue{
       padding: 20px 37px;
     }
     .border{
        width:630px;
        height:16px;
        margin-top: 20px;
        background:rgba(255,249,232,1); 
        margin: 0 auto;
      }
   }
}
</style>