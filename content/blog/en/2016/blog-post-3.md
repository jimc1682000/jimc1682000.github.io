---
title: "A Roundup of Common Programming Principles"
pubDate: 2016-01-11
description: "- The SOLID principles (SRP, OCP, LSP, ISP, DIP) - SRP (Single Responsibility) - Definition: a class should have only one reason to change."
tags: ["SRP", "OO", "Rule Of Three", "DRY", "DIP", "KISS", "SOLID", "OCP"]
locale: en
translationOf: blog-post-3
aiTranslated: true
---
  

-   The SOLID principles (SRP, OCP, LSP, ISP, DIP)

-   SRP (Single Responsibility)

-   Definition: a class should have only one reason to change. There should never be more than one reason for a class to change.
-   In plain terms: a class does only one thing.

-   OCP (Open-Closed)

-   Definition: software design should be open for extension but closed for modification. Software entities like classes, modules and functions should be open for extension but closed for modifications.
-   In plain terms: software should be easy to extend, and extending it shouldn't require changing any existing code.

-   LSP (Liskov Substitution)

-   Definition: a subclass must be able to substitute for its superclass. Inheritance should ensure that any property proved about supertype objects also holds for subtype objects.
-   In plain terms: when designing a superclass, only put in what all the subclasses share.

-   ISP (Interface Segregation)

-   Definition: clients should depend only on the interfaces they actually need. Clients should not be forced to depend upon interfaces that they don't use.
-   In plain terms: keep interfaces as simple as possible, and don't cram unrelated things into them.

-   DIP (Dependency Inversion)

-   Definition:

-   High-level modules should not depend on low-level modules; both should depend on abstractions. High-level modules should not depend on low-level modules. Both should depend on abstractions. 
-   Abstractions should not depend on details; details should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

-   In plain terms: don't spell out concrete relationships between objects—replace them with abstractions.

-   Ref:

-   [In Plain Terms - OO Design Principles (SOLID), with Real-life Examples](http://rockssdlog.blogspot.tw/2012/03/oo-solid.html)
-   [SOLID: All Five Change](http://teddy-chen-tw.blogspot.tw/2014/04/solid.html)
-   [Rambling on Software Design (5): Dependency-Inversion Principle](http://teddy-chen-tw.blogspot.tw/2012/01/5dependency-inversion-principle.html)

-   PS: In 《[In Plain Terms - OO Design Principles (SOLID), with Real-life Examples](http://rockssdlog.blogspot.tw/2012/03/oo-solid.html)》 the explanations of OCP and DIP are just too good XDD

-   On OCP: a Casanova stays forever "open" to getting a new girlfriend;  
    but how he handles the relationship stays "closed." That's because he abstracts all his girlfriends into a single interface called "Baby," and every girlfriend is an implementation of Baby. So he can just call every girlfriend "Baby" and never worry about getting the name wrong XD
-   On DIP: you're almost home after work when your wife calls, and you suddenly realize it's your wedding anniversary. Whatever you do, don't say over the phone, "Of course, I've got your favorite roses on the way home!" (concrete)  
    Because you might discover later that... every florist nearby is closed... Just say, "Of course, dear, I've got a gift on the way home" (abstract), and then you can buy whatever you happen to find for sale along the way.

-   DRY, Rule Of Three, KISS

-   DRY (Don't Repeat Yourself)

-   Definition: every piece of a system must have a single, unambiguous, authoritative representation. It means the system built from code and tests (written by people, not machine-generated) must be able to express what it needs to express, without containing any duplicated code.
-   Also known as "once and only once" (OAOO).
-   Ref: [Wiki - Once and Only Once](https://zh.wikipedia.org/wiki/%E4%B8%80%E6%AC%A1%E4%B8%94%E4%BB%85%E4%B8%80%E6%AC%A1)

-   Rule Of Three

-   Definition: only abstract something once the same functionality shows up a third time.

-   KISS (Keep It Simple and Stupid)

-   Definition: it's about honoring simplicity in your design.
-   Sub-principle: YAGNI, "You Aren't Gonna Need It."

-   Discussion: DRY, Rule Of Three, and KISS can be seen as three different takes on how important and necessary refactoring is. If DRY demands too much refactoring, then KISS demands none at all.  
    And the middle way is the Rule Of Three. But does blindly chasing the middle way really get you to the truth?  
    Can't we be strict with ourselves and lenient with others?  
    Then again, each has its own convictions—isn't that a fine thing too?

-   Other Ref: [The Ins and Outs of Design Principles](http://www.ithome.com.tw/voice/97462)
