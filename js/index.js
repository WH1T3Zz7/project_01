window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l'); //左箭头
    var arrow_r = document.querySelector('.arrow-r'); //右箭头
    var ul = focus.querySelector('ul'); //获取Ul
    var focusWidth = focus.offsetWidth; //获取图片宽度
    var circle = 0; //控制小圆圈的变化
    var num = 0; //控制图片的变化
    var flag = true; //节流阀
    //1.鼠标触摸显示两边箭头
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })

    //2.根据图片数量渲染小圆点数量
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        //3.小圆圈选中状态
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index')
                //7.小圆圈点击时将index传输给num和circle
            num = index;
            circle = index;
            //4.通过点击小圆圈跳转对应的页面
            console.log(index);
            let move = index * focusWidth;
            animate(ul, -move, function() {
                console.log("OK");
            });
        });
    };
    //默认ol里面第一个li为选中状态
    ol.children[0].className = 'current';

    //5.右侧功能制作
    var first = ul.children[0].cloneNode(true);
    //克隆第一张图片到最后
    ul.appendChild(first);
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //判断是否为最后一张图片
            if (ul.children.length - 1 == num) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            let move = num * focusWidth;
            animate(ul, -move, function() {
                flag = true;
            });
            //6.圆点变化
            circle++;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                if (circle == ol.children.length) {
                    circle = 0;
                }
            }
            ol.children[circle].className = 'current';

        }
    });
    //8.左侧功能制作

    arrow_l.addEventListener('click', function() {
        //判断是否为最后一张图片
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num - 1 + 'px';
            }
            num--;
            let move = num * focusWidth;
            animate(ul, -move, function() {
                flag = true;
            });
            //6.圆点变化
            circle--;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                if (circle == -1) {
                    circle = ol.children.length - 1;
                }
            }
            ol.children[circle].className = 'current';
        }
    });


    //9.自动播放图片
    var timer = this.setInterval(function() {
        arrow_r.click();
    }, 3000);
});