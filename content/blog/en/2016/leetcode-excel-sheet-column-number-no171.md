---
title: "[LeetCode] Excel Sheet Column Number (No.171)"
pubDate: 2016-07-12
description: "Related to question Excel Sheet Column Title Given a column title as appear in a"
locale: en
translationOf: leetcode-excel-sheet-column-number-no171
aiTranslated: true
---
Related to question [Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/)

Given a column title as appear in an Excel sheet, return its corresponding column number.

For example:

    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28 

  

Ref: [https://leetcode.com/problems/excel-sheet-column-number/](https://leetcode.com/problems/excel-sheet-column-number/)  
  
  
In brief:  
This one is basically a sibling of No.168: one converts from the number, and this one converts from the letters. The things to watch out for are similar too.  
  
Approach:  
You can likewise get the answer using base-26, but my solution is kind of dumb and therefore not that fast—though not so bad as to TLE. Afterwards I looked up a solution anyway; in the CODE there's a bestAlgorithm() which is the best solution I've found so far.  
  
Partial code:  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnNumber.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnNumber.java)
