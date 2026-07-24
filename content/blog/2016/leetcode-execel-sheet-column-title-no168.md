---
title: "[LeetCode] Execel Sheet Column Title 表單標題翻譯 (No.168)"
pubDate: 2016-07-11
description: "Given a positive integer, return its corresponding column title as appear in an Excel sheet."
tags:
  - "Java"
  - "程式"
  - "LeetCode"
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
  
  
  
中文簡單說明：  
就是把數字給你，要你翻成英文字串，沒了。  
不過要注意的是，在26、27、28、51、52、53、702、703、704的這些數字轉換時，要特別注意，分別應該要是Z、AA、AB、AY、AZ、BA、ZZ、AAA、AAB才對。可以自己把他放入測試CODE裡面。  
  
解法：  
基本上就是26進位的概念，但是在遇到26的倍數的時候，不可直接用一般解，要用特殊解，因此要做出比較多的判斷。  
我一開始為了抓出這規則還試了好多次，後來才發現原來只是這樣= =  
  
部份程式碼：  
  
完整程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnTitle.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/ExcelSheetColumnTitle.java)

