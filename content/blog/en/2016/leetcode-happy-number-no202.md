---
title: "[LeetCode] Happy Number (No.202)"
pubDate: 2016-07-22
description: "Write an algorithm to determine if a number is \"happy\"."
locale: en
translationOf: leetcode-happy-number-no202
aiTranslated: true
tags: [Algorithms]
---
Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

Example: 19 is a happy number

-   12 + 92 = 82
-   82 + 22 = 68
-   62 + 82 = 100
-   12 + 02 + 02 = 1

Ref: [https://leetcode.com/problems/happy-number/](https://leetcode.com/problems/happy-number/)  
  
In brief:  
You're given a number and asked to work out whether it's a "happy number"!  
A happy number is one where you split the number into its digits (ones, tens, hundreds, thousands, and so on), square each digit and add them up, and repeat until you reach a single digit of 1.  
But watch out for one thing: the process can loop forever! For example, the numbers 4, 5, and so on.  
  
Approach:  
My solution isn't the fastest, but I came up with it myself and it's the way I find easiest to read.  
In short, I use a loop that checks whether the number is greater than 9; then I convert the number into a character array and compute the sum. If the sum is a single digit, I go straight into a switch-case check, where only 1 and 7 return true and everything else is false.  
  
The faster solution I found first builds a HashSet and adds the numbers to it. If a number can't be added normally, that means it's a duplicate—so we've entered a cycle, and it returns false directly; otherwise it checks whether the sum is 1, and if not, keeps computing.  
Ref: [https://discuss.leetcode.com/topic/25026/beat-90-fast-easy-understand-java-solution-with-brief-explanation/2](https://discuss.leetcode.com/topic/25026/beat-90-fast-easy-understand-java-solution-with-brief-explanation/2)  
  
Partial code:  
  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/HappyNumber.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/HappyNumber.java)
