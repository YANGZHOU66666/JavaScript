/*class Animal{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    getName(){
        return this.name;
    }
    getAge(){
        return this.age;
    }
}

class Dog extends Animal{//会继承所有的方法
    constructor(name,age,color){
        super(name,age);//super调用父类的构造器，注意如果是继承的类，必须调用super，否则报错
        this.color=color;
    }
    getColor(){
        return this.color;//子类新增的方法，直接写就行
    }
    say(){
        console.log("我是"+super.getName()+"，今年"+super.getAge()+"岁了");
    }
    getName(){
        return this.name+"(Dog)";
    }
}
let dog1=new Dog("花花",5,'yellow');
console.log(dog1);
console.log(dog1.getName());
dog1.say();
*/
function func() {
    console.log(this);
  }
  func.call({ key: 'value' }); // this指向{ key: 'value' }