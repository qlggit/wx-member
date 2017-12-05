function prop(obj , key , func){
  if(!obj.prototype[key]){
    obj.prototype[key] = func;
  }
}
prop(Number , 'toMoney' , function(){
  return this.toFixed(2) - 0;
});
prop(Number , 'turnMoney' , function(){
  return (this/100).toFixed(2);
});
prop(String , 'turnMoney' , function(){
  return (this/100).toFixed(2);
});
prop(Array , 'every' , function(func){
  for(var i=0;i<this.length;i++){
     if(func(this[i] , i) === false)return false;
  }
  return true;
});
prop(String , 'padStart' , function(num , split){
  split = split || ' ';
  return (Array(num + 1).join(split) + this).slice(-num);
});
prop(Number , 'padStart' , String.prototype.padStart);
if(!Object.assign)Object.assign = function(a , b){
  if(b)for(var i in b){
    if(b.hasOwnProperty(i))a[i] = b[i];
  }
};
