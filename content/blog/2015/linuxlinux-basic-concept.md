---
title: "Linux基礎概念(Linux Basic Concept)"
pubDate: 2015-10-03
description: "一、Linux 核心(Kernel) Shell/KDE/Application <- Kernel <- Hardware 從技術上說Linux只是一個內核。"
tags: [Linux]
---
一、Linux 核心(Kernel)

    **Shell/KDE/Application** <-> **Kernel** <-> **Hardware**  
  

    從技術上說Linux只是一個內核。

    「內核」指的是一個提供硬體抽象層、磁碟及檔案系統控制、多工等功能的系統軟體。

    一個內核並不是一套完整的作業系統。

    有一套基於Linux內核的完整作業系統叫作Linux作業系統

    Ref: 

    [https://zh.wikipedia.org/wiki/Linux%E5%86%85%E6%A0%B8](https://zh.wikipedia.org/wiki/Linux%E5%86%85%E6%A0%B8)

  
    PS:  
    沒有永遠不會當機的系統：  
    只有Windows會藍屏嗎？不  
    我們偉大的MAC(UNIX)，有四國語言的當機畫面，  
    而LINUX則是有內核錯誤（Kernel panic）。  
  
二、Linux檔案系統(File System)  
    Windows有所謂的FAT16、FAT32、NTFS，當然LINUX也不例外，  
    LINUX從一開始的EXT2->EXT3演進到目前的主流EXT4，  
    以及一些更加先進的FileSystem如：ZFS、XFS、BTRFS等等，  
    也如同Windows一樣，你可以自行更換FileSystem，只是是比較大的工程，  
    如果有興趣的話，可以參考其他的相關資料進行研究。  
  
    Ref:  
      [http://linux.vbird.org/linux\_basic/0230filesystem.php#harddisk](http://linux.vbird.org/linux_basic/0230filesystem.php#harddisk)  
      [Linux 檔案格式 ext2 ext3 ext4 比較](http://mistech.pixnet.net/blog/post/166142996-linux-%E6%AA%94%E6%A1%88%E6%A0%BC%E5%BC%8F-ext2-ext3-ext4-%E6%AF%94%E8%BC%83)  
  
三、Linux目錄結構(Filesystem Hierarchy Standard, FHS)  
    Linux的目錄基本上是根據Filesystem Hierarchy Standard (FHS)制定的，  
    有興趣的可以去研究一下，基本上有幾個比較重要的路徑要記得：  
    a. 根目錄( / )  
    b. /etc 放設定檔  
    c. /opt 放第三方協力軟體又或是自己Compile的資料夾  
    d. /usr 放原生軟體相關的東西  
    e. /var 放與系統運作有關的東西  
    f. /home 放各個使用者家目錄的地方，除了root的家目錄之外  
    g. /root root的家目錄  
    h. /usr/bin 通常會把自己寫的Script放在這裡  
    i. /var/log/ 紀錄許多重要的log  
    j. /var/mail/ 個人的email目錄  
  
    Ref:  
      [http://linux.vbird.org/linux\_basic/0210filepermission.php#dir](http://linux.vbird.org/linux_basic/0210filepermission.php#dir)  
  
四、絕對路徑與相對路徑(Relative Path vs Absolute Path)  
    絕對路徑：由根目錄(/)開始寫起的檔名或目錄名稱， 例如 /home/dmtsai/.bashrc；  
    相對路徑：相對於目前路徑的檔名寫法。  
      例如 ./home/dmtsai 或 ../../home/dmtsai/ ，又或是~/test等等。  
      反正開頭不是 / 就屬於相對路徑的寫法  
  
    Ref:  
      [http://linux.vbird.org/linux\_basic/0210filepermission.php#dir](http://linux.vbird.org/linux_basic/0210filepermission.php#dir)  
  
五、Linux檔案權限管理(Linux ACL ( Access Control List ) )  
    用ls -l指令時，我們可以看到類似於下面的權限表，可以分別看成六個區塊：  
     -   rwx rwx rwx root root  
     1    2    3     4     5      6  
  
    1.如果是檔案，顯示「-」；如果是目錄，顯示「d」；如果是軟連結，顯示「l」  
    2.擁有者的權限  
    3.擁有群組的權限  
    4.其他人的權限  
    5.own-user 擁有者  
    6.own-group 擁有的群組  
    r-Read，表示是否可以讀取, w-Write，表示是否可以寫入, x-Excute，表示是否可以執行  
    而一組權限(rwx)，我們可以分別將  
    x視為2的0次方(1)，w視為2的1次方(2)，r視為2的2次方(4)，  
    則如果權限全開的時候就是4+2+1=7。大家可以思考一下，權限5是怎樣的權限？  
  
六、Shell  
    Shell就是我們利用指令跟Kernel溝通的一種文字介面，  
    就跟我們使用Windows的GUI圖形介面來設定和使用是一樣的，只是改成全部用指令完成。  
    Shell可以分成這幾種：  
      /bin/sh (已經被 /bin/bash 所取代)  
      /bin/bash (就是 Linux 預設的 shell)  
      /bin/tcsh (整合 C Shell ，提供更多的功能)  
      /bin/csh (已經被 /bin/tcsh 所取代)  
   其中最常用也是目前Linux大部份預設的是bash(Bourne-Again SHell)，基本上只要會用這個就OK了

