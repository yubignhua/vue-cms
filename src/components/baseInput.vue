<template>
    <div class="base-input">
     标题 : {{title}}
      <input v-model="value" type="text"/>
      <button @click="giveName()">发送</button>
    </div>
</template>

<script>
	export default {
		//components: {Toast, XHeader,},
		//mixins: [MixinSetInterval, MixinRouterState],
		props: {
			title:{
				type:String,
				default:'hahah'
      }
    },
		data(){
			return {
				value:'234324'
      }
		},
    watch:{
			value:function(){
        this.giveName();
      },
    },
		methods: {
			giveName(){
				this.$emit('show-name',this.value)
      }
    },
		//computed: {},
		//created () {},
		//mounted(){},
		//updated () {},
	};
</script>
<style lang="scss" rel="stylesheet/scss">
    // @import '../../assets/style/mixin.scss';


</style>
