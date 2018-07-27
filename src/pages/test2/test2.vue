<template>
  <div class="test2">
    <div>{{a}}</div>
    <el-button type="primary" @click="changeA">主要按钮</el-button>
    <BaseInput :title="a" @show-name="showName"></BaseInput>
  </div>
</template>

<script>
	//import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
	//import { mapState,mapMutations,mapActions } from 'vuex'
	import BaseInput from '../../components/baseInput.vue'
	export default {
		components: {BaseInput},
		//mixins: [MixinSetInterval, MixinRouterState],
		data(){
			return {
        b:'11111111',
        a:`skfskfdksdfks`,
      }
		},
		methods: {
			changeA(){
				setTimeout(()=>{
					this.a = '武瑞'

        },1000)
      },
      showName(value){
				this.a = value
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
