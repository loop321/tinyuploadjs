<h1>tinyuploadjs</h1>
- jquery��� 
- �ϴ��ļ����
- ֧��bootstrap��weui
- С��

���ӣ�
~~~
<div id="img"></div>
<script>
	$("#img").upload({action:"/upload?_new="+new Date().getTime()});
	
	��

	var option={
		/*
		btnname:"�ϴ���Ƭ",
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