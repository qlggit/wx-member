<template>
  <div class="pt-header height-100-100 back-242">
    <header-component :header-data="{title:'存取酒'}"></header-component>
    <div class="wine-header text-center fz-28 color-24 lh-0">
      <div v-for="(item,index) in headMenu"
           :class="headIndex===index?'active':''"
           @click="headIndex = index"
            class="inline-block item"
      >{{item}}</div>
    </div>
    <div class="back-transparent">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
            <div class=" position-relative wine-main" :style="{
        height:swiperHeight+'px'
            }">
              <div class="select-head pl-24 pb-20 color-104 fz-30 back-242 position-absolute width-100-100 left-0 top-0 z-index-100 border-b-233"
                @click="showMorePlace()"
              >
                {{placeList && placeList[placeIndex].name}}
                <div class="select-ico"></div>
              </div>
              <div v-show="morePlaceAble" @click="showMorePlace(0)" class="position-full position-absolute z-index-50 back-black-05 pt-74">
                <div v-for="(item,index) in placeList" @click.stop="selectPlace(index)"
                     :class="placeIndex===index?'active':''"
                     class="wine-more-list select-head pl-24 pb-20 color-104 fz-30 border-b-233 back-242">
                    {{item.name}}
                </div>
              </div>
              <div class="height-100-100 back-transparent overflow-scroll">
                <div v-for="item in wineList" class="wine-list pl-24 pr-30 flex-left fz-32 color-24 border-b-233">
                  <div class="width-40-100">{{item.name}}</div>
                  <div class="width-40-100 text-center">
                    <span class="fz-24 color-104">现存：</span><span>{{item.number}}</span><span class="fz-24 color-104">瓶</span>
                  </div>
                </div>
              </div>
              <div v-router-link=""
                   class="position-absolute z-index-1 width-100-100 left-0 bottom-0 fz-30 select-head pl-24 pb-20 color-104 border-t-233 text-center">
                请前往APP继续操作
              </div>
            </div>
        </swiper-slide>
        <swiper-slide>
          <div class="position-relative" :style="{
        height:swiperHeight+'px'
            }">
            <div v-router-link=""
                 class="position-absolute z-index-1 width-100-100 left-0 bottom-0 fz-30 select-head pl-24 pb-20 color-104 border-t-233 text-center">
              请前往APP继续操作
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="position-relative" :style="{
        height:swiperHeight+'px'
            }">
            <div v-router-link=""
                 class="position-absolute z-index-1 width-100-100 left-0 bottom-0 fz-30 select-head pl-24 pb-20 color-104 border-t-233 text-center">
              请前往APP继续操作
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/wine.js"
  export default routerVue;
</script>
