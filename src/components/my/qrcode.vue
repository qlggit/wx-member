<template>
  <div class="pt-header height-100-100  back-242" v-if="userInfo">
    <header-component :header-data="{title:'我的二维码'}"></header-component>
    <div class="height-100-100 back-transparent width-100-100 display-table">
      <div>
        <div class="qrcode-content margin-auto text-center position-relative back-white">
          <div class="position-relative height-128 mb-40">
            <img :src="userInfo.headImgUrl" class="border-rad-100 head-ico position-absolute left-0 top-0" alt="">
            <div class="title color-24 fz-30 flex-left pt-20 text-left">
              <div class="mr-10">{{userInfo.nickName}}</div>
              <img :src="userInfo.sex | sexUrlFilter" class="ico-40" alt="">
            </div>
          </div>
          <div class="pt-40 pb-30">
            <canvas v-qrcode="{
          qrcodeUrl:qrcodeUrl,
          width:qrcodeWidth,
          height:qrcodeWidth,
        }" class="margin-auto" :width="qrcodeWidth" :height="qrcodeWidth" :style="{
          width:qrcodeWidth+'px',
          height:qrcodeWidth+'px',
        }"></canvas>
          </div>
          <div class="pt-40 text-center fz-24 color-104">
              扫一扫上面的二维码图案，加我为好友
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/qrcode.js"
  export default routerVue;
</script>
