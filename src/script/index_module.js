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
                let $bannertop = $('.lvsecbox').offset().top; //获取匹配元素在当前视口的相对偏移
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


            //检测是否用户已经登录
            if (localStorage.getItem('loginname')) { //localStorage的读取，其中官方推荐的是getItem\setItem这两种方法对其进行存取
                $('.admin').show(); //用户名显示
                $('.login').hide(); //注册 登录隐藏
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() { //点击退出登录按钮
                $('.admin').hide(); //用户名隐藏
                $('.login').show(); //注册登录显示
                localStorage.removeItem('loginname'); //本地移除localstorage
            });
            const $lunbo = $('.lunbo');
            const $ulist = $('.lunbo ul'); //运动的盒子
            const $piclist = $('.lunbo ul li'); //6个图片
            const $btnlist = $('.lunbo ol li'); //5个圈圈
            const $leftarrow = $('#left');
            const $rightarrow = $('#right');
            let timer = null;
            let $num = 0; //存储索引值

            //1.先改变布局，计算$ulist的宽度
            const $liwidth = $piclist.eq(0).width(); //1个li的宽度(图片的宽度)
            $ulist.width($liwidth * $piclist.size());

            //2.5个圈圈添加点击事件。让$ulist进行运动。
            $btnlist.on('click', function() {
                $num = $(this).index() - 1; //获取当前的圈圈的索引，赋值给$num  -1因为下面封装的函数里面有个$num++;
                tabSwitch();
            });

            //3.显示左右箭头。
            $lunbo.hover(function() {
                clearInterval(timer); //鼠标移入停止自动轮播
                $leftarrow.show();
                $rightarrow.show();
            }, function() {
                $leftarrow.hide();
                $rightarrow.hide();
                timer = setInterval(function() { //鼠标移出继续自动轮播。
                    $rightarrow.click();
                }, 3000);
            });

            //4.左右箭头添加点击事件。
            $rightarrow.on('click', function() {
                tabSwitch();
            });

            $leftarrow.on('click', function() {
                $num -= 2; //-1:$ulist迁移一张图片，但是封装函数里面又有++,达到-1的效果，需要-2.
                tabSwitch();
            });


            //5.代码冗余，进行函数封装
            function tabSwitch() {
                $num++; //将索引封装进函数，方便后续的左右箭头对索引的判断。

                //如果索引等于5.将$ulist位置进行重置。
                //判断右箭头
                //这里作为的判断的时候是最后一张，重置位置和设置索引安装第一张图片进行设置的
                if ($num === $btnlist.size() + 1) {
                    $ulist.css('left', 0);
                    $num = 1;
                }
                //判断左箭头
                if ($num === -1) {
                    $ulist.css('left', -$liwidth * $btnlist.size());
                    $num = $btnlist.size() - 1;
                }

                //判断小圈圈
                if ($num === $btnlist.size()) {
                    $btnlist.eq(0).addClass('active-lunbo').siblings('li').removeClass('active-lunbo');
                } else {
                    $btnlist.eq($num).addClass('active-lunbo').siblings('li').removeClass('active-lunbo');
                }


                $ulist.stop(true).animate({
                    left: -$liwidth * $num
                });

            }

            //6.自动轮播
            timer = setInterval(function() {
                $rightarrow.click();
            }, 3000);

            //上方一开始移入选择框架出现
            const $listb = $('.main-nav-list-a-list'); //取到移入显示的盒子
            const $listc = $('.main-nav-list-c'); //取到移入显示的盒子
            $listb.hover(function() { //移入二级盒子 
                $listc.show(); //二级盒子显示
            }, function() {
                $listc.hide(); //否则二级盒子隐藏
            });

            //ajax导入数据

            const $listthree = $('.show-rg-ul');
            $.ajax({
                url: 'http://localhost/JS2010/project_zol/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                                <li>
                                    <a href="javascript:;">
                                        <img src="${value.url}"/>
                                        <p>${value.title}</p>
                                        <span>￥${value.price}</span>
                                    </a>
                                </li>
                            `;
                });
                $listthree.html($strhtml);
                // $(function() { //页面加载完成
                //     $("img.lazy").lazyload({
                //         effect: "fadeIn" //显示方法：谈入
                //     });
                // });

            });
        }
    }
});