---
title: "[LeetCode] Excel Sheet Column Number 表單數字翻譯 (No.171)"
pubDate: 2016-07-12
description: "Related to question Excel Sheet Column Title Given a column title as appear in a"
---
Related to question [Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/)

Given a column title as appear in an Excel sheet, return its corresponding column number.

For example:

    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28 

  

Ref: [https://leetcode.com/problems/excel-sheet-column-number/](https://leetcode.com/problems/excel-sheet-column-number/)  
  
  
中文簡單說明：  
這題其實跟No.168的那題算是類似題，只是一個是從數字翻過來，而這個是從英文字翻過去。一樣要注意的也是類似的點。  
  
解法：  
同樣可以用26進制的方法得到解，不過我的解法比較白痴，速度也就沒有那麼快，雖然還不至於TLE，因此我後來也找了一下解決，在CODE裡面有個bestAlgorithm()的就是目前我找到最佳解。  
  
部份程式碼：  
  
全部程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnNumber.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnNumber.java)

