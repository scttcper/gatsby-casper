---
layout: post
title: "Waiting for progress"
author: [masimplo]
tags: [""]
image: ../images/headers/ben-white-292680-unsplash.jpg
date: "2012-11-22"
draft: false
---

Όταν μια εφαρμογή έχει πολλές χρονοβόρες διαδικασίες τότε ένα progressbar στην κεντρική φόρμα είναι απαραίτητο, ώστε να μην υπάρχουν 200 progressbar δεξιά και αριστερά.
Ωραία, ας βάλουμε το progressbar στην κεντρική φόρμα, εγώ όμως που είναι 15 φόρμες και 20 κλάσεις μακριά και κάνω ένα χρονοβόρο υπολογισμό τι κάνω;.
Έχω δει ανθρώπους να κάνουν το progressbar public, να έχουν access μέσω static, ακόμα και να το περνάνε παντού ως παράμετρο. Δεν μπορεί… Πρέπει να υπάρχει μη καγκουρικος τρόπος σκέφτηκα. Και τότε μου ήρθε…

Μία class ονόματι StatusNotifier που απαρτίζεται από:

- ένα event delegate
```csharp
  public delegate void StatusChangedEventHandler(object sender, StatusEventArgs e);
```
- ένα event
```csharp
  public static event StatusChangedEventHandler StatusChanged;
```

και 1 μέθοδο
```csharp
  if (StatusChanged == null) return; // Make sure there are methods to execute
  StatusChanged(sender, new StatusEventArgs(status, percentageDone)); // Raise the event
```

Όποιος θέλει να ειδοποιήσει για το status μίας χρονοβόρας διαδικασίας απλά χρειάζεται να κάνει
```csharp
  StatusNotifier.SetStatus(this, "Processing universal parameters of chaos...", 10);
```

Στην αντίπερα όχθη, στην mainForm της εφαρμογής η οποία έχει το statusbar αρκεί να κάνουμε register το statusChanged event
```csharp
  StatusNotifier.StatusChanged += StatusNotifier_StatusChanged;
```

και να γράψουμε τι θέλουμε να γίνεται με τα δεδομένα που μας ήρθαν μέσω του event
```csharp
  void StatusNotifier_StatusChanged(object sender, StatusEventArgs e) {
    var percentageDone = e.PercentageDone;
    var statusText = e.status;

    if (percentageDone == -1) {
      progressBar.EditValue = 0;
      progressStatusLabel.Caption = string.Empty;
      progressBar.Visibility = BarItemVisibility.Never;
    } else {
      progressBar.Visibility = BarItemVisibility.Always;
      progressBar.EditValue = percentageDone;
      progressBar.Refresh();
    }
    progressStatusLabel.Caption = statusText;
    progressStatusLabel.Refresh();
  }

```
