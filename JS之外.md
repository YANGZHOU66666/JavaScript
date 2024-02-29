# JS之外

## JS组成

+ ECMAScript：JS语法
+ DOM：文档对象模型（Document Object Model）
+ BOM：浏览器对象模型，对浏览器窗口进行操作（Browser Object Model）

## Js and HTML

### \<script>\</script>标签

+ 有以下8个属性：

async（加载页面的同时立即下载脚本，两者异步执行，只对外部脚本生效）

charset（指定代码字符集，少用）

crossorigin（配置相关请求的CORS设置）

defer（脚本延迟到文档完全被解析和显示后执行，只对外部脚本生效）

integrity（允许比对接收到的资源和指定的加密签名以验证子资源的完整性）

### JS三种书写位置

1. 行内式

```html
<input type="button" value="唐伯虎" onclick="alert('秋香姐')">
```

HTML中常用双引号，JS中常用单引号

可读性差

2. 内嵌式的JS

```html
<script>
    alert('沙漠骆驼');
</script>
```

3. 外部式

```html
<script src="my.js"></script>
```

\<script>标签内不要写代码，写了也会只执行外部引入的

### 标签位置

#### \<script>放在\<head>\</head>中

这样写会**阻塞HTML的DOM构建**（因为只有浏览器解析到\<body>才会获取DOM），会导致在所有js文件加载、解析、执行完成后才能获取DOM的内容并呈现页面，当js文件比较大时会导致页面长时间空白

#### \<script>放在\<body>\</body>后

在浏览器解析完页面之后才会加载、解释和执行js文件，用户看到页面的速度会变快

### 推迟执行脚本

+ 属性 defer="defer"：脚本在整个页面解析完毕后执行

### 异步执行脚本

+ 属性async：不必等脚本下载和执行完后加载页面，也不必等到该异步脚本下载和执行后再加载其他脚本（加载顺序不是一定的）
+ 异步脚本不应该在加载期间修改DOM
+ 保证会在页面的load之前执行

### 动态加载脚本

+ 向DOM中动态添加script元素

```javascript
//直到执行到这段代码才会发送加载'gibberish.js'文件代码的请求
let script = document.createElement('script');
script.src = 'gibberish.js';
document.head.appendChild(script);
```



## 浏览器执行JS过程

浏览器分为两部分：

+ 渲染引擎，解析HTML和CSS，俗称内核
+ JS引擎：也称JS解释器，读取JS代码，处理后运行

浏览器本身不会执行JS代码，通过内置JS引擎来执行JS代码。JS引擎执行代码时逐行解释每一句源码（转换为机器语言），然后由计算机执行。（脚本语言->逐行解释执行）



## 输入输出

### prompt(): 输入框

```javascript
prompt('请输入您的年龄')
```

### alert(): 弹出警示框

```javascript
alert('计算的结果是');
```

### console.log(): 控制台中打印

## 断点调试

打开开发者工具sources栏，直接打即可

按一个箭头按钮进行下一条语句