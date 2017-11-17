function dateTimer(ele , time , call){
  this.ele = ele;
  this.oldHtml = ele.value;
  this.allTime = time;
  this.call = call;
  this.timer();
}
dateTimer.prototype = {
  timer:function(){
    console.log(this.allTime);
    this.ele.value = this.allTime + '秒后发送';
    this.allTime --;
    if(this.allTime <= 0){
      console.log('timer done');
      this.ele.value = this.oldHtml;
      this.call();
    }else{
      setTimeout(this.timer.bind(this),1000);
    }
  }
};
export  default function(ele , time , call){
  new dateTimer(ele , time , call);
}
