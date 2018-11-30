

/**
 * 进度条的使用
 * NProgress.start();发起ajax请求时进度条 开始
 * NProgress.done(); ajax请求完进度条     结束
 * 
 * ajax 全局事件
 * .ajaxCommplete() 每个ajax完成时调用（不管是否成）
 * .ajaxSuccess()   每个ajax只要成功了就会调用
 * .ajaxError()     每个ajax只要失败了就会调用
 * .ajaxSend()      每个ajax 发送前调用
 * 
 * .ajaxStart()     第一个ajax 请求开始时调用
 * .ajaxStop()      所有的ajax 请求完成时调用 
 */
//引入了nprogress.js文件后，就有了一个全局对象NProgress对象
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },1000);
  });


$(function(){

  //切换按钮
  $(".category").click(function(){
    $(".category ol").stop().slideToggle();
  })
  /**
 * 左侧按钮 移动功能
 * 1、点击左侧添加三个类名
 * 2、让侧栏的left=-180px
 * 3、让tobar的padding-left=0
 * 4、让le_main的padding-left=0;
 */
$(".le_left").click(function(){
  $(".le_topbar").toggleClass("hidemun");
  $(".le_aside").toggleClass("hidemun");
  $(".le_main").toggleClass("hidemun");
})
/**
* 右侧按钮 退出功能
*  添加模态框
* 属性：modal-lg
*       midal-sm
*       默认 中
*  开启模态框 data-toggle="modal"
* 关闭模态框  data-dismiss="modal"
*  
* 
* 点击退出模态框按钮，完成退出
* 1、发生ajax请求，让后台销毁sessionId 
* 2、 登录拦截
*/


 //点击右侧按钮，显示模态框
 $(".le_right").click(function(){
   $("#myModal").modal("show");
 })

 $("#back").click(function(){
   $.ajax({
     type:"get",
     url:"/employee/employeeLogout",
     dataType:"json",
     success:function(info){
      // console.log(info);
      if(info.success){
        //退出成功跳转页面
        location.href="login.html";
      }
     }
   })
 })
})

