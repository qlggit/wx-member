<template>
   <div class="pt-header">
     <header-component :header-data="{title:title}"></header-component>
     <div v-if="userInfo" class="pt-20 fz-32">
       <div class="pl-20 pr-20 height-128 flex-between back-242">
          <div class="color-104 ">头像</div>
          <img :src="userInfo.headImgUrl" class="head-img border-rad-100" alt="">
       </div>
       <div class="pl-20 height-100 flex-between border-b-194 back-242 mt-20">
         <div v-for="(item,index) in sexList" class="width-50-100" @click="selectSex=index">
            <div class="checkbox text-middle mr-20" :class="index==selectSex?'active':''"></div>
            <div class="inline-block fz-30 color-104">{{item}}</div>
         </div>
       </div>
       <div class="border-b-194 pl-20 flex-left height-100 back-242">
         <label for="remarkInput" class="mr-40 color-104 mr-20">个性签名</label>
         <input type="text" v-model="userInfo.remark" maxlength="20" placeholder="请输入个性签名" class="input-auto width-40-100 back-transparent" id="remarkInput">
       </div>
       <div class="border-b-194 pl-20 flex-between height-100 back-242 position-relative pr-20">
         <select class="position-full position-absolute opacity-0" @change="selectAge">
           <option v-for="item in ageList" :selected="item==userInfo.age?'selected':false" :value="item">{{item}}</option>
         </select>
         <div class="color-104">年龄</div>
         <div class="flex-right"><div class="mr-20">{{userInfo.age}}</div><div class="ico-right"></div></div>
       </div>
       <div class="pl-20 flex-between height-100 back-242 pr-20">
         <div class="color-104">地区</div>
         <div class="">{{userInfo.province}}{{userInfo.city}}</div>
       </div>
       <div class="mt-48 pt-10 pl-20 pr-20">
          <div class="btn back-24 color-white" @click="goNext">下一步</div>
       </div>
       <!--<div class="mt-20 pt-30 pl-20 color-194">-->
         <!--点击下一步代表您已阅读并同意<span class="text-underline color-104">&nbsp;《用户协议》&nbsp;</span>-->
       <!--</div>-->
     </div>
   </div>
</template>
<script>
    import routerVue from "../../js/page/login/info.js"
    export default routerVue;
</script>
