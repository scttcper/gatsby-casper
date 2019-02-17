---
layout: post
title: "Adding highlight.js to Ghost"
author: masimplo
tags: [""]
image: ../images/headers/highlighted-code.png
date: "2017-10-17"
draft: false
---

Markdown has an out of the box code formatting syntax using the single or triple ` symbol but it does not feature any syntax highlighting or horizontal scrolling for that matter, making somewhat larger code blocks unreadable.

There are quite a few syntax highlighting libraries out there, but by personal preference alone I chose to install [highlight.js](https://highlightjs.org/). One way of installing it is by actually tweaking the ghost files, inserting a couple more tags on the header section. A faster way is to use the Code Injection tool on the admin panel.

In order to enable highlight.js all you have to do is head to your Admin panel > Code Inject and paste the following:

header section:
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/tomorrow-night-eighties.min.css">
<style>
  pre {
    word-wrap: normal;
    -moz-hyphens: none;
    -ms-hyphens: none;
    -webkit-hyphens: none;
    hyphens: none;
    font-size: 0.7em;
    line-height: 1.3em;
  }
    pre code, pre tt {
    white-space: pre;
  }
</style>
```

footer section:
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

And there you go, a quick and dirty installation of highlight.js for your ghost blog. If you decide to keep it, it might be a good idea to actually edit the ghost files as code injection might get quite messy after a couple of those quick and dirty installations.

