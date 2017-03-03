(function($){
var upload = function (el, options) {
        this.options = options;
        this.$el = $(el);
        this.init();
		upload.prototype.n++;
};
upload.DEFAULT={
	btnname:"上传",//按钮文字
	btnClass:"btn btn-success", //按钮样式 bootstrap或weui等
	btnCss:{"width":"100px","color":"#000"}, //定义css
	name:"upload", //上传表单的name
	action:"/filemanage/upload",
	beforeUpload: function(data){
		console.log("before upload..")
	},
	afterError:function(data){
		console.log("上传出错");
	},
	afterUpload:function(data){ //此处可以重写，上传后的处理
		console.log(data.msg)
	}
}
upload.prototype={
	 n:0
	,reset:function(){
		upload.prototype.n=0;
		this.$el.html("");
	}
	,init : function () {
		var name=this.options.iframename||"_iframe_"+(upload.prototype.n)
		this.$iframe=$('<iframe name="'+name+'" id="'+name+'" style="display:none;"></iframe>');
		this.$iframe.appendTo(this.$el);
		this.$file=$('<input name="'+this.options.name+'" id="'+this.options.name+'" type="file"   style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;opacity:0;"/>');
		this.$form=$('<form id="f_'+name+'" method="post" target="'+name+'" enctype="multipart/form-data"/>')
		$("<input type='hidden' name='type' value='"+this.options.name+"' />").appendTo(this.$form)
		this.$file.appendTo(this.$form)
		this.$btn=$('<a class="'+this.options.btnClass+'" style="display:block;position:relative;text-align:center;"  href="javascript:void(0);" >'+this.options.btnname+'</a>')
		this.$btn.css(this.options.btnCss)
		this.$form.appendTo(this.$btn);
		this.$btn.appendTo(this.$el)
		var thats=this
		this.$file.off('change').on('change',function(){
			var oldData=thats.$btn.data("oldData")
			var val=$(this).val()
			if(val){
				thats.$btn.data("oldData",val)
				thats.options.beforeUpload.call(thats);	
				thats.btnSubmit(name);
			}
		})
	},
	btnSubmit:function(name){
			var self = this,
			iframe = this.$iframe;	
			iframe.bind('load', function() {		
				iframe.unbind();
				var doc=iframe[0].contentDocument || iframe[0].contentWindow.document,
				pre = doc.getElementsByTagName('pre')[0],
				str = '', data;
				if (pre) {
					str = pre.innerHTML;
				} else {
					str = doc.body.innerHTML;
				}
				str = self._unescape(str);
				iframe[0].src = 'javascript:false';
				try{
					data=eval('(' + str + ')');
					self.options.afterUpload.call(self, data);
				}catch(e){
					self.options.afterError.call(self, data);
				}
				//self.$btn.text(self.options.btnname).removeClass("disabled")
			});	
			$("#f_"+name).attr("action",this.options.action).submit()	
			return self;
	},
	_unescape:function(val) {
		return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
	}
}
 $.fn.upload = function (option, _relatedTarget,flag) {
        var value;
        var $this = $(this),
        data = $this.data('upload'),
        options = $.extend({}, upload.DEFAULT,typeof option === 'object' && option);
		
        if (typeof option === 'string') {
                if (!data) {
                    return;
                }
                value = data[option](_relatedTarget);
            }
            if (!data||flag) {//flag是重新生成的意思
                $this.data('upload', new upload(this, options));
            }
        return typeof value === 'undefined' ? data : value;
 };	
})(jQuery)
