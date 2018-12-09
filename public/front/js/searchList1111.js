  /**
   * 标准语法
   * {{ }}
   * 原生语法
   *  <%= user %>
   */

/**
 *          封装解析地址
 * 地址：xxx.html?key=耐克&age=18&desc=帅
 * 将抵制栏参数解析 获取所有的键值数据 解析一个对象
 * 对象格式：{key:"耐克",age:18,desc:"帅"}
 * 
 * .slice( start, end ) 包括start 不包括end
 */
function getSearch(k){
  //获取地址栏
  var str=location.search;
  //解码中文
  str=decodeURI(str);
  //去掉问好
  str=str.slice(1); // "key=耐克&age=18&desc=帅"
  //将字符串分割成数组
  var arr=str.split("&");//["key=耐克", "age=18", "desc=帅"]
  var obj={};
  //遍历数组 取得键 值
  arr.forEach(function(v,i){
    var key=v.split("=")[0]//age
    var value=v.split("=")[1]//18
    obj[key]=value;//{key: "ee"}
  })
  return obj[k];
}
  // var age=getSearch("key");//age??
  // console.log(age);

$(function(){

  //1、获取地址栏中的搜索关键字
  var key=getSearch("key");
  //2、 给搜索框赋值
  $(".search_input").val(key);
  //3、发送ajax 获取商品列表数据 进行页面渲染
  render();


  /**
   * 功能1：解析地址栏参数，将参数赋值到input
   * 通过location.search得到地址栏中的地址？后的内容
   * 通过decodeURL(location.search)解码
   */
  render();
  function render(){
    
    // 三个必传的参数
    var params={};
    params.proName=$(".search_input").val().trim();
    params.page=1;
    params.pageSize=100;
    //两个用于排序的可选参数   通过 有没有 高亮的 a 决定是否需要排序
    var $active=$(".title li a.active");
    if($active.length>0){
      console.log("当前a有active类需要排序");
      var sortName=$active.data("type");//按价格排序
      var sortValue=$active.find("i").hasClass("fa-angle-down")?2:1;
      //将需要排序的参数 拼接到obj中
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
      })
    },1000);
     
    }
    

    //功能2 给搜索按钮添加搜索功能  实现搜索功能
   
    $(".search_btn").click(function(){
      var key=$(".search_input").val().trim();
      //获取数组
      var jsonStr=localStorage.getItem("search_list");
      var arr=JSON.parse(jsonStr);
      console.log(typeof(arr));
         // 1. 不能重复
      var index = arr.indexOf( key );
      if ( index > -1 ) {
        // 已经存在, 删除该项
        arr.splice( index, 1 );
      }
      //2. 不能超过10个
      if ( arr.length >= 10 ) {
        arr.pop();
      }
      //将搜索关键字添加到最前面
      arr.unshift(key);
      //转存本地
      localStorage.getItem("search_list",JSON.stringify("arr"));
      render();
    })

    // 功能3: 点击价格或者库存, 切换current, 实现排序
  // 1. 绑定点击事件, 通过 a[data-type] 绑定
  // 2. 切换 current类
  //    (1)点击的a标签没有current类, 直接加上 current类, 并且移除其他 a 的current类
  //    (2)点击的a标签有current类, 切换箭头方向
  // 3. 调用 render 重新渲染
    $(".title li").on("click",function(){
      $(this).children().addClass("active").parent().siblings().children().removeClass("active");
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    })
      render();
})