<template>
  <div class="pt-header pb-74 height-100-100 back-242">
    <header-component :header-data="{title:'我的订单'}"></header-component>
    <div class="back-transparent height-100-100 pt-20 overflow-scroll-y">
      <div v-if="orderList">
        <div v-if="orderList.length === 0" class="color-104 pt-20 text-center fz-30">
          暂无未处理订单
        </div>
        <div v-for="(item,index) in orderList" class="my-order-list back-242 mb-20">
          <div class="pl-24 pr-24">
            <div class="pt-24 pb-24 clearfix fz-26 color-104 border-b-233">
              <div class="float-left">{{item.placeName}}</div>
              <div v-if="item.diffTime" class="float-right">失效时间:<span v-diff-time="item.diffTime"></span></div>
              <div v-else class="float-right">{{item.statusName}}</div>
            </div>
          </div>
          <div v-for="smItem in item.wineList" class="pt-20 pb-20 item-list position-relative back-233">
            <img :src="smItem.img" class="img border-rad-5 position-absolute" alt="">
            <div class="content ">
              <div class="pt-20 clearfix color-24 fz-30 pr-30">
                <div class="float-left">{{smItem.name}}</div>
                <div class="float-right">￥{{smItem.price | moneyFilter}}</div>
              </div>
              <div class="pt-28 clearfix color-104 fz-30 pr-30">
                <div class="float-left">{{smItem.remark}}</div>
                <div class="float-right">x{{smItem.number}}</div>
              </div>
            </div>
          </div>
          <div v-if="item.showMore" class="pt-20 pb-20 flex-center" @click="showMoreWine(index)">
            <div class="fz-24 color-104">展示更多</div>
            <img src="/images/ico/down.png" class="ml-10 width-22 height-14" alt="">
          </div>
          <div class="pl-24 pr-24 ">
            <div class="pt-20 pb-20 border-b-233 color-24 fz-26 flex-between">
              <span v-if="item.deuceMoney">抵扣金额：<span class="mr-20"></span> <span>￥{{item.deuceMoney| moneyFilter}}</span></span>
              <span v-else>&nbsp;</span>
              <span>{{item.payStatus==='ALREADY_PAY'?'付款':'商品'}}金额：<span class="mr-20"></span> <span>￥{{(item.amount - (item.deuceMoney || 0))| moneyFilter}}</span></span>
            </div>
          </div>
          <div class="pt-24 pb-24 flex-right pr-26 width-auto">
              <div
                   class="btn btn-lt back-24 btn-auto color-white mr-20 "
                   v-router-link="'/merchant/product?seatId='+item.seatId+'&seatOrderNo='+item.seatOrderNo+'&supplierId='+item.supplierId">继续购买</div>
              <div v-if="item.payStatus !== 'ALREADY_PAY'"
                   class="btn btn-lt back-24 btn-auto color-white mr-20"
                   v-router-link="'/merchant/pay?seatId='+item.seatId+'&seatOrderNo='+item.seatOrderNo+'&orderNo='+item.orderNo">去支付</div>
              <div v-if="item.payStatus !== 'ALREADY_PAY'"
                   class="btn btn-lt back-24 btn-auto color-white"
                   @click="cancelOrder(item.orderNo)">取消订单</div>
            </div>
        </div>
      </div>
    </div>
    <div v-app-download=""
         class="position-absolute z-index-1 width-100-100 left-0 bottom-0 fz-30 select-head pl-24 pb-20 color-104 border-t-233 text-center">
      更多操作请前往APP查看
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/order.js"
  export default routerVue;
</script>
