<template>
  <div v-if="name" class="pt-header ">
    <header-component :header-data="{title:name}"></header-component>
    <div class="back-242">
      <div class="swiper-content pt-20 pb-40">
        <wy-swiper :swiper-data="{list:headerBanner}"></wy-swiper>
      </div>
      <div class="position-relative pl-24 pr-24 pb-40">
        <div class="merchant-title color-24"><span>{{name}}</span><wy-star :star-count="lvl"></wy-star></div>
        <div class="merchant-address mt-20 color-104"><span>{{address}}</span><img src="/images/location.png" class="" alt=""></div>
        <div class="btn btn-sm back-24 color-white position-absolute merchant-talk-btn">聊天室</div>
      </div>
    </div>
    <div class="mt-20 pl-24 pr-24 pt-40 pb-40 color-24 fz-30 lh-35 back-242">{{remark}}</div>
    <div v-if="activity&&activity.length" class="pt-40 pb-40 pl-24 pr-24 back-242 mt-10">
      <div class="fz-28 color-24 mb-20">酒吧活动</div>
      <wy-marquee :marquee-data="{list:activity,itemWidth:330,itemHeight:430,height:472,margin:24,fontSize:22,color:'#131313',}"></wy-marquee>
    </div>
    <div v-if="showInfo&&showInfo.length" class="pt-40 pb-40 pl-24 pr-24 mt-20 back-242">
      <div class="fz-28 color-24 mb-20">环境展示</div>
      <wy-marquee :marquee-data="{list:showInfo,itemWidth:320,itemHeight:280,height:280,margin:8}"></wy-marquee>
    </div>
     <wy-buy-button :buy-data="{merchantId:merchantId}"></wy-buy-button>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/detail.js"
  export default routerVue;
</script>
