<template>
  <div v-if="showAble">
    <div v-if="hasBackImg">
      <wy-make-svg ;seat-data="seatData"></wy-make-svg>
    </div>
    <div v-else>
      <div class="pt-40 width-40-100 margin-auto back-white pl-40 pr-40">
          <div v-for="(item,index) in autoBackList" class="flex-between">
             <div class="fz-30">{{item.name}}</div>
            <img v-if="item.img" :src="item.img" class="width-100 height-100" alt="">
             <div class="btn btn-sm border-24 position-relative">
               上传
               <input :data-index="index" class="position-full width-40-100 position-absolute opacity-0" type="file" @change="fileChange">
             </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../../../js/server/admin/seat/create.js"
  export default routerVue;
</script>
