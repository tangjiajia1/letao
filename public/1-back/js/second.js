$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //通过ajax渲染页码
  render();

  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template("secondTmp", info);
        $("tbody").html(htmlStr);

        //分页插件配置
        $("#paginator").bootstrapPaginator({
          //配置版本号
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPage: Math.ceil(info.total / info.size),
          //给每个页码注册点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage: page;
            render();
          }
        })
      }
    })
  }
  /**
   * 2、点击添加分类，显示添加模态框
   * （1）一级分类，渲染下拉框
   */
  $("#addBtn").on("click", function () {
    $("#secondModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template("addTmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })

  });
  /**
   * 3、通过事件委托 给a添加点击事件
   *     获取选中的文本
   *     获取自定义属性中的id
   *     修改文本内容
   *     将选中的 id 设置到 input 表单元素中
   * 
   * 校验状态设置updateStatus(field, status, validatorName)
   *   参数1：字段 name值
   *   参数2：校验状态VALID
   *   参数3：配置规则，回调函数调用
   * 
   */
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    var id = $(this).data("id");
    //  console.log($(this).data("id"));
    //  console.log($(this).text);
    $("#spanText").text(txt);
    $("#cate").val(id);

    //校验状态
     var validator= $("#form").data('bootstrapValidator');
     validator.updateStatus("categoryId","VALID");
  })
  /**
   * 配置上传图片 fileupload插件用法
   *  $("#fileupload").fileupload({
   *    dataType:"json",
   *    done:function(e,data){....}
   *    e:事件对象
   *    data:图片上传后台的对象，通过data.result.picAddr可以获取上传后的图片地 
   * } 
   */
      $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
          // console.log(data);
          //获取上传图片
          var picAddr = data.result.picAddr;
          $("#imgBox img").attr("src", picAddr);
          $("[name='brandLogo']").val(picAddr);
          //重置校验状态
          // 在配置表单之后
          $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
      })

      // 5. 配置表单校验
    $("#form").bootstrapValidator({
      //指定不校验的类型
      excluded:[],

      //指定校验时的图标显示
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      //指定校验字段
      fields:{
        categoryId:{
          validators:{
            notEmpty:{
              message:"请选择一级分类"
            }
          }
        },
        brandName:{
         validators:{
           notEmpty:{
            message:"请输入二级分类名称"
           }
         }
        },
        brandLogo:{
          validators:{
            notEmpty:{
              message:"请上传图片"
            }
          }
        }
      }
     
    })


//6 注册表单验证成功事件，阻止默认提交
    $('#form').on("success.form.bv",function(e){
      e.preventDefault();

      $.ajax({
        type:"post",
        url:"/category/addSecondCategory",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.success){
            $("#secondModal").modal("hide");
            currentPage:1,
            render();

            //重置表单内容和状态 resetForm（true)
            $("#form").data("bootstrapValidator").resetForm(true);

            //手动重置菜单和图片
            $("#spanTextText").text("请选择1级分类");
            $("#imgBox img").attr("src","");
          }
        }
        
      })
    })

  






})