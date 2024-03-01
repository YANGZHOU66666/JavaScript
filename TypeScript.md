# TypeScript

## 类型推断

初始化了一种类型，不能赋值为其他类型

```typescript
let str="aaa";
str=1;//会报错
```

```typescript
let str;
str="aaa";
str=1;//这样不会报错
```

## 类型注解

```typescript
let str:string;//声明为string类型
str=10;//报错
```

## 类型断言

情景：

```javascript
let nums = [1,2,3];
let res = nums.find(item=>item>2);
res*=5;//报错，因为res可能是undefined
```

可以手工断言，声明一定是某种类型：

```typescript
let nums = [1,2,3];
let res = nums.find(item=>item>2) as number;
res*=5;//不报错
```

