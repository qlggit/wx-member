<template>
  <div v-if="showAble" class="height-100-100">
    <div v-if="hasBackImg" class="pt-seat-header position-relative height-100-100 back-transparent">
      <div class="position-absolute left-0 top-0 width-100-100">
        <fieldset class="width-50-100 margin-auto pt-40 fz-30 ">
          <legend>座位详情</legend>
          <div class="fz-28 color-104 pt-10" @click="doSelectDate('autoDate')">
            <span class="mr-10">查看日期：</span>
            <span class="color-24 mr-08">{{autoDate}}</span>
            <img src="/images/ico/down.png" class="width-22 height-14" alt="">
          </div>
          <div class="pt-10 pb-20" v-if="seatData">总座位数:{{seatData.itemList&&seatData.itemList.length}}</div>
          <div class="pt-10 pb-20">订座总数:</div>
          <div class="pt-10 pb-20">订座人数:</div>
        </fieldset>
      </div>
      <wy-show-svg v-if="seatData" :seat-data="seatData" @click="svgClick">
      </wy-show-svg>
    </div>
    <wy-window :window-data="{}" v-if="showThisWindow">
      <div slot="content" class="width-1200 margin-auto border-rad-20 back-white fz-28 pt-50 pb-50">
        <div class="menu-list flex-center pt-40">
          <div v-for="(item,index) in menuList"
               class="item cursor-pointer"
               @click="searchMoneyList(item.type , index)"
               :class="menuIndex==index?'active':''"
          >{{item.name}}</div>
        </div>
        <div v-show="menuIndex==0">
          <div class="pt-10 pb-20">当前座位资料</div>
          <div class="pt-10 pb-20">座位类型:{{selectSeat.seatTypeName}}</div>
          <div class="pt-10 pb-20">当前状态:{{selectSeat.isSelected?'已订':'未订'}}</div>
          <div class="pt-10 pb-20">座位名称:<input v-model="selectSeat.seatName" /></div>
          <div class="pt-10 pb-20">容纳人数:<input v-model="selectSeat.locCount" /></div>
          <div class="pt-10 pb-20">最低消费:<input v-model="selectSeat.lowCostAmount" /></div>
          <div class="width-50-100 margin-auto">
            <div class="btn btn-sm back-24 color-white cursor-pointer" @click="doSubmit">保存</div>
          </div>
        </div>
        <div v-show="menuIndex==1">
          <div class="pt-10 pb-20">锁定列表</div>
          <div class="max-h-300 overflow-scroll-y">
              <div v-for="item in lockList"></div>
          </div>
          <date-choose @click="doSelectDate" v-model="chooseDateType" :date-data="{
              chooseStartDate:chooseStartDate,
              chooseEndDate:chooseEndDate,
            }"></date-choose>
          <div class="width-50-100 margin-auto flex-center">
            <div class="btn btn-sm back-24 color-white btn-50 mr-20 cursor-pointer" @click="doSubmit">锁定当前座位</div>
            <div class="btn btn-sm back-24 color-white btn-50 cursor-pointer" @click="doSubmit">锁定全场</div>
          </div>
        </div>
        <div v-show="menuIndex==2">
          <div class="pt-10 pb-20">资费变更列表</div>
          <div class="max-h-300 overflow-scroll-y">
              <div v-for="item in moneyList"></div>
          </div>
          <date-choose @click="doSelectDate" v-model="chooseDateType" :date-data="{
              chooseStartDate:chooseStartDate,
              chooseEndDate:chooseEndDate,
            }"></date-choose>
          <div class="flex-center pt-20 pb-20">
            <label for="lowCostAmount">最低消费</label>
            <input type="text" class="back-248" id="lowCostAmount" v-model="selectSeat.lowCostAmount">
          </div>
          <div class="width-50-100 margin-auto flex-center">
            <div class="btn btn-sm back-24 color-white btn-50 cursor-pointer" @click="doSubmit">更新当前座位</div>
            <div class="btn btn-sm back-24 color-white btn-50 cursor-pointer mr-20" @click="doSubmit">更新全场</div>
          </div>
        </div>
        <div class="width-50-100 margin-auto pt-20 pb-40">
          <div class="btn btn-sm border-24 color-104 cursor-pointer" @click="showThisWindow=0;menuIndex=0;">关闭</div>
        </div>
      </div>
    </wy-window>
    <wy-date v-if="dateVisible" v-model="dateVisible" @click="onValuesChange"
             :date-data="chooseDateData" ></wy-date>
  </div>
</template>
<script>
  import routerVue from "../../../../js/server/merchant/seat/index.js"
  export default routerVue;
</script>
