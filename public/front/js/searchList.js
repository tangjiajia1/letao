//获取地址栏参数
function getSearch(k){
  var str=location.search;
  str=decodeURI(str);
  str=str.slice(1);
  var arr=str.split("&");
  var obj={};
  arr.forEach(function(v,i){
    var key=v.split("=")[0];
    var value=v.split("=")[1];
    obj[key]=value;
  })
  return obj[k];
}

$(function(){
  //功能1、获取地址栏参数 赋值到input框中 渲染
  var key=getSearch("key");
  $(".search_input").val(key);

  render();

  //功能2、给搜索功能注册点击事件
  $(".search_btn").on("click",function(){
    render();
  })

  /**
   * 功能3、排序功能
   * 如果当前按钮没有 active类 给当前按钮添加active类
   * 如果当前按钮有 active类 切换箭头的方向
   */
  $(".title li a[data-type]").on("click",function(){
    if($(this).hasClass("active")){
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
      render();
    }else{
      $(this).addClass("active").parent().siblings().children().removeClass("active");
    }

  })
  //发送ajax渲染
  function render(){
//重新渲染之前 应该显示加载中的效果
$(".productor").html(' <div class="loading"></div>');

        //三个必传参
    var params={};
    params.proName=$(".search_input").val();
    params.page=1;
    params.pageSize=100;

    //两个可传参数,通过判断a有没有高亮 觉得需不需要传数
    var $active=$(".title li a.active");
    if($active.length==1){//如果有这个类 就为1 没有为0
      console.log("有高亮显示，需要排序");
      var sortName=$active.data("type");//通过价格排序
      //1为升序 2为降序
      var sortValue=$active.find("i").hasClass("fa-angle-down")?2:1;
      console.log(sortValue);
      //传递参数 拼接到obj中
      params[sortName]=sortValue;
    }
    
      setTimeout(function(){
        $.ajax({
          type:"get",
          url:"/product/queryProduct",
          data:params,
          dataType:"json",
          success:function(info){
            console.log(info);
            var htmlStr=template("proTmp",info);
            $(".productor").html(htmlStr);
          }
    
        });
      },1000);
  }

})

