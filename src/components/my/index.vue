<template>
  <div class="pb-footer" v-if="userInfo">
    <div class="head-bg position-relative" >
      <div class="blur-bg position-full z-index-1" :style="{
      backgroundImage:'url('+userInfo.headImgUrl+')'
    }">
      </div>
      <div class="position-full z-index-100">
        <div class="my-header position-relative">
          <img :src="userInfo.headImgUrl | imgUrlFilter" class="head-img position-absolute border-rad-100" alt="">
          <div>
            <div class="lh-0 mb-10">
              <span class="inline-block fz-34 color-24 text-middle">{{userInfo.nickName}}</span>
              <img :src="userInfo.sexImg | sexUrlFilter" class="inline-block text-middle head-ico ml-inline">
              <img src="/images/my/lvl.png" class="inline-block text-middle head-ico ml-inline">
            </div>
            <div class="lh-0 mb-30">
              <img src="/images/my/phone.png" class="phone-ico mr-08 text-middle" alt="">
              <span class="phone-num fz-24 color-104 text-middle inline-block ml-inline">{{userInfo.phone || '13312312312'}}</span>
            </div>
            <div class="fz-26 color-24">
              这是签名
            </div>
          </div>
        </div>
        <div class="my-money color-24 text-center">
          <div class="fz-40 mb-22">{{userInfo.money | moneyFilter}}</div>
          <div class="fz-24 ">余额（元）</div>
        </div>
      </div>
    </div>
    <div class="mt-20 my-list clearfix text-center mb-20 color-24">
      <div v-for="item in myList" v-router-link="item.url" class="float-left item" :style="{width:100/myList.length+'%'}">
        <div class="position-relative img mb-22 margin-auto lh-0">
          <div v-if="item.number" :class="item.number>10?'fz-22':'fz-24'" class="num border-rad-100 position-absolute color-white">{{item.number}}</div>
          <img :src="item.ico" alt="" class="width-100-100">
        </div>
        <div class="text fz-28">{{item.name}}</div>
      </div>
    </div>
    <div class="mt-20 pt-50 pb-50 fz-30 pl-24 pr-26 flex-between" v-router-link="'/my/qrcode'">
      <div class="color-24">我的二维码</div>
      <div class="ico-right"></div>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/index.js"
  export default routerVue;
</script>
