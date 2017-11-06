(function(){
    useValidate.withdraw = {
        validator:function(data , type){
            if(type == 'add'){
                var valid = useValidate.validator({
                    txYbNumber:{
                        required:1,
                        min:1000,
                        max:data.maxYbNumber,
                        requiredMessage:'请输入提现元宝',
                        minMessage:'最小提现元宝'+1000,
                        maxMessage:'超过提现最大元宝'+data.maxYbNumber,
                    },
                    accountNumber:{
                        required:1,
                        requiredMessage:'请输入提现账号',
                    },
                    realName:{
                        required:1,
                        requiredMessage:'请输入提现人',
                    },
                    password:{
                        required:1,
                        requiredMessage:'请输入提现',
                    }
                },data);
                if(valid.valid){
                    if(data.accountType == 'bankCard'){
                        valid =  useValidate.validator({
                            bankName:{
                                required:1,
                                minlength:4,
                                requiredMessage:'请输入提现银行名称',
                                minlengthMessage:'请输入至少4位的银行名称',
                            }
                        },data);
                    }
                }
            }
            return valid;
        }
    };
})();