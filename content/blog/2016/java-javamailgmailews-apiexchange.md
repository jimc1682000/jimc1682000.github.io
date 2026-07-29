---
title: "[Java] 使用JavaMail從GMail寄信以及使用EWS API從Exchange寄信"
pubDate: 2016-07-15
description: "今天在研究如何使用Java Mail的API從GMail寄信出去，以及使用EWS API從Exchange寄信，寫了一些測試用的Code分享給大家。"
tags: [Java]
---
今天在研究如何使用Java Mail的API從GMail寄信出去，以及使用EWS API從Exchange寄信，寫了一些測試用的Code分享給大家。  
  
一、用JavaMail從GMail寄信  
因為GMail講求安全性，所以在Java Mail的設定上會比較複雜， SMTP 伺服器的通訊埠設為 465 (適用 SSL/TLS) 和 587 (適用 STARTTLS)，而在這個例子，我們使用STARTTLS，這個協定就是為了加密從用戶端到伺服器端的連線，會對EMAIL在寄送時更加安全。另外，GMail也有開啟SMTP AUTH的功能，所以我們要得到使用者的帳號密碼才可以寄送。  
而如果你有開兩步驟，需要另外建立一個「應用程式密碼」；沒有開兩步驟，則是需要開起「允許安全性較低的應用程式」才能夠正確執行，要不然會報錯。  
  
部份程式碼：  
  
  
完整程式碼：  
[https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/SendFromGMailUsingJavaMailLab.java](https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/SendFromGMailUsingJavaMailLab.java)  
  
Ref:  
[http://pclevin.blogspot.tw/2014/11/java-mail-gmail-smtp-server.html](http://pclevin.blogspot.tw/2014/11/java-mail-gmail-smtp-server.html)  
[https://support.google.com/mail/answer/78775?hl=zh-Hant](https://support.google.com/mail/answer/78775?hl=zh-Hant)  
  
  
二、用EWS API從Exchange寄信  
其實這個也沒有相當困難，官方的WIKI文件也都寫得蠻清楚的，比較要注意的是，因為EWS他有用上Apache的一些HttpClient相關套件，所以請一併加入。另外就是Exchange很強大，本身就有AutoDiscover的功能，如果你的環境當中有開啟，那就可以像我這個例子直接使用，如果沒有的話，就要另外去設定URI和一些相關參數，這個部份也要注意一下。還有就是在你使用AutoDiscover的時候，是可以使用Redirect的CallBack，我在例子裡面也有放入，可以一併使用。  
  
部份程式碼：  
  
完整程式碼：  
[https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/EwsLab.java](https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/EwsLab.java)

