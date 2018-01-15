<template>
  <div class="height-100-100 width-100-100 product-pb pl-product" :class="isServer?'':'pt-header'">
    <header-component v-if="!isServer" :header-data="{title:name}"></header-component>
    <div class="product-menu text-center back-242" :class="isServer?'':'pt-header'">
        <div class="item" v-for="(item,index) in menuList"
             :class="menuIndex===index?'active':''"
        @click="changeMnuIndex(index,item)">
          {{item.typeName}}
        </div>
    </div>
    <div class="height-100-100 back-transparent overflow-scroll product-main">
      <div class="item mb-10" v-for="item in productList">
        <img :src="item.headImg | imgUrlFilter" class="img" alt="">
        <div>
          <div class="fz-30 color-24 mb-20">{{item.name}}</div>
          <div class="fz-24 color-104">{{item.keywords}}</div>
          <div class="mt-10 fz-34 color-24"><span class="mr-10">￥</span><span>{{item.price | moneyFilter}}</span></div>
          <wy-number-select :number-data="{number:item.number || 0,type:'auto',dataId:item.id}" @changeNumber="changeNumber"></wy-number-select>
        </div>
      </div>
    </div>
    <div v-show="productSelectListAble" @click="showSelectedProductList(0)" class="full-window z-index-3000 product-pb product-list-window back-black-05">
      <div class="content left-0 position-absolute width-100-100 overflow-scroll back-233"
      :style="{maxHeight:maxListHeight}">
          <div v-for="item in selectedList" class="mt-10 item back-white clearfix pl-24 pr-24" @click.stop="">
            <div class="float-left">【{{item.name}}】</div>
            <div class="float-right flex-right">
              <span class="mr-10">￥</span>
              <span class="mr-20">{{item.price*item.number | moneyFilter}}</span>
              <wy-number-select :number-data="{number:item.number,type:'selected',dataId:item.id}" @changeNumber="changeNumber"></wy-number-select>
            </div>
          </div>
      </div>
    </div>
    <div class="position-fixed z-index-3333 left-0 bottom-0 width-100-100 product-footer shadow-top-auto">
        <div class="content pl-24 back-white lh-0" @click="showSelectedProductList">
            <div class="shop-cart inline-block text-middle" >
              <div class="num" v-show="allNumber>0">{{allNumber}}</div>
            </div>
          <div class="ml-48 price lh-1 color-24 fz-36 inline-block text-middle">
            <div class="line">
              <span class="mr-08">￥</span>
              <span >{{allPrice | moneyFilter}}</span>
            </div>
          </div>
        </div>
      <div class="buy-btn text-center back-24 color-white fz-36 position-absolute right-0 top-0" @click="doBuy" >确定购买</div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/product.js"
  export default routerVue;
</script>
