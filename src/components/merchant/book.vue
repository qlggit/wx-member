<template>
  <div class="height-100-100 width-100-100 book-content pt-header">
    <header-component :header-data="{title:name}"></header-component>
    <wy-show-svg v-if="svgBackImg" :seat-data="{
      backSrc:svgBackImg,
      itemList:seatItemList
    }" @click="svgClick"></wy-show-svg>
    <div class="position-fixed width-100-100 bottom-0 left-0 z-index-100 book-window pl-24 pr-24">
      <div class="flex-between item-list border-b-194">
        <div v-for="item in footerList" class="item text-center"  >
          <div class="img border-rad-5 margin-auto" :style="{border:'1px solid ' + item.color}"></div>
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
          <span class="color-24">{{seatData.seatName}}</span>
        </div>
      </div>
      <div class="pt-42 pl-20 pr-20">
         <div class="btn back-24 color-white" @click="goNext">下一步</div>
      </div>
      <wy-date v-if="dateVisible" v-model="dateVisible" @click="onValuesChange"
               :date-data="{startDate:startDate,endDate:endDate,selectDate:selectDate,title:'请选择预约时间'}" ></wy-date>
    </div>
    <wy-window :window-data="{}" v-if="showThisWindow">
      <div slot="content" class="config-window border-rad-20 overflow-hidden back-white width-690 margin-auto">
          <div class="">
            <div class="pt-42 pb-34 fz-30 color-104 border-b-233">请确认信息</div>
            <div class="pt-50 pb-50 pl-24 pr-24 fz-28 color-24 border-b-233 text-left back-242">
              <div class="flex-between pb-56">
                <div class="width-50-100">
                   当前座位： {{seatData.seatName}}
                </div>
                <div class="pr-10" @click="changeTableAble">
                  <label class="checkbox mr-20 text-middle" :class="seatData.tableAble?'active':''" ></label>
                  <span class="inline-block text-middle">允许拼桌</span>
                </div>
              </div>
              <div class="flex-between">
                <div class="lh-40 height-40">最低消费： ￥{{seatData.lowCostAmount}}</div>
                <div class="  lh-40 height-40">
                  <span class="mr-10" >人数: </span>
                  <span v-if="0">{{seatData.myNumber}}/{{seatData.locCount }}</span>
                  <wy-number-select v-else
                                    @changeNumber="changeNumber"
                                    :number-data="{number:seatData.myNumber,minNumber:1,maxNumber:seatData.locCount-seatData.hadCount}"></wy-number-select>
                </div>
              </div>
            </div>
            <div class="pt-40 pb-40 color-104 text-center fz-24 flex-left pl-156" @click="toBuyWine=!toBuyWine">
              <img :src="'/images/ico/check'+(toBuyWine?'ed':'-none')+'.png'"  class="height-30 mr-10" alt="">
              <div class="fz-28 color-24 mr-20">买酒</div>
              <div>来了就嗨，无需等</div>
            </div>
          </div>
          <div class="clearfix text-center">
            <div class="btn-50 back-233 float-left color-24" @click="showConfirmWindow(0)">换桌</div>
            <div  @click="doSubmit" class="btn-50 back-24 float-right color-white">
              {{
                  seatData.isTableAppling?'申请中':(seatData.hasMe?'买酒':(seatData.isSelected?'拼桌':'订座'))
              }}
            </div>
          </div>
      </div>
    </wy-window>
  </div>
</template>
<script>
  import routerVue from "../../js/page/merchant/book.js"
  export default routerVue;
</script>
