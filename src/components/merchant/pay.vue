<template>
  <div class="height-100-100 width-100-100 pay-content"
       :class="isServer?'':'pt-header'">
    <header-component v-if="!isServer" :header-data="{title:name}"></header-component>
    <div class="pt-20">
      <div class="back-242">
        <div class="fz-30 pt-26 pb-26 pl-24 mt-20 flex-between border-t-233">
            <div class="title color-24">订购详情</div>
            <div class="color-104">{{supplierName}}</div>
        </div>
        <div class="pl-30 pr-30">
          <div v-if="seatOrderNo" class="height-90 pl-30 pr-30 flex-between fz-28 color-104 border-t-233 ">
            <div>订桌</div>
            <div>{{seatData.seatName}}</div>
            <div>{{seatData.tableStatus==='y'?'可拼桌':'不拼桌'}}</div>
            <div>{{deductibleAmount?'可抵扣'+(seatData.deductibleAmount | moneyFilter) :('最低消费'+(seatData.lowCostAmount | moneyFilter))}}</div>
          </div>
          <div v-for="item in selectedList" class="pay-item border-t-233">
            <img :src="item.img | imgUrlFilter" class="img border-rad-100" alt="">
            <div class="flex-right">
              <div class="text ">{{item.name}}</div>
              <div class="num ">数量:{{item.number}}</div>
              <div class="price ">￥{{(item.price*item.number | moneyFilter)}}</div>
            </div>
          </div>
        </div>
        <div class="pl-30 pr-30 border-t-233" v-if="orderNo">
          <div class="flex-right pay-item sm border-b-233 ">
            <div class="text ">商品合计：</div>
            <div class="num ">数量:{{productNumber}}</div>
            <div class="price ">￥{{(productPrice | moneyFilter)}}</div>
          </div>
          <div class="notice pr-30 fz-24 color-104 text-right pt-24">
              {{
              allPrice>=lowCostAmount
              ?('提示:最低消费'+(lowCostAmount | moneyFilter)+',已包含桌位费')
              :(!seatPayStatus
                ?('提示:最低消费'+(lowCostAmount | moneyFilter)+',剩余金额可于当前桌消费抵扣')
                :(diffAmount?('提示:已抵扣￥'+(diffAmount | moneyFilter)+',' +(payPrice==0?'无需再付':('需另付￥'+(payPrice | moneyFilter)))):'')
                )
            }}
          </div>
        </div>
        <div class="pl-24 pr-24 clearfix height-90 fz-30 color-24 pt-30 pb-30 border-t-233 border-b-233">
          <div class="float-left">支付金额：</div>
          <div class="float-right">￥{{payPrice | moneyFilter}}</div>
        </div>
      </div>
      <div class="mt-66 height-88 pt-30 pb-30 fz-28 pl-24 back-248">
          <span class="mr-20 color-104">订座信息：</span><span class="color-24">{{address}}</span>
      </div>
      <div class="mt-58  pl-24 pr-24 pb-40">
          <div class="btn back-24 color-white" @click="doBuy">确认支付</div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/pay.js"
  export default routerVue;
</script>
