---
layout: post
title: "NodeJS async/await with retry"
author: masimplo
tags: []
image: ../images/headers/async-javascript.jpg
date: "2017-10-15"
draft: false
---

Some time ago I wrote a microservice in plain es5 javascript running on node 4.x I recently wanted to make some changes to the service and update dependencies, as some of them had some security vulnerabilities.

Looking at code you wrote a couple years back is sometimes scary. I couldn't believe I wrote that code and I hadn't applied all the cool patterns I know now. I started by rewriting the code to use const and let istead of var and converting functions to arrow functions. Then removed Bluebird promises in favor of the now core included es6 promises. Then came functional sugaring by using map, filter, reduce and friends. One thing led to another and here I was refactoring promise thenables to async/await code.

Functions with promise chains of 80 lines got reduced down to 30 lines or less and without the christmas tree effect all over the code. One can debate that using higher order functions can reduce nesting and this is not really a problem of promises, but there are specific cases that this needs more work than is worth and inter-dependencies between promises can drive you mad.

Using promises to talk to a remote database that was not very reliable, required the use of promise-timeout and promise-retry libraries and also some rather complicated code to replay promises after they timeout. I looked around for a similar solution to async await and although I found a couple, wasn't really happy with them.

What I ended up doing is writing a "middleware" function that wraps every express callback that talks to the database. One issue is to timeout if you don't get a db response for say over 2secs and second one to retry the operation if certain conditions are met. For timeout I kept promise-timeout as I find it rather efficient.

**Retry**

```javascript
const asyncRetryMiddleware = fn =>
  async (req, res, next) => {
    const retries = 3;
    for (let i = 1; i <= retries; ++i) {
      try {
        await fn(req, res, next);
        break;
      } catch (err) {
        if (err instanceof TimeoutError || err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
          logger.warn({ err }, `database connection error occured. Will now attempt reconnect for the ${i} time and retry.`);
          database.connectToServer();
          if (i === retries) next(err);
        } else if (err.name.includes('ConnectionError')) {
          logger.error({ err }, 'Cannot connect to database. Server might be down.');
          next(err);
          break;
        } else {
          next(err);
          break;
        }
      }
    }
  };
```

usage:

```javascript
router.route('/tokens/:tokenId')
  .get(asyncRetryMiddleware(groupsController.getGroupByToken));
```

wrapped function:sqx

```javascript
const getGroupByToken = async (req, res, next) => {
  const token = req.params.tokenId;
  const match = await groupsService.getGroupByToken(token);
  if (match) {
    res.send(req.query.full ? match : { id: match.id });
  } else {
    res.status(404).send();
  }
  next();
}
```

Let's see what is going on here.
asyncRetryMiddleware is a functor that wraps an async function that might throw an error. It tries to execute that function, if everything goes as planned `break` is called and the for loop is terminated, leaving this function without further processing.
If an error is thrown inside the wrapped async function however, the catch block is activated. If the error is a database timeout, we reconnect to the db and try again by not stoping the for loop. If this happens 3 times we give up and pass the error to the next callback. Otherwise if the error is not triggered in second or third attempt, we leave this handler and continue as normal.

If the error is unrecoverable or something that reconnecting to the db will not fix, there is no point in retrying so we give up on first attempt.
Also notice that next(error) is called in all cases for us and thus we do not have to bother calling it inside our wrapped functions, which would require an additional wrapping of their code in a try catch.

Rather straight forward.

This is the first I done in writting node code with async await (had written loads in C# in the past) and I think they make code look cleaner than using just promises. Of course promises are still there and have their use cases, but since I have been using observables in my JS code for some time now, they don't seem that appealing to me anymore. Now if only RxJS and async/await played nice with each other without having to convert to and from promises...