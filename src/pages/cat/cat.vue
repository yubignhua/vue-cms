<template>

  <div class="cat" >
    <div style="margin-top: 40px;"></div>
    <div class="cat_one" @click="giveName('赵四',$event)">绑定点击事件2342343</div>
    <div @click="giveName()">v-on:click 简写 @click=""</div>
    <div class="md" :class="{ active: isActive }"> 绑定 class</div>
    <div class="md" :class="{ active: isActive }"> v-bind 简写 :class="" </div>
    <button @click="greet">Greet</button>
    click="counter += 1": 引号没可以进行计算<br>
    <button class="cat_one" @click="counter += 1">加1</button>
    <button class="cat_one" @click="remove()">减1  </button>:{{counter}}
    <br>
    <div class="team_list">团队列表:</div>
    <Scroll>
        <div class="m-wrapper" v-for="item in 50" style="height: 59px;">hahahhahahahhaahahaha</div>
    </Scroll>




  </div>
</template>


<script>

  import Scroll from '../../components/scroll'
  export default{
    // 将引用的组件应用到本组模板内
    components:{Scroll},

    // 定义组件名称
    name: 'cat',
    /**
     *定义初始状态
     */
    data() {
      return {

        name: 'yubh',
        school: 'dhlg',
        greeting: 'hello world',
        isActive: true,
        counter: 0,
        cityname: 'cat',
        show: false,
        show1: false,
        menus1: {
          menu1: 'Share to friends',
          menu2: 'Share to timeline',
        },
      };
    },
    // 方法属性

    methods: {
      changeName() {
        alert('234234');
        this.CHANGENAMW('昆明儿童医院');
      },
      greet() {},
      showToast() {
        this.ADD_DATALIST({ value: 'hhahah' });
        this.$vux.toast.show({
          text: 'Loading',
        });
      },
      remove() {
        this.counter--;
      },
      onHide() {
        console.log('on hide');
      },
      onShow() {
        console.log('on show');
      },
      click(key) {
        console.log(key);
      },
    },

    // 计算属性
    computed: {
      showAlert() {
        return 123;
      }
    },

    /**
     * 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
     * componentDidMount
     */
    mounted() {
      const that = this;
    },


    // 设置组件接收的属性
    props: ['signinUp', 'headTitle', 'goBack'],
    /**
     * 在实例初始化之后，
     * 数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     */
    beforeCreate() {
      // console.log('---------beforeCreate:')
    },
    /**
     * 数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
     * 然而，挂载阶段还没开始，$el 属性目前不可见
     */
    created() {
      // console.log('---------created')
    },
    /**
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。
     * componentWillMount
     */
    beforeMount() { //
      // console.log('---------beforeMont')
    },

    /**
     * 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM'
     * componentWillUpdate
     */
    beforeUpdate() {
      // console.log('---------beforeUpdate')
    },

    /**
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作
     * componentDidUpdate
     */
    updated() {

      // console.log('---------update:')
    },
    beforeDestroy() {},
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  //引入 css 样式
  @import '../../assets/style/mixin.scss';
  .cat{
    position: absolute;
    z-index: 80;
    width: 100%;
    top:0;
    bottom:0;
    background: #ffffff;
    .cat_one{
      color: red;
    }
    .team_list{
        display: inline-block;
        //引入 sass @mixin 定义
        @include wh(rem(100), rem(40));
       border:solid 1px #3190e8;
    }

  }
</style>
