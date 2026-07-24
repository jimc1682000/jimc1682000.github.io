---
title: "[LeetCode] Two Sum (No.1)"
pubDate: 2016-07-13
description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target."
tags: ["Java", "Programming", "LeetCode"]
locale: en
translationOf: leetcode-two-sum-no1
aiTranslated: true
---
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have _exactly_ one solution.

Example:

Given nums = \[2, 7, 11, 15\], target = 9,

Because nums\[0\] + nums\[1\] = 2 + 7 = 9,
return \[0, 1\].

UPDATE (2016/2/13):  
The return format had been changed to zero-based indices. Please read the above updated description carefully.

Ref: [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)  
  
In brief:  
You're given an array and asked to find the one pair of numbers that add up to the target value, with the array indexed from 0.  
Watch out: the numbers in the array may repeat!  
  
Approach:  
Since there's only one solution, we can use a very simple method to find the answer: just subtract one chosen number in the array from the target value, then check whether the resulting number exists elsewhere in the array. If it does, that's the pair—just report their positions.  
  
Partial code:  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/TwoSum.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/TwoSum.java)
