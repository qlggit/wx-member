<template>
  <div class="pt-header pb-footer height-100-100 back-248" v-scroll-box="90">
    <header-component :header-data="{title:title,notBack:1}">
        <city-select slot="city-select" :city-select-data="{title:'重庆'}"></city-select>
      <img slot="search" src="/images/search.png" @click="showClubSearch" class="right-ico" alt="">
    </header-component>
    <wy-club-search v-if="clubSearchAble"></wy-club-search>
    <div class="pt-340 position-relative height-100-100">
      <div class="width-100-100 position-absolute left-0 top-0">
        <div class="head-type-menu" >
          <div v-for="(item, index) in headMenu"
               @click="headMenuClick(index)"
               class="item"
               :class="headActiveIndex===index?'active':''">{{item.name}}</div>
        </div>
        <div class="swiper-content">
          <wy-swiper :swiper-data="{list:swiperList}"></wy-swiper>
        </div>
      </div>
      <div class="club-item-content overflow-scroll-y height-100-100" v-scroll-box="340" v-if="clubList">
        <div v-for="item in clubList" class="club-item-list">
          <div class="shadow-bottom-auto" v-merchant-detail="item.supplierId">
            <img :src="item.img | imgUrlFilter" alt="" class="">
          </div>
          <div class="title">{{item.supplierName}}</div>
          <div class="text clearfix mt-20">
            <div class="float-left color-104">{{item.supplierAddr}}</div>
            <div class="float-right lh-0">
              <div class="ico inline-block text-middle location-ico"></div>
              <div class="inline-block text-middle fz-24 color-24" >距离我{{item.distance}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<script>
  import routerVue from "../../js/page/home/index.js"
  export default routerVue;
</script>
