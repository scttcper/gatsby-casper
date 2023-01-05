---
layout: post
title: "Writing a Firebase function to modify user claims"
author: [masimplo]
tags: ["lifehacks"]
image: ../images/headers/sarah-kilian-xit3LjRvKvM-unsplash.jpg
date: "2023-01-05"
draft: false
---

Hey there, long time no see!

Have you ever wanted to give certain users in your Firebase project special privileges, like being able to access certain data or perform certain actions that regular users can't? Well, you can use user claims to do just that!

User claims are a way to assign custom attributes to users in your Firebase project. These claims can be used to determine a user's access level or permissions within your app. For example, you might have a group of users who are considered "moderators" and have the ability to delete inappropriate content. You can assign these users a "moderator" claim, which can be checked within your app's security rules to grant them the necessary permissions.

But how do you actually assign these claims to your users? One way is to use a Firebase function.

First, make sure you have the Firebase CLI (Command Line Interface) installed and that you're logged in. Then, create a new Firebase project and navigate to the functions directory:

```bash
firebase init
cd functions
```

Next, install the necessary dependencies:

```bash
npm install firebase-admin firebase-functions
```

Now it's time to write some code! Create a new file called index.js and import the necessary modules:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
```
Next, create a function that will modify the user's claims. This function should take in a user ID and the desired claims, and use the setCustomUserClaims method to update the user's claims in the Firebase Auth service:

```typescript
export const setClaims = functions.https.onCall((data, context) => {
  // Ensure that only authenticated users can modify claims
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can modify claims'
    );
  }

  // Get the user ID and claims from the request data
  const userId = data.userId;
  const claims = data.claims;
  // claims is an object containing key value pairs e.g. { team: 'moderator' }

  // Set the custom claims on the user
  return admin.auth().setCustomUserClaims(userId, claims)
    .then(() => {
      return { message: `Successfully set claims for user ${userId}` };
    })
    .catch((error) => {
      throw new functions.https.HttpsError(
        'internal',
        `Error setting claims for user ${userId}: ${error}`
      );
    });
});
```
Finally, deploy your function using the Firebase CLI:

```bash
firebase deploy --only functions
```

And that's it! You now have a Firebase function that can modify user claims. You can call this function from your app or from the Firebase CLI to update the claims for any user in your project.

You can now use these claims in your app or website to change what each user accesses but also to restrict other firebase services like firestore or storage.

For instance, to restrict access in Firestore to records only for moderators you could do:

```
match /records/{document=**} {
  allow read: if request.auth != null && request.auth.uid != null && request.auth.token.team == 'moderator';
  allow write: if request.auth != null && request.auth.uid != null && request.auth.token.team == 'moderator';
}
```

To check the claim in your app you could do:

```typescript
const token = await this._auth.currentUser.getIdTokenResult(true);
this.isModerator = token.claims?.team === 'moderator';
```

The possibilities are endless, so go ahead and start experimenting!
