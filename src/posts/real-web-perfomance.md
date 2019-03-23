---
layout: post
title: "Measure real world web performance"
author: masimplo
tags: ['performance']
image: ../images/headers/veri-ivanova-17904-unsplash.jpg
date: "2019-03-23"
draft: false
---
Every developer at some point gets a task to make something faster.

You might hear:
> Some of our users complain that this part of app feels slugish

> Our users are closing the app before this task completes

> Our conversion in that screen is not as good, might be UX, might be performance, not sure, go check it out

and so on. Don't be fooled perfomance issues are not always easy to spot. In the lab or on your great desktop or phone, everything might seem fine, but out there it is a jungle.


Sometimes it might be possible to reproduce issues by throttling CPU and network, but it is not always possible as there are many variables at play here. So how do you debug performance issues that you are not able to witness or reproduce?

Thankfully there is the [Client-side performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) we can leverage to get info on how our app is behaving on a user's device. We are not just talking about time to first byte and time to interactive, but actual measurements for how long each piece of our code took to run on an actual user's device. You will be surprised with how many calculations that take a couple milliseconds on your lab devices, are responsible for dropping frames on user's devices (more than 16ms).

We are going to leverage two specific methods of the performance API.

**performance.mark**: responsible for marking the time passed from the page load (not epoch)

**performance.measure**: responsible for giving us a duration between two marks

To measure a task's duration we can do the following:

```javascript
performance.mark('mytaskStart'); // marking the start time of the task. You can use any name.

for(let i=0;i<1000;i++) {
    // expensive task
}

performance.mark('mytaskFinish'); // marking the end fo the task. Again you can use any name.

performance.measure('mytask', 'mytaskStart', 'mytaskFinish'); // this will give us the duration of the task in an entry named mytask measuring from mytaskStart mark up to mytaskFinish mark

```

To capture the measurement and do something with it (e.g. log it or send to a server or even change our apps behaviour) we need to setup and register a performance observer. It is actually pretty straight forward.

```javascript
const userObserver = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
      // do something with the entry, for now lets just log it
      console.log(`${entry.entryType}: ${entry.name} took ${entry.duration}ms`)
  });
});

// start the observer and listen only for measure type entries (we could listen for mark as well if we wanted)
userObserver.observe({ entryTypes: [‘measure’] });
```

Now whenever your expensive task runs we will get a nice log in the console like:

`measure: mytask took 125ms`

In a real world scenario, we can gather such statistics to our server or analytics provider and use it to both identify bottlenecks or debug specific situations.

*Since we are using the Performance API, measuring should not have any impact on our app's performance (like it would, if we were using Date timestamps).*