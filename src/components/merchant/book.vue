<template>
  <div class="height-100-100 width-100-100 book-content pt-header">
    <header-component :header-data="{title:name}"></header-component>
    <wy-show-svg :seat-data="{
      backSrc:'/images/svg.jpg',
      itemList:seatItemList
    }" @click="svgClick"></wy-show-svg>
    <div class="position-fixed width-100-100 bottom-0 left-0 z-index-100 book-window pl-24 pr-24">
      <div class="flex-between item-list border-b-194">
        <div v-for="item in footerList" class="item text-center"  >
          <div class="img border-rad-5" :style="{border:'1px solid ' + item.color}"></div>
          <div class="fz-22 color-24 break-none mt-10">{{item.name}}</div>
        </div>
      </div>
      <div class="pt-36 pl-20 pr-24 flex-between">
         <div class="fz-28 color-104" @click="doSelectDate">
           <span class="mr-10">预约日期：</span>
           <span class="color-24 mr-08">{{selectDate}}</span>
           <img src="/images/ico/down.png" class="width-22 height-14" alt="">
         </div>
        <div class="fz-28 color-104">
          <span class="mr-10">选座：</span>
          <span class="color-24">{{seatName}}</span>
        </div>
      </div>
      <div class="pt-42 pl-20 pr-20">
         <div class="btn back-24 color-white">下一步</div>
      </div>
      <wy-date v-if="dateVisible" v-model="dateVisible" @click="onValuesChange"
               :date-data="{startDate:startDate,endDate:endDate,selectDate:selectDate,title:'请选择预约时间'}" ></wy-date>
    </div>
    <wy-window :window-data="{}" v-if="showThisWindow">
      <div slot="content" class="config-window border-rad-20 overflow-hidden back-white width-690 margin-auto">
          <div class="height-404 pl-24 pr-24">
            <div class="pt-36 pb-22 fz-34 color-24 border-b-233">请确认信息</div>
            <div class="pt-48 pb-48 pl-38 pr-38 fz-32 color-24 border-b-233 text-left">
              <div class="clearfix mb-40 ">
                <div class="float-left width-50-100">
                   座位：A1 03
                </div>
                <div class="float-right width-50-100 pl-38">
                  <label class="checkbox mr-20 text-middle" :class="tableAble?'active':''" @click="tableChange"></label>
                  <span class="inline-block text-middle">我要拼桌</span>
                </div>
              </div>
              <div class="clearfix">
                <div class="float-left width-50-100 lh-40">最低消费：￥2000</div>
                <div class="float-right width-50-100 lh-40 pl-38 height-40"><span class="">人数: </span>
                  <wy-number-select @numberChange="changeNumber" :number-data="{number:number,nimNumber:1}"></wy-number-select></div>
              </div>
            </div>
            <div class="pt-20 pb-48 color-104 text-center fz-24">
                去选择酒水吧，我们会准时送达您的位置，欢迎您的光临
            </div>
          </div>
          <div class="clearfix text-center">
            <div class="btn-50 back-233 float-left color-24" @click="showConfirmWindow(0)">换桌</div>
            <div  v-router-link="'/merchant/product'" class="btn-50 back-24 float-right color-white">确定</div>
          </div>
      </div>
    </wy-window>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/book.js"
  export default routerVue;
</script>
