<template>
  <div class="city-select-content full-window">
    <header-component :header-data="{notTitle:1,notBack:1}" >
      <div slot="back" class="back" @click="selectLocation(selectCity)"></div>
      <div slot="searchInput" class="search-input"  >
        <img src="/images/search.png" class="search-left-ico ico" alt="">
        <input type="text" v-model="searchValue" placeholder="输入城市名称或拼音查询" >
        <img src="/images/page/del.png" @click="clearSearch" class="del-ico ico" alt="">
      </div>
    </header-component>
    <div class="pt-header back-242" v-show="searchList&&searchList.length">
        <div class="pt-20">
          <div class="text-content">
            <div class="text" v-for="item in searchList"
                 @click="selectLocation(item.name)">{{item.name}}</div>
          </div>
        </div>
    </div>
    <div v-show="!searchList&&!searchList.length" class="head-location pt-40 back-242 pl-24">
      <div class="color-104 fz-30 mb-44">当前定位</div>
      <div>
        <div class="search-item blank"  @click="selectLocation(selectCity)">{{selectCity}}</div>
      </div>
    </div>
    <div v-show="!searchList&&!searchList.length" class="list-main" v-scroll-top="'cityMain'" >
      <div class="mt-20 pt-20 pl-24 back-242">
        <div class="color-104 fz-30 mb-44">热门城市</div>
        <div v-for="item in hotList" class="pb-30">
          <div v-for="o in item" class="search-item" @click="selectLocation(o.name)">{{o.name}}</div>
        </div>
      </div>
      <div class="mt-20 city-all-list back-242">
        <div v-for="item in cityList">
          <div class="title" :first-spell="item.first" >{{item.first}}</div>
          <div class="text-content">
            <div v-for="o in item.list" class="text" @click="selectLocation(o.name)" >{{o.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!searchList&&!searchList.length" class="spell-list text-center">
        <div @click="changeSpell" :data-value="item.first" class="item"
             :class="showSpell===item.first?'active':''" v-for="item in cityList">{{item.first}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['selectCity'],
    data:function(){
      return {
        hotList:[
          [{name:'北京'},
            {name:'上海'},
            {name:'成都'},
            {name:'重庆'},
            {name:'广州'},],
          [{name:'深圳'},
            {name:'武汉'},
            {name:'天津'},]
        ],
        searchValue:'',
        selectCity:this.selectCity,
        cityList:'',
        showSpell:'A',
        searchList:'',
        searchTimer:''
      };
    },
    beforeDestroy:function(){
      WY.oneUnBind(this);
    },
    created:function(){
      var that = this;
      WY.oneBind('scroll-top-key',function(v , key){
        if(key === 'cityMain'){
          that.showSpell = v;
        }
      } , this);
      WY.getCache('cityData',function(a){
        that.cityAllList = a.cityAllList;
        that.cityList = a.cityList;
      });
    },
    watch:{
      searchValue:function(v){
        if(v){
          clearTimeout(this.searchTimer);
          this.searchTimer = setTimeout(function(){
            this.doSearch();
          } .bind(this),500);
        }else{
          this.searchList = '';
        }
      }
    },
    methods:{
      clearSearch:function(){
        this.searchValue = '';
      },
      selectLocation:function(v){
        v = v.slice(0,4);
        WY.trigger('city-location',v);
      },
      toShowSpell:function(e){
        var char = e.target.dataset.value;
        this.showSpell = char;
        WY.trigger('scroll-top' , 'cityMain' , char);
      },
      changeSpell:function(e){
        this.toShowSpell(e);
      },
      doSearch:function(){
        var v = this.searchValue;
        if(/[\w\s]+/.test(v)){
          this.searchList = this.cityAllList.filter(function(a){
            var reg = new RegExp(v.split('').join('.*')+'.*','i');
            return reg.test(a.alphabetical)
              ||  reg.test(a.alphabeticalFirstAlphabet);
          });
        }else{
          this.searchList = this.cityAllList.filter(function(a){
            return a.name.indexOf(v) > -1;
          });
        }
      }
    }
  }
</script>
