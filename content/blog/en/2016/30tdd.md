---
title: "[Notes] Takeaways from Reading 'Getting Up to Speed with TDD in 30 Days'"
pubDate: 2016-01-11
description: "After finishing 'Getting Up to Speed with TDD in 30 Days', here are some of the takeaways I found most important, shared with you all."
tags: ["BDD", "TDD", "ATDD", "Refactoring", "Notes"]
locale: en
translationOf: 30tdd
aiTranslated: true
---
After finishing 《[Getting Up to Speed with TDD in 30 Days](https://www.dotblogs.com.tw/hatelove/2013/01/11/learning-tdd-in-30-days-catalog-and-reference)》, here are some of the takeaways I found most important, shared with you all.  
  
1.  
ATDD (USER STORY)  
  <->BDD (DSL TO Programming Language)  
  <->TDD (include integration test, unit test and refactor)  
In plain terms: users write USER STORIES with ATDD, then BDD turns them into specs that programmers can understand, and finally programmers build and test the code the TDD way.  
Ref:  
[\[Getting Up to Speed with TDD in 30 Days\]\[Day 26\]User Story/ATDD/BDD/TDD - Summary](https://www.dotblogs.com.tw/hatelove/2013/01/09/learning-tdd-in-30-days-day26-coordinate-user-story-atdd-bdd-tdd)  
2.  
Separation of responsibilities ==>  
**Find out who is doing what!**  
There's a very, very simple trick for finding "who does what," and I'm sure anyone can pick it up right away. For a function you've already described in plain language, just identify the **"subject," "verb," and "object"** in what that function means.  
What does that mean? It's simple:  
  Subject: the class;  
  Verb: the method;  
  Object: usually the method parameter;  
  Adjective: usually the state change an object produces after its behavior is invoked.  
  EX1-CalculatedByBlackCat(): Black Cat (a courier) calculates the shipping fee.  
Ref:  
[\[Getting Up to Speed with TDD in 30 Days\]\[Day 12\]Refactoring - Separation of Responsibilities](https://www.dotblogs.com.tw/hatelove/2012/12/22/learning-tdd-in-30-days-day12-refactoring-seperating-responsibility)  
3.  
Interface-oriented ==>  
"Look at the world from that object's point of view: apart from the object itself, everything else it sees out there is an interface."  
Ref:  
[\[Getting Up to Speed with TDD in 30 Days\]\[Day 16\]Refactoring - Interface-Oriented](https://www.dotblogs.com.tw/hatelove/archive/2013/01/02/learning-tdd-in-30-days-day16-refactoring-interface-oriented.aspx%C2%A0)
