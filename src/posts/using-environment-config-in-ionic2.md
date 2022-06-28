---
layout: post
title: "Using environment config in Ionic2"
author: [masimplo]
tags: ["Ionic"]
image: ../images/headers/rsz_elizabeth-lies.jpg
date: "2017-09-12"
draft: false
---

After you finish building your app and you are ready to deploy to the App Stores you will realize that you need to use specific variables for the production environment that are different than your development environment. After a lot of reading and some experimentation I came upon what I consider the best and most versatile way to build apks and ipas that have different "settings" for development and production.

So say you have some specific values for each environment that you want to use throughout your app, lets first declare an interface for these values, so that typescript can help us not forget declaring any and we have an easier time using them in our code.

**env.variables.ts**

```typescript
export interface IEnvironmentalVariables {
  apiUrl: string;
  googleOAuth: string;
  kmsApiKey: string;
  logToConsole: boolean;
}
```

then let's declare some values for the development and production environments respectively:

**env.develop.ts:**

```typescript
import { IEnvironmentalVariables } from './env.variables';

export const devConfig: IEnvironmentalVariables = {
  apiUrl: 'https://...',
  googleOAuth: '6047....apps.googleusercontent.com',
  kmsApiKey: '7a...1e',
  logToConsole: true
};
```

**env.production.ts:**

```typescript
import { IEnvironmentalVariables } from './env.variables';

export const productionConfig: IEnvironmentalVariables = {
  apiUrl: 'https://...',
  googleOAuth: '6047....apps.googleusercontent.com',
  kmsApiKey: '7a...1e',
  logToConsole: false
};
```

We then need to declare an OpaqueToken so that we can use a simple string in Angular's DI:

**environment.token.ts:**

```typescript
import { OpaqueToken } from '@angular/core';

// tslint:disable-next-line:variable-name
export const Environment = new OpaqueToken('environment');
```

and then lets declare out environment module:

**environment.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { Environment } from './environment.token';
import { productionConfig } from './env.production';
import { developConfig } from './env.develop';

export function environmentFactory() {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return developConfig;
    case 'prod':
      return productionConfig;
    default:
      throw new Error('Enviroment not set');
  }
}

@NgModule({
  providers: [
    {
      provide: Environment,
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule { }
```

This completes our module definition. We can now go ahead and use this module in any of our apps like following.
We first import the module as usual in our main app module.

**app.module.ts**

```typescript
import { EnvironmentsModule } from '../environment/environment.module';

@NgModule({
  ...
  imports: [
  ...
  EnvironmentsModule,
  ...
  ]
  ...
}
```

and whenever we need to use a config value we can inject our environment like:

**my-class.ts:**

```typescript
class MyClass {
  constructor(@Inject(Environment) private _env: IEnvironmentalVariables){
      console.log(this._env.apiUrl); // different value depending on the environment
  }
}
```

The final steps that makes all the above take effect in the final built application is setting the NODE_ENV variable to the appropriate value. For instance to build an APK using the production config values we would run:

```bash
NODE_ENV=prod bash -c 'ionic cordova build android --prod --release'
```
