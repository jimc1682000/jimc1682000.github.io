---
title: "[LeetCode] Happy Number 快樂數字 (No.202)"
pubDate: 2016-07-22
description: "Write an algorithm to determine if a number is \"happy\"."
tags: [演算法]
---
Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

Example: 19 is a happy number

-   12 + 92 = 82
-   82 + 22 = 68
-   62 + 82 = 100
-   12 + 02 + 02 = 1

Ref: [https://leetcode.com/problems/happy-number/](https://leetcode.com/problems/happy-number/)  
  
中文簡單說明：  
給你一個數字，要你算算看這個數字是不是「快樂數字」！  
而所謂的快樂數字，就是把一個數字拆成個、十、百、千…位數後，每個位數各自平方後相加，直到得到個位數為1的就是了。  
不過要特別注意的是，這個數字有可能會無限迴圈的喔！像是數字4、5……  
  
解法：  
我的解法並不是最速解，不過是我自己想出來，認為我最容易閱讀的方式。  
簡單來說，利用一個迴圈，做出該數字是否大於9的判斷後，把該數字轉成字元陣列後計算總和，如果總和只有個位數，則直接進入一個switch-case的判斷，其中只有1跟7會得到true，其他都是false。  
  
而我查到的較快解，則是先建立一個HashSet放入數字，如果發現數字無法正常加入，代表有重覆，那就是進入了迴圈，直接回傳false；而沒有的話，就看看總和是否是一，不是的話就繼續計算。  
Ref: [https://discuss.leetcode.com/topic/25026/beat-90-fast-easy-understand-java-solution-with-brief-explanation/2](https://discuss.leetcode.com/topic/25026/beat-90-fast-easy-understand-java-solution-with-brief-explanation/2)  
  
部份程式碼：  
  
  
完整程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/HappyNumber.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/HappyNumber.java)

