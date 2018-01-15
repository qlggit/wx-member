<template>
  <div class="pb-footer" v-if="userInfo">
    <div class="head-bg position-relative" >
      <div class="blur-bg position-full position-absolute z-index-1" :style="{
      'background-image':'url('+userInfo.headImgUrl+')'
    }">
      </div>
      <div class="position-full position-absolute z-index-100">
        <div class="my-header text-center border-b-194 position-relative pt-50">
          <div class="text-center head-img border-24 border-rad-100 position-relative margin-auto">
            <div class="lv-ico position-absolute border-rad-100 flex-center back-white">
              <img src="/images/my/lvl.png " alt="">
            </div>
            <img :src="userInfo.headImgUrl | imgUrlFilter" class="head-img margin-auto border-rad-100" alt="">
          </div>
          <div class="pt-20 flex-center pb-26 ">
            <span class="mr-20 fz-34 color-24">{{userInfo.nickName}}</span>
            <img :src="userInfo.sexImg | sexUrlFilter" class="head-ico">
          </div>
          <div class="my-info position-absolute right-0 back-43 color-white flex-center fz-22" v-router-link="'/my/info'">
            <div class="mr-08">会员中心</div>
            <img src="/images/my/right.png" alt="">
          </div>
        </div>
        <div class=" my-qrcode flex-center fz-24 border-b-194">
          <div class="mr-100 text-center" v-router-link="'/my/qrcode'">
            <img src="/images/my/qrcode.png" class="qrcode-ico" alt="">
            <div class="color-104 pt-16">二维码</div>
          </div>
          <div class="text-center">
            <img src="/images/my/sao.png" class="qrcode-ico" v-scan-code="1" alt="">
            <div class="color-104 pt-16">扫一扫</div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-money color-24 text-center back-white border-b-194">
      <div class="fz-40 mb-22">{{userInfo.balance | moneyFilter}}</div>
      <div class="fz-24 ">余额（元）</div>
    </div>
    <div class="mt-20 my-list clearfix text-center mb-20 color-24 back-white">
      <div v-for="item in myList" v-router-link="item.url" class="float-left item" :style="{width:100/myList.length+'%'}">
        <div class="position-relative img mb-22 margin-auto lh-0">
          <div v-if="item.number" :class="item.number>10?'fz-22':'fz-24'" class="num border-rad-100 position-absolute color-white">{{item.number}}</div>
          <img :src="item.ico" alt="" class="width-100-100">
        </div>
        <div class="text fz-28">{{item.name}}</div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/index.js"
  export default routerVue;
</script>
