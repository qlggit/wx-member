<template>
  <div class="full-window back-black-08"
  :style="{zIndex:zIndex-1}">
    <div class="display-table full-window"
      :style="{zIndex:zIndex}"
    >
      <div>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  require('swiper/dist/css/swiper.css');
  export default {
    name: 'window',
    props:['windowData'],
    data() {
      return {
        zIndex:this.windowData.zIndex || 800
      }
    },

  }
</script>
