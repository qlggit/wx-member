<template>
  <div class="pt-84 pb-102">
    <header-component :header-data="{title:title,notBack:1}">
        <city-select slot="city-select" :city-select-data="{title:'重庆'}"></city-select>
      <img slot="search" src="/images/search.png" class="right-ico" alt="">
    </header-component>
    <div class="head-type-menu" >
      <div v-for="(item, index) in headMenu"
           @click="headMenuClick(index)"
           class="item"
           :class="headActiveIndex===index?'active':''">{{item}}</div>
    </div>
    <div class="swiper-content">
      <wy-swiper :swiper-data="{list:swiperList}"></wy-swiper>
    </div>
    <div class="club-item-content">
      <div v-for="item in clubList" class="club-item-list">
        <div class="shadow-bottom-auto">
          <img :src="item.img" alt="" class="">
        </div>
        <div class="title">{{item.name}}</div>
        <div class="text clearfix">
          <div class="float-left color-104">{{item.address}}</div>
          <div class="float-right">
            <div class="ico inline-block text-middle"></div>
            <div class="inline-block text-middle fz-24 color-24" >距离我{{item.distance}}</div>
          </div>
        </div>
      </div>
    </div>
    <footer-component>

    </footer-component>
  </div>
</template>
<script>
  import routerVue from "../../js/page/home/index.js"
  export default routerVue;
</script>
