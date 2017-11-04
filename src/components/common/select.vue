<template>
  <div>
    <div v-if="!selectData.notSelect" class="page-line pd-auto border-b-eee back-white position-relative">
      <span>{{selectData.title}}</span>
      <img class="sm-ico text-middle float-right ml-10" src="/images/right.png" >
      <span class="float-right text-right">{{selectData.text}}</span>
      <select class="position-absolute opacity-0 left-0 top-0 width-100-100 height-100-100"
              @change="selectChange"
        >
        <option v-for="(item,index) in selectData.list"
                :selected="index===selectData.selectedIndex?true:false"
                :value="item.code||item">{{item.text||item}}</option>
      </select>
    </div>
    <div v-else class="pd-auto clearfix">
      <span class="float-left">{{selectData.title}}</span>
      <span class="float-right">{{selectData.text}}</span>
    </div>
  </div>

</template>
<script>
  export default {
    props:['selectData'],
    data:function(){
      return {
        selectData:this.selectData
      };
    },
    methods:{
      selectChange:function(event){
        var el = event.target;
        var index = el.selectedIndex;
        this.selectData.selectedIndex = index;
        this.selectData.text = this.selectData.list[index].text || this.selectData.list[index];
      }
    }
  }
</script>
