<template>
  <div class='saech'>
		<!-- vant搜索 -->
		<van-search  @change="onSearch" autofocus shape="round" v-model="kw"  :placeholder= placeholder>
			<template #left>
				<van-icon @click="searchTs()" style="margin-right: -36px;" size="22px" name="arrow-left" />
			</template>
			<!-- <template #action>
				<van-button @click="onSearch" size="small" type="danger" style="border-radius: 5px; font-size: 14px;">搜索</van-button>
			</template> -->
		</van-search>
		<!-- 搜索历史 -->
		<!-- <div v-show="isShow">
			<div class="search-host">
				<span>搜索记录：</span>
				<van-icon name="delete" @click="del"/>
			</div>
			
			<div> -->
				<!-- <van-tag v-for="(item,index) in kwList" @click="searchTs(item)" style="margin: 5px;">{{item}}</van-tag> -->
                <!-- <van-tag  v-for="(item, index) in kwList" @click="searchTs(item)" :key="index" style="margin: 5px;">{{item}}</van-tag>
			</div>
		</div>
		 -->
		<!-- 搜索提示 -->
		<van-cell-group>
		  <van-cell v-for="(item, index) in showList"  :key="index"
					:title="item.cusName"  :value="item.mobile"
					@click="searchTs(item)"/>
		</van-cell-group>

  </div>
</template>

<script>
export default {
	data(){
		return{
			kw:'',
			isShow:true,
			list:[], //所有数据
			showList:[], //搜索提示数据
			kwList:[] //搜索记录
		}
	},
	props: {
		searchtype: {
			type: String,                
			default:""     
		},
		placeholder:{
			type: String,                
			default:"请搜索" 
		}
    },
	created() { //初始化保存
		let kwlist = localStorage.kwList
		if(kwlist){
			this.kwList = JSON.parse(kwlist)
		}
	},
	mounted() {
		this.$get(this.HOST + '/cusappt/'+this.searchtype+'?params='+this.kw+'&page=1&isDel=0',{}).then((res) =>{
		if(this.searchtype == 'item'){
			res = res.map(v=>{return {cusName: v.itemName,mobile:v.originalPrice,itemName: v.itemName,id:v.id}})
		}
		if(this.searchtype == 'emp'){
			res = res.map(v=>{return {cusName: v.empName,mobile:v.mobile,empName: v.empName,id:v.id}})
		}
		this.showList  = res
		}).catch(function (error) {
			console.log(error);
		});
	},
	methods:{
		back(){ //返回
			this.$router.push({
				path:'/'
			})
		},
		// onInput(){ //搜索提示
		// 	this.showList = []
			
		// 	this.list.map(item=>{
		// 		if(item.title.includes(this.kw)){
		// 			this.showList.push(item)
		// 		}
		// 	})
			
		// 	if(this.kw.trim() == ''){ //显示或隐藏搜索提示
		// 		this.isShow = true
		// 	}else{
		// 		this.isShow = false
		// 	}
		// },
		searchTs(item){ //点击搜索提示或搜索记录，展示对应商品
			// this.$router.push({
			// 	path:'/showlist',
			// 	query:{
			// 		kw:title
			// 	}
			// })
			
			// if(!this.kwList.includes(title)){ //不会重复添加相同搜索记录
			// 	this.kwList.push(title)
			// 	localStorage.kwList = JSON.stringify(this.kwList)
			// }
			this.kw =''
			this.showList  = []
			this.$emit('getdata',item);
		},
		onSearch(){ //确定搜索或点击搜索时触发
			if(this.kw.trim() == ''){ //判断内容是否为空
				return
            }
            
				this.$get(this.HOST + '/cusappt/'+this.searchtype+'?params='+this.kw+'&page=1&isDel=0',{}).then((res) =>{
				if(this.searchtype == 'item'){
                  res = res.map(v=>{return {cusName: v.itemName,mobile:v.originalPrice,itemName: v.itemName,id:v.id}})
				}
				if(this.searchtype == 'emp'){
                  res = res.map(v=>{return {cusName: v.empName,mobile:v.mobile,empName: v.empName,id:v.id}})
				}
				this.showList  = res
				}).catch(function (error) {
					console.log(error);
				});
			
			
			
		},
		del(){ //删除搜索记录
			this.$dialog.confirm({
			  message: '确定要清空搜索记录吗？',
			})
			  .then(() => {
			    this.kwList = []
				localStorage.kwList = JSON.stringify(this.kwList)
			  })
			  .catch(() => {
			    // on cancel
			  });
		}
		
	},
    watch:{
      searchtype(val) {
        
      }
	}
}
</script>

<style scoped lang='less' >
/deep/ .van-search__content{
//   padding: 10px;
  background:rgba(255,255,255,1);
}
/deep/ .van-search__content--round {
    border-radius: 26.64rem;
    background: rgba(255,255,255,1);
}
/deep/ .van-icon-arrow-left::before {
     content: ''; 
}
.saech{
    position: relative;
	padding: 30px 15px 15px 15px;
	background-color: #F4F4F4;
   /deep/ .van-search{
      width:600px;
        height:60px;
		// background:rgba(255,255,255,1);
		background:#F4F4F4;
        border-radius:30px;
        margin: 0px auto;
    }
    /deep/ .van-cell-group{
		background-color: #FF9A00;
        margin-top: 30px;
       /deep/ .van-cell{
       font-size:24px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(52,52,52,1);
        line-height: 50px;
       }
    }
  .search-host{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	box-sizing: border-box;
  }
}

</style>
