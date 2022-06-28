---
layout: post
title: "Testing RxJS5 async methods in Angular2"
author: [masimplo]
tags: []
image: ../images/headers/rxjs-testing.jpg
date: "2017-03-15"
draft: false
---

For some time now I am struggling to find a way to test RxJS code that uses functions with time in them.

Let's look at an example of what we are trying to test.

```typescript
public ngOnInit() {
  Observable.interval(3000)
    .takeUntil(this._componentDestroyed)
    .subscribe(() => this._statusStore.refreshStatus());
}
```

We have a method that subscribes on an observable that emits every 3 seconds. I want to write a test that makes sure that `statusStore.refreshStatus()` will be called every 3 seconds after someone calls `ngOnInit()` on the system under test (sut).

Let's try to test this.

```typescript
//Attempt 1: wait for it
it('calls refreshStatus after 3 seconds', function(done){
    spyOn(mockStatusStore, 'refreshStatus').and.callThrough();
    sut.ngOnInit();
    setTimeout(()=> {
        expect(mockStatusStore.refreshStatus).toHaveBeenCalled();
        done();
    }, 3001);
}, 3100);
```

What we did here is write a tests that will wait for the emission of the observable (ie. 3 seconds) using a timeout. And we had to modify jasmine's default timeout from 2 seconds per test to 3,1 sec. This means that our test will last for a actual 3 seconds, which might be ok if you have 10 or 20 tests, but definitely not ok if you have a couple thousand tests (as we do). Also there is no reason to actually leave the build runner idle for 3 seconds and what if instead of 3 seconds we had an interval doing something every 10 minutes or wanted to check that this actually emitted more than once etc. Definitely not the best approach.

RxJS documentation has some examples but all of them assume that the code to be tested is declared within the test. In a similar fashion, we could modify our original code to be able to be manipulated by the test (I know it sucks, but let's take a look at that as well).
For the specific example what we would have to do is pass the value of the interval through the class constructor so that we can use a mock to change it.

```typescript
// adapted code
class MyClass {
  constructor(private _config: Config){
  }

  public ngOnInit() {
    Observable.interval(this._config.intervalValue)
      .takeUntil(this._componentDestroyed)
      .subscribe(() => this._statusStore.refreshStatus());
  }
}

// Attempt 2: Mock the interval value
it('calls refreshStatus after 3 seconds', function(done){
    spyOn(mockStatusStore, 'refreshStatus').and.callThrough();
    sut = new MyClass({intervalValue: 10});
    sut.ngOnInit();
    setTimeout(()=> {
        expect(mockStatusStore.refreshStatus).toHaveBeenCalled();
        done();
    }, 30);
});
```

Not much has changed in our code, but we now have to wait 30 milliseconds instead of 3 seconds. A clear improvement over the original solution and on the plus side we do not have hard coded values in our code any more and in this example works well. In more complicated code that a lot of events are happening inside the same subscription it might be incrementally hard to mock times such that everything happens in the order expected.

Being not completely satisfied with the above solution, I kept on searching for a more viable solution that could accommodate more complex scenarios and possible not having to wait at all for async tests.
Some sources demonstrated the use of jasmine.clock() functionality. Jasmine clock is a way to mock the native setTimeout function and thus mock time itself. It sounds great, but as always trying to put the theory to work, doesn't always work as expected.
The test would become:

```typescript
it('polls statusStore.refreshStatus on an interval', fakeAsync(() => {
  jasmine.clock().install();
  spyOn(mockStatusStore, 'refreshStatus').and.callThrough();
  sut.ngOnInit();
  expect(mockStatusStore.refreshStatus).not.toHaveBeenCalled();
  jasmine.clock().tick(3001);
  expect(mockStatusStore.refreshStatus).toHaveBeenCalled();
  jasmine.clock().tick(3001);
  expect(mockStatusStore.refreshStatus).toHaveBeenCalledTimes(2);
  jasmine.clock().uninstall();
}));
```

We install the jasmine clock mock, then we say how time progresses using tick() and finally remove the clock mock to prevent next tests to be affected. Doing that I got an error:

> Jasmine Clock was unable to install over custom global timer functions. Is the clock already installed?

Googling this error I came upon an [answer of Misko Hevery on SO](http://stackoverflow.com/questions/39600819/conflict-between-zone-js-and-jasmines-clock), stating:

> The code which throws this [here](https://github.com/jasmine/jasmine/blob/8624a52ee0b6f13b3b608ea6417ccc02257c5412/src/core/Clock.js#L93).
> It implies that jasmine was loaded before Zone.js. Switch the loading order. Zone always needs to be loaded first.

One solution would be to mess with the build system and figure out how dependencies are ordered, but wanted to stir clear of that for the time being as it might break something unexpected.
Following down the rabbit hole I came upon an [angular issue discussion](https://github.com/angular/angular/issues/10127) which although not definitive lead me to uncover Angular's helper function for testing (so far I have stirred cleared of using any angular test helpers, as I wanted to keep test code as vanilla as possible to avoid having to maintain it through Angular updates while getting stable).

Here is the resulting code:

```typescript
import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
...
it('polls statusStore.refreshStatus on an interval', fakeAsync(() => {
  spyOn(mockStatusStore, 'refreshStatus').and.callThrough();
  sut.ngOnInit();
  expect(mockStatusStore.refreshStatus).not.toHaveBeenCalled();
  tick(3001);
  expect(mockStatusStore.refreshStatus).toHaveBeenCalled();
  tick(3001);
  expect(mockStatusStore.refreshStatus).toHaveBeenCalledTimes(2);
  discardPeriodicTasks();
}));
```

This is almost identical with using jasmine.clock, only simpler.
I will put this to the test (pun intended) and update this article with news about how it performs in more advanced test cases.
