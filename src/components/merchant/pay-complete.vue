<template>
  <div class="height-100-100 width-100-100 pay-content pt-header">
    <header-component :header-data="{title:name,backUrl:'/'}"></header-component>
    <div class="pt-220 text-center">
      <img :src="payImg" class="width-284" alt="">
      <div class="pt-70 color-24 fz-32">{{name}}!</div>
      <div class="pt-70 flex-center ">

      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/pay-complete.js"
  export default routerVue;
</script>
