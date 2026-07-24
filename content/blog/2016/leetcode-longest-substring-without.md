---
title: "[LeetCode] Longest Substring Without Repeating Characters 求出不重覆字母下最長的子字串長度 (No.3)"
pubDate: 2016-07-19
description: "Given a string, find the length of the longest substring without repeating characters."
tags: [演算法]
---
Given a string, find the length of the longest substring without repeating characters.

Examples:

Given `"abcabcbb"`, the answer is `"abc"`, which the length is 3.

Given `"bbbbb"`, the answer is `"b"`, with the length of 1.

Given `"pwwkew"`, the answer is `"wke"`, with the length of 3. Note that the answer must be a substring, `"pwke"` is a _subsequence_ and not a substring.  
Ref: [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

  
  
  
中文簡單說明：  
給你一個字串，請你求出最長的子字串，請注意是substring不是subsequence。  
  
解法：  
這題卡了我很久，我至少卡了三天吧= =  
原本想用我自己的方式求解，但是發現還是不行，會有一些奇怪的問題，最後只好求Google大神給我一些解答。  
目前我分享的這種解法，是我認為我比較容易閱讀和理解又精簡的版本，這個解法主要就是先建立一個HASHMAP來放不重覆字母的最新位置，還有用一個INT來放目前得到的最大值。  
並且分別用了一個左指標跟右指標，右指標不斷的往右抓取最新字母，而左指標則是在右邊抓到最新值了之後讀取HASHMAP裡面的較舊值位置指向給自己，然後由右指標右左指標就可以得到一個最新長度，跟MAX比較後再把最大值給MAX，也把最新的位置重新放入HASHMAP中。  
Ref: [https://discuss.leetcode.com/topic/8232/11-line-simple-java-solution-o-n-with-explanation/2](https://discuss.leetcode.com/topic/8232/11-line-simple-java-solution-o-n-with-explanation/2)  
  
部份程式碼：  
  
  
完整程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/LongestSubstringWithoutRepeatingCharacters.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/LongestSubstringWithoutRepeatingCharacters.java)

