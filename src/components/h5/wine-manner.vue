<template>
  <div class="wine-manner  color-white">
    <div class="body position-relative">
      <div class="main border-rad-10 mb-44  back-black-05">
        <div class="fz-40">测试你醉后是什么样子？</div>
        <div class="mt-10 pt-50">
          <div v-for="(item , index) in question" class="list fz-30">
            <div>{{index+1}}、{{item.title}}</div>
            <div class="flex-between pt-30" @click="item.selectIndex=smIndex" v-for="(smItem , smIndex) in item.list">
              <div class="flex-left">
                <img class="ico-letter" :src="'/images/ico/'+smItem.key+'.png'"/>
                <div class="pl-30">{{smItem.value}}</div>
              </div>
              <div class="circle-check" :class="item.selectIndex===smIndex?'active':''"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer border-rad-10 fz-30 text-center" @click="doRes">
        点击查看结果
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/h5/wine-manner.js"
  export default routerVue;
</script>
