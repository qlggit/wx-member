import canvasData from '../../../ui/canvas-data';
export default{
  name:'admin-seat-create',
  data() {
    return {
      userInfo:'',
      showAble:0,
      hasBackImg:0,
      colorList:[255,197,85,0],
      autoBackList:[
        {
          name:'背景图',
          code:'back',
          img:'http://ozczd6usr.bkt.clouddn.com/FrzoN1p-3lHax-nl9f8THrp_Dzh-',
        },
        {
          name:'效果图',
          code:'main',
          img:'http://ozczd6usr.bkt.clouddn.com/FpT6AmkAsYw4UIeXW0Yk83L0amQ3',
        }
      ],
      backImg:'',
      seatData:'',
      selectSeat:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
    } , this);
    this.searchBack();
  },
  methods:{
    doSubmit:function(){
        var data = [];
        this.seatData.itemList.forEach(function(a){
          var o = WY.common.copyProp(a.svgData,{
            locCount:'',
            lowCostAmount :'',
            seatName  :'',
            seatShape   :'',
            seatType    :'',
            seatX     :'',
            seatY      :'',
          });
          o.supplierId = WY.hrefData.supplierId;
          data.push(o);
        });
        WY.post('/server/admin/seat/add' ,{
          jsonStr:JSON.stringify(data)
        },function(a){
          WY.toast(a.message);
        })
    },
    doShowBack:function(){
      var count = 0;
      var that = this;
      that.seatData = '';
      this.backImg.forEach(function(a){
        var img = new Image;
        img.src = a.img;
        count++;
        img.onload = function(){
          count--;
          if(count === 0){
            that.hasBackImg = 1;
            that.doSetSvg(img.width,img.height);
          }
        }
      });
    },
    searchBack:function(){
      var that = this;
      WY.get('/server/admin/seat/search',
        {supplierId:WY.hrefData.supplierId}
        ,function(a){
        if(a.data[0]){
          that.backImg = a.data[0];
          that.doShowBack();
        }
        if(a.data[1]){
          that.seatData = a.data[1];
        }
        that.showAble = 1;
      })
    },
    svgClick:function(e , type , data){
      var target = e.target;
      if(this.selectSvg){
        this.selectSvg.style.stroke = 'none';
      }
      if(type === 'svg'){
        return false;
      }
      target.style.stoke = 'red';
      this.selectSvg = target;
      this.selectSeat = data;
    },
    doSetSvg:function(w , h){
      var itemList = [];
      var that = this;
      var canvasObj = new canvasData({
        img:this.backImg.filter(function(a){return a.code === 'main'}).pop().img,
        width:w,
        height:h,
        colorList:this.colorList,
        border:function(color,offset){
          itemList.push(that.makeItem(color,offset));
        },
        done:function(){
          that.seatData = {
            backSrc:that.backImg.filter(function(a){return a.code === 'back'}).pop().img,
            itemList:itemList
          }
        }
      });
    },
    makeItem:function(color , offset){
      var data = {svgData:{}};
      var svgData = data.svgData;
      switch (color){
        case 255:
        case 197:
        case 85:
          data.type = 'room';
          svgData.backImg = '/images/seat/table.png';
          svgData.type = 'room';
          svgData.locCount = 8;
          svgData.lowCostAmount = 1000;
          svgData.seatName  = '座位';
          svgData.seatShape   = color;
          svgData.seatType    = 'seat';
          svgData.seatTypeName    = '座位';
          break;
        case 0:
          data.type = 'table';
          svgData.backImg = '/images/seat/room.png';
          svgData.type = 'table';
          svgData.locCount = 15;
          svgData.lowCostAmount = 2000;
          svgData.seatName  = '包间';
          svgData.seatShape   = color;
          svgData.seatType    = 'room';
          svgData.seatTypeName    = '包间';
          break;
      }
      svgData.x = svgData.seatX  = offset.left;
      svgData.y = svgData.seatY = offset.top;
      svgData.width = offset.width;
      svgData.height = offset.height;
      svgData.supplierId = WY.hrefData.supplierId;
      return data;
    },
    fileChange:function(e){
      var fileEle = e.target;
      if(fileEle.value){
        var data = {
          file:fileEle.files[0]
        };
        var index = e.target.dataset.index;
        var that = this;
        WY.postFile('/file/api' , data,function(a){
          if(a.status === true){
            that.autoBackList[index].img = a.data.path;
          }else{
            WY.toast('上传失败');
          }
        });
      }
    },
    doSubmitImg:function(){
      if(this.autoBackList.every(function(a){
        if(!a.img){
          WY.toast('请上传'+a.name);
        }
          return !!a.img;
        })){
        var that = this;
        WY.post('/server/admin/seat/fileAdd' , {
          data:this.autoBackList,
          supplierId:WY.hrefData.supplierId,
        } , function(a){
          if(a.code == 0){
            that.backImg = that.autoBackList;
            that.doShowBack();
          }
        })
      }
    }
  }
}
