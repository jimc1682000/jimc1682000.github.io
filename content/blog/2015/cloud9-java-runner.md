---
title: "Cloud9 Java Runner建立"
pubDate: 2015-09-13
description: "今天來跟大家介紹一下Cloud9的Java Runner要如何建立，大家也可以直接參考Cloud9還有Stackoverflow的教學： 首先，我們要先來建立一"
tags: [雲端開發, Java]
---
今天來跟大家介紹一下Cloud9的Java Runner要如何建立，大家也可以直接參考Cloud9還有Stackoverflow的教學：[https://docs.c9.io/v1.0/docs/custom-runners](https://docs.c9.io/v1.0/docs/custom-runners)  
[http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java](http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java)  
  
  
  
首先，我們要先來建立一個新的workspace，大家可以自行命名，在這邊我選擇用custom的方式，因為我們只是要做Java的例子，不太需要其他東西，如圖  

[![](/blog/img/Cloud9-20150913-001.webp)](/blog/img/Cloud9-20150913-001.webp)

  
  
確認一下是否真的有java環境：  

[![](/blog/img/Cloud9-20150913-002.webp)](/blog/img/Cloud9-20150913-002.webp)

  
  
分別新增一個src跟bin資料夾：  

[![](/blog/img/Cloud9-20150913-003.webp)](/blog/img/Cloud9-20150913-003.webp)

  
  
新增一個HelloWorld.java檔案，並且打入相關的Code：  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-004.webp)

  
  
簡單的進行一下javac跟java，看是否可以正常執行：  

[![](/blog/img/Cloud9-20150913-005.webp)](/blog/img/Cloud9-20150913-005.webp)

  
  
如果可以正常執行，就把HelloWorld.class刪除掉：  

[![](/blog/img/Cloud9-20150913-013.webp)](/blog/img/Cloud9-20150913-006.webp)

  
  
建立一個新的Runner(請忽略已經出現的JavaBuilder跟JavaRunner，原始的環境是沒有的)：  

[![](/blog/img/Cloud9-20150913-007.webp)](/blog/img/Cloud9-20150913-007.webp)

  
  
將Cloud9教學文件裡面的JavaBuilder複製下來，修改"env"的內容  
"OUT\_DIR": "$project\_path\\\\bin"  
"SRC\_DIR": "src"  
其中OUT\_DIR就是你Java Build完之後的class要放的位置  
SRC\_DIR就是你的原始碼放在位置  
可參考圖片：  

[![](/blog/img/Cloud9-20150913-008.webp)](/blog/img/Cloud9-20150913-008.webp)

  
  
將該Runner存下來，在這邊我取名為JavaBuilder.run：  

[![](/blog/img/Cloud9-20150913-009.webp)](/blog/img/Cloud9-20150913-009.webp)

  
  
另外再將Cloud9教學文件裡面的JavaRunner複製下來，修改以下內容，  
"echo $file | sed -r 's/.\*\\\\/src\\\\///g' | sed -r 's/\\\\.java//g'  | sed -r 's/\\\\//\\\\./g' | xargs java" 當中的  
「's/.\*\\\\/src\\\\///g'」  /src就是你的SRC\_DIR目錄的位置  
"OUT\_DIR": "$project\_path\\\\bin"就是之後Build完之後檔案的位置，如圖  

[![](/blog/img/Cloud9-20150913-010.webp)](/blog/img/Cloud9-20150913-010.webp)

  
  
將該Runner存下來，在這邊我取名為JavaRunner.run：  

[![](/blog/img/Cloud9-20150913-011.webp)](/blog/img/Cloud9-20150913-011.webp)

  
  
把兩個檔案都關掉後，我們可以看到在runner的地方新增了兩個我們自定的runner：  

[![](/blog/img/Cloud9-20150913-012.webp)](/blog/img/Cloud9-20150913-012.webp)

  
  
先執行JavaBuilder後，我們可以看到在bin出現了HelloWorld.class：  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-013.webp)

  
  
在右下角我們可以選擇改用其他Runner，我們這邊改成用JavaRunner來run檔案：  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-013.webp)

  
  
OK！成功執行！大功告成！之後我們就可以使用這兩個自訂的Runner來進行相關的開發了！  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-013.webp)

