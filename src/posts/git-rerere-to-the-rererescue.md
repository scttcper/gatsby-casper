---
layout: post
title: "Git rerere to the rererescue"
author: [masimplo]
tags: []
image: ../images/headers/abraham-osorio-184519.jpg
date: "2017-10-18"
draft: false
---

When working on a feature branch you are sometimes isolated by all the fun that happens on the develop and master branches. You are developing feature A and someone merges onto develop utility X which you would like to use for your feature. First thought would be to merge develop branch onto your feature and then you would have access to the new shiny code snippet you so much desired. Merging develop into a feature branch creates an ugly, unhelpfull, troublesome when doing `git bisect` commit, reading "Merge develop into feature/A".

Many teams prefer rebasing as it keeps history clean. So instead of merging the develop branch onto feature/A you are rebasing feature/A onto develop. What this does is put away your commits, start from develop and then replay your commits one by one on top of latest develop. Great! no more merge commits this way. BUT, if any of your commits have one or more conflicts you will have to resolve them while replaying that commit on top of develop. Cool you say, I will have to deal with conflicts one at a time instead of being faced with a bucket of conflicts when merging. Ok you guessed it there is another BUT! BUT, say that you rebase and then 5 days pass and something else cools comes up into to develop and you want it, or you are ready to merge the feature back onto develop, doing another rebase will ask you to resolve all conflicts again from scratch as it will replay all your commits onto latest develop. Nobody wants to deal with same problems more than once.

Turns out git has yet another hidden feature (or not so much advertised anyway). Enter git rerere which stands for **R**euse **R**ecorded **R**esolution. Rerere is a config option rather than a command (there is a command also but serves for advanced usage of recorded resolutions and not enabling/disabling the feature. To enable rerere just do:

```bash
    git config --global rerere.enabled true
```

or edit your ~/.gitconfig by hand entering:

```
    [rerere]
    	enabled = true
    	autoupdate = true
```

And that's it. Now whenever you do a rebase and resolve some conflict, git will save that resolution and if it happens again during another rebase it will resolve it automatically.
