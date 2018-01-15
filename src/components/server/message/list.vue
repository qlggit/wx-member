<template>
  <div v-scroll-box="10" v-if="showAble" class="back-242">
      <div v-for="(item,index) in pageData">
         <div class="message-list-sys pt-28 pl-30 pr-30 border-b-233" v-if="type==='sys'">
            <div class="flex-between">
              <div class="fz-34 color-24">{{item.title}}</div>
              <div class="fz-24 color-104">{{item.rowAddTime }}</div>
            </div>
           <div class="fz-24 color-104 pt-16 write-ellipsis" >{{item.content }}</div>
         </div>
         <div v-else-if="type==='pay'">

         </div>
      </div>
  </div>
</template>
<script>
  import routerVue from "../../../js/server/qrcode/spread.js"
  export default routerVue;
</script>
