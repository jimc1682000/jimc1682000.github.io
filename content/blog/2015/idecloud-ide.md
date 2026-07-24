---
title: "介紹幾個比較常見的雲端IDE(Cloud IDE)"
pubDate: 2015-09-06
description: "今天我來跟各位介紹幾個比較常見的雲端IDE，因為目前雲端IDE愈來愈多了，這邊以我認為開發Java的方便度以及根據Slant上面的評分( What is the best cloud IDE?"
tags:
  - "Koding"
  - "介紹"
  - "Codeanywhere"
  - "Codenvy"
  - "IDE"
  - "Cloud IDE"
  - "Cloud9"
---
今天我來跟各位介紹幾個比較常見的雲端IDE，因為目前雲端IDE愈來愈多了，這邊以我認為開發Java的方便度以及根據Slant上面的評分( [What is the best cloud IDE? - Slant](http://www.slant.co/topics/713/~what-is-the-best-cloud-ide) )，選出前幾名來介紹：  
  
  
**1. Codenvy ( [https://codenvy.com/](https://codenvy.com/) )**  
以我試用幾個小時的經驗來說，Codenvy是目前設定最簡單的，幾乎可以說你想得到的預設環境他都有，只要直接選擇你要打開什麼類型的專案，他就自然會開啟相對應的基本範本，甚至你想要產生基礎的HelloWorld他都有範例，不過相對的，就是你可以自行設定的地方較少，至少對於我這種會想要直接打Linux指令的人而言，感覺沒有辦法直接打是怪怪的，另外就是他基本上會要求你要用Ant或是Maven又或是GoogleAppEngine，對於只是想要直接寫寫簡單程式的人或是不會上述東西的人而言，是需要另外花時間來學的。  
  
**2. Codeanywhere ( [https://codeanywhere.com/](https://codeanywhere.com/) )**  
Codeanywhere主打的項目是你不論在Android, iphone, Blackberry上面，也都可以有專屬的APP可以使用來開發，到哪裡都可以寫CODE就是他的精神，不過要提到的是，因為他沒有原生JAVA環境讓你使用，所以變成說你要自行利用他給你的VM(它使用DevBox做關鍵字)，來進行安裝，VM的環境可以分成Ubuntu跟CentOS兩種，我晚點會發如何在Codeanywhere的CentOS VM上面安裝Java步驟，基本上跟一般安裝沒有什麼兩樣就是了，安裝後才可以執行JAVA檔案。基本上他上面的Terminal權限可以說是全開，還蠻方便的。  
Ref：[在Codeanywhere的CentOS DevBox上安裝Java](http://jimc1682000.blogspot.tw/2015/09/codeanywherecentos-devboxjava.html)  
  
**3. Cloud9 ( [https://c9.io](https://c9.io/)/ )**  
Cloud9主打的是你可以完全控制Runtime Environment，還可以跟別人直接分享你的這些參數，基本上這對於線上協同作業我相信有著一定的好處，不過就JAVA而言，雖然他已經事先安裝了JRE，但是你還是要對於他的RUN執行方式進行一定的設定後，才可以更方便的執行，要不然都要進Terminal打指令執行，其實是不太方便的，之後我會寫一篇文章介紹這些東西。順帶一提，他使用的環境是Ubuntu。  
Ref：[Cloud9 Java Runner建立](http://jimc1682000.blogspot.tw/2015/09/cloud9-java-runner.html)  
  
**4. Koding ( [https://koding.com/](https://koding.com/) )**  
Koding主打的是你有一台完整的VM，可以自己亂玩(誤)。基本上，Koding跟其他提供完整Terminal權限的很像，但不一樣的是，一般就算是全開權限的Terminal，你通常進入了一個專案，就只能看到那個專案相關的環境，並不能夠看到其他專案的東西，因此也無法同時管理兩個專案，要分開進行，如果用Linux的方式來說，就像是虛擬目錄的概念，而且你只能夠看到部份的而已，而完整的VM就代表說你自己看要怎麼放檔案，他都不會管你，所以你完全可以按照自己想要的方式放檔案，可以同時把常用的LIB檔案放在一起，這樣子可以節省許多空間。  
最後是Koding還有著強大的社群分享功能，你可以把你的Code分享出去，還蠻方便的喔！  
之後我這邊也會發表一下如何進行安裝LAMP程式方式喔！  
Ref：[Koding環境設定筆記](http://jimc1682000.blogspot.tw/2015/09/koding.html)

