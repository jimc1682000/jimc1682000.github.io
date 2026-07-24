---
title: "[LeetCode] Dungeon Game 地牢遊戲 (No.174)"
pubDate: 2016-07-08
description: "The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon."
tags:
  - "Java"
  - "程式"
  - "LeetCode"
---
The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (_negative_ integers) upon entering these rooms; other rooms are either empty (_0's_) or contain magic orbs that increase the knight's health (_positive_ integers).

In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

  
  

Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path `RIGHT-> RIGHT -> DOWN -> DOWN`.

\-2 (K)

\-3

3

\-5

\-10

1

10

30

\-5 (P)

  

Notes:

-   The knight's health has no upper bound.
-   Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

Ref: [https://leetcode.com/problems/dungeon-game/](https://leetcode.com/problems/dungeon-game/)  
  
中文簡單說明：  
有一個M乘N的地牢，其中英雄在左上角，公主在右下角，地牢中的每一格都有可能補血或損血，而當英雄的血量為0或低於0時，英雄就會死亡，請算出要拯救出公主的話，英雄最低血量應該要多少？  
  
解法：  
這個問題跟常見的「Minimum Path Sum」有點像，基本上都是要找出路徑上的最佳解，只是求法有些不同，平常都是另外做個暫存，先把邊的總合求出，再把裡面的最小值一一求出，但在這邊如果用同樣的解法，會發生一些問題，造成求出來的數值並不是最低，例如：  

1 (K)

\-3

3

0

\-2

0

\-3

\-3

\-3 (P)

Ref: [http://www.cnblogs.com/grandyang/p/4233035.html](http://www.cnblogs.com/grandyang/p/4233035.html)  

如果用該解法，求出的會是5，而不是正確的3，所以我們需要改成從右下角公主的那格開始求，才能夠求出正確的答案。  
  
部份程式碼：  
  
完整程式碼：  
[https://github.com/jimc1682000/LeetCode/blob/master/src/java/DungeonGame.java](https://github.com/jimc1682000/LeetCode/blob/master/src/java/DungeonGame.java)

