<template>
  <div v-if="showAble" class="height-100-100">
    <div v-if="svgBackData" class="pl-seat-left position-relative height-100-100 back-transparent">
      <div class="position-absolute left-0 top-0 width-seat height-100-100 back-white pl-10 pr-10 pb-40">
        <div class="pt-20">
          <fieldset class=" margin-auto pt-40 fz-28 border-rad-10 border-194">
            <legend class="fz-32">座位状态</legend>
            <div class="back-white flex-between">
              <div v-for="item in seatStatusList" class="item text-center">
                <img class="img height-88"  :src="item.img" />
              </div>
            </div>
          </fieldset>
          <fieldset class=" margin-auto pt-40 pb-40 fz-28 pl-40 pr-40 border-rad-10 border-194 mt-32">
            <legend class="fz-32">座位管理</legend>
            <div class="color-104 pt-10 flex-between cursor-pointer" @click="doSelectDate('autoDate')">
              <span class="mr-10 break-none">选择日期：</span>
              <span class="color-24 mr-08 break-none">{{autoDate}}</span>
              <img src="/images/ico/down.png" class="width-22 height-14" alt="">
            </div>
            <div class="mt-48" v-if="seatData">总座位数:<span class="pl-20">{{seatItemList&&seatItemList.length}}</span></div>
            <div class="mt-48">订座总数:<span class="pl-20">{{seatOrderList&&seatOrderList.length}}</div>
            <div class="mt-48">订座人数:<span class="pl-20">{{orderNum}}{{orderNum}}</div>
            <div class="mt-48">消费总数:<span class="pl-20">{{orderNum}}{{orderNum}}</div>
          </fieldset>
        </div>
        <fieldset class="margin-auto pt-40 fz-24 pl-40 pr-40 border-rad-10 border-194 mt-32">
          <legend class="fz-32">当前选择</legend>
          <div class="flex-between " >
            <div class="btn btn-lt btn-auto  border-24 cursor-pointer" @click="selectAllSeat"
              :class="selectSeat.length===seatItemList.length?'back-24 color-white':''"
            >全选</div>
            <div class="btn btn-lt btn-auto border-24 cursor-pointer" @click="selectOtherSeat">反选</div>
            <div class="btn btn-lt btn-auto border-24 cursor-pointer" @click="clearSeat()">清空</div>
          </div>
          <div class="text-center pt-20 pb-20 border-b-194 color-104">已选中{{selectSeat.length}}</div>
          <div class="clearfix pt-20 pb-56 pl-20 pr-20 border-b-194 text-center overflow-scroll-y" :style="{
              'max-height':maxSeatHeight+'px'
          }">
            <div class="float-left seat-select-item fz-28 position-relative mr-20 back-24 color-white border-rad-10 mb-22"
                 v-for="(item,index) in selectSeat">
              {{item.seatName}}
              <img src="/images/server/close.png" class="del-ico cursor-pointer" @click="clearSeat(index)"/>
            </div>
          </div>
          <div class="height-150">
            <div class="flex-between pt-20">
              <div @click="showOperator('book')"
                   v-if="selectSeat&&selectSeat.length"
                   class="btn btn-auto btn-lt  width-132  border-24 cursor-pointer lh-38">订座</div>
              <div @click="showOperator('lock')" v-if="selectSeat && selectSeat.length"
                   class="btn btn-auto btn-lt  width-132 border-24 cursor-pointer lh-38">锁定</div>
            </div>
            <div class="flex-between pt-24">
              <div @click="showOperator('money')" v-if="selectSeat && selectSeat.length"
                   class="btn btn-auto btn-lt  width-132 border-24 cursor-pointer lh-38 padding-0">最低消费</div>
              <div @click="showOperator('info')" v-if="selectSeat && selectSeat.length"
                   class="btn btn-auto btn-lt  width-132 border-24 cursor-pointer lh-38">资料</div>
            </div>
          </div>
        </fieldset>
      </div>
      <wy-show-svg :svg-back-data="svgBackData" @click="svgClick"></wy-show-svg>
    </div>
    <wy-window :window-data="{}" v-if="showOperatorWindow">
      <div slot="content" class="width-1656 margin-auto border-rad-20 back-transparent fz-28 pt-115 pb-50 position-relative">
        <img src="/images/server/close.png" @click="showOperatorWindow=0"  class="width-100 position-absolute top-0 right-0 z-index-100"/>
        <div class="position-absolute pt-24 top-0 left-0 width-100-100">
          <div class="window-radius back-black margin-auto"></div>
        </div>
        <div class="pt-132 border-rad-20 back-black overflow-hidden">
          <div v-if="selectSeat.length === 1" class="seat-menu-list flex-center back-black">
            <div class="item active" ><div class="text">{{operatorTypeName}}</div></div>
          </div>
          <div class="pt-100 back-white pb-50">
            <div v-show="menuIndex==0" class="window-main color-24 margin-auto ">
              <div v-if="selectSeat.length === 1">
                <div class="window-input flex-between ">
                  <label class="mr-10 break-none">时间：</label>
                  <div class="width-100-100">
                    <date-choose @click="doSelectDate" v-model="chooseDateType" :date-data="{
              chooseStartDate:chooseStartDate,
              chooseEndDate:chooseEndDate,
              isOne:operatorType === 'book'
            }"></date-choose>
                  </div>
                </div>
                <div v-if="operatorType === 'money'" class="window-input flex-between pb-50 mt-10 position-relative">
                  <label class="break-none">最低消费：</label>
                  <input type="text" class="border-rad-3" maxlength="8"  v-model="changeData.lowCostAmount">
                  <div class="right-placeholder color-24">元</div>
                </div>
                <div v-if="operatorType === 'book'">
                  <div class="window-input flex-between pb-50 mt-10">
                    <label class="break-none">客户姓名：</label>
                    <input type="text" class="border-rad-3" maxlength="20"  v-model="changeData.customerName">
                  </div>
                  <div class="window-input flex-between pb-50 mt-10">
                    <label>手机号：</label>
                    <input type="text" class="border-rad-3" maxlength="11"  v-model="changeData.customerPhone">
                  </div>
                  <div class="window-input flex-between pb-50 mt-10 position-relative">
                    <label>人数：</label>
                    <input type="text" class="border-rad-3" maxlength="2"  v-model="changeData.customerNum">
                    <div class="right-placeholder color-24">人</div>
                  </div>
                  <div class="window-input flex-between pb-50 mt-10">
                    <label>备注：</label>
                    <input type="text" class="border-rad-3" maxlength="100"  v-model="changeData.remark">
                  </div>
                </div>
              </div>
              <div class="text-center flex-center mt-32 fz-32 pb-50">
                <div v-if="operatorType !== 'book'" class="window-btn back-24 color-white cursor-pointer" @click="doSubmit">更新选中</div>
                <div class="window-btn back-24 color-white cursor-pointer" @click="doSubmit" v-else>订桌</div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </wy-window>
    <wy-window :window-data="{}" v-if="showThisWindow">
      <div slot="content" class="width-1656 margin-auto border-rad-20 back-transparent fz-28 pt-115 pb-50 position-relative">
        <img src="/images/server/close.png" @click="showThisWindow=0;menuIndex=0;"  class="width-100 position-absolute top-0 right-0 z-index-100"/>
        <div class="position-absolute pt-24 top-0 left-0 width-100-100">
          <div class="window-radius back-black margin-auto"></div>
        </div>
        <div class="pt-132 border-rad-20 back-black overflow-hidden">
          <div v-if="selectSeat.length === 1" class="seat-menu-list flex-center back-black">
            <div v-for="(item,index) in menuList"
                 class="item cursor-pointer"
                 @click="searchOneList(item.type , index)"
                 :class="menuIndex==index?'active':''"
            ><div class="text">{{item.name}}</div></div>
          </div>
          <div class="pt-100 back-white pb-50">
            <div v-show="menuIndex==0" class="window-main color-24 margin-auto">
              <div v-if="selectSeat.length === 1">
                <div class="window-input flex-between pb-50">
                  <label>类型：</label>
                  <input type="text" class="border-rad-3" readonly :value="selectSeat[0].seatTypeName">
                </div>
                <div class="window-input flex-between pb-50 mt-10">
                  <label class="break-none">当前状态：</label>
                  <input type="text" class="border-rad-3" readonly :value="selectSeat[0].isSelected?'已订':'未订'">
                </div>
                <div v-if="selectSeat[0].totalAmount" class="window-input flex-between pb-50 mt-10">
                  <label class="break-none">消费金额：</label>
                  <input type="text" class="border-rad-3" readonly v-model="selectSeat[0].totalAmount">
                </div>
                <div class="window-input flex-between pb-50 mt-10">
                  <label>座位号：</label>
                  <input type="text" class="border-rad-3" v-model="infoData.seatName">
                </div>
              </div>
              <div class="window-input flex-between pb-50 mt-10 position-relative">
                <label class="break-none">容纳人数：</label>
                <input type="text" class="border-rad-3"  v-model="infoData.locCount">
                <div class="right-placeholder color-24">人</div>
              </div>
              <div class="window-input flex-between pb-50 mt-10 position-relative">
                <label class="break-none">最低消费：</label>
                <input type="text" class="border-rad-3"  v-model="infoData.lowCostAmount">
                <div class="right-placeholder color-24">元</div>
              </div>
              <div class="text-center mt-32 flex-center">
                <div class="window-btn back-24 color-white cursor-pointer fz-32 mr-20" @click="doSubmit">更新</div>
              </div>
            </div>
            <div v-show="menuIndex==1">
              <div class=" max-h-300 text-center overflow-scroll-y pl-20 pr-20">
                <div class="flex-between  width-100-100 ">
                  <div class="width-40-100">锁定日期</div>
                  <div class="width-20-100">操作</div>
                </div>
                <div class="flex-between mt-20" v-for="item in lockList">
                  <div class="width-60-100">{{item.setTime.slice(0,10)}}</div>
                  <div class="width-40-100"><a @click="delOne('lock',item)" class="btn btn-lt btn-auto back-233 color-73 cursor-pointer">删除</a></div>
                </div>
              </div>
            </div>
            <div v-show="menuIndex==2">
              <div class="max-h-300 overflow-scroll-y pl-20 pr-20">
                <div class="flex-between text-center width-100-100">
                  <div class="width-40-100">设置日期</div>
                  <div class="width-30-100">最低消费</div>
                  <div class="width-30-100">操作</div>
                </div>
                <div class="flex-between text-center mt-20" v-for="item in moneyList">
                  <div class="width-40-100">{{item.setTime.slice(0,10)}}</div>
                  <div class="width-30-100">{{item.amount | moneyFilter}}</div>
                  <div class="width-30-100"><a @click="delOne('money',item)" class="btn btn-lt btn-auto back-233 color-73 cursor-pointer">删除</a></div>
                </div>
              </div>
            </div>
            <div v-show="menuIndex==3">
              <div class="max-h-300 overflow-scroll-y pl-20 pr-20">
                <div class="flex-between text-center">
                  <div class="width-20-100">预订时间</div>
                  <div class="width-20-100">最低消费</div>
                  <div class="width-10-100">支付状态</div>
                  <div class="width-10-100">人数</div>
                  <div class="width-20-100">用户</div>
                  <div class="width-20-100">操作</div>
                </div>
                <div v-for="item in bookList" class="flex-between mt-20">
                  <div class="width-20-100">{{item.bookTime | dateFilter}}</div>
                  <div class="width-20-100">{{item.lowCostAmount | moneyFilter}}</div>
                  <div class="width-10-100">{{item.payStatus==='ALEADY_PAY'?'已支付':'未支付'}}</div>
                  <div class="width-10-100">{{item.orderNum || item.customerNum}}</div>
                  <div class="width-20-100">{{item.mobile || item.userId || item.nickName || item.customerPhone || item.customerName}}</div>
                  <div class="width-20-100"><a @click="delOne('book',item)" class="btn btn-lt btn-auto back-233 color-73 cursor-pointer">删除</a></div>
                </div>
              </div>
            </div>
          </div>
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
