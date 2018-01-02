<template>
  <div class="buy-button-content">
      <div v-if="hasBuy" class="item" v-book-seat="buyData">买酒</div>
      <div v-if="hasBook" class="item blank"  v-book-seat="buyData">订座</div>
  </div>
</template>
<script>
  export default {
    props:['buyData'],
    data:function(){
      return {
        hasBuy:!this.buyData.notBuy,
        hasBook:!this.buyData.notBook,
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    }
  }
</script>
