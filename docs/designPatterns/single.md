# 单例模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式。意思就是声明去new同一个类的时候，那几个声明都是同一个对象。

```javascript
class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
}

const s1 = new SingleDog()
const s2 = new SingleDog()

// false（这种他们都是不同对象，证明不是单例模式）
s1 === s2
```

一般有两种可以实现单例模式：

```javascript
// 1. 静态属性
class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!SingleDog.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            SingleDog.instance = new SingleDog()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

// true
s1 === s2
```

```javascript
// 2. 构造函数
class SingleDog {
  constructor() {
    if (!SingleDog.instance) {
      SingleDog.instance = this;
    }
    return SingleDog.instance;
  }
}
const s1 = new SingleDog();
const s2 = new SingleDog();

// true
console.log(s1 === s2);
```

```javascript
// 3. 闭包
class SingleDog {}

SingleDog.getInstance = (function() {
    // 定义自由变量instance，模拟私有变量
    let instance = null
    return function() {
        // 判断自由变量是否为null
        if(!instance) {
            // 如果为null则new出唯一实例
            instance = new SingleDog()
        }
        return instance
    }
})()

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

// true
console.log(s1 === s2);
```