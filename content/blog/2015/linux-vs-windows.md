---
title: "Linux vs Windows"
pubDate: 2015-10-03
description: "一、What is Linux?"
tags:
  - "RedHat"
  - "Debian"
  - "Linux"
  - "Fedora"
  - "Registry"
  - "Windows"
  - "CentOS"
  - "OpenSUSE"
  - "Security"
  - "POSIX"
  - "UNIX"
---
一、What is Linux?

    毫無反應，就是一隻企鵝(誤  
    好，不開玩笑了，其實Linux是根據是一種自由和開放原始碼的類UNIX作業系統。  
    而UNIX也是一種電腦作業系統，具有多工、多用戶的特徵。  
    像是FeeeBSD、MAC都是UNIX系統的代表。(UNIX = FreeBSD、MAC)  

  

二、POSIX

    說到Linux，一定要提到相關的POSIX，而POSIX = UNIX + LINUX，

    想要了解更多的可以去看一下維基百科。

    POSIX Ref:  
    [https://zh.wikipedia.org/wiki/POSIX](https://zh.wikipedia.org/wiki/POSIX)  
  
三、Linux Family  
    Linux家族的家族樹(Family Tree)：  
      1.Debian家族(Debian, Ubuntu(桌面使用者較多), Linux Mint)  
      2.Fedora家族(  
              Fedora(最多新功能、RedHat的測試實驗所),  
              RedHat Enterprise Linux,  
              CentOS(模仿RedHat Enterprise Linux所做出來的版本，相對較穩定))  
      3.OpenSUSE  
  
    PS: 在各個Linux版本當中，有些時候我們會發現有所謂的LTS版本，  
    LTS就是所謂的LongTerm Service版本，該版本會提供比一般正式版本更長的後續維護，  
    像是臭蟲的修正以及其他更新等等的，  
    如果有要建立一個較正式的服務時應優先考慮LTS版本。  
  
    Linux Ref: [https://zh.wikipedia.org/wiki/Linux](https://zh.wikipedia.org/wiki/Linux)  
  
四、Everything is File. vs Registry.  
    在Linux當中，一切東西都可以看成檔案，  
    只有檔案權限的差別以及是否是目錄、可否執行之類的，詳細的可以參考：  
    [https://en.wikipedia.org/wiki/Everything\_is\_a\_file](https://en.wikipedia.org/wiki/Everything_is_a_file)  
  
    在Windows當中，許多的設定值為了統一管理，所以是放在Registry當中，  
    Registry是使用DB-Based存放相關設定，  
    而其實Windows一開始也是使用File-Based來進行管理，像是「WIN.INI」、「SYSTEM.INI」  
    就是舊時代留下來的檔案。  
    Registry缺點：  
      1 所有設定集中，可能有些東西不需一啟動就載入，系統變慢  
      2 使用者還是可能意外修改到  
   Ref:  
     [http://www.ithome.com.tw/node/59748](http://www.ithome.com.tw/node/59748)  
  
五、User Is Genius. vs User Is Ordinary People.  
    Linux當中，會認為使用者都不是一般人，而是對系統有了解，想要更多自訂性可以讓其自行設定；  
    Windows則是認為很多使用者都只是一般人，所以做了許多通用的預設值，可自訂的部份較少，  

    而且就如同之前所說的，甚至有些設定要去Registry才可以修改到，有著相當的危險性。

  
六、Linux, the Most Safe OS ever?  
    很多人誤解Linux是世界上最安全的系統，而Windows則是最容易被入侵的系統，  
    但這其實是一個錯誤的印象，  
    真實的狀況是，因為Linux需要進行很多的設定，而如果設定不當或是根本沒有設定，  
    那麼Linux反而會是更加不安全的。  
    而Windows則是因為久病成良醫，對於現在許多的病毒他反而更容易處理，  
    因此，我們要使用Linux時，一定要好好的學習如何進行設定才行！

