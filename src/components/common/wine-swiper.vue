<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide>
      <div class="height-100-100 position-relative wine-main">
        <div class="select-head pl-24 pb-20 color-104 fz-30 position-absolute width-100-100 left-0 top-0 z-index-100">
          {{swiperData.placeList[swiperData.placeIndex].name}}
          <div class="select-ico"></div>
          <select class="opacity-0 position-full z-index-100" @change="selectPlace(0)"></select>
        </div>
        <div class="height-100-100 overflow-scroll">
          <div v-for="item in swiperData.wineList" class="wine-list flex-left fz-32 color-24">
            <div class="width-40-100">{{item.name}}</div>
            <div class="width-40-100 text-center">
              <span class="fz-24 color-104">现存：</span><span>{{item.number}}</span><span class="fz-24 color-104"></span>
            </div>
          </div>
        </div>
        <div v-router-link=""
             class="position-absolute z-index-1 width-100-100 left-0 bottom-0 fz-30 select-head pl-24 pb-20 color-104">
          请前往APP继续操作
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="height-100-100">
        <div class="select-head pl-24 pb-20">
          {{swiperData.autoPlace.name}}
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="height-100-100">
        <div class="select-head pl-24 pb-20">
          {{swiperData.autoPlace.name}}
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
  require('swiper/dist/css/swiper.css');
  export default {
    name: 'wine-swiper',
    props:['swiperData'],
    data() {
      return {
        swiperData:this.swiperData,
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          autoplay: 0,
        }
      }
    },

  }
</script>
