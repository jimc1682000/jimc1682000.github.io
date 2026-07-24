---
title: "[LeetCode] Two Sum 兩兩相加 (No.1)"
pubDate: 2016-07-13
description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target."
tags:
  - "Java"
  - "程式"
  - "LeetCode"
---
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have _exactly_ one solution.

Example:

Given nums = \[2, 7, 11, 15\], target = 9,

Because nums\[0\] + nums\[1\] = 2 + 7 = 9,
return \[0, 1\].

UPDATE (2016/2/13):  
The return format had been changed to zero-based indices. Please read the above updated description carefully.

Ref: [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)  
  
中文簡單說明：  
給你的個數列，要你找出唯一的一組數字相加等於目標值，而這數列是從0計算的。  
要注意的是，數列裡的數字有可能會重覆！  
  
解法：  
因為只有一個解，所以我們可以用個很簡單的方法來求答案，就是直接用目標值減去我們選擇的數列其中一數字，再看看該其他數字是否可找到該答案，如果有，就是那組數字，求出位置即可。  
  
部份程式碼：  
  
完整程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/TwoSum.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/TwoSum.java)

