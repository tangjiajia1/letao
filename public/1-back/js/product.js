$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var picArr=[]//专门用来保存图片对象
  //一进页码就开始渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var htmlStr = template("productTmp", info);
        $("tbody").html(htmlStr);

        // console.log($('#paginator'));

        //分页初始化
        $('#paginator').bootstrapPaginator({
          ///指定模板
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //给页码添加点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage= page;
            render();
          }
        })
      }
    })
  };


  //2、点击按钮显示添加模态框
  $("#addBtn").click(function () {
    $("#addModal").modal("show");

    //发送ajax请求 请求二级分类列表数据，渲染下拉菜单
    $.ajax({
      type: "get",
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("addTmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  });
  /**
   * 3、给下拉列表的a添加点击事件（）
   *    （1）下拉列表渲染
   *        获取当前点击的的文本赋值给按钮文本
   *        获取当前点的的id赋值给对应的隐藏域
   */ 
   
      $(".dropdown-menu").on("click","a",function(){
        var txt=$(this).text();
        var id=$(this).data('id');
        $("#spanText").text(txt);
        // 设置隐藏域
        $("[name='brandId']").val(id);
      })
      /*   配置上传图片回调函数  (插件) 
        *   获取图片地址对象data.result
        *   获取图片地址（data.result）.picAddr
        * 新得到的图片对象 应该推到数组的最前面  
        * 
        *  在全局声明一个数组，专门存储用于上传的图片地址 提交到最前面
        * 如果数组的长度大于3 移除最后一项，去掉最后一张图片
        */ 
       $("#fileupload").fileupload({
         dataType:"json",
         done:function(e,data){
           console.log(data);
           
          //获取图片地址对象
          var picObj=data.result;
          console.log(picObj);
          //得到图片地址
          var picAddr=picObj.picAddr;

          //新得到的图片对象，应该推到数组对象picArr的最前面 push pop unshif shif
          picArr.unshift(picObj);
          //新得到的图片 应该添加到imgBox最前面
          $("#imgBox").prepend('<img src="'+picAddr+'" width="100">');
          //如果上传的图片个数大于3个，需要将最后的那个删除
          if(picArr.length>3){
            picArr.pop();
            //除了删除数组的最后一项 还需要将页面中渲染的最后一张图片删掉
            // 通过 :last-of-type 找到imgBox盒子中所有img类型中的最后一个 img 类型的标签, 让他自杀
            $("#imgBox img:last-of-type").remove();
            
          }

          //如果处理后，图片的数组的长度为3 说明已经选择了三张图片，可以进行提交
          //将表单 picStatus 的校验状态 设置VALID
          if(picArr.length==3){
          //出现在表单校验之后
           $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
          }
         }
       })
   /* 5、配置表单校验
   *     隐藏域校验  excluded:[]
   *     配置校验图标 feedbackIcons
   *     配置校验字段
   *        非空校验
   *        正则校验
   *          商品库存
   *         要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
   *         数字: \d
   *         + 表示一个或多个
   *         * 表示零个或多个
   *         ? 表示零个或1个
   *         {n} 表示出现 n 次
   *         
   *  图片隐藏域校验，在图片框下设置一个隐藏域
   *如果上传的文件满了三张 让当前的隐藏域的校验状态更新valID
   *      6、注册表单验证成功事件
   * 拼接图片数据：
   * key=value&key1=value1&key2=value2;
   *      
   */
       $("#form").bootstrapValidator({
         //将默认项排除
         excluded:[],
         //配置图标
         feedbackIcons:{
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
         },
         //配置校验字段
         fields:{
          //二级分类 id 
          brandId:{
            validators:{
              notEmpty:{
                message:"请选择二级分类"
              }
            }
          },
          //商品名称
          proName:{
            validators:{
              notEmpty:{
                message:"请输入商品名称"
              }
            }
          },
          //商品描述
          proDesc:{
            validators:{
              notEmpty:{
                message:"请输入商品描述"
              }
            }
          },
          //商品库存
          num:{
            validators:{
              notEmpty:{
                message:"请输入商品库存"
              },
                //正则校验
               regexp:{
                regexp:/^[1-9]\d*$/,
                message:"商品库存格式，必须是非零开头的数字"
             }
          }
         },
          //商品尺码
          size:{
            validators:{
              notEmpty:{
                message:"请输入商品尺码"
              },
              regexp:{
                regexp: /^\d{2}-\d{2}$/,
                message:"鞋码必须是xx-xx格式"
              }
            }
          },
          //商品原价
          oldPrice:{
            validators:{
              notEmpty:{
                message:"请输入商品原价"
              }
            }
          },
          //商品价格
          newPrice:{
            validators:{
              notEmpty:{
                message:"请输入商品价格"
              }
            }
          },
          //标记图片是否上传满3张
          picStatus:{
            validators:{
              notEmpty:{
                message:"请上传3张图片"
              }
            }
          }
         }
       });
       //6注册成功事件
       //提交数据通过提交数组
       $("#form").on("success.form.bv", function( e ) {
          e.preventDefault();
          //表单提交得到的参数字符串
          var params = $('#form').serialize(); 
          /**
           * 需要在参数的基础上拼接这些参数
           * &picName1=xx&picAddr1=xx
           * &picName2=xx&picAddr2=xx
           * &picName3=xx&picAddr3=xx
           */
          params+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
          params+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
          params+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
          console.log($('#form').serialize());
      
      
          $.ajax({
            type:"post",
            url:"/product/addProduct",
            data: params,
            dataType:"json",
            success:function(info){
              console.log(info);
              if(info.success){
                //关闭模态框
                $("#addModal").modal("hide");
                 //重新渲染到第一页
                 currentPage=1;
                 render();
 
                //重置 校验状态和文本内容
                $('#form').data("bootstrapValidator").resetForm(true);
               
                //手动重置下来菜单
                $("#spanText").text("请选择二级分类");
                //删除结构汇总的所有图片
                $("#imgBox img").remove();
                picArr=[];
              }
            }
          })
       })
})
