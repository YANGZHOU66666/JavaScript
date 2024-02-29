# Promise

## Promise基本使用

+ promise:承诺

相当于一个容器，保存着未来才会结束的事件（异步操作）的一个结果

各种异步操作都可以用同样的方法进行处理 axios

+ 特点：

1. 对象的状态不受外界影响。处理异步操作，有三个状态：pending（进行中）, resolved（成功）, rejected（失败）

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果

初始化一个Promise对象：

```javascript
let promise=new Promise(function(resolved,rejected){

});
console.log(promise);
```

+ .then()方法：成功返回后调用回调函数，传一个函数作为参数，这个函数的参数是上面promise对象中resolved函数返回的

```javascript
let promise=new Promise(function(resolved,rejected){
    let res={
        code:200,
        data:{
            name:"张三",
            age:20
        }
    };//res是模拟后端传来的数据
    setTimeout(()=>{
        if(res.code===200){
            resolved(res.data);
        }
    },1000);//模拟1s之后后端传来res数据，如果状态码表示成功，则resolved返回data(就是后面then()中第一个参数函数的参数)
});
promise.then(val=>{
    console.log(val);//打印{ name: '张三', age: 20 }
});
```

+ .then()方法的第二个参数**（可选）**：也是一个回调函数，该回调函数的参数为上面Promise对象中执行rejected函数返回的值

模拟出错情形：

```javascript
let promise=new Promise(function(resolved,rejected){
    let res={
        code:400,
        data:{
            name:"张三",
            age:20
        },
        error:"出错了"
    };//res是模拟后端传来的数据
    setTimeout(()=>{
        if(res.code===200){
            resolved(res.data);
        }else{
            rejected(res.error);
        }
    },1000);//模拟1s之后后端传来res数据，如果状态码表示成功，则resolved返回data(就是后面then()中第一个参数函数的参数;其余情况调用rejected返回error(就是后面then()中第二个参数函数的参数))
});
promise.then(val=>{
    console.log(val);
},err=>{
    console.log(err);//调用的该方法，打印出错了
});
```

另一个例子：

```javascript
function timeOut(ms){//过ms时间返回一个"hello"字符串
    return new Promise(function(resolved,rejected){
        setTimeout(()=>{
            resolved("hello");
        },ms);
    });
}
timeOut(1000).then(res=>{
    console.log(res);
});
```

返回值为一个Promise对象，这样就可以实现链式调用

+ 如果`.then()`的回调函数又返回了一个Promise()对象，可以再次`.then()`调用回调函数

+ 返回错误类型的另一种写法：在.then()后再加

```javascript
.then(null,err=>{
    //do something,报错时调用
})
```

也等价于：

```javascript
.catch(err=>{
    //do something,报错时调用
})
```

## Promise封装AJAX

用本地json文件`test.json`模拟网络http请求

`getJSON(url)`用于封装从url处获取数据（返回一个Promise()对象）的方法



```javascript
let getJSON=function(url){
    return new Promise((resolved,rejected)=>{
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=handler;
        function handler(){
            if(xhr.readyState!=4){
                return;
            }
            if(xhr.status>=200&&xhr.status<300){
                resolved(xhr.responseText);
            }else{
                rejected("error");
            }
        }
        xhr.open('GET',url,true);
        xhr.send();
    })
}
getJSON('test.json').then((val)=>{
    console.log(val);
},(err)=>{
    console.log(err);
});
```

## Promise对象的其他方法

### Promise.prototype.resolve()

将某对象转化为Promise对象

```javascript
let str="foo";
let p=Promise.resolve(str);
/*
等价于
let p=new Promise((resolved)=>{
    resolved(str);
});
*/
p.then(res=>{
    console.log(res);
});
```

### Promise.prototype.reject()

同理，只不过失败回调

### Promise.prototype.all()

将多个Promise对象合并，若全部成功则调用成功回调函数，有一个不成功则调用失败回调函数

例1：

```javascript
let str="success1";
let p1=Promise.resolve(str);
let p2=new Promise(resolve=>{
    setTimeout(()=>{
        resolve('success2');
    },1000);
});
let p3=Promise.resolve("success3");
let p=Promise.all([p1,p2,p3]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});
//全部成功的情况，1s后打印['success1', 'success2', 'success3']
```

例2：

```javascript
let str="success1";
let p1=Promise.resolve(str);
let p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('fail1');
    },1000);
});
let p3=Promise.reject("fail2");
let p=Promise.all([p1,p2,p3]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});
//有两个Promise返回失败，但最终只打印fail2，说明参数是最先失败的那一个返回值
```

### Promise.prototype.race()

+ 传入一个Promise对象组成的数组作为参数，回调最先到达成功或失败状态的函数

+ 作用：常用来设置请求超时的时间(如果几秒内没有成功返回则调用失败函数)

```javascript
let str="success1";
let p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("success1");
    },1000);
})
let p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('fail1');
    },500)
});
let p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('fail2');
    },200)
});
let p=Promise.race([p1,p2,p3]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});
//最终打印fail2,因为时间最短
```

### Promsie.prototype.finally()

无论成功或失败均会调用finally()参数中的回调函数

```javascript
function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });//无论是成功还是报错，均会打印'Experiment completed'
```

### Promise.prototype.done()

似乎不怎么用

## async

### 快速上手

使得函数可以返回一个Promise()对象，是Generator()的一个语法糖

async 函数可能包含 0 个或者多个 `await` 表达式。await 表达式会暂停整个 async 函数的执行进程并出让其控制权，只有当其等待的基于 promise 的异步操作被兑现或被拒绝之后才会恢复进程。promise 的解决值会被当作该 await 表达式的返回值。使用 `async`/`await` 关键字就可以在异步代码中使用普通的 `try`/`catch` 代码块。(摘自MDN)

如果await后的表达式不是Promise对象，会自动转化为立即兑现的Promise对象

例子：

```javascript
function after5Seconds(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("success2");
        },5000);
    });
}

function after1Second(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("success1");
        },1000);
    });
}

async function f(){
    let b=await after5Seconds();//会将函数进程阻塞5秒后赋值给b
    console.log(b);
    let a=await after1Second();//会将函数进程阻塞1秒后赋值给a
    console.log(a+" "+b);
    
}

f();//本例中，先等待5秒打印success2，再等待1秒打印success1 success2
```

### async函数的返回值自动转化为Promise对象

return出去的值可以在.then()中使用，说明async函数的返回值也自动转化为Promise()对象

例如：

```javascript
async function foo() {
  return 1;
}
```

等价于：

```javascript
function foo() {
  return Promise.resolve(1);
}
```

下面是一个具体例子：

```javascript
function after2Seconds(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("success2");
        },2000);
    });
}

function after1Second(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("success1");
        },1000);
    });
}

async function f(){
    
    let a=await after1Second();
    console.log(a);
    let b=await after2Seconds();
    console.log(a+" "+b);
    return a+" "+b;
}

f().then(res=>{
    console.log(res);
});
//本例中，先过1秒打印success1，再过2秒打印success1 success2，紧接着打印success1 success2(f().then()的回调)
```

