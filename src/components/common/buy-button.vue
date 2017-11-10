<template>
  <div class="buy-button-content">
      <div v-if="hasBuy" class="item" v-book-seat="merchantId">买酒</div>
      <div v-if="hasBook" class="item blank"  v-book-seat="merchantId">订座</div>
  </div>
</template>
<script>
  export default {
    props:['buyData'],
    data:function(){
      return {
        hasBuy:!this.buyData.notBuy,
        hasBook:!this.buyData.notBook,
        merchantId:!this.buyData.merchantId,
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    }
  }
</script>
