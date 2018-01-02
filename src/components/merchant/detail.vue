<template>
  <div v-if="name" class=" " :class="isServer?'':'pt-header'">
    <header-component v-if="!isServer" :header-data="{title:name}"></header-component>
    <div class="back-242">
      <div class="pt-20 pb-40 text-center">
        <img :src="headFile" class="width-690 swiper-img margin-auto" alt="">
      </div>
      <div class="position-relative pl-24 pr-24 pb-40">
        <div class="merchant-title color-24"><span>{{name}}</span><wy-star :star-count="lvl"></wy-star></div>
        <div class="merchant-address color-104 "><span class="mr-20">{{address}}</span><img src="/images/location.png" class="location-ico" alt=""></div>
        <div v-if="0" class="btn btn-sm back-24 color-white position-absolute merchant-talk-btn">聊天室</div>
      </div>
    </div>
    <div class="mt-20 pl-24 pr-24 pt-40 pb-40 color-24 fz-30 lh-35 back-242">{{remark}}</div>
    <div v-if="activity&&activity.length" class="pt-40 pb-40 pl-24 pr-24 back-242 mt-10">
      <div class="fz-28 color-24 mb-20">酒吧活动</div>
      <wy-marquee :marquee-data="{list:activity,itemWidth:330,itemHeight:430,height:472,margin:24,fontSize:22,color:'#131313',}"></wy-marquee>
    </div>
    <div v-if="showInfo&&showInfo.length" class="pt-40 pb-40 pl-24 pr-24 mt-20 back-242">
      <div class="fz-28 color-24 mb-20">环境展示</div>
      <div class="overflow-scroll-x">
        <div :style="{width:showInfo.length * 2.36+'rem',height:2.3+'rem'}" class="flex-left">
          <div v-for="item in showInfo">
            <img v-if="item.fileType === 'img'"  :src="item.filePath" style="width:2.3rem;height:2.3rem;margin-right: .06rem;" alt="">
            <video v-else  :src="item.filePath" style="width:2.3rem;height:2.3rem;margin-right: .06rem;" controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
     <wy-buy-button :buy-data="{merchantId:merchantId,notBuy:1,isServer:isServer}"></wy-buy-button>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/detail.js"
  export default routerVue;
</script>
