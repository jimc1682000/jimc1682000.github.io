---
title: "[LeetCode] Dungeon Game (No.174)"
pubDate: 2016-07-08
description: "The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon."

locale: en
translationOf: leetcode-dungeon-game-no174
aiTranslated: true
tags: [Algorithms]
---
The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (_negative_ integers) upon entering these rooms; other rooms are either empty (_0's_) or contain magic orbs that increase the knight's health (_positive_ integers).

In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

  
  

Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path `RIGHT-> RIGHT -> DOWN -> DOWN`.

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

Ref: [https://leetcode.com/problems/dungeon-game/](https://leetcode.com/problems/dungeon-game/)  
  
In brief:  
There's an M-by-N dungeon with the hero in the top-left corner and the princess in the bottom-right. Each cell might heal or damage the hero, and when the hero's health reaches 0 or below, he dies. Work out the minimum health the hero needs in order to rescue the princess.  
  
Approach:  
This problem is a bit like the common "Minimum Path Sum": basically both are about finding the optimal solution along a path, but the way you solve it differs. Usually you keep a separate scratch table, compute the running sums along the edges first, and then work out the minimum inside one cell at a time. But if you use that same approach here, some problems arise, and the value you get isn't actually the minimum. For example:  

1 (K)

\-3

3

0

\-2

0

\-3

\-3

\-3 (P)

Ref: [http://www.cnblogs.com/grandyang/p/4233035.html](http://www.cnblogs.com/grandyang/p/4233035.html)  

With that approach, the result you get is 5 rather than the correct 3. So we need to change it to start computing from the princess's cell in the bottom-right corner in order to get the correct answer.  
  
Partial code:  
  
Full code:  
[https://github.com/jimc1682000/LeetCode/blob/master/src/java/DungeonGame.java](https://github.com/jimc1682000/LeetCode/blob/master/src/java/DungeonGame.java)
