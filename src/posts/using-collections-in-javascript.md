---
layout: post
title: "Managing Collections in Javascript"
author: [masimplo]
tags: ["Javascript"]
image: ../images/headers/kevs-gSMY1wNNlvY-unsplash.jpg
date: "2023-01-11"
draft: false
---

In many JavaScript applications, it's common to have models that contain collections of other objects. For example, a user profile might have a list of emails associated with it. Managing these collections can be a tricky task, as it's important to ensure that the data is valid, prevent duplicates, and maintain control over how the data is manipulated.

One approach to managing collections is to expose the collection (usually an Array) directly to users of the model. This can be problematic, as it gives maximum power to the collection users and it can be difficult to control how the collection is manipulated.


```typescript
const profile = new Profile();
profile.emails.push('a@a.com');
profile.emails.push('a@a.com'); // no way to stop duplicates
profile.emails.push('132132'); // no way to check for validity
profile.emails.length = 0;     // oh no!
```

A better approach is to keep the collection private, and instead expose methods for manipulating the collection. This way, you can ensure that the data is valid, prevent duplicates, and control how the collection is manipulated.

```typescript
const profile = new Profile();
profile.addEmail('a@a.com');
profile.addEmail('a@a.com'); // throws error as we check if that email already exists inside addEmail
profile.clearAll(); // only allow this whenever appropriate
profile.getEmails(); // get an array copy of the emails array
```

This approach has a couple of downsides. It can add a lot of code to the model, which can make it harder to read and maintain, and it can make it harder to reuse the collection management code. Additionally, it can be difficult to change the implementation from an exposed array to something like this, as it would require a lot of refactoring.

Another approach that can be useful in some circumstances is to use an array-extending class to have the best of both worlds.

```typescript
import { IEmail, Email } from './email.model';

export class Emails extends Array<Email> {
  constructor(emails: IEmail[] = []) {
    super(...emails.map(e => new Email(e)));
  }

  // Prevent mutations
  get [Symbol.species]() {
    return Array;
  }

  public addEmail(email: Email) {
    if (this.includes(email)) {
      throw new Error('Email already exists');
    }
    this.push(e);
  }

  public updateEmail(email: Email, originalEmail: Email) {
    const index: number = this.findIndex(e => e.isEqual(originalEmail));
    if (index !== -1) {
      this.splice(index, 1, email);
    }
  }

  public deleteEmail(email: Email) {
    const index: number = this.findIndex(e => e.isEqual(email));
    if (index !== -1) {
      this.splice(index, 1);
    }
  }

  public clearAll() {
    this.length = 0;
  }

  public toJSON() {
    return this.map(r => r.toJSON());
  }

  public toString() {
    return JSON.stringify(this.toJSON());
  }
}

```

Now you can do:

```typescript
const profile = new Profile();
profile.emails.addEmail('a@a.com');
profile.emails.addEmail('a@a.com'); // throws error as we check if that email already exists inside addEmail
profile.emails.clearAll(); // only allow this whenever appropriate
profile.emails; // get the emails array as normal
```

By using an array-extending class, you can take advantage of the built-in array methods like map, filter, and find, while also adding custom methods like addEmail, updateEmail, and deleteEmail. Additionally, using the Symbol.species getter prevent mutations of the array.

It's important to note that this approach is not suitable for all use cases, and the choice of how to manage collections will depend on the specific requirements of the application. However, using an array-extending class can provide a good balance between control and flexibility, and can make code more maintainable and less prone to errors.
