$(function(){
var currentPage=1;
var pageSize=5;
//发送ajax请求
function rander(){
  $.ajax({
    type:"get",
    url:"categury/querySecondCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("tmp",{list:info});
      $("tbody").html(htmlStr);
    }
  })
}

 //分页插件
  // $("#paginator").bootstrapPaginator({
  //   //版本号
  //   bootstrapMajorVersion:3,
  //   currentPage:info.page,
  //   totalPages:Math.ceil(info.total/info.size),
  //   //页码点击事件
  //   onPageClicked:function(a,b,c,page){
  //     currentPage=page;//默认当前页
  //     rander();
  //   }
   
  // })
})