/**
 * 表单验证配置
 * 1、用户名不能为空，长度为2-6为
 * 2、密码不能为空，长度为6-12为
 */
$("#form").bootstrapValidator({
   //2. 指定校验时的图标显示，默认是bootstrap风格
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',//效验成功
    invalid: 'glyphicon glyphicon-remove',//校验失败
    validating: 'glyphicon glyphicon-refresh'//校验中
  },

  //指定效验字段,input 设置name
  fields:{
    username:{
      //效验规则
      validators:{
        //非空效验
        notEmpty:{
          message:"请输入用户名"
        },
        //长度效验
        stringLength:{
          min:2,
          max:6,
          message:"用户名不能超过2-6位"
        },
        //callback 专门用来配置回调的message
        callback:{
          message:"用户名不存在"
        }
      }
    },
    password:{
      validators:{
        //非空效验
        notEmpty:{
          message:"密码不能为空"
        },
        //长度效验
        stringLength:{
          min:6,
          max:12,
          message:"密码不能超过6-12位"
        },
        callback:{
          message:"密码错误"
        }
      }
    }
  }
});

/**
 * 提交功能：
 * 效验成功后会触发一个事件，表单验证成功事件
 * 默认是提交表单，页面会跳转
 * 我们需要注册表单验证成功事件，在成功事件中，阻止默认的提交，要通过ajax提交
 */
$("#form").on("success.form.bv",function(e){
  // return false 没有语义性
  e.preventDefault();
  // console.log("默认行为被阻止了，要通过ajax提交");

  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.error==1000){
        /**
         * 更新当前input的效验转态
         * updateStatus（filed,status,validator）
         * file 字段名 password username
         * status 状态：INVALID(效验失败) NOT—_VALIDATED（未校验） VALIDATING(效验中)
         * validator 配置效验规则,如果没有效验规则，会显示所有错误
         */
  
        $("#form").data("bootstrapValidator").updateStatus("username", "INVALID","callback");
        return ;
      }
      if(info.error==1001){
        // 错误提示
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        return ;
      }
      if(info.success){
        //登录成功
        location.href="index.html";
      }
    }
  })
});

/**
 * 重置按钮功能
 */
$("[type='reset']").click(function(){
  //获取表单验证的实例
  /**
   * resetForm(booleab)
   * resetForm()只重置状态
   * resetForm(true)重置内容和状态
   */
 var boots= $("#form").data("bootstrapValidator");
 boots.resetForm();
})