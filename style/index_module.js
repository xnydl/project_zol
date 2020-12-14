define([], () => {
    return {
        init: function() {
            //代码实现
            //1.鼠标移入左侧的li元素，显示右侧的大盒子。
            const $list = $('.menu li'); //取到li标签
            const $cartlist = $('.lvsecbox'); //取到移入显示的盒子
            const $items = $('.item'); //取到移入显示盒子里面的小盒子
            $list.hover(function() { //移入li标签触发
                $cartlist.show(); //2级盒子显示
                $(this).addClass('active').siblings('li').removeClass('active'); //给当前的li列表项添加移入效果,移除其他li的效果
                //切换内容发生改变，不同的li对应不同的内容块。
                $items.eq($(this).index()).show().siblings('.item').hide(); //展示对应的二级盒子 隐藏其他盒子
                //eq(index|-index):获取第N个元素,里面的索引编号从0开始，正数从前往后数，负数：从后往前，-1开始。
                //改变右侧的大盒子的位置
                let $scrolltop = $(window).scrollTop(); //读写匹配元素相对滚动条顶部的偏移。
                let $bannertop = $('.banner').offset().top; //获取匹配元素在当前视口的相对偏移
                if ($scrolltop > $bannertop) { //当滚动条高度大于二级盒子距离顶部高度时
                    $cartlist.css({ //将滚动条高度减去二级盒子可视区高度的值赋值给二级盒子
                        top: $scrolltop - $bannertop
                    });
                } else {
                    $cartlist.css({ //如果滚动条高度小于二级盒子距离顶部高度 设定二级盒子top为0
                        top: 0
                    });
                }
            }, function() {
                $cartlist.hide(); //如果没有触发则二级盒子隐藏
            });

            //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
            $cartlist.hover(function() { //移入二级盒子 
                $(this).show(); //二级盒子显示
            }, function() {
                $(this).hide(); //否则二级盒子隐藏
            });


            // //检测是否用户已经登录
            // if (localStorage.getItem('loginname')) { //localStorage的读取，其中官方推荐的是getItem\setItem这两种方法对其进行存取
            //     $('.admin').show(); //用户名显示
            //     $('.login').hide(); //注册 登录隐藏
            //     $('.admin span').html(localStorage.getItem('loginname'));
            // }

            // //退出登录 - 删除本地存储
            // $('.admin a').on('click', function() { //点击退出登录按钮
            //     $('.admin').hide(); //用户名隐藏
            //     $('.login').show(); //注册登录显示
            //     localStorage.removeItem('loginname'); //本地移除localstorage
            // });

        }
    }
});