<template>
  <div class="club-search-content pt-header full-window back-233">
    <header-component :header-data="{notTitle:1,notBack:1}" >
      <div slot="searchInput" class="search-input" >
        <img src="/images/search.png" class="search-left-ico ico" alt="">
        <input type="text" v-model="searchValue" placeholder="搜索 酒吧/KTV" >
        <img src="/images/page/del.png" @click="clearSearch" class="del-ico ico" alt="">
      </div>
      <div slot="search" class="close-btn inline-block" @click="closeThis()">取消</div>
    </header-component>
    <div class="back-242 pl-24 pr-24 pt-40" v-show="!searchList&&!searchList.length">
        <div class="fz-30 color-24 mb-44">热门搜索</div>
        <div class="clearfix hot-list">
           <div v-for="item in hotList" class="search-item" @click="setSearchValue(item)">{{item}}</div>
        </div>
    </div>
    <div v-show="!searchList&&!searchList.length" class=" back-242 mt-20">
      <div class="color-10 fz-30 history-list-item pl-24">历史搜索</div>
      <div class="pl-24 pr-24">
        <div v-for="item in clubSearchHistory" class="history-list-item fz-20 color-73"  @click="setSearchValue(item)">{{item}}</div>
      </div>
    </div>
    <div v-show="searchList&&searchList.length">
      <div v-for="item in searchList" v-merchant-detail="item.id" class="search-club-list-item pr-24">
        <img :src="item.img | imgUrlFilter" class="img" alt="">
        <div class="content">
          <div class="title mb-20 fz-30">{{item.name}}</div>
          <div class="mb-20 lh-0"><span class="fz-28 color-104 mr-20">评分</span><wy-star :star-count="3.5"></wy-star></div>
          <div class="color-104 break-all fz-28 lh-35">{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        searchValue:'',
        hotList:'',
        searchList:'',
        clubSearchHistory:'',
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
      this.clubSearchHistory = JSON.parse(localStorage.clubSearchHistory || '[]');
      var that = this;
       WY.get('/search/merchant/hot',{
       } , function(a){
          that.hotList = a.list;
       });
    },
    watch:{
      searchValue:function(v){
        if(v){
          var that = this;
          if(this.clubSearchHistory.indexOf(v) === -1)this.clubSearchHistory.push(v);
          WY.get('/merchant/list/data',{

          } , function(a){
            that.searchList = a.data.shops;
          });
        }else{
          this.searchList = '';
        }
      },
      clubSearchHistory:function(){
        localStorage.clubSearchHistory = JSON.stringify(this.clubSearchHistory);
      }
    },
    methods:{
      clearSearch:function(){
        this.searchValue = '';
      },
      setSearchValue:function(v){
        this.searchValue = v;
      },
      closeThis:function(){
        WY.trigger('club-search',0);
      }
    }
  }
</script>
