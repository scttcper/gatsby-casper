---
layout: post
title: "Adding type safety to Immutable.js with Typescript string literals and keyof"
author: masimplo
tags: []
image: ../images/headers/ts.png
date: "2017-05-08"
draft: false
---


Using immutable data structures is all the rage and for a good reason. After having used immutables in some large projects I can personally testify that after getting used to the initial adaptation curve, you cannot believe working without them. This is probably the reason that immutable data structures have been introduced in all tiers of application systems from front end frameworks and functional languages down to databases (i.e. event stores).

In my opinion one of the best immutable data implementations for javascript is immutable.js. It is very powerful and efficient, while at the same time easy to get started with. For javascript projects there is really no downside to it.
Using immutable.js has a real impact when being used in large projects with lots of data. I have also found that it is much easier to manage larger projects by using Typescript. For typescript projects, immutable.js has one major downside. Properties of immutable objects are accessed using strings.

For instance to get the price of a product object you would write:

```typescript
    immutableProduct.get('price');
```

This is fine until you refactor the product class property price to some other string like itemPrice. Then everything breaks at runtime and typescript cannot do anything about it during compile time.

Until now there was a way to inherit immutable.js Record type and avoid using get('string') accessors, but was more trouble that I was willing to go into.

Typescript introduced string literals in version 1.8 which provided a rather crude, but possible solution.

Say you had and interface

```typescript
    interface IProduct {
      price: number;
      description: string;
    }
```

you can introduce another interface to describe the immutable version of that data structure. Most useful functions are get('') and toJS(), so lets try to include them.

```typescript
    interface IImmutableProduct extends Immutable.Map<string, any> {
       toJS(): IProduct;
       get('price'|'description'): any;
    }
```

So toJS() returns an IProduct and get can only receive the string `price` or `description`. This is cumbersome to write and a nightmare to maintain. So along came Typescript 2.1 to introduce the keyof operator, so we can rewrite our interface like:

```typescript
    interface IImmutableProduct extends Immutable.Map<string, any> {
       toJS(): IProduct;
       get<K extends keyof IProduct>(key: K): IProduct[K];
    }
```

So now get gets a string that is a key of the interface IProduct, thus either "price" or "description" or any other we introduce in the future, inside IProduct declaration and as an added bonus the return type is also respecting the type of the interface property.

So we can now write:

```typescript
    const p = immutableProduct.get('price')
```

and we get validation that price is a valid argument as opposed to prise and p is of type number.

Only downside of this approach is when dealing with collections or nested structures, as their return type is not the same as the interface, but that is ok for now as the return type was just an added bonus for now.