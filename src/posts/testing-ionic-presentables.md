---
layout: post
title: "Testing Ionic presentables"
author: masimplo
tags: [""]
image: ../images/headers/kelly-sikkema-411622-unsplash.jpg
date: "2017-06-30"
draft: false
---

I frequently come across the question of how we can test a presentable in Ionic. A presentable is component that is presented in a separate navigation stack like a Modal, an Alert, an ActionSheet, a Toast, a LoadingModal etc.

Our code will normally look like:
```typescript
private openEditorModal() {
  const modal = this._modal.create(MyModalComponent);
  modal.onDidDismiss((data: { note: string }) => {
    this.note = data.note;
  });
  modal.present();
}
```

So how can we test that this.note will take the value returned from the modal? We need a way to trigger onDidDismiss.
After gathering a few similar cases that I wanted to test I came up with a mock that can be used to test such functionality, mimicking the behaviour of normal presentables.

```typescript
export class PresentableControllerMock {
  public presentableRef = {
    present: () => Promise.resolve(),
    dismiss: (data?: any) => {
      if (this.dismissCallbackFn) {
        this.dismissCallbackFn(data);
      }
      return Promise.resolve({});
    },
    onDidDismiss: (fn) => {
      this.dismissCallbackFn = fn;
    }
  };

  public dismissCallbackFn = null;

  public create(options?) {
    return Object.assign(this.presentableRef, options);
  }
}
```

Now this opens up a few possibilities in our tests. Let's have a look at a simple case first.

```typescript
it('updates the note if it is edited', function () {
  const modalCtrl = fixture.debugElement.injector.get(ModalController);
  spyOn(modalCtrl, 'create').and.callThrough();
  const modal = (<PresentableControllerMock>(<any>modalCtrl)).presentableRef;
  spyOn(modal, 'present').and.callThrough();

  sut.openEditorModal();

  expect(modal.present).toHaveBeenCalled();
  modal.dismiss({ note: 'new note' });

  expect(sut.notes).toEqual('new note');
});
```