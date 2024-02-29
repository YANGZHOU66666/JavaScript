# AJAX

全称Asynchronous JavaScript And XML，即异步JS+XML

通过AJAX可以在浏览器中向服务器发送异步请求，<mark>最大的优势：无刷新获取数据</mark>

AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式

+ **异步JS：**可以异步地向服务器发送请求，在等待响应的过程中，不会阻塞当前页面，在这种情况下，浏览器可以做自己的事情。直到成功获取响应后，浏览器才开始处理响应数据。

**Ajax就是在浏览器不重新加载网页的情况下，对页面的某部分进行更新**

## XML

可扩展标记语言(extensible markup language)

被设计用来传输和存储数据，和HTML类似，不同点在于XML全是预定义标签

如：

```xml
<student>
    <name>孙悟空</name>
    <age>18</age>
    <gender>男</gender>
</student>
```

但现在已经被JSON替代了：

```json
{"name":"孙悟空","age":18,"gender":"男"}
```

## AJAX的特点

### 优点

1. 无需刷新页面与服务器端进行通信
2. 允许根据用户事件更新部分页面内容

### 缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题（同源）
3. SEO不友好

## HTTP协议请求报文与相应文本结构

HTTP(Hypertext transport protocol)：超文本传输协议，详细规定了浏览器和万维网服务器之间相互通信的规则

+ 请求报文：

```
行	post /s?ie=utf-8 HTTP/1.1
头	Host: atguigu.com
	 Cookie: name=guigu
	 Content-type: application/
     User-Agent: chrome 83
空行
体   username=admin&password=admin
```

+ 响应报文

```
行   HTTP/1.1 200 OK
头	Content-Type: text/html;charset=utf-8
	 Content-length: 2048
	 Content-encoding: gzip
空行
体   <html>
		<head>
		</head>
		<body>
			<h1>尚硅谷</h1>
		</body>
	 <html>

```

## 快速上手

### 使用XMLHttpRequest()实现AJAX

#### 创建xhr对象：

```javascript
let xhr=new XMLHttpRequest();
```

#### `readyState`与`onreadystatechange()`方法

在xhr对象执行收发数据时，会经历5种状态：

| Ajax状态码 | 状态(readyState)                                             |
| ---------- | ------------------------------------------------------------ |
| 0          | （**未初始化**）未启动                                       |
| 1          | （**启动**）已经调用 open()，但尚未调用 send()               |
| 2          | （**发送**）发送状态，已经调用 send()，但尚未接收到响应      |
| 3          | （**接收**）已经接收到部分响应数据                           |
| 4          | （**完成**）已经接收到全部响应数据，而且已经可以在浏览器中使用了 |

`onreadystatechange()`方法用于监听状态变化，当AJAX状态码为4说明已经接收到服务端所有数据

在实际情况下，仅有AJAX状态码为4是不够的，还需要http状态码为[200,300)来确保数据没有问题

```javascript
if (xhr.status >= 200 && xhr.status < 300 ){
    console.log(xhr.responseText);
}
```

#### xhr请求

| 方法                         | 描述                                                         |
| :--------------------------- | :----------------------------------------------------------- |
| open(*method*,*url*,*async*) | 规定请求的类型、URL 以及是否异步处理请求。<br>*method*：请求的类型；GET 或 POST*url*：文件在服务器上的位置<br>*async*：true（异步）或 false（同步） |
| send(*string*)               | 将请求发送到服务器。*string*：仅用于 POST 请求               |

+ **GET请求和POST请求的比较：**

1. 与POST相比，GET更简单也更快，且大部分情况都能使用

2. 使用POST请求的情况：

   不愿使用缓存文件（更新服务器上的文件或数据库）

   向服务器发送大量数据（POST 没有数据量限制）

   发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

+ **GET请求：**

```javascript
xhr.open("GET","/try/ajax/demo_get.php",true);
xhr.send();
```

在上述例子中，可能得到的是缓存的结果

避免这种情况，需向URL添加一个唯一的ID：

```javascript
xhr.open("GET","/try/ajax/demo_get.php?t=" + Math.random(),true);
xhr.send();
```

如果希望通过GET方法发送信息，可以向URL添加信息：

```javascript
xhr.open("GET","/try/ajax/demo_get2.php?fname=Henry&lname=Ford",true);
xhr.send();
```

+ **POST请求：**

```javascript
xhr.open("POST","/try/ajax/demo_post.php",true);
xhr.send();
```

如果需要像 HTML 表单那样 POST 数据，使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定希望发送的数据：

```javascript
xhr.open("POST","/try/ajax/demo_post2.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("fname=Henry&lname=Ford");
```

#### 简单综合案例

在同一文件夹下的`test.json`文件存有:

```json
{
    "reply":"我收到啦!"
}
```

现在用AJAX获取该文件中内容并console.log()打印出来

```javascript
const url='test.json';
let xhr=new XMLHttpRequest();
console.log(xhr.readyState);//初始时打印一下xhr的状态
xhr.onreadystatechange=()=>{
    console.log(xhr.readyState);//每次状态变化打印一下xhr的状态
    if(xhr.readyState!=4){//如果没接收到所有信息，return出去
        return;
    }
    if(xhr.status>=200&&xhr.status<300){//接收所有信息后，如果http状态码是2xx，说明无错
        console.log(xhr.responseText);
    }else{
        console.log("出错了");
    }
}
xhr.open('GET',url,true);
xhr.send();
```

输出内容：

```
0
1
2
3
4
{
	"reply":"我收到啦!"
}
```

#### 用Promise封装

```javascript
const url='test.json';
let xhr=new XMLHttpRequest();
function getData(url,timeout){
    return new Promise((resolved,rejected)=>{
        setTimeout(()=>{//用强行设置的时间后执行模拟网络请求等待的时间
            xhr.onreadystatechange=()=>{
                if(xhr.readyState!=4){
                    return;
                }
                if(xhr.status>=200&&xhr.status<300){
                    resolved(xhr.responseText);
                }else{
                    rejected("出错了");
                }
            };
            xhr.open('GET',url, true);
            xhr.send();
        },timeout)
    });
}
getData(url,1000).then(res=>{
    console.log(res);
});
```

