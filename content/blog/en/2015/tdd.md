---
title: "[Notes] Is TDD Dead? Wrapping Up My Recent Thoughts on Software Testing"
pubDate: 2015-12-28
description: "I've been digging into the testing side of software development lately, so here's a summary of where I currently stand on testing. If you think testing is nonsense, feel free to skip this post; and if you want to learn more about testing, here are some references."

locale: en
translationOf: tdd
aiTranslated: true
tags: [Software Engineering]
---
I've been digging into the testing side of software development lately, so here's a summary of where I currently stand on testing.  
If you think testing is nonsense, feel free to skip this post;  
and if you want to learn more about testing, here are some references:  
  
  

-   The testing family = UT + integration testing + TDD + more than can be listed here
-   UT (unit testing)

-   Every programmer should know UT, but it isn't something you need from day one. You should pick it up once you can already write working programs.
-   As for how well you need to know it, and how often you'll use it? That depends on your job and your own standards. For test engineers it goes without saying, since that's exactly what they do; for developers, knowing UT gives you a foothold when refactoring or thinking through system design. It also lets you make sure an object keeps the same functionality before and after your changes.
-   Broadly speaking, UT is fairly intuitive to write, doesn't take too much effort to produce, and runs quickly.
-   The thing to watch out for: sometimes things get overly unitized/modularized. Is that really necessary? Spawning a pile of interfaces just for the sake of UT—is it truly worth it?

-   Integration Testing

-   Integration testing is also a must, but how well and how much you use it depends on your role.
-   If you're just an ordinary PG (programmer) today, you don't need to pour too much energy into integration testing, because the scope you touch may not be broad, or you may not yet understand the overall system—so you might end up writing too many integration tests. That said, understanding basic integration testing helps when refactoring: because legacy code is often tightly coupled, you first need integration tests to lock down the existing functionality, so you have something to validate against after refactoring.
-   But if you're at the SD, SA, or PM level, you'll probably use it more often, and integration testing also helps reveal whether your system is over-designed or has gaps.
-   Broadly speaking, integration testing is harder to write, since more components are involved and the tests run slower. But thanks to today's faster compute, the speed isn't really as bad as you might fear.
-   The thing to watch out for: because so many components are involved, pulling one thread tends to move the whole thing, so you often have to modify the integration test code. But is that test really necessary?

-   TDD (Test-Driven Development)

-   As the saying goes: "First you see the mountain as a mountain; then you see it as not a mountain; then you see it as a mountain again," and also: "Better to have no book than to believe everything in it." I think these best capture my current view of TDD.
-   TDD is a good weapon, but it's just a weapon—don't deify it. It helps quite a bit with most work.
-   This is especially true for problem domains that many people have already worked in, where you can develop more efficiently. But for a brand-new domain it's not necessarily so: the pace is fast, but you may well veer off course or take the long way around.
-   For a brand-new domain, my advice is to study other solutions carefully first, then use TDD—and while using it, keep stepping back to check whether you've drifted off track.
-   I still believe every engineer should understand what TDD is, and ideally have some TDD experience too. As for how much TDD you ultimately use in your own project, that's best decided by the project, by the engineer's own judgment, or by the team's thinking.

  
  
So is TDD dead? No, I don't think so, because there's still a TEST inside TDD.  
Unless you don't even value the TEST itself—then maybe TDD really is dead.  
But by that point, could your CODE still be considered truly alive?  
  
Related references:  
\[Cheat Sheet\] DHH: TDD is dead. Long live testing. — a summarized rundown  
[\[Getting Up to Speed with TDD in 30 Days\] Table of Contents and Appendix](https://dotblogs.com.tw/hatelove/2013/01/11/learning-tdd-in-30-days-catalog-and-reference)
