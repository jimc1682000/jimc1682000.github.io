---
title: "[LeetCode] Add Two Numbers - Summing Two LinkedLists (No.2)"
pubDate: 2016-07-14
description: "You are given two linked lists representing two non-negative numbers."
locale: en
translationOf: leetcode-add-two-numbers-linkedlist-no2
aiTranslated: true
---
You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)

Output: 7 -> 0 -> 8

/\*\*  
 \* Definition for singly-linked list.  
 \* public class ListNode {  
 \*     int val;  
 \*     ListNode next;  
 \*     ListNode(int x) { val = x; }  
 \* }  
 \*/

Ref: [https://leetcode.com/problems/add-two-numbers/](https://leetcode.com/problems/add-two-numbers/)  
In brief:  
You're given two LinkedLists, where each node holds a non-negative digit (zero or a positive number) along with a pointer to the next node. Note that the two lists store their digits in reverse order, so we have to be especially careful when computing their sum; also, whenever a digit exceeds ten, we carry over.  
  
Approach:  
Since I wasn't very familiar with LinkedLists, and the example didn't make the step-by-step breakdown obvious, I went straight to reading someone else's code and worked out my own understanding of it.  
Ref: [https://discuss.leetcode.com/topic/42252/concise-java-solution-beats-98-with-comment/2](https://discuss.leetcode.com/topic/42252/concise-java-solution-beats-98-with-comment/2)  
After reading it, I found that they first make a dummy head, put the computed result into the NEXT of the last node, and point the tail pointer to the new node—that way you can work out the answer one node at a time. Really a nice approach.  
One thing to watch out for, though: when it reads the value of Number1, it forgets to add a check, so a NullPointerException can occur. I've already fixed that part in my code.  
  
Partial code:  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/AddTwoNumbers.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/AddTwoNumbers.java)
