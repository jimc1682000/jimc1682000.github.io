---
title: "[心得]30天快速上手TDD讀後心得"
pubDate: 2016-01-11
description: "看完了《30快速上手TDD》，整理一些我認為蠻重要的心得跟大家分享。"
tags: [軟體工程]
---
看完了《[30快速上手TDD](https://www.dotblogs.com.tw/hatelove/2013/01/11/learning-tdd-in-30-days-catalog-and-reference)》，整理一些我認為蠻重要的心得跟大家分享。  
  
1.  
ATDD(USER STORY)  
  <->BDD(DSL TO Programming Language)  
  <->TDD(include integration test, unit test and refactor)  
白話來說，就是用戶使用ATDD來寫好USER STORY後，用BDD轉成程式設計師看得懂的規格後，再讓程式設計師用TDD的方式開發測試  
Ref：  
[\[30天快速上手TDD\]\[Day 26\]User Story/ATDD/BDD/TDD - 總結](https://www.dotblogs.com.tw/hatelove/2013/01/09/learning-tdd-in-30-days-day26-coordinate-user-story-atdd-bdd-tdd)  
2.  
職責分離==>  
**找出誰，在做什麼事！**  
要找出「誰，做什麼事」，有一個相當相當簡單的技巧，相信大家一學就會。針對前面透過人話所整理出來的 function ，只要找出該 function 代表的意義中的**「主詞」、「動詞」、「受詞」**即可。   
什麼意思？很簡單：   
  主詞：代表類別；   
  動詞：代表方法；   
  受詞：通常是方法參數；   
  形容詞：通常是呼叫物件行為後，物件產生的狀態變化。  
  EX1-CalculatedByBlackCat()：黑貓，計算運費  
Ref：  
[\[30天快速上手TDD\]\[Day 12\]Refactoring - 職責分離](https://www.dotblogs.com.tw/hatelove/2012/12/22/learning-tdd-in-30-days-day12-refactoring-seperating-responsibility)  
3.  
介面導向==>  
『用該物件的角度去看世界，除了物件自己本身以外，看出去外面的世界，都是介面。』   
Ref：  
[\[30天快速上手TDD\]\[Day 16\]Refactoring - 介面導向](https://www.dotblogs.com.tw/hatelove/archive/2013/01/02/learning-tdd-in-30-days-day16-refactoring-interface-oriented.aspx%C2%A0)

