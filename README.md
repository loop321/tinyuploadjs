<h1>tinyuploadjs</h1>
- jquery插件 
- 上传文件插件
- 支持bootstrap、weui
- 小巧

粟子：
~~~
<div id="img"></div>
<script>
	$("#img").upload({action:"/upload?_new="+new Date().getTime()});
	
	或

	var option={
		/*
		btnname:"上传照片",
		btnClass:"weui-btn weui-btn_mini weui-btn_primary",
		btnCss:{"margin":"5px"},
		action:"/upload?_new="+new Date().getTime(),
		beforeUpload: function(data){
			$("#uploadimg").show()
		},
		afterError:function(data,e){
			$("#uploadimg").hide()
		},
		afterUpload:function(data){ 
			$("#uploadimg").hide()
		}
		*/
	};
	$("#img").upload(option);
</script>
~~~