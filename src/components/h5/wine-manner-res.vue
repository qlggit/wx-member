<template>
  <div  class="position-relative height-100-100 text-center">
      <img v-if="showImgUrl" class="width-100-100 height-100-100" :src="showImgUrl" alt=""/>
      <canvas  v-ele-insert width="750" height="1210" class="width-100-100 height-100-100 back-242"></canvas>
      <div v-if="0">
        <div class="main">
          <div class="pl-10 flex-left mb-100">
            <img :src="userInfo.headImg" class="head-img border-rad-100" alt="">
            <div class="pl-30 color-24 fz-50">{{resData[mannerRes].name}}</div>
          </div>
          <div class="pt-28">
            <img :src="resData[mannerRes].img" class="width-100-100" alt="">
          </div>
        </div>
        <div class="position-absolute footer flex-between width-100-100">
          <div class="fz-30 color-104">
            <div class="text-underline">撩 玩 嗨 赚 &nbsp;&nbsp;全在手</div>
            <div class="pt-20">www.yukew.com</div>
          </div>
          <img src="/images/h5/erweima.png" class="erweima" alt="">
        </div>
      </div>
  </div>
</template>
<script>
  import routerVue from "../../js/h5/wine-manner-res.js"
  export default routerVue;
</script>
