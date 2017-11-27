var PictureClip = (function() {
	var PictureClip = function(Setting) {

		this.pictureClipBox = $("#pictureClipBox");
		this.pictureClipBoxWidth = $("#pictureClipBox")[0].offsetWidth;
		this.pictureClipBoxHeight = $("#pictureClipBox")[0].offsetHeight;
		this.pictureClipBoxOffsetLeft = this.GetPosition(this.pictureClipBox[0]).left;
		this.pictureClipBoxOffsetTop = this.GetPosition(this.pictureClipBox[0]).top;
		
		this.pictureClipimg1 = this.pictureClipBox.children("#pictureClip-img1");
		this.pictureClipimg2 = this.pictureClipBox.children("#pictureClip-img2");
		this.pictureClipimg3 = $("#pictureClip-img3");
		
		this.uploadPicBtn=$("#PictureUpload");
		

		this.pictureClipMoveClipBox = $("#pictureClip-MoveClipBox");
		this.lineBar = this.pictureClipMoveClipBox.children(".lineBar");

		this.lefttopClip = $(".left-top-Clip");
		this.middletopClip = $(".middle-top-Clip");
		this.righttopClip = $(".right-top-Clip");
		this.leftmiddleClip = $(".left-middle-Clip");
		this.rightmiddleClip = $(".right-middle-Clip");
		this.leftbottomClip = $(".left-bottom-Clip");
		this.middlebottomClip = $(".middle-bottom-Clip");
		this.rightbottomClip = $(".right-bottom-Clip");

		this.isKeyDown = false;
		this.KeyDowntype = null;

		this.setting = {
			Dottedline: true
		};
		$.extend(this.setting, Setting);

		this.Main();
	};

	PictureClip.prototype = {
		GetPosition: function(node) {
			var left = node.offsetLeft;
			var top = node.offsetTop;
			var parent = node.offsetParent;
			while(parent != null) {
				left += parent.offsetLeft;
				top += parent.offsetTop;
				parent = parent.offsetParent;
			}
			return {
				"left": left,
				"top": top
			};
		},
		DottedlineOrNot: function() {
			if(this.setting.Dottedline) {
				this.lineBar.addClass("active");
			} else {
				this.lineBar.removeClass("active");
			}
		},
		ClipBoxMousedown: function() {
			var _this_ = this;

			this.lefttopClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "lt";
				event.stopPropagation();
			});
			this.middletopClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "mt";
				event.stopPropagation();
			});
			this.righttopClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "rt";
				event.stopPropagation();
			});
			this.leftmiddleClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "lm";
				event.stopPropagation();
			});
			this.rightmiddleClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "rm";
				event.stopPropagation();
			});
			this.leftbottomClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "lb";
				event.stopPropagation();
			});
			this.middlebottomClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "mb";
				event.stopPropagation();
			});
			this.rightbottomClip.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "rb";
				event.stopPropagation();
			});

			this.pictureClipMoveClipBox.on("mousedown", function(event) {
				_this_.isKeyDown = true;
				_this_.KeyDowntype = "move";
				event.stopPropagation();
			});

			window.onmouseup = function(event) {
				_this_.isKeyDown = false;
			}

		},
		ClipBoxMouseMove: function() {
			var _this_ = this;

			this.pictureClipBox.on("mousemove", function(event) {
				var EventClientY = event.clientY;
				var EventClientX = event.clientX;

				if(_this_.isKeyDown) {
					switch(_this_.KeyDowntype) {
						case "move":
							_this_.Move(EventClientX, EventClientY);
							break;
						case "lt":
							_this_.Top(EventClientY);
							_this_.Left(EventClientX);
							break;
						case "mt":
							_this_.Top(EventClientY);
							break;
						case "rt":
							_this_.Top(EventClientY);
							_this_.Right(EventClientX);
							break;
						case "lm":
							_this_.Left(EventClientX);
							break;
						case "rm":
							_this_.Right(EventClientX);
							break;
						case "lb":
							_this_.Left(EventClientX);
							_this_.Bottom(EventClientY);
							break;
						case "mb":
							_this_.Bottom(EventClientY);
							break;
						case "rb":
							_this_.Right(EventClientX);
							_this_.Bottom(EventClientY);
							break;
						default:
							break;
					}
					//截图改变
					_this_.ClipResize();
					_this_.PreView();
				}

			});
		},
		Left: function(X) {
			if((X - this.pictureClipBoxOffsetLeft) < 0 || (X - this.pictureClipBoxOffsetLeft) > this.pictureClipBoxWidth) {
				return;
			}
			var picMoveWidth = this.pictureClipMoveClipBox.width();
			var picMoveLeft = this.GetPosition(this.pictureClipMoveClipBox[0]).left;
			var NewPicMoveLeft = (X - this.pictureClipBoxOffsetLeft);
			this.pictureClipMoveClipBox[0].style.left = NewPicMoveLeft + "px";
			this.pictureClipMoveClipBox[0].style.width = picMoveWidth + (picMoveLeft - X) + "px";
		},
		Right: function(X) {
			if((X - this.pictureClipBoxOffsetLeft) < 0 || (X - this.pictureClipBoxOffsetLeft) > this.pictureClipBoxWidth) {
				return;
			}
			var picMoveWidth = this.pictureClipMoveClipBox.width();
			var picMoveLeft = this.GetPosition(this.pictureClipMoveClipBox[0]).left;

			if(X < picMoveLeft) {
				this.pictureClipMoveClipBox[0].style.left = X + "px";
			}

			var NewpicMovewidth = (X - picMoveLeft);
			this.pictureClipMoveClipBox[0].style.width = NewpicMovewidth + "px";
		},
		Top: function(Y) {
			var picMoveheight = this.pictureClipMoveClipBox.height();
			var picMoveTop = this.GetPosition(this.pictureClipMoveClipBox[0]).top;
			var NewPicMoveTop = (Y - this.pictureClipBoxOffsetTop);
			this.pictureClipMoveClipBox[0].style.top = NewPicMoveTop + "px";
			this.pictureClipMoveClipBox[0].style.height = picMoveheight + (picMoveTop - Y) + "px";
		},
		Bottom: function(Y) {
			if((Y - this.pictureClipBoxOffsetTop) < 0 || (Y - this.pictureClipBoxOffsetTop) > this.pictureClipBoxHeight) {
				return;
			}

			var picMoveheight = this.pictureClipMoveClipBox.height();
			var picMoveTop = this.GetPosition(this.pictureClipMoveClipBox[0]).top;

			if(Y < picMoveTop) {
				this.pictureClipMoveClipBox[0].style.top = Y + "px";
			}

			var NewpicMoveheight = (Y - picMoveTop);
			this.pictureClipMoveClipBox[0].style.height = NewpicMoveheight + "px";
		},
		Move: function(X, Y) {
			var BoxMoveWidth = this.pictureClipMoveClipBox.width();
			var BoxMoveHeight = this.pictureClipMoveClipBox.height();

			var NewLeft = X - this.pictureClipBoxOffsetLeft - (BoxMoveWidth / 2);
			var NewTop = Y - this.pictureClipBoxOffsetTop - (BoxMoveHeight / 2);

			if((Y - (BoxMoveHeight / 2) - this.pictureClipBoxOffsetTop) > 0 && (Y + (BoxMoveHeight / 2) - this.pictureClipBoxOffsetTop) < this.pictureClipBoxHeight) {
				this.pictureClipMoveClipBox[0].style.top = NewTop + "px";
			}

			if((X - (BoxMoveWidth / 2) - this.pictureClipBoxOffsetLeft) > 0 && (X + (BoxMoveWidth / 2) - this.pictureClipBoxOffsetLeft) < this.pictureClipBoxWidth) {
				this.pictureClipMoveClipBox[0].style.left = NewLeft + "px";
			}

		},
		ClipResize: function() {
			var BoxMovetop = this.GetPosition(this.pictureClipMoveClipBox[0]).top;
			var BoxMoveleft = this.GetPosition(this.pictureClipMoveClipBox[0]).left;

			var BoxMoveWidth = this.pictureClipMoveClipBox.width();
			var BoxMoveHeight = this.pictureClipMoveClipBox.height();

			var top = BoxMovetop - this.pictureClipBoxOffsetTop;
			var left = BoxMoveleft - this.pictureClipBoxOffsetLeft;
			var right = left + BoxMoveWidth;
			var bottom = top + BoxMoveHeight;

			this.pictureClipimg2[0].style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
		},
		PreView: function() {
			var BoxMovetop = this.GetPosition(this.pictureClipMoveClipBox[0]).top;
			var BoxMoveleft = this.GetPosition(this.pictureClipMoveClipBox[0]).left;

			var BoxMoveWidth = this.pictureClipMoveClipBox.width();
			var BoxMoveHeight = this.pictureClipMoveClipBox.height();

			var top = BoxMovetop - this.pictureClipBoxOffsetTop;
			var left = BoxMoveleft - this.pictureClipBoxOffsetLeft;
			var right = left + BoxMoveWidth;
			var bottom = top + BoxMoveHeight;

			this.pictureClipimg3[0].style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
		},
		BtnPriview: function(fileObj, imgPreviewId, divPreviewId) {
			var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;  
			var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
			var browserVersion = window.navigator.userAgent.toUpperCase();
			if(allowExtention.indexOf(extention) > -1) {
				if(fileObj.files) { //HTML5实现预览，兼容chrome、火狐7+等  
					if(window.FileReader) {
						var reader = new FileReader();
						reader.onload = function(e) {
							document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
						}
						reader.readAsDataURL(fileObj.files[0]);
					} else if(browserVersion.indexOf("SAFARI") > -1) {
						alert("不支持Safari6.0以下浏览器的图片预览!");
					}
				} else if(browserVersion.indexOf("MSIE") > -1) {
					if(browserVersion.indexOf("MSIE 6") > -1) { //ie6  
						document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
					} else { //ie[7-9]  
						fileObj.select();
						if(browserVersion.indexOf("MSIE 9") > -1)
							fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问  
						var newPreview = document.getElementById(divPreviewId + "New");
						if(newPreview == null) {
							newPreview = document.createElement("div");
							newPreview.setAttribute("id", divPreviewId + "New");
							newPreview.style.width = document.getElementById(imgPreviewId).width + "px";
							newPreview.style.height = document.getElementById(imgPreviewId).height + "px";
							newPreview.style.border = "solid 1px #d2e2e2";
						}
						newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
						var tempDivPreview = document.getElementById(divPreviewId);
						tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
						tempDivPreview.style.display = "none";
					}
				} else if(browserVersion.indexOf("FIREFOX") > -1) { //firefox  
					var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
					if(firefoxVersion < 7) { //firefox7以下版本  
						document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
					} else { //firefox7.0+                      
						document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
					}
				} else {
					document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
				}
			} else {
				alert("仅支持" + allowExtention + "为后缀名的文件!");
				fileObj.value = ""; //清空选中文件  
				if(browserVersion.indexOf("MSIE") > -1) {
					fileObj.select();
					document.selection.clear();
				}
				fileObj.outerHTML = fileObj.outerHTML;
			}
		},
		BtnChangeImage:function(){
			var _this_=this;
			this.uploadPicBtn.on("change",function(){
				if($(this).val()==""){
					return;
				}
				_this_.BtnPriview(this,"pictureClip-img1","pictureClip-img1");
				_this_.BtnPriview(this,"pictureClip-img2","pictureClip-img2");
				_this_.BtnPriview(this,"pictureClip-img3","pictureClip-img3");
			});
		},
		SelectFalse: function() {
			document.oncontextmenu = new Function("event.returnValue=false;");
			document.onselectstart = new Function("event.returnValue=false;");
		},
		Main: function() {
			//选中问题
			this.SelectFalse();
			//是否加虚线
			this.DottedlineOrNot();
			//控制鼠标点击事件
			this.ClipBoxMousedown();
			//裁剪盒子移动
			this.ClipBoxMouseMove();
			//按鈕改變
			this.BtnChangeImage();

		}

	};

	return PictureClip;
}());

;
(function() {
	PictureClip.init = function(Setting) {
		new PictureClip(Setting);
	}
	window.PictureClip = PictureClip;
})(jQuery);