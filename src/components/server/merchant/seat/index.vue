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
          <div class="pt-10 pb-20" v-if="seatData">总座位数:{{seatItemList&&seatItemList.length}}</div>
          <div class="pt-10 pb-20">订座总数:{{seatOrderList&&seatOrderList.length}}</div>
          <div class="pt-10 pb-20">订座人数:{{orderNum}}</div>
        </fieldset>
        <fieldset class="width-50-100 margin-auto pt-40 fz-30 ">
          <legend>当前选择</legend>
          <div class="flex-left">
            <div class="btn btn-lt btn-auto  mr-10 border-24" @click="selectAllSeat">全选</div>
            <div class="btn btn-lt btn-auto  mr-10 border-24" @click="selectOtherSeat">反选</div>
            <div class="btn btn-lt btn-auto  mr-10 border-24" @click="clearSeat()">清空</div>
            <div>已选中{{selectSeat.length}}</div>
          </div>
          <div class="clearfix pt-10 pb-20">
            <div class="float-left" v-for="(item,index) in selectSeat">
              <span class="mr-08">{{item.seatName}}</span>
              <span class="mr-08" @click="clearSeat(index)">x</span></div>
          </div>
          <div class="flex-left">
            <div @click="showOperator('book')" v-if="selectSeat && selectSeat.length" class="btn btn-auto btn-lt mr-10  border-24">订座</div>
            <div @click="showOperator('lock')" v-if="selectSeat && selectSeat.length" class="btn btn-auto btn-lt mr-10 border-24">锁定</div>
            <div @click="showOperator('money')" v-if="selectSeat && selectSeat.length" class="btn btn-auto btn-lt mr-10 border-24">最低消费</div>
            <div @click="showOperator('info')" v-if="selectSeat && selectSeat.length" class="btn btn-auto btn-lt  border-24">资料</div>
          </div>
        </fieldset>
      </div>
      <wy-show-svg v-if="svgBackData" :svg-back-data="svgBackData" @click="svgClick"></wy-show-svg>
    </div>
    <wy-window :window-data="{}" v-if="showOperatorWindow">
      <div slot="content" class="width-1200 margin-auto border-rad-20 back-white fz-28 pt-50 pb-50">
        <div class="text-center">{{operatorTypeName}}</div>
      <date-choose @click="doSelectDate" v-model="chooseDateType" :date-data="{
              chooseStartDate:chooseStartDate,
              chooseEndDate:chooseEndDate,
              isOne:operatorType === 'book'
            }"></date-choose>
      <div v-if="operatorType === 'money'" class="flex-center pt-20 pb-20">
        <label for="lowCostAmount">最低消费</label>
        <input type="text" class="back-248" id="lowCostAmount" v-model="changeData.lowCostAmount">
      </div>
      <div v-if="operatorType === 'book'">
        <div  class="flex-center pt-20 pb-20">
          <label for="bookNum">人数</label>
          <input type="text" class="back-248" id="bookNum" v-model="changeData.orderNum">
        </div>
        <div  class="flex-center pt-20 pb-20">
          <label for="bookNum">手机号</label>
          <input type="text" class="back-248" id="bookPhone" v-model="changeData.bookPhone">
        </div>
      </div>
      <div  class="width-50-100 margin-auto flex-center" >
        <div v-if="operatorType !== 'book'" class="btn btn-sm back-24 color-white btn-50 cursor-pointer mr-20" @click="doSubmit">更新选中</div>
        <div class="btn btn-sm back-24 color-white btn-50 cursor-pointer mr-20" @click="doSubmit" v-else >订桌</div>
        <div class="btn btn-sm btn-50 border-24 color-104 cursor-pointer" @click="showOperatorWindow=0">关闭</div>
      </div>
      </div>
    </wy-window>
    <wy-window :window-data="{}" v-if="showThisWindow">
      <div slot="content" class="width-1200 margin-auto border-rad-20 back-white fz-28 pt-50 pb-50">
        <div v-if="selectSeat.length === 1" class="menu-list flex-center pt-40">
          <div v-for="(item,index) in menuList"
               class="item cursor-pointer"
               @click="searchOneList(item.type , index)"
               :class="menuIndex==index?'active':''"
          >{{item.name}}</div>
        </div>
        <div v-show="menuIndex==0">
          <div v-if="selectSeat.length === 1">
            <div class="pt-10 pb-20">当前座位资料</div>
            <div class="pt-10 pb-20">座位类型:{{selectSeat[0].seatTypeName}}</div>
            <div class="pt-10 pb-20">当前状态:{{selectSeat[0].isSelected?'已订':'未订'}}</div>
            <div v-if="selectSeat[0].totalAmount" class="pt-10 pb-20">消费金额:{{selectSeat[0].totalAmount}}</div>
            <div class="pt-10 pb-20">座位名称:<input v-model="infoData.seatName" /></div>
          </div>
          <div class="pt-10 pb-20">容纳人数:<input v-model="infoData.locCount" /></div>
          <div class="pt-10 pb-20">最低消费:<input v-model="infoData.lowCostAmount" /></div>
          <div class="width-50-100 margin-auto">
            <div class="btn btn-sm back-24 color-white cursor-pointer" @click="doSubmit">更新</div>
          </div>
        </div>
        <div v-show="menuIndex==1">
          <div class="max-h-300 overflow-scroll-y">
            <div v-for="item in lockList"></div>
          </div>
        </div>
        <div v-show="menuIndex==2">
          <div class="max-h-300 overflow-scroll-y">
            <div v-for="item in moneyList"></div>
          </div>
        </div>
        <div v-show="menuIndex==3">
          <div class="pt-10 pb-20">预订列表</div>
          <div class="max-h-300 overflow-scroll-y">
            <div class="flex-center">
              <div>预订时间</div>
              <div>最低消费</div>
              <div>支付状态</div>
              <div>人数</div>
              <div>用户</div>
            </div>
            <div v-for="item in bookList" class="flex-center">
              <div>{{item.bookTime | dateFilter}}</div>
              <div>{{item.lowCostAmount}}</div>
              <div>{{item.payStatus}}</div>
              <div>{{item.orderNum}}</div>
              <div>{{item.userId}}</div>
            </div>
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
