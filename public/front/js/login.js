$(function(){
  //点击登录按钮时，获取用户名和密码 发送ajax 进行登录
  $("#loginBtn").on("click",function(){
    var username=$("#username").val().trim();
    var password=$("#password").val().trim();
    console.log(username,password);
    if(username===""){
      mui.toast("请输入用户名");
      return ;
    }
    if(password===""){
      mui.toast("请输入密码");
      return ;
    }
    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.error===403){
          mui.toast("用户名和密码错误");
          return;
        }
        if(info.success){
          /**
           * 登录成功
           * 1、如果有传参 需要跳转回去
           * 2、如果没有传参 正常跳转用户中心
           */
          if(location.search.indexOf("retUrl")!=-1){
            //有传参
            var retUrl=location.search.replace("?retUrl=","");
            // console.log(retUrl);
             location.href=retUrl;
          }else{
            location.href = "user.html";
          }
        }
      }
    })
  })
})