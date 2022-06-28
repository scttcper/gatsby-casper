---
layout: post
title: "NVM is hands down the best way to install nodejs"
author: [masimplo]
tags: [""]
image: ../images/headers/sven-read-623749-unsplash.jpg
date: "2016-11-02"
draft: false
---

With NodeJS rapidly releasing newer version since the node community got back on its feet, it is now necessary to have an easy way to maintain your [NodeJS](https://node.org/) installations.

I have tried many different ways to install and maintain Node, distribution packages, binary downloads, building from source and finally using [NVM](https://github.com/creationix/nvm). I know that each method has its advantages and disadvantages, but I now have a favourite.

Nothing beats how easy it is to get to any version of Node using NVM. You can go up, you can go down, heck you can even switch back and forth all the time if that is what you need. Imagine having to run a few hundred tests across major versions of node like most CIs do. Using NVM this is easily done by writing a few lines on a script to switch to the version you need before running each round of tests.

In order to install NVM all you need to do is

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`

and then you can install any version of node simply by writing

`nvm install 6.9.1`

After you install a few versions of node you can switch between them simply by writing

`nvm use 4.5.0`

But what about your global packages? Say you have a global cli package that you need for you build process. You can either install them each time you install a separate node version or you can again take advantage of nvm and just do

`nvm install 6.9.1 --reinstall-packages-from=4.5.2`

How is that for easy migration of node versions!?

If you now want to remove your system nodejs, since you will probably not need it anymore you can do something along these lines:

`sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}`

This will delete all files installed by the system wide installed nodejs package. Just make sure you are not messing some other computer account up, as if they don't use nvm themselves will be left with no node at all

