$(function(){
var currentPage=1;
var pageSize=5;
//发送ajax请求
rander();
function rander(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    dataType:"json",
    success:function(info){
      // console.log(info);
      var htmlStr=template("tmp",info);
      $("tbody").html(htmlStr);

      //分页插件配置
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//版本号
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        //给页码添加点击事件
        onPageClicked:function(a,b,c,page){
          //将选中的页码更新到currentPage
          currentPage:page;
          rander();
        }
      })
    }
  })
}


 //2点击分类按钮，显示模态框
  $(".btn-add").on("click",function(){
   $("#firstModal").modal("show");

   //3、通过效验插件 添加校验功能
    $("#form").bootstrapValidator({
      //配置图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //指定校验字段
      fields:{
        categoryName:{
          validators:{
            notEmpty:{
              message:"请输入一级分类名称"
            },
            stringLength:{
              min:2,
              max:20,
              message:"字段长度必须在2-20个字之间",
            }
          }
        }
      }
    })
  })
      /**
     * 3注册表单校验成功事件
     * 表单校验插件，会在表单提交时 进行校验
     * 如果通过校验，默认会进行提交，需要阻止，通过ajax进行提交
     * 
     * 如果返回成功，关闭模态框 重新渲染
     * 重置表单校验状态和内容
     */
    $("#form").on("success.form.bv",function(e){
      //阻止表单默认事件
      e.preventDefault();
      
      $.ajax({
        type:"post",
        url:"/category/addTopCategory", 
        data:$("#form").serialize(),
       dataType:"json",
        success:function(info){
          // console.log(info);
          // console.log($("#form").serialize());
          if(info.success){
            $("#firstModal").modal("hide");
            rander();
            var validator=$("#form").data("bootstrapValidator");
            validator.resetForm(true);
          }
        }
      })
    })

})