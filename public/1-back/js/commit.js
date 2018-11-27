

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
    setTimeout(function(){//模拟网络延迟时间
      NProgress.done();
    },1000);
 
  });


 /**
  * 退出功能：
  *  添加模态框
  * 属性：modal-lg
  *       midal-sm
  *       默认 中
  * 
  * 
  * 
  * 点击退出模态框按钮，完成退出
  * 1、发生ajax请求，让后台销毁sessionId 
  *  登录拦截
  */
