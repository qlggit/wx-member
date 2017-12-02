function prop(obj , key , func){
  if(!obj.prototype[key]){
    obj.prototype[key] = func;
  }
}
prop(Number , 'toMoney' , function(){
  return this.toFixed(2) - 0;
});
