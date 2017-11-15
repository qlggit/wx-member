<template>
  <div class="position-full position-fixed z-index-3333 pt-header back-242">
    <header-component :header-data="{title:'详细资料',notBack:1}">
      <div slot="back" class="back" @click="closeUserInfo"></div>
    </header-component>
    <div class="pt-20" v-if="userInfo">
      <div class="pt-24 pb-24 pl-24">
          <div class="height-128 flex-left">
            <img :src="userInfo.headImgUrl" class="height-128 width-128" alt="">
            <div class="pt-16 pl-24">
              <div>
                <span class="inline-block fz-34 color-24 text-middle">{{userInfo.nickName}}</span>
                <img :src="userInfo.sexImg | sexUrlFilter" class="inline-block text-middle head-ico ml-inline">
                <img src="/images/my/lvl.png" class="inline-block text-middle head-ico ml-inline">
              </div>
              <div class="pt-28 fz-28 color-104">个性签名:{{userInfo.remark}}</div>
            </div>
          </div>
      </div>
      <div class="mt-20 flex-between">
        <div class="fz-32 color-104">
          年龄
        </div>
        <div>{{userInfo.age}}</div>
      </div>
      <div class="mt-20 flex-between">
        <div>地区</div><div>{{userInfo.province}}{{userInfo.city}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['userData'],
    data:function(){
      return {
        userData:this.userData,
        userInfo:'',
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
      var that = this;
      WY.routerChange = function(){
        return that.userData.showUserInfoAble;
      };
      WY.request({
        url:'/user/other',
        data:{
          userId:this.userData.userId
        }
      } , function(o){
        that.userInfo = o.data;
      });
    },
    methods:{
      closeUserInfo:function(){
        this.$emit('closeUserInfo');
      }
    }
  }
</script>
