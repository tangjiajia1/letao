$(function(){
  //声明全局变量 当前页currentPage和每页的条数pageSize
var currentPage=1;
var pageSize=5;

  //一进页面发送ajax请求，渲染表格
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        //在模板中可以任意使用对象中的属性
        //isDelete 表示用户的启用状态，1表禁用，2表启用
        var htmlStr=template("tmp",info);
        $("tbody").html(htmlStr);

         /**
         * 配置分页插件
         * bootstrapMaiorVersion:版本号
         * currentPage：当前页
         * totalPages：总页数
         *  size 设置控件大小
         * onPageClicked:function(event,originalEvent,type,page) 绑定点击事件
         */
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//版本号
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          // size:"small",//设置控件的大小
          onPageClicked:function(event,originalEvent,type,page){
            //// page 当前点击的页码
            currentPage = page;
            render();
          }
        });
      }
    })
  }
 
  
  /**
   * 2 通过事件委托给 按钮注册点击事件
   *    弹出模态框
   *    获取用户的id
   *    发送ajax请求后台设置
   */
  $("tbody").on("click",".btn",function(){
    $("#userModal").modal("show");
    var id=$(this).parent().data("id");
    var isDelete=$(this).hasClass("btn-success")?1:0;
    // console.log(id);
    // console.log(isDelete);

    //先解绑上一个按钮事件，再绑定事件，可以保证只有一个事件绑定在按钮上
    //点击模态框上确定按钮，关闭模态框重新渲染
    $("#submitBtn").off("click").on("click",function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete,
        },
        dataType:"json",
        success:function(info){
          // console.log(info);
          if(info.success){
            $("#userModal").modal("hide");
            render();
          }
        }
      })

    })
  })
 

  //退出事件

})