$(function(){
  //一进页面就进行渲染
/**
 * 已进入页面就开始渲染
 * 1、未登录 后台返回error 拦截登录到页面
 * 2、已登录 后天返回购物车数据
 */
render();
  function render(){
    $.ajax({
      type:'get',
      url:"/cart/queryCart",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.error==400){
          location.href="login.html?url="+location.href;
          return ;
        }
        //返回的是购物车的数组，需要包装
        var htmlStr=template("tmp",{list:info});
        $(".lt_main ul").html(htmlStr);
      }
    })
  }

  //删除功能
  $(".lt_main ul").on("click",".btn_delete",function(){

     var id=$(this).data("id");
     console.log(id);
    //发送jaax请求
    $.ajax({
      type:"get",
      url: "/cart/deleteCart",
      data:{
        id:[id]
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          render();
        }
      }
    })

  })
})