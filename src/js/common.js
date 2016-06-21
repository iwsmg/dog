/**
 * Created by XiaoLei on 2015/5/30.
 * QQ:296324745
 */

var pet = {
	
	//路径
	path: "http://test.res.ycnuli.com/res/",
	request: "http://www.ycnuli.com/",

	//load js or css
	loadFile: function (url, callback) {
		var elem;
		if (url.match(/\.js/i)) {
			elem = document.createElement("script");
			elem.src = url;
			document.body.appendChild(elem);
		} else {
			elem = document.createElement("link");
			elem.href = url;
			elem.rel = "stylesheet";
			document.head.appendChild(elem);
		}
		elem.onload = elem.onreadystatechange = function() {
			if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
				if (callback) {
					callback();
				}
			}
		};
	},

	//获取UR参数
	queryString: function(key){
		return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
	},
	//对话框
	alert: function (obj, callback) {
		var content = obj.content || String(obj) || "",
				btnText = obj.btnText || "确定",
				boxClass = obj.boxClass || "",
				alertHtml = '\
				<div class="dialog '+ boxClass +'">\
					<div class="dialog-box">\
						<div class="dialog-detail">' + content + "" + '</div>\
						<div class="dialog-opera">\
							<button class="dialog-btn dialog-btn-close">' + btnText +  '</button>\
						</div>\
					</div>\
					<div class="dialog-overlay"></div>\
				</div>';
		//document.body.insertAdjacentHTML("beforeend", alertHtml);
		$(".dialog").remove();
		$("body").append(alertHtml);
		var dialog = $(".dialog"),
				btnClose = $(".dialog-btn-close");
		btnClose.on("click", function () {
			dialog.remove();
			if (callback) {
				callback();
			}
		});
	},
	confirm: function (obj, callback) {
		var content = obj.content || String(obj) || "",
				okText = obj.okText || "确定",
				cancelText = obj.cancelText || "取消",
				boxClass = obj.boxClass || "",
				confirmHtml = '\
				<div class="dialog '+ boxClass +'">\
					<div class="dialog-box">\
						<div class="dialog-detail">' + content + "" + '</div>\
						<div class="dialog-opera">\
							<button class="dialog-btn dialog-btn-cancel">' + cancelText + '</button>\
							<button class="dialog-btn dialog-btn-ok">' + okText + '</button>\
						</div>\
					</div>\
					<div class="dialog-overlay"></div>\
				</div>';
		$(".dialog").remove();
		$("body").append(confirmHtml);
		var dialog = $(".dialog"),
				btnOk = $(".dialog-btn-ok"),
				btnCancel = $(".dialog-btn-cancel"),
				flag = true,
				oprea = function () {
					dialog.remove();
					if (callback) {
						callback(flag);
					}
				};
		btnOk.on("click", function () {
			flag = true;
			oprea();
		});
		btnCancel.on("click", function () {
			flag = false;
			oprea();
		});
	},
	prompt: function (obj, callback) {
		var content = obj.content || String(obj) || "",
				boxClass = obj.boxClass || "",
				delay = obj.delay || 2000,
				msgHtml = '<div class="dialog-prompt ' + boxClass + '">' + content + '</div>';
		$(".dialog-prompt").remove();
		$("body").append(msgHtml);
		var prompt = $(".dialog-prompt"),
				promptWidth = prompt.width();
		prompt.css({"margin-left": -promptWidth / 2});
		if (delay < 0) return;
		setTimeout(function () {
			prompt.css({ "opacity": 0});
			setTimeout(function () {
				prompt.remove();
				if (callback) {
					callback();
				}
			}, 500);
		}, delay);
	},

	//移动端环境判断
	ua: navigator.userAgent,
	url: window.location.href,
	isShare: function () {
		return this.url.match(/petShareFrom/i);
	},
	isMobile: function () {
		return this.ua.match(/AppleWebKit.*Mobile/i);
	},
	isIos: function () {
		return this.ua.match(/iPhone|iPod|iPad/i);
	},
	isAndroid: function () {
		return this.ua.match(/Android/i)
	},
	isWeixin: function () {
		return this.ua.match(/MicroMessenger/i);
	},

	//rem
	adaptive: function (num, width) {
		var doc = document,
				win = window,
				num = num || 50,
				width = width || 320,
				docElem = doc.documentElement,
				resizeEvent = "orientationchange" in window ? "orientationchange" : "resize",
				recalc = function () {
					var clientWidth = docElem.clientWidth;
					if (!clientWidth) return;
					docElem.style.fontSize = num * (clientWidth / width) + 'px';
				};
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvent, recalc, false);
		doc.addEventListener("DOMContentLoaded", recalc, false);
	},

	//判断是否支持0.5px border
	hair: function () {
		if (window.devicePixelRatio && devicePixelRatio >= 2) {
			var elem = document.createElement('div');
			elem.style.border = '.5px solid transparent';
			document.body.appendChild(elem);
			if (elem.offsetHeight == 1){
				document.querySelector('html').classList.add('hairlines');
			}
			document.body.removeChild(elem);
		}
	}

};

//替换系统默认对话框
window.alert = pet.alert;
window.confirm = pet.confirm;
window.prompt = pet.prompt;

//百度统计代码
window.addEventListener("load", function () {
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = pet.url.indexOf("yc.cn") != -1 ? "//hm.baidu.com/hm.js?d7ed70c0611a1cb1249c6b79ef2f5951" : "//hm.baidu.com/hm.js?51928fe35afbc49d22c0daf9a01c6ffa";
		document.body.appendChild(hm);
	})();

	var _mvq = window._mvq || [];
	window._mvq = _mvq;
	_mvq.push(['$setAccount', 'm-200066-0']);
	_mvq.push(['$setGeneral', 'register', '', /*有宠yourpet*/ '', /*2587336351*/ '']);
 	_mvq.push(['$logConversion']);

	var _mvqt = window._mvqt || [];
	window._mvqt = _mvqt;
	_mvqt.push(['$setAccount', 'm-200066-0']);
	_mvqt.push(['$setGeneral', '', '', /*有宠yourpet*/ '', /*2587336351*/ '']);
	_mvqt.push(['$logConversion']);
	(function() {
		var mvl = document.createElement('script');
		mvl.type = 'text/javascript'; mvl.async = true;
		mvl.src = ('https:' == document.location.protocol ? 'https://static-ssl.mediav.com/mvl.js' : 'http://static.mediav.com/mvl.js');
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(mvl, s);
	})();
});

/**
 title:"xxx"
 content:"你获得了胜利" //分享类容
 icon:"http://1223232.jpg"  //头像
 url:"http://www.ycw.com"
 */
function petHtmlShare() {
	var url = window.location.href;
	var title =$("title").text()||"";
	if (url.indexOf("/book/breed/") > -1) {
		title = "品种百科";
	}
	if (url.indexOf("/book/disease/") > -1) {
		title = "疾病百科";
	}
	if (url.indexOf("/book/tiro/") > -1) {
		title = "新手养宠";
	}
	if (url.indexOf("/book/read/") > -1) {
		title = "狗狗读心术";
	}
	if (url.indexOf("/book/pregnancy/") > -1) {
		title = "怀孕百宝箱";
	}
	if (url.indexOf("/book/help/") > -1) {
		title = "紧急自救";
	}
	var	content =  $("title").text() || "有宠及时分享新潮的宠物新闻宠物趣事,逗趣的宠物图片宠物视频,全面的宠物医疗宠物养护宠物训练宠物美容等知识,专业的宠物专家在线问答.",
		icon = "http://res.ycw.com/app/images/icon-x300.png";
	location.href='youchong://sns/shareNew?title='+title+'&content='+content+'&icon='+icon+'&url='+url;
}
function petHtmlWeeklyShare() {
	var url = window.location.href;
	var title =$("title").text()||"";
	var	content =  $("meta[name=shareContent]").attr("content") || "有宠及时分享新潮的宠物新闻宠物趣事,逗趣的宠物图片宠物视频,全面的宠物医疗宠物养护宠物训练宠物美容等知识,专业的宠物专家在线问答.",
		icon = $("meta[name=shareSrc]").attr("content")||"http://res.ycw.com/app/images/icon-x300.png";
	location.href='youchong://sns/shareNew?title='+title+'&content='+content+'&icon='+icon+'&url='+url;
}
/**
 * 狗狗智商排名 说明
 */
function petRankDescription()
{
	location.href='youchong://html/open?url='+pet.request+'/app/book/rank/rank-ex.html'
}
/**
 * 起名思路 说明
 */
function petNameIdea()
{
	location.href='youchong://html/open?url='+pet.request+'/app/book/name/name-ex.html'
}
