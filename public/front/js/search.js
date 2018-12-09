/**
 * 由于都是本地存储，可以约定一个键名：search_list
 * 下面三句话, 用于在控制台执行, 添加假数据
   var arr = ["张三", "李四", "王五", "赵六" ];
   var jsonStr = JSON.stringify( arr );
   localStorage.setItem( 'search_list', jsonStr );
 * 
 */

/**
 * 功能1：获取所有搜索历史 完成渲染功能
 * （1）获取所有本地历史，得到jsonStr
 * （2）将jsonStr转成数组
 * （3）根据本地模板引擎徐然 template（id,对象）
 */
//获取本地历史数组 search_list是约定俗称的假设键
function getHistor() {
  var jsonStr = localStorage.getItem("search_list") || "[]";
  var arr = JSON.parse(jsonStr);
  return arr;
}
//获取本地历史的数组 并且根据数组进渲染
function render() {
  var arr = getHistor();
  console.log(arr);
  //利用模板引擎渲染
  var htmlStr = template("historyTmp", {
    list: arr
  });
  $(".histroy").html(htmlStr);
}
render();
/**
 * 功能2、清空所有
 * （1）给清空所有的添加点击事件（事件委托）
 * （1）利用removeItem清除search_list
 * （1）重新渲染
 * 确认框：
 *   mui.confirm("确认框内容", "确认框的标题", 按钮的文本数组, 关闭模态框的回调函数）
 */
$(".histroy").on("click", ".ch", function () {
  mui.confirm("你确定要清空历史记录吗?", "文星提示", ["取消", "确认"], function (e) {
    // console.log(e.index);
    if (e.index === 1) {
      localStorage.removeItem("search_list");
      render();
    }
  });
})

/**
 * 功能3、删除单个记录
 * 给所有的删除按钮添加事件委托
 * 获取数组 根据下标 将数组对应项删除
 * 转成json字符串 存储到本地
 * 重新渲染
 * 
 * getHistor()获取历史记录
 * 删除对应项：splice(开始，删除几个 替换项 )
 * 替换      arr.splice(开始，替换项 ，   )
 */

$(".histroy").on("click", ".delete", function (e) {

  var arr = getHistor();
  //获取下标
  var index = $(this).data("id");
  //splice("从哪开始","删除几个","替换项")
  arr.splice(index, 1)
  var jsonStr = JSON.stringify(arr);
  localStorage.setItem("search_list", jsonStr);
  render();
})


/**
 * 功能4、添加单个历史记录
 *   给搜索按钮，添加点击事件
 *   获取搜索关键字 var key=$(".seacch/-input").val();
 * 
 *   判断 删除重复项 arr.indexOf(key)
 *   如果超过10个 保留新的 删除最后 if(arr.length>=10){arr.pop()}
 *   获取数组 往数组里添加 un`shift arr.unshift(key)
 *   转成jsonStr字符串 存储到本地  localStorage.seteItem("search_list",JSON.stringify(arr));
 *   重新渲染 render()
 *   重置搜索框  reset()
 */
    $(".search_btn").on("click",function(){
      // alert(1);
      var key=$(".search_input").val().trim();
      if(key==""){
        //提示框
        mui.toast("请输入搜索关键字");
        return ;
      }
      //获取数组
      var arr=getHistor();
      //（1）判断是否有重复项，如果有将重复项删除
      var index=arr.indexOf(key);//有返回这个数的下标没有返回-1
      if(index!==-1){
        // splice("从哪开始","删几个","替换项");
        arr.splice(index,1);
      }
      //（2）如果长度超过10个 保留最前面，删除最后面
      if(arr.length>0){
        arr.pop();
      }
        //添加搜索历史
        arr.unshift(key);
        //转json字符串
        var jsonStr=JSON.stringify(arr);
        //存入本地
        localStorage.setItem("search_list",jsonStr);
        render();
        //重置搜索框
        $("[type='search']").val("");
        //跳转页面
        location.href="searchList.html?key="+key;

    });

