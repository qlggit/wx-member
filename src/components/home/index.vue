<template>
  <div class="pt-header-home pb-footer height-100-100 back-248" v-scroll-box="90">
    <header-component :header-data="{title:title,notBack:1}">
        <city-select v-if="selectedCity" slot="city-select" :city-select-data="{title:selectedCity}"></city-select>
      <img slot="search" src="/images/search.png" @click="showClubSearch" class="right-ico" alt="">
    </header-component>
    <wy-club-search v-if="clubSearchAble"></wy-club-search>
    <div class="width-100-100 pt-header position-absolute top-0 left-0">
      <div class="head-type-menu" >
        <div v-for="(item, index) in headMenu"
             @click="headMenuClick(index)"
             class="item"
             :class="headActiveIndex===index?'active':''">{{item.name}}</div>
      </div>
    </div>
    <div class=" position-relative height-100-100 overflow-scroll-y" v-scroll-box="">
      <div class=" ">
        <div class="swiper-content">
          <wy-swiper :swiper-data="{list:swiperList}"></wy-swiper>
        </div>
      </div>
      <div class="club-item-content height-100-100"  v-if="clubList">
        <div v-for="item in clubList" class="club-item-list">
          <div class="shadow-bottom-auto" v-merchant-detail="item.supplierId">
            <img :src="item.headFile | imgUrlFilter" alt="" class="">
          </div>
          <div class="title">{{item.supplierName}}</div>
          <div class="text clearfix mt-20">
            <div class="float-left color-104">{{item.supplierAddr}}</div>
            <div class="float-right lh-0" v-open-location="{
              latitude:item.gpsDimension,
              longitude :item.gpsLongitude,
              name:item.supplierName,
              address:item.supplierAddr,
            }">
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
