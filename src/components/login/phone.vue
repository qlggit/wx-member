<template>
   <div class="pt-header">
     <header-component :header-data="{title:title}"></header-component>
     <div class="pt-30 color-104 fz-30 break-none pl-24">
       为了保障您的个人财产和信息安全请绑定手机
     </div>
     <div class="pt-70">
       <div class="input-div pr-20 pl-20 flex-between">
         <input type="text" class="width-100-100" maxlength="11" @input="smsCode=''" v-model="phone" placeholder="输入手机号">
       </div>
       <div class="input-div mt-48 pl-20 pr-20">
         <input type="text" class="width-60-100" maxlength="6" v-model="smsCode" placeholder="输入验证码">
         <input class="input-btn width-30-100" type="button" value="获取验证码" v-sms-send:BINDING="phone">
       </div>
       <div class="pt-132 pl-20 pr-20">
          <div class="btn color-white back-black" @click="doBuild">绑定手机</div>
       </div>
     </div>
   </div>
</template>
<script>
    import routerVue from "../../js/page/login/phone.js"
    export default routerVue;
</script>
