<template>
  <div class="height-100-100 width-100-100 pay-content pt-header">
    <header-component :header-data="{title:name}"></header-component>
    <div class="pt-20">
      <div class="back-242">
        <div class="fz-30 color-24 pt-26 pb-26 pl-24 ">
            订购详情
        </div>
        <div v-for="item in selectedList" class="pay-item pr-24">
          <img :src="item.img" class="img border-rad-100" alt="">
          <div class="clearfix">
            <div class="text float-left">{{item.name}}</div>
            <div class="num float-left">数量:{{item.number}}</div>
            <div class="price float-right">￥{{item.price*item.number}}</div>
          </div>
        </div>
        <div class="pl-24 pr-24 clearfix height-90 fz-30 color-24 pt-30 pb-30">
          <div class="float-left">合计金额：</div>
          <div class="float-right">${{allPrice}}</div>
        </div>
      </div>
      <div class="mt-66 height-88 pt-30 pb-30 fz-28 pl-24 back-248">
          <span class="mr-20 color-104">订座信息：</span><span class="color-24">订座地址地址。。</span>
      </div>
      <div class="mt-280 pl-24 pr-24 pb-150">
          <div class="btn back-24 color-white">确认支付</div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/pay.js"
  export default routerVue;
</script>
