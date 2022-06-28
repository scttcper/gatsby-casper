---
layout: post
title: "Entity Framework Proxy GetType() mess"
author: [masimplo]
tags: [".Net"]
image: ../images/headers/jake-hills-36605-unsplash.jpg
date: "2011-07-07T23:46:37.121Z"
draft: false
---

Δουλεύοντας με το Entity Framework του .Net και έχοντας υλοποιήσει ένα Repository Pattern με generics βρέθηκα στην θέση να πρέπει να φτιάξω ένα Repository αγνώστου, μέχρι το runtime, τύπου οπότε έκανα κάτι του στυλ:

….

Όσο έφτιαχνα νέα entities αυτό το chunk δούλευε απροβλημάτιστα. Μόλις όμως άρχισα να σηκώνω entities από το framework για editing τα exceptions δεν είχαν σταματημό. Το πρόβλημα δημιουργήθηκε από το γεγονός ότι τα entities που γυρνάει το EF είναι proxies που κάνουν inherit τον τύπο του εκάστοτε entity και όχι τύπου entity.

Η πρώτη μου σκέψη ήταν αν η MS θα είχε καταχωνιάσει κάπου τον τύπο του entity μέσα στα properties των dynamic proxies. Πουθενά όμως, εκτός από το αναμενόμενο base type το οποίο όμως δημιουργούσε άλλα προβλήματα αν κάποια entities έχουν πάνω από ένα επίπεδα inheritance όπως τα δικά μου.

Μετά από αρκετό ψάξιμο, μιας και searches του στυλ: *“dynamic proxies gettype originating type” *γελούσαν στα μούτρα μου,βρήκα ένα γλυκύτατο static method μέσα στο ObjectContext που έδεινε τον Entity Type για Dynamic proxy entities αλλά δεν παραπονιόταν και στα POCO, οπότε ήταν ότι χρειαζόμουν για να κάνω το προβληματικό chunk exception free (τουλάχιστον του συγκεκριμένου :P).

```
public static bool IsProxy(object type) {
   return type != null && ObjectContext.GetObjectType(type.GetType()) != type.GetType();
}
```
