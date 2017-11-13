<template>
  <div class="pt-header pb-74 height-100-100 back-242">
    <header-component :header-data="{title:'我的订座'}"></header-component>
    <div class="back-transparent height-100-100 pt-20 overflow-scroll-y">
      <div v-for="item in orderList" class="my-order-list back-242 mb-20">
          <div class="pl-24 pr-24">
            <div class="pt-24 pb-24 clearfix fz-26 color-104 border-b-233">
              <div class="float-left">{{item.placeName}}</div>
              <div class="float-right">{{item.statusName}}</div>
            </div>
            <div class="pt-42 pb-42 fz-28 color-24 flex-left border-b-233">
                <div class="width-200">订座</div>
                <div class="width-200">{{item.address}}</div>
                <div class="width-200">￥{{item.price}}</div>
            </div>
          </div>
        <div class="pt-24 pb-24 clearfix pr-26">
          <div class="float-right">
            <div class="btn btn-lt back-24 color-white" v-router-link="'/merchant/product'">继续下单</div>
          </div>
        </div>
      </div>
    </div>
    <div v-router-link=""
         class="position-absolute z-index-1 width-100-100 left-0 bottom-0 fz-30 select-head pl-24 pb-20 color-104 border-t-233 text-center">
      更多操作请前往APP查看
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/seat.js"
  export default routerVue;
</script>
