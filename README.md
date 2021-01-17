# vivid

动画引擎，实现一定时间内对象两属性值间的变化效果。


# 使用
``` html
<div id="box"></div>

<script type="text/javascript" src="vivid.js"></script>
<script type="text/javascript">
    var ani = vivid({
        properties: {
            opacity: 0
        },
        targets: '#box'
    });
</script>
```


# API

## 选项参数

``` js
vivid({
    // {Object} 目标对象或目标对象的样式对象的属性；可选：css数值类型或颜色值的属性、transform类属性和值为数值类型的任意对象的属性。
    properties: null,


    // {Array} 动画关键帧，每一个关键帧就是一个properties选项。
    keyframes: [],


    // {Object|Element|String} 要进行动画的目标对象或者元素选择器。
    targets: null,


    // {Boolean} 创建动画对象后是否立即开始动画
    autoplay: true,

    // {Boolean} 是否把驱使动画运行的功能委托给别的引擎，配合tick方法使用。
    delegate: false,

    // {Number} 动画循环的次数，无限循环可设置为 Infinity
    loop: 0,

    // {String: ['normal', 'reverse', 'alternate', 'alternate-reverse']} 动画播放方向
    direction: 'normal',


    // {Function} 动画开始播放时钩子
    begin: null,

    // {Function} 动画播放完时钩子
    complete: null,

    // {Function} 每次动画开始播放时钩子
    loopBegin: null,

    // {Function} 每次动画播放完时钩子
    loopComplete: null,

    // {Function} 动画暂停时钩子，调用restart()、调用pause()、调用finish()、动画播放完时都会执行此钩子函数
    pause: null,

    // {Function} 动画播放时钩子，调用restart()、调用play()、动画开始播放时都会执行此钩子函数
    play: null,

    // {Function} 动画更新时钩子，每一帧动画都会触发此钩子函数
    update: null,


    // 动画持续时间，单位ms
    duration: 400,

    // 动画延迟时间，单位ms
    delay: 0,

    // 动画结束延迟时间，单位ms
    endDelay: 0,

    // {String} 滑动公式
    easing: 'easeInOutQuad',

    // 动画属性值的小数位数，1:取整、10:一位、100:两位、0.1:十位取整、0.01:百位取整，以此类推。
    round: 0
});
```

### transform类型属性

- translateX
- translateY
- translateZ
- rotate
- rotateX
- rotateY
- rotateZ
- scale
- scaleX
- scaleY
- scaleZ
- skew
- skewX
- skewY
- perspective

例子：

``` js
vivid({
    properties: {
        translateX: 100
        translateY: 100
        rotate: 45
    },
    targets: '#box'
});
```

### 属性值的类型
- String：'100'、'+=100'、'50%'、'-=50px'、'字符串里包含数值即可：来个整数50来个负数-50再来个小数3.14'
- Number：3.14、50、-60
- vivid.withFrom(<起始值>, <结束值>)。
- Array，数组的元素一般为数值；一般情况下需要指定起始值，否则起始值数组元素设置0；每一帧返回的值为变化后的数组。
- Object，用来设置每个属性单独的动画效果，需包含一个value属性表示当前属性值，其他属性可选如下：
- vivid.keyframes([...<接受上面的任意类型>])，属性关键帧，具体使用可参看下面“属性关键帧”。

``` js
// tweenSetting
// 属性解析说明参考上面的选项参数
{
    duration: 400,
    delay: 0,
    endDelay: 0,
    easing: 'easeInOutQuad',
    round: 0
};
```

### 属性关键帧
同一个属性可以有多个值继发执行动画效果，每个值都可以设置 tweenSetting 选项。
默认每一个值的duration为总duration除于关键帧数，当然也可以单独设置duration。

``` js
vivid({
    properties: {
        translateX: vivid.keyframes([
            { value: 250, duration: 1000, delay: 500 },
            { value: 0, duration: 1000, delay: 500 }
        ]),
        translateY: vivid.keyframes([
            { value: -100, duration: 500 },
            { value: 100, duration: 500, delay: 1000 },
            { value: 0, duration: 500, delay: 1000 }
        ]),
        scaleX: vivid.keyframes([
            { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
            { value: 1, duration: 900 },
            { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
            { value: 1, duration: 900 }
        ]),
        scaleY: vivid.keyframes([
            { value: [1.75, 1], duration: 500 },
            { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
            { value: 1, duration: 450 },
            { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
            { value: 1, duration: 450 }
        ])
    },
    ...
});
```


### 动画关键帧
在属性关键帧中，同一属性多个值是继发执行的，但不同的属性是并发执行的；
如果想要实现不同属性的继发执行，则需要使用动画关键帧。
可以在选项参数keyframes定义动画关键帧，每一个动画关键帧每一帧就是一个properties对象；
keyframes和properties也可以一起使用。

``` js
vivid({
    keyframes: [
        {
            translateY: -100,
            scale: 2
        },
        { translateX: 100 },
        { translateY: 100 },
        { translateX: 0 },
        { translateY: 0 }
    ],
    ...
});
```


## 实例方法

### vivid#finish()
立即完成当前动画（只能完成一次动画；loop配置项可以设置多次动画，甚至无限次）。

### vivid#getPosition()
返回动画当前已播放时长的毫秒数。

### vivid#getDuration()
返回动画总时长。

### vivid#getProgress()
返回动画当前播放的进度。

### vivid#pause()
暂停当前动画。

### vivid#play()
继续播放动画（如果动画在complete状态下调用play，相当于调用restart）。

### vivid#restart()
重新播放动画。

### vivid#seek( duration )
设置动画播放到指定时间。

### vivid#tick()
在设置delegate选项参数为true基础上，在别的引擎中调用vivid#tick()方法来驱使动画运行。


## 辅助函数

### vivid.withFrom( from: any, to: any )
带起始值的属性值。

### vivid.keyframes( keyframes: any[] )
用于属性关键帧。

### vivid.random( min: number, max: number ): number
返回一个随机数。

### vivid.setDashoffset( elem: SVGGeometryElement ): number
用于SVG的画线动画。设置SVGGeometryElement元素stroke-dasharray为SVGGeometryElement#getTotalLength并返回。例如：

``` js
vivid({
    properties: {
        strokeDashoffset: [vivid.setDashoffset, 0]
    },
    targets: 'svg path',
    duration: 3000,
    easing: 'linear',
    loop: true,
    direction: 'alternate'
});
```

### vivid.geometry( target: SVGGeometryElement | string, percent?: number = 100 ): function
用于路径动画。geometry函数返回一个函数，后者可接受一个字符串参数{x|y|angle}进行调用并返回一个对象，
此对象包含了一个标识属性类型的属性便于程序内部进行指定的处理。例如：

``` js
var geometry = vivid.geometry('svg path');
vivid({
    targets: '#el',
    properties: {
        translateX: geometry('x'),
        translateY: geometry('y'),
        rotate: geometry('angle'),
    },
    duration: 3000,
    easing: 'linear',
    loop: true,
    direction: 'alternate'
});
```

### vivid.addEasing( object: Object )
### vivid.addEasing( name: string, handle: Function )
如果内置的缓动公式不合适，也可以导入外部的缓动公式。

### vivid.stagger( val: Array | number, options: Object ): Function
交错动画。
``` js
val: Number  // 设置交错值
val: Array[<范围起始值>, <范围结束值>]  // 设置交错范围值

options = {
    // {String: ['normal', 'reverse']}，反方向的交错动画
    direction: 'normal',

    // {String|Function}，带滑动公式的交错动画
    easing: null,

    // {Array[<列数>, <行数>]}，网格交错动画
    grid: null,

    // {String: ['x', 'y']}，网格交错中的方向
    axis: null,

    // {Number}，交错动画的开始值
    start: 0,
    
    // {Number|String: ['first', 'center', 'last']}，交错动画开始位置
    from: 0
};
```

### vivid.getPrefixedCssProp( property: string ): null | string
接受一个元素样式对象的属性名，返回一个兼容当前浏览器的可能带有前缀的属性名；
不兼容则返回null。

### vivid.css( elem: Element, prop: string )
获取元素样式值。

### vivid.css( elem: Element, prop: string, value: number | string )
设置元素样式值。

### vivid.css( elem: Element, object: Object )
批量设置元素样式。

### vivid.Map()
animate使用Map来提升性能，并对不支持Map的浏览器进行简单的实现。

### vivid.Set()
animate使用Set来提升性能，并对不支持Set的浏览器进行简单的实现。


## engine
engine对象拥有两个对外的方法：add、remove，两方法都接受一个函数作为参数；
engine是内部使用的引擎，也可以使用vivid.engine来对外访问，一般用于展示FPS。例如：

``` js
(function() {
    var fpsBox = document.getElementById('fpsBox');
    var prevFrameTime = Date.now();
    var fps = 0;
    vivid.engine.add(function() {
        var currTime = Date.now();
        fps = ~~( 1000 / ( currTime - prevFrameTime ) );
        prevFrameTime = currTime;
    });

    fpsBox.innerHTML = fps;
    setInterval(function() {
        fpsBox.innerHTML = fps + ' FPS';
    }, 1000);
})();
```



# 允许的颜色值类型

1. 3位或6位十六进制hex
2. rgb
3. rgba
4. hsl
5. hsla
6. 颜色名


# 画线动画兼容性

1. chrome
    完美兼容

2. IE9以上（含）
    圆和椭圆的画线动画，在动画之前如果有使用过getComputedStyle获取元素的以下样式：
    width、height、top、right、bottom、left、
    marginTop、marginRight、marginBottom、marginLeft、paddingTop、paddingRight、paddingBottom、paddingLeft
    以及调用过元素的offsetHeight、clientHeight等属性都会让圆和椭圆的画线起点和方向从右下变动到左上。

3. 低版本Firefox
    高版本完美兼容；低版本除了path元素正常，其他元素不堪入目。

总结：如果不需要兼容低版本浏览器，则元素随便用；若要支持低版本浏览器，则建议仅使用path元素实现画线动画。


# 路径动画兼容性
除了低版本浏览器下自定义的椭圆路径动画有一点点瑕疵之外，没别的问题。


# 缓动公式（区分大小写）

- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint
- easeInSine
- easeOutSine
- easeInOutSine
- easeInExpo
- easeOutExpo
- easeInOutExpo
- easeInCirc
- easeOutCirc
- easeInOutCirc
- easeInElastic
- easeOutElastic
- easeInOutElastic
- easeInBack
- easeOutBack
- easeInOutBack
- easeInBounce
- easeOutBounce
- easeInOutBounce



# 颜色名（不区分大小写）

颜色名包含17个基本颜色、130个扩展颜色和一个rebeccapurple颜色，总共148个颜色。

- black
- silver
- gray
- white
- maroon
- red
- purple
- fuchsia
- green
- lime
- olive
- yellow
- navy
- blue
- teal
- aqua
- orange
- aliceblue
- antiquewhite
- aquamarine
- azure
- beige
- bisque
- blanchedalmond
- blueviolet
- brown
- burlywood
- cadetblue
- chartreuse
- chocolate
- coral
- cornflowerblue
- cornsilk
- crimson
- cyan
- darkblue
- darkcyan
- darkgoldenrod
- darkgray
- darkgreen
- darkgrey
- darkkhaki
- darkmagenta
- darkolivegreen
- darkorange
- darkorchid
- darkred
- darksalmon
- darkseagreen
- darkslateblue
- darkslategray
- darkslategrey
- darkturquoise
- darkviolet
- deeppink
- deepskyblue
- dimgray
- dimgrey
- dodgerblue
- firebrick
- floralwhite
- forestgreen
- gainsboro
- ghostwhite
- gold
- goldenrod
- greenyellow
- grey
- honeydew
- hotpink
- indianred
- indigo
- ivory
- khaki
- lavender
- lavenderblush
- lawngreen
- lemonchiffon
- lightblue
- lightcoral
- lightcyan
- lightgoldenrodyellow
- lightgray
- lightgreen
- lightgrey
- lightpink
- lightsalmon
- lightseagreen
- lightskyblue
- lightslategray
- lightslategrey
- lightsteelblue
- lightyellow
- limegreen
- linen
- magenta
- mediumaquamarine
- mediumblue
- mediumorchid
- mediumpurple
- mediumseagreen
- mediumslateblue
- mediumspringgreen
- mediumturquoise
- mediumvioletred
- midnightblue
- mintcream
- mistyrose
- moccasin
- navajowhite
- oldlace
- olivedrab
- orangered
- orchid
- palegoldenrod
- palegreen
- paleturquoise
- palevioletred
- papayawhip
- peachpuff
- peru
- pink
- plum
- powderblue
- rosybrown
- royalblue
- saddlebrown
- salmon
- sandybrown
- seagreen
- seashell
- sienna
- skyblue
- slateblue
- slategray
- slategrey
- snow
- springgreen
- steelblue
- tan
- thistle
- tomato
- turquoise
- violet
- wheat
- whitesmoke
- yellowgreen
- rebeccapurple