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
  //获取地址栏参数
  var productorid=getSearch("productorId");
  console.log(productorid);
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:productorid,
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("tmp",info);
      $(".mui-scroll").html(htmlStr);

      // 手动初始化轮播图
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      //手动初始化数字框
      mui(".mui-numbox").numbox();
    }
  });

  //3 给尺码添加可选功能
  $(".lt_main").on("click",".lt_size span",function(){
     // 给当前的添加current类, 移除其他的current类
     $(this).addClass("current").siblings().removeClass("current");
  });

  /**
   * 4 加入购物车功能
   * 收集用户选择的商品信息 发送亲求
   * 收集尺码和数量 
   * 产品id在全局已有
   */
    $("#addCart").click(function(){
      var size=$(".lt_size span.current").text();
      var num=$(".mui-numbox-input").val();
      var productid=getSearch("productorId");
      if(size===null){
        mui.toast("请输入尺码");
        return ;
      }
      $.ajax({
        type:"post",
        url:"/cart/addCart",
        data:{
          productId:productid,
          size:size,
          num:num
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.error===400){
            //由于当前用户未登录 拦截到登录页
            //由于需要在登录完成后跳转回来 所以需要前页的地址作为参数传过去
            location.href="login.html?retUrl="+location.href;
            return ;
          }
          if(info.success){
            //加入购物车 显示确认框
            mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
              if(e.index==0){
                // e.index 点击按钮的下标
                location.href="cart.html";
              }
            })
          }
        }
      })
    })
})