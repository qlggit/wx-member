import canvasData from '../../../ui/canvas-data';
export default{
  name:'admin-seat-create',
  data() {
    return {
      userInfo:'',
      showAble:0,
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
      selectSeat:'',
      svgBackData:'',
      hasAutoSeatData:'',
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
      var that = this , data , sendData;
      if(that.hasAutoSeatData){
        if(!this.selectSeat){
          WY.toast('请先选择一个座位');
          return false;
        }
        sendData = WY.common.copyProp(this.selectSeat,{
          locCount:'',
          lowCostAmount :'',
          seatName  :'',
          yukeSupplierSeatId:'',
        });
        sendData.lowCostAmount *= 100;
      }
      else{
        data = [];
        this.seatItemList.forEach(function(a){
          var o = WY.common.copyProp(a.svgData,{
            locCount:'',
            lowCostAmount :'',
            seatName  :'',
            seatShape   :'',
            seatType    :'',
            seatX     :'',
            seatY      :'',
          });
          o.lowCostAmount *= 100;
          o.supplierId = WY.hrefData.supplierId;
          data.push(o);
        });
        sendData = {
          jsonStr:JSON.stringify(data)
        };
      }
        WY.post('/server/admin/seat/'+(that.hasAutoSeatData?'edit':'add') ,sendData,function(a){
          if(a.code === 0 && !that.hasAutoSeatData){
            location.reload();
          }
          WY.toast(a.message);
        })
    },
    doShowBack:function(sts , call){
      var count = 0;
      var that = this;
      this.backImg.forEach(function(a){
        var img = new Image;
        img.src = a.img;
        count++;
        img.onload = function(){
          count--;
          if(a.code === 'back'){
            that.svgBackData = {
              img:that.backImg.filter(function(a){return a.code === 'back'}).pop().img,
              backWidth:img.width,
              backHeight:img.height,
            };
          }
          if(count === 0){
            if(!sts)that.doSetSvg(img.width,img.height);
            setTimeout(function(){
              call && call();
            },100);
          }
        }
      });
    },
    setBackImg:function(list , sts , call){
      this.backImg = list;
      this.doShowBack(sts , call);
    },
    searchBack:function(){
      var that = this;
      WY.get('/merchant/seat/data',
        {supplierId:WY.hrefData.supplierId}
        ,function(a){
        if(a.data[0] && a.data[0].length){
          that.setBackImg(a.data[0].map(function(b,i){
            return {
              code:b.supplierFileType === 'seat_per'?'main':'back',
              img:b.filePath
            };
          }) , a.data[1] && a.data[1].length , function(){
            if(a.data[1] && a.data[1].length){
              var itemList = a.data[1].map(function(a){
                return that.makeItem(a.seatShape - 0,{
                  left:a.seatX - 0,
                  top:a.seatY - 0
                } , a);
              });
              that.seatItemList = itemList;
              setTimeout(function(){
                WY.ready('set-svg-list',itemList);
              },100);
              that.hasAutoSeatData = 1;
            }
            that.showAble = 1;
          });
          return
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
          that.seatItemList = itemList;
          setTimeout(function(){
            WY.ready('set-svg-list',itemList);
          },100);
        }
      });
    },
    makeItem:function(color , offset , autoData){
      var data = {svgData:autoData || {}};
      var svgData = data.svgData;
      switch (color){
        case 255:
        case 197:
        case 85:
          data.type = 'room';
          svgData.backImg = '/images/seat/table-'+color+'-able.png';
          svgData.type = 'room';
          svgData.locCount = svgData.locCount || 8;
          svgData.lowCostAmount = svgData.lowCostAmount || 100000;
          svgData.seatName  = svgData.seatName || '座位';
          svgData.seatShape   = color;
          svgData.seatType    = 'seat';
          svgData.seatTypeName  = '座位';
          break;
        case 0:
          data.type = 'table';
          svgData.backImg = '/images/seat/room-'+color+'-able.png';
          svgData.type = 'table';
          svgData.locCount = svgData.locCount || 15;
          svgData.lowCostAmount = svgData.lowCostAmount || 200000;
          svgData.seatName  = svgData.seatName || '包间';
          svgData.seatShape   = color;
          svgData.seatType    = 'room';
          svgData.seatTypeName    = '包间';
          break;
      }
      svgData.lowCostAmount = svgData.lowCostAmount / 100;
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
        WY.postFile('/file/api' , data , function(a){
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
        var data = {
          blackPath:this.autoBackList.filter(function(a){return a.code ==='back'}).pop().img,
          perPath:this.autoBackList.filter(function(a){return a.code ==='main'}).pop().img,
          supplierId:WY.hrefData.supplierId,
        };
        WY.post('/server/admin/seat/fileAdd' , data , function(a){
          if(a.code === 0){
            that.setBackImg(that.autoBackList , 0);
          }
        })
      }
    }
  }
}
