# 装饰器模式
> 装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。

## 装饰器的应用场景
假设我们的初始需求是：每个业务中的按钮在点击后都弹出「您还未登录哦」的弹窗，后面新增的需求是在弹窗弹出后把按钮的文案改为“快去登录”，同时把按钮置灰，如何遵循“开放封闭原则”实现呢？

初始代码为：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>按钮点击需求1.0</title>
</head>
<style>
    #modal {
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        text-align: center;
    }
</style>
<body>
	<button id='open'>点击打开</button>
	<button id='close'>关闭弹窗</button>
</body>
<script>
    // 弹窗创建逻辑，这里我们复用了单例模式面试题的例子
    const Modal = (function() {
    	let modal = null
    	return function() {
            if(!modal) {
            	modal = document.createElement('div')
            	modal.innerHTML = '您还未登录哦~'
            	modal.id = 'modal'
            	modal.style.display = 'none'
            	document.body.appendChild(modal)
            }
            return modal
    	}
    })()
    
    // 点击打开按钮展示模态框
    document.getElementById('open').addEventListener('click', function() {
        // 未点击则不创建modal实例，避免不必要的内存占用
    	const modal = new Modal()
    	modal.style.display = 'block'
    })
    
    // 点击关闭按钮隐藏模态框
    document.getElementById('close').addEventListener('click', function() {
    	const modal = document.getElementById('modal')
    	if(modal) {
    	    modal.style.display = 'none'
    	}
    })
</script>
</html>
```

装饰器模式es5实现：
```javascript
// 将展示Modal的逻辑单独封装
function openModal() {
    const modal = new Modal()
    modal.style.display = 'block'
}
// 按钮文案修改逻辑
function changeButtonText() {
    const btn = document.getElementById('open')
    btn.innerText = '快去登录'
}

// 按钮置灰逻辑
function disableButton() {
    const btn =  document.getElementById('open')
    btn.setAttribute("disabled", true)
}

// 新版本功能逻辑整合
function changeButtonStatus() {
    changeButtonText()
    disableButton()
}

document.getElementById('open').addEventListener('click', function() {
    openModal()
    changeButtonStatus()
})
```

装饰器es6实现（更加面向对象化的方式）：
```javascript
// 定义打开按钮
class OpenButton {
    // 点击后展示弹窗（旧逻辑）
    onClick() {
        const modal = new Modal()
    	modal.style.display = 'block'
    }
}

// 定义按钮对应的装饰器
class Decorator {
    // 将按钮实例传入
    constructor(open_button) {
        this.open_button = open_button
    }
    
    onClick() {
        this.open_button.onClick()
        // “包装”了一层新逻辑
        this.changeButtonStatus()
    }
    
    changeButtonStatus() {
        this.changeButtonText()
        this.disableButton()
    }
    
    disableButton() {
        const btn =  document.getElementById('open')
        btn.setAttribute("disabled", true)
    }
    
    changeButtonText() {
        const btn = document.getElementById('open')
        btn.innerText = '快去登录'
    }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function() {
    // openButton.onClick()
    // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
    decorator.onClick()
})
```

## ES7 中的装饰器（装饰器语法糖）

### 类装饰器
```javascript
// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
    target.hasDecorator = true
  	return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator)
```

### 方法装饰器
```javascript
// 具体的参数意义，在下个小节，这里大家先感知一下操作
function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function() {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
    @funcDecorator
    onClick() { 
        console.log('我是Func的原有逻辑')
    }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()
```

注：以上代码直接放进浏览器/Node 中运行会报错，因为浏览器和 Node 目前都不支持装饰器语法，需要大家安装 Babel 进行转码
