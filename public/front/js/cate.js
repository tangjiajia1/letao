// 区域滚蛋初始化
mui('.cate-left .mui-scroll-wrapper').scroll({
  deceleration: 0.05, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:false, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});

mui('.cate-right .mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  scrollY: true, //是否竖向滚动
  scrollX: true, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:false, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});



/**
 * 侧边栏模板渲染
 */
function render(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      // console.log(info);
      var htmlStr=template("navTmp",info);
      $(".cate-left ul").html(htmlStr);

      //获取第一个一级分类的id 完成所对应的二级分类的渲染
      renderById(info.rows[0].id);
    }
  })
}
render();

/**
 * 给左侧的所有a添加委托事件
 * 1、让自己高亮，排除其他
 * 2、获取id 渲染二级分类数据
 */
$(".cate-left ul").on("click","a",function(){
  $(this).addClass("active").parent().siblings().children().removeClass("active");
  //获取id并渲染二级分类
  var id=$(this).data("id");
  // console.log(id);
  renderById(id);
})

/**
 *  二级分类渲染
 * 通过一级分类的id 渲染二级分类
 * 
 */
function renderById(id){
 $.ajax({
  type:"get",
  url:"/category/querySecondCategory",
  data:{id:id},
  dataType:"json",
  success:function(info){
    // console.log(info);
    var htmlStr=template("secondTmp",info);
    $(".cate-right ul").html(htmlStr);
  }
 })
}
renderById();

