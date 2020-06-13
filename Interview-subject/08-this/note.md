# this的几种情况

* 默认绑定（非严格模式下，this指向的是window，严格模式下，this指向的是undefined）
* 隐式绑定（如果函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上）
* 显示绑定（函数通过调用call、apply、bind，this就指向这个被绑定的对象）
* new绑定（函数被new调用时，this指向由new新构造出来的这个对象）
* DOM事件中默认指向的是被绑定的DOM对象。