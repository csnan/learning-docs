# 工厂模式
> 分为简单工厂模式和抽象工厂模式。

## 简单工厂模式
> 其实就是将创建对象的过程单独封装，目的就是为了实现无脑传参，需要观察整个逻辑中变与不变的地方，将「不变」部分的提取出来，「变」的部分封装到工厂类中，让调用者只关心「变」的部分。
```javascript
function User (name, age, career, work) {
    this.name = name
    this.age = age
    this.career = career
    this.work = work
}

function Factory (name, age, career) {
    let work
    switch (career) {
        case 'coder':
            work = ['写代码','写系分', '修Bug'] 
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...
    }
    return new User(name, age, career, work)
}
```