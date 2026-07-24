---
title: "[LeetCode] Longest Substring Without Repeating Characters (No.3)"
pubDate: 2016-07-19
description: "Given a string, find the length of the longest substring without repeating characters."
tags: ["Java", "Programming", "LeetCode"]
locale: en
translationOf: leetcode-longest-substring-without
aiTranslated: true
---
Given a string, find the length of the longest substring without repeating characters.

Examples:

Given `"abcabcbb"`, the answer is `"abc"`, which the length is 3.

Given `"bbbbb"`, the answer is `"b"`, with the length of 1.

Given `"pwwkew"`, the answer is `"wke"`, with the length of 3. Note that the answer must be a substring, `"pwke"` is a _subsequence_ and not a substring.  
Ref: [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

  
  
  
In brief:  
You're given a string and asked to find the longest substring—note that it's a substring, not a subsequence.  
  
Approach:  
This one stumped me for a long time—at least three days = =  
I originally wanted to solve it my own way, but it just didn't work; some odd problems kept coming up, so in the end I had to ask the Google gods for some answers.  
The solution I'm sharing here is the version I find relatively easy to read and understand while still being concise. The main idea is to first build a HASHMAP to hold the most recent position of each non-repeating character, plus an INT to hold the current maximum.  
It also uses a left pointer and a right pointer: the right pointer keeps moving right to grab the newest character, while the left pointer, once the right side has grabbed the newest value, reads the older position from the HASHMAP and points itself there. Then from the right pointer minus the left pointer you get the current length; you compare it against MAX and update MAX with the larger value, and also store the newest position back into the HASHMAP.  
Ref: [https://discuss.leetcode.com/topic/8232/11-line-simple-java-solution-o-n-with-explanation/2](https://discuss.leetcode.com/topic/8232/11-line-simple-java-solution-o-n-with-explanation/2)  
  
Partial code:  
  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/answer/LongestSubstringWithoutRepeatingCharacters.java](https://github.com/jimc1682000/LeetCode/blob/master/src/answer/LongestSubstringWithoutRepeatingCharacters.java)
