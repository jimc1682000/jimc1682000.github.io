---
title: "[LeetCode] Add Two Numbers 兩LinkedList相加 (No.2)"
pubDate: 2016-07-14
description: "You are given two linked lists representing two non-negative numbers."
---
You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)

Output: 7 -> 0 -> 8

/\*\*  
 \* Definition for singly-linked list.  
 \* public class ListNode {  
 \*     int val;  
 \*     ListNode next;  
 \*     ListNode(int x) { val = x; }  
 \* }  
 \*/

Ref: [https://leetcode.com/problems/add-two-numbers/](https://leetcode.com/problems/add-two-numbers/)  
中文簡單說明：  
給你兩組LinkedList，其中每個節點裡面有著非負數(可能零或正數)的數字，以及下個節點為何，要注意的是這兩組節點是相反的節點，我們在求他們的和要特別注意，另外，如果超過十就要進位。  
  
解法：  
因為對LinkedList不太熟，從例子當中也看不太出來詳細分解步驟，於是直接找了其他人寫的程式碼來閱讀，並做出自己的理解。  
Ref: [https://discuss.leetcode.com/topic/42252/concise-java-solution-beats-98-with-comment/2](https://discuss.leetcode.com/topic/42252/concise-java-solution-beats-98-with-comment/2)  
閱讀過後，發現他是先做了一個假的頭，並且把後面算出來的答案放入最後面的節點中的NEXT裡，並把尾巴的指標指向新的節點這樣就可以一一求得解了。真的是很不錯的做法。  
不過要注意的是，裡面在取Number1的值時，忘了加上檢查，所以會出現NullPointerException的錯誤，這部份我已在我的程式碼當中修復了。  
  
部份程式碼：  
  
完整程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/AddTwoNumbers.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/AddTwoNumbers.java)

