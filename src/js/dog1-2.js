/**
 * Created by zhaoshuxiang on 16/5/27.
 */

var site = 'http://activity.ycnuli.com/',
    shareUrl = site + 'dogfestival/share.do?petTitle=分享&petCallback=topicShare',
    numUrl = site + 'dogfestival/dogFestivalTotalNum.do',
    weixinUrl = 'http://activity.ycnuli.com/weixin/share.do',
    url = encodeURIComponent(pet.url.split("#")[0]),
    wxData = {
        title: "你吃掉的不是狗肉，而是人性",
        desc: "我是第xxx个抵制6.21狗肉节的人，我接力拒绝食用伴侣动物",
        img: pet.path + "app/images/topic/dog/logo.jpg",
        link: pet.url
    };

$(function () {

    var $body = $('body'),
        link = $("link"),
        script = $("script"),
        $sectionLoading = $(".section-loading"),
        $sectionLandscape = $(".section-landscape"),
        $pageContainer = $(".page-container"),
        slider = '',
        currentIndex = 0,
        $radio = $('.radio'),
        audio1 = document.getElementById("audio1"),
        audioFlag1 = true,
        audio3 = document.getElementById("audio3"),
        audioFlag3 = true,
        audio4 = document.getElementById("audio4"),
        audioFlag4 = true,
        audio5 = document.getElementById("audio5"),
        audioFlag5 = true,
        audio8 = document.getElementById("audio8"),
        audioFlag8 = true,
        audio10 = document.getElementById("audio10"),
        audioFlag10 = true,
        i, len,
        pageImgArr = [],
        interval2 = null,
        intervalFlag2 = true,
        interval3 = null,
        intervalFlag3 = true,
        interval4 = null,
        intervalFlag4 = true,
        intervalCount = 0,
        intervalCount4 = 0,
        $p3Div2 = $('.p3-div-2'),
        $p6Img7 = $('.p6-img-7'),
        $p4 = $('.p4'),
        p12Div1 = document.querySelector('.p12-div-1'),
        interval12 = null,
        intervalCount12 = 0;

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

    var playAudio = function (obj, volume) {
        if (obj.attributes.src.value != obj.attributes['data-src'].value) {
            obj.attributes.src.value = obj.attributes['data-src'].value;
        }
        // obj.currentTime = 0.0;
        obj.volume = volume;
        obj.play();

        if (audio1.paused) {
            $radio.removeClass('rotate');
            $radio.addClass('off');
        } else {
            $radio.addClass('rotate');
            $radio.removeClass('off');
        }
    };

    var pauseAudio = function (obj) {
        obj.pause();
    };

    var audioFlag = function (audioFlagVal, audioObj, volume) {
        audioFlagVal = true;
        if (audioObj.paused) {
            document.addEventListener('touchstart', function () {
                if (audioFlagVal) {
                    audioFlagVal = false;
                    playAudio(audioObj, volume);
                }
            });
        }
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

    var swiperInit = function () {
        slider = new Swiper('.swiper-container', {
            direction: 'vertical',
            keyboardControl: true,
            mousewheelControl: true,
            /*onTouchMove: function (swiper) {
             sliderIndex(swiper.activeIndex);
             },*/
            onSlideChangeEnd: function (swiper) {
                sliderIndex(swiper.activeIndex);
            },
            onTransitionStart: function (swiper) {
                pauseAudio(audio3);
                pauseAudio(audio4);
                pauseAudio(audio5);
                pauseAudio(audio8);
                pauseAudio(audio10);
            }
        });
    };

    var sliderIndex = function (index) {
        console.info(index);
        currentIndex = parseInt(index);
        switch (currentIndex) {
            case 0:
                clearInterval(interval2);
                intervalFlag2 = true;
                break;
            case 1:
                $p4.addClass('preload');
                $p3Div2.removeClass('preload');
                if (intervalFlag2) {
                    intervalFlag2 = false;
                    intervalCount = 0;
                    interval2 = setInterval(function () {
                        intervalCount++;
                        if (intervalCount >= 6) {
                            clearInterval(interval2);
                            slider.slideNext();
                        }
                    }, 1000);
                }
                loadImg(3);
                loadImg(4);
                pauseAudio(audio3);
                clearInterval(interval3);
                intervalFlag3 = true;
                break;
            case 2:
                intervalFlag2 = true;
                clearInterval(interval2);
                $p4.removeClass('preload');
                loadImg(3);
                loadImg(5);
                loadImg(6);
                playAudio(audio3, 0.03);
                audioFlag(audioFlag3, audio3, 0.03);
                pauseAudio(audio4);
                audioEvent(audioFlag4, audio4);
                break;
            case 3:
                intervalFlag3 = true;
                $p6Img7.addClass('preload');
                clearInterval(interval3);
                loadImg(4);
                loadImg(7);
                loadImg(8);
                pauseAudio(audio3);
                playAudio(audio4, 0.02);
                audioFlag(audioFlag4, audio4, 0.02);
                pauseAudio(audio5);
                audioEvent(audioFlag5, audio5);
                break;
            case 4:
                $p6Img7.removeClass('preload');
                loadImg(5);
                loadImg(9);
                loadImg(10);
                pauseAudio(audio4);
                playAudio(audio5, 0.2);
                audioFlag(audioFlag5, audio5, 0.2);
                break;
            case 5:
                loadImg(6);
                loadImg(11);
                pauseAudio(audio5);
                break;
            case 6:
                loadImg(7);
                loadImg(12);
                pauseAudio(audio8);
                audioEvent(audioFlag8, audio8);
                break;
            case 7:
                loadImg(8);
                loadImg(13);
                playAudio(audio8, 0.03);
                audioFlag(audioFlag8, audio8, 0.03);
                break;
            case 8:
                loadImg(9);
                pauseAudio(audio8);
                pauseAudio(audio10);
                audioEvent(audioFlag10, audio10);
                break;
            case 9:
                loadImg(10);
                playAudio(audio10, 1);
                audioFlag(audioFlag10, audio10, 1);
                break;
            case 10:
                loadImg(11);
                pauseAudio(audio10);
                break;
            case 11:
                loadImg(12);
                intervalFlag4 = true;
                clearInterval(interval4);
                break;
            case 12:
                loadImg(13);
                toShare();
                break;
            default:
                break;
        }
    };

    var toShare = function () {
        if (intervalFlag4) {
            intervalFlag4 = false;
            intervalCount4 = 0;
            interval4 = setInterval(function () {
                intervalCount4++;
                if (intervalCount4 >= 6) {
                    clearInterval(interval4);
                    location.href = shareUrl;
                }
            }, 1000);
        }
    };

    var eventBind = function () {
        p12Div1.addEventListener('touchstart', function () {
            intervalCount12 = 0;
            console.info(intervalCount12);
            interval12 = setInterval(function () {
                intervalCount12++;
                if (intervalCount12 >= 2) {
                    clearInterval(interval12);
                    slider.slideNext();
                    toShare();
                }
            }, 400);
        });

        $('[data-action]').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            switch ($(this).attr('data-action')) {
                case 'toggleAudio':
                    if (audio1.paused) {
                        audio1.play();
                        $(this).removeClass('off');
                        $(this).addClass('rotate');
                    } else {
                        audio1.pause();
                        $(this).addClass('off');
                        $(this).removeClass('rotate');
                    }
                    break;
                case 'nextPage':
                    sliderIndex(slider.activeIndex);
                    slider.slideNext();
                    break;
                default:
                    break;
            }
        });


    };

    var audioEvent = function (audioFlag, audioObj) {
        document.addEventListener('touchstart', function () {
            if (audioFlag) {
                audioFlag = false;
                playAudio(audioObj, 0);
                pauseAudio(audioObj);
            }
        });

    };

    var loadImg = function (page) {
        pageImgArr = $('.p' + page + ' img');
        for (i = 0, len = pageImgArr.length; i < len; i++) {
            if (pageImgArr.eq(i).attr('src') != pageImgArr.eq(i).attr('data-src')) {
                pageImgArr.eq(i).attr('src', pageImgArr.eq(i).attr('data-src'));
            }
        }
    };

    var audioInit = function () {
        playAudio(audio1, 0.1);
        audioFlag(audioFlag1, audio1, 0.1);
        audioEvent(audioFlag3, audio3);
    };

    var pageInit = function () {
        adaptive();
        mobileEnd();
        swiperInit();
        eventBind();
        loadImg(2);
        $p3Div2.addClass('preload');
        audioInit();
    };
    window.onload = function () {
        $sectionLoading.hide();
        $pageContainer.show();
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

getNumber();

var topicShare = function () {
    $.ajax({
        dataType: "jsonp",
        async: false,
        url: numUrl + "?url=" + url + "&jsonCallback=?",
        success: function (data) {
            console.info(data.data);
            wxData.desc = '我是第' + data.data + '个抵制6.21狗肉节的人，我接力拒绝食用伴侣动物';
            location.href = "youchong://sns/shareNew?title=" + encodeURIComponent(wxData.title) + "&content=" + encodeURIComponent(wxData.desc) + "&icon=" + encodeURIComponent(wxData.img) + "&url=" + encodeURIComponent(pet.url);
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};
