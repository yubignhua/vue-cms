<template>
  <div class="test2">
    <div>{{a}}</div>
    <el-button type="primary" @click="changeA">主要按钮</el-button>
  </div>
</template>

<script>
	//import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
	//import { mapState,mapMutations,mapActions } from 'vuex'
	//import {ToastPlugin,AlertPlugin,XHeader,Toast,Actionsheet,XButton,Group, Cell,XSwitch} from 'vux'
	//将 vux toastPlugin 对象注入 vue组件 可以调用 toastPlugin相关方法 => this.$vux.show()
	//Vue.use(ToastPlugin);
	//Vue.use(AlertPlugin);
	export default {
		//components: {Toast, XHeader,},
		//mixins: [MixinSetInterval, MixinRouterState],
		//props: ['goBack'],
		data(){
			return {
				a:243
      }
		},
		methods: {
			changeA(){
				setTimeout(()=>{
					this.a = '武瑞'

        },1000)
      }
    },
		//computed: {},
		created () {},
		mounted(){
			//this.changeA();
    },
		//updated () {},
	};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/style/mixin.scss';



</style>
