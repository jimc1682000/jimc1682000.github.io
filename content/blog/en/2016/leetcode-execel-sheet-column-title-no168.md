---
title: "[LeetCode] Execel Sheet Column Title (No.168)"
pubDate: 2016-07-11
description: "Given a positive integer, return its corresponding column title as appear in an Excel sheet."
tags: ["Java", "Programming", "LeetCode"]
locale: en
translationOf: leetcode-execel-sheet-column-title-no168
aiTranslated: true
---
Given a positive integer, return its corresponding column title as appear in an Excel sheet.

For example:

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 

Ref: [https://leetcode.com/problems/excel-sheet-column-title/](https://leetcode.com/problems/excel-sheet-column-title/)  
  
  
  
In brief:  
You're given a number and asked to translate it into a letter string. That's it.  
Just watch out for numbers like 26, 27, 28, 51, 52, 53, 702, 703, 704 when converting—they should map to Z, AA, AB, AY, AZ, BA, ZZ, AAA, AAB respectively. Try dropping them into the test CODE yourself.  
  
Approach:  
Basically it's the concept of base-26, but when you hit a multiple of 26 you can't use the ordinary formula—you need a special case, so there are more conditions to handle.  
At first I tried many times to pin down the rule, and only later realized it was just this simple = =  
  
Partial code:  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnTitle.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnTitle.java)
