/**
 * Created by zhaoshuxiang on 16/5/27.
 */

var site = 'http://activity.ycnuli.com/',
    indexUrl = site + 'dogfestival/index.do',
    numUrl = site + 'dogfestival/dogFestivalTotalNum.do',
    weixinUrl = site + 'weixin/share.do',
    url = encodeURIComponent(pet.url.split("#")[0]),
    wxData = {
        title: "你吃掉的不是狗肉，而是人性",
        desc: "我是第xxx个抵制6.21狗肉节的人，我接力拒绝食用伴侣动物",
        img: pet.path + "app/images/topic/dog/logo.jpg",
        link: indexUrl
    };

$(function () {

    var $body = $('body'),
        link = $("link"),
        script = $("script"),
        $sectionLoading = $(".section-loading"),
        $sectionLandscape = $(".section-landscape"),
        i, j, len;

    var updateVersion = function () {
        for (i = 0, len = link.length; i < len; i++) {
            if (i === 2) {
                link.eq(i).attr('href', link.eq(i).attr('href') + '?t=' + new Date().getTime());
            }
        }
        for (j = 0, len = script.length; j < len; j++) {
            if (script.eq(j).attr('src').indexOf('dog.js') != -1) {
                script.eq(j).attr('src', script.eq(j).attr('src') + '?t=' + new Date().getTime());
            }
        }
    };

    updateVersion();

    var adaptive = function () {
        (function () {
            function setRem() {
                document.documentElement.style.fontSize = (document.documentElement.clientWidth > 414 ? 414 : document.documentElement.clientWidth) / (750 * 12 / 1334) + "px";
            }

            var timer = null;
            window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', function () {
                clearTimeout(timer);
                timer = setTimeout(setRem, 300);
            }, !1);
            setRem();
        })(window);
    };

    var mobileEnd = function () {
        /*判断手机横竖屏状态*/
        if (pet.isMobile()) {
            $sectionLandscape.removeAttr('style');
            $body.addClass('black');
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
                console.info(window.orientation);
                if (window.orientation === 180 || window.orientation === 0) {
                    console.info('竖屏状态！');
                    $sectionLandscape.hide();
                }
                if (window.orientation === 90 || window.orientation === -90) {
                    console.info('横屏状态！');
                    $sectionLandscape.show();
                }
            }, false);
        } else {
            $sectionLandscape.hide();
        }
    };

    var pageInit = function () {
        adaptive();
        mobileEnd();
    };
    window.onload = function () {
        $sectionLoading.hide();
        pageInit();
    };

});

var getNumber = function () {
    $.ajax({
        dataType: "jsonp",
        async: false,
        url: numUrl + "?url=" + url + "&jsonCallback=?",
        success: function (data) {
            console.info(data.data);
            wxData.desc = '我是第' + data.data + '个抵制6.21狗肉节的人，我接力拒绝食用伴侣动物';
            if (pet.isWeixin()) {
                var wxShare = function () {
                    $.ajax({
                        dataType: "jsonp",
                        url: weixinUrl + "?url=" + url + "&jsonCallback=?",
                        success: function (data) {
                            pet.loadFile("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function () {

                                var shareData = eval(data);
                                //配置信息
                                wx.config({
                                    debug: false,
                                    appId: 'wx58e3e94f8313e300', //测试服的微信appid
                                    timestamp: shareData.timestamp,
                                    nonceStr: shareData.nonceStr,
                                    signature: shareData.signature,
                                    jsApiList: [
                                        'onMenuShareTimeline',
                                        'onMenuShareAppMessage',
                                        'onMenuShareQQ',
                                        'onMenuShareWeibo',
                                        'onMenuShareQZone'
                                    ]
                                });

                                //分享到...
                                wx.ready(function () {
                                    wx.onMenuShareTimeline({
                                        title: wxData.desc,
                                        link: wxData.link,
                                        imgUrl: wxData.img,
                                        success: function () {
                                        },
                                        cancel: function () {
                                        }
                                    });
                                    wx.onMenuShareQZone({
                                        title: wxData.title,
                                        desc: wxData.desc,
                                        link: wxData.link,
                                        imgUrl: wxData.img,
                                        success: function () {
                                            // 用户确认分享后执行的回调函数
                                        },
                                        cancel: function () {
                                            // 用户取消分享后执行的回调函数
                                        }
                                    });
                                    wx.onMenuShareAppMessage({
                                        title: wxData.title,
                                        desc: wxData.desc,
                                        link: wxData.link,
                                        imgUrl: wxData.img,
                                        type: '',
                                        dataUrl: '',
                                        success: function () {
                                        },
                                        cancel: function () {
                                        }
                                    });
                                    wx.onMenuShareQQ({
                                        title: wxData.title,
                                        desc: wxData.desc,
                                        link: wxData.link,
                                        imgUrl: wxData.img,
                                        success: function () {
                                        },
                                        cancel: function () {
                                        }
                                    });
                                    wx.onMenuShareWeibo({
                                        title: wxData.title,
                                        desc: wxData.desc,
                                        link: wxData.link,
                                        imgUrl: wxData.img,
                                        success: function () {
                                        },
                                        cancel: function () {
                                        }
                                    });
                                });

                            })
                        },
                        error: function (xhr, type) {
                            console.log('Ajax error!')
                        }
                    });
                };
                wxShare();

            }

        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};
// getNumber();

var topicShare = function () {
    $.ajax({
        dataType: "jsonp",
        async: false,
        url: numUrl + "?url=" + url + "&jsonCallback=?",
        success: function (data) {
            console.info(data.data);
            wxData.desc = '我是第' + data.data + '个抵制6.21狗肉节的人，我接力拒绝食用伴侣动物';
            location.href = "youchong://sns/shareNew?title=" + encodeURIComponent(wxData.title) + "&content=" + encodeURIComponent(wxData.desc) + "&icon=" + encodeURIComponent(wxData.img) + "&url=" + encodeURIComponent(indexUrl);
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};