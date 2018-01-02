<template>
  <div v-if="showAble" class="height-100-100">
    <div v-if="backImg" class="pt-seat-header position-relative height-100-100 back-transparent">
      <div class="position-absolute left-0 top-0 width-100-100">
        <fieldset class="width-50-100 margin-auto pt-40 fz-30 ">
          <legend>座位详情</legend>
          <div :style="{visibility:selectSeat?'visible':'hidden'}">
            <div class="pt-10 pb-20" v-if="seatData">总座位数:{{seatData.itemList.length}}</div>
            <div class="pt-10 pb-20">当前座位资料</div>
            <div class="pt-10 pb-20">座位类型:{{selectSeat.seatTypeName}}</div>
            <div class="pt-10 pb-20">座位名称:<input v-model="selectSeat.seatName" /></div>
            <div class="pt-10 pb-20">容纳人数:<input v-model="selectSeat.locCount" /></div>
            <div class="pt-10 pb-20">最低消费:<input v-model="selectSeat.lowCostAmount" /></div>
          </div>
          <div class="width-50-100 margin-auto">
            <div class="btn btn-sm back-24 color-white cursor-pointer" @click="doSubmit">{{hasAutoSeatData?'保存':'新增所有'}}</div>
          </div>
        </fieldset>
      </div>
      <wy-show-svg v-if="svgBackData" :svg-back-data="svgBackData" @click="svgClick"></wy-show-svg>
    </div>
    <div v-if="!backImg">
      <div class="pt-40 width-40-100 margin-auto back-white pl-40 pr-40 pb-50">
          <div v-for="(item,index) in autoBackList" class="flex-between pt-40 pb-40">
             <div class="fz-30">{{item.name}}</div>
            <img v-if="item.img" :src="item.img" class="width-100 height-100" alt="">
             <div class="width-30-100">
               <div class="btn btn-sm border-24 position-relative cursor-pointer">
                 上传
                 <input :data-index="index" name="filename" class="position-full width-40-100 position-absolute opacity-0" type="file" @change="fileChange">
               </div>
             </div>
          </div>
          <div class="btn back-24 color-white mt-48 cursor-pointer" @click="doSubmitImg">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../../../js/server/admin/seat/create.js"
  export default routerVue;
</script>
