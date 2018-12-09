$(function(){
  
  /**
   *  动态渲染用户信息
   * 1、如果用户未登录 ，后台响应error 提示未登录 应该拦截到登录页
   * 2、如果用户已登录，后台返回用户信息
   */
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    dataType:"json",
    success:function(info){
      console.log(info);
      //如果未登录 拦截到登录页
      if(info.error===400){
        location.href="login.html";
        return ;
      } 
      //已经登录 返回用户信息
      var htmlStr=template("tmp",info);
      $("#userInfo").html(htmlStr);   
    }
  });

  //退出功能
  $("#logout").on("click",function(){
    $.ajax({
      type:"get",
      url:"/user/logout",
      dataType:"json",
      success:function(info){
      console.log(info);
      location.href="login.html";
      }
    })
  })
})