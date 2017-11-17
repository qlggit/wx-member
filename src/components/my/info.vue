<template>
  <div class="pt-header back-238" v-if="userInfo">
    <header-component :header-data="{title:'我的资料'}"></header-component>
    <div class="pt-20 color-24 fz-32">
      <div class="border-b-199 border-t-199 flex-between pl-24 pr-24 height-128 back-242">
          <div>头像</div>
          <img :src="userInfo.headImgUrl" class="head-img border-rad-100" alt="">
      </div>
      <div class="border-b-199 border-t-194 flex-between pl-24 pr-24 height-128 back-242 mt-20">
          <div>我的等级</div>
          <img :src="userInfo.lvl | lvlUrlFilter" class="ico-54 border-rad-100" alt="">
      </div>
      <div class="border-b-199 flex-between pl-24 pr-24 height-128 back-242">
          <div>绑定手机</div>
          <div class="color-104">{{userInfo.phone}}</div>
      </div>
      <div class="border-b-194 border-t-199 flex-between pl-24 pr-24 height-128 back-242 mt-20">
          <div>昵称</div>
          <div class="color-104">{{userInfo.nickName}}</div>
      </div>
      <div class="border-b-194  flex-between pl-24 pr-24 height-128 back-242 ">
          <div>性别</div>
          <div class="color-104">{{userInfo.gender==1?'帅哥':'美女'}}</div>
      </div>
      <div class="border-b-194  flex-between pl-24 pr-24 height-128 back-242">
          <div>年龄</div>
          <div class="color-104">{{userInfo.age==null? '未知':userInfo.age}}</div>
      </div>
      <div class="border-b-194  flex-between pl-24 pr-24 height-128 back-242" v-router-link="'/my/qrcode'">
          <div>二维码</div>
          <div class="ico-right"></div>
      </div>
      <div class="border-b-194  flex-between pl-24 pr-24 height-128 back-242">
          <div>个性签名</div>
          <div class="color-104">{{userInfo.remark}}</div>
      </div>
      <div class="border-b-199  flex-between pl-24 pr-24 height-128 back-242">
          <div>地区</div>
          <div class="color-104">{{userInfo.province}}{{userInfo.city}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerVue from "../../js/page/my/info.js"
  export default routerVue;
</script>
