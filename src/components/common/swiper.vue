<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in swiperData.list">
        <div class="shadow-bottom-auto">
          <img :src="item" class="swiper-img " alt="">
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

  </div>
</template>

<script>
  require('swiper/dist/css/swiper.css');
  // swiper options example:
  export default {
    name: 'carrousel',
    props:['swiperData'],
    data() {
      return {
        swiperData:this.swiperData,
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          autoplay: 3000,
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',//上一张
          nextButton:'.swiper-button-next',//下一张
          mousewheelControl : true,
        }
      }
    },

  }
</script>
