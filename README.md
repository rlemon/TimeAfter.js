TimerAfter.js
========

Simple timer class, nothing fancy. Allows you to specify callbacks on a repeating time loop.

Basic usage: 
    
    var timer = new TimeAfter();
    timer.register(1000, foo);
    timer.start();
    
    function foo(callbackObject) {
        console.log('Foo' + callbackObject.step + ': ' + this.time);
        if (this.time > 5000) {
            this.unregister(foo);
        }
    }
  
Outputs (each value is +- a few ms depending on the cpu): 
    
    Foo0: 1002 
    Foo1: 2001 
    Foo2: 3004 
    Foo3: 4004 
    Foo4: 5002 
    
