<template>
  <div id="app" class="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>
<style lang="scss">
  a{
    text-decoration: none;
  }
  .app{
    font-family: 'PingFangSC-Light';
    font-size: 14px;
    color: #323232;
    background: #fff;
  }
</style>
