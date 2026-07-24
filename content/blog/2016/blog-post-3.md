---
title: "程式設計常見的幾個原則整理"
pubDate: 2016-01-11
description: "- SOLID原則(SRP, OCP, LSP, ISP, DIP) - SRP(Single responsibility，單一職責) - 定義：一個class應該只有一個需要改變的原因。"
tags:
  - "SRP"
  - "OO"
  - "Rule Of Three"
  - "DRY"
  - "DIP"
  - "KISS"
  - "SOLID"
  - "OCP"
---
  

-   SOLID原則(SRP, OCP, LSP, ISP, DIP)

-   SRP(Single responsibility，單一職責)

-   定義：一個class應該只有一個需要改變的原因。There should never be more than one reason for a class to change.
-   白話：一個class只作一件事。

-   OCP(Open-closed，開放封閉)

-   定義：軟體設計，應該對擴充開放，對修改封閉。Software entities like classes, modules and functions should be open for extension but closed for modifications.
-   白話：軟體要很容易擴充功能，且擴充時原有的code都不需修改。

-   LSP(Liskov substitution，Liskov替換)

-   定義：子類必須能夠替換其父類別。Inheritance should ensure that any property proved about supertype objects also holds for subtype objects.
-   白話：設計父類別時，只把所有的子類都有的東西放進來。

-   ISP(Interface segregation，介面隔離)

-   定義：客戶(Client)只要依賴它們所需的介面Clients should not be forced to depend upon interfaces that they don't use.
-   白話：設計介面也盡量簡單，別把不相關的東西放進來。

-   DIP(Dependency inversion，依賴倒轉)

-   定義：

-   高階模組不應依賴低階模組，兩者應依賴抽象概念。High-level modules should not depend on low-level modules. Both should depend on abstractions. 
-   抽象概念不應依賴細節，細節應依賴抽象概念。Abstractions should not depend on details. Details should depend on abstractions.

-   白話：不要具體的指明物件的關係，而要抽象觀念替代之。

-   Ref:

-   [白話- OO設計原則 (SOLID原則) - 附生活實例](http://rockssdlog.blogspot.tw/2012/03/oo-solid.html)
-   [SOLID：五則皆變](http://teddy-chen-tw.blogspot.tw/2014/04/solid.html)
-   [亂談軟體設計（5）：Dependency-Inversion Principle](http://teddy-chen-tw.blogspot.tw/2012/01/5dependency-inversion-principle.html)

-   PS：《[白話- OO設計原則 (SOLID原則) - 附生活實例](http://rockssdlog.blogspot.tw/2012/03/oo-solid.html)》其中對於OCP還有DIP的解釋太讚了XDD

-   OCP部份：情聖對交新女友永遠保持「開放」；  
    如何應付男女關係則保持「封閉」。這是因為情聖把所有女友抽象化，做出一個介面叫「寶貝」，而其他所有的女友都是寶貝的實作。因此情聖呼叫女友時都叫寶貝就好，所以不怕叫錯人XD
-   DIP部份：你下班快到家時，接到老婆的電話，才驚覺今天是結婚紀念日。千萬別在電話中說，『當然，我帶了妳最愛的玫瑰花回家哦！』(具體)  
    因為很可能稍後發現......附近的花店都關門了...只要說『當然，親愛的，我帶了禮物回家』(抽象)這樣一來就能看到路邊賣什麼就買什麼。

-   DRY、Rule Of Three、KISS

-   DRY原則(Don’t Repeat Yourself，不要重複你自己)

-   定義：系統中的每一部分，都必須有一個單一的、明確的、權威的代表指的是（由人編寫而非機器生成的）代碼和測試所構成的系統，必須能夠表達所應表達的內容，但是不能含有任何重複代碼。
-   又稱「一次且僅一次」（once and only once，簡稱OAOO）
-   Ref：[Wiki - 一次且僅一次](https://zh.wikipedia.org/wiki/%E4%B8%80%E6%AC%A1%E4%B8%94%E4%BB%85%E4%B8%80%E6%AC%A1)

-   Rule Of Three(三次原則)

-   定義：當某個功能第三次出現時，才進行抽象化。

-   KISS原則(Keep It Simple and Stupid)

-   定義：指在設計當中應當注重簡約的原則。
-   子原則：YAGNI原則"You Aren't Gonna Need It"

-   討論：DRY、Rule Of Three、KISS這三條原則，可以說是對於重構重要性以及必要性認知上的不同。如果說DRY是太過於要求重構，那麼KISS就是完全不要求重構了。  
    而這中庸之道則是Rule Of Three了。但一昧的只是追求中庸，真的又能得道嗎？  
    難道就不能嚴以律己，寬以待人嗎？  
    回過頭來說，各自有各自的堅持，不也很好嗎？

-   其他Ref：[設計原則五四三](http://www.ithome.com.tw/voice/97462)

