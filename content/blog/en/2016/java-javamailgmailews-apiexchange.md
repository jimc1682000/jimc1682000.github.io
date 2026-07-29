---
title: "[Java] Sending Mail from GMail with JavaMail and from Exchange with the EWS API"
pubDate: 2016-07-15
description: "Today I looked into how to send mail out from GMail using the Java Mail API, and from Exchange using the EWS API. I wrote some test code to share with you all."

locale: en
translationOf: java-javamailgmailews-apiexchange
aiTranslated: true
tags: [Java]
---
Today I looked into how to send mail out from GMail using the Java Mail API, and from Exchange using the EWS API. I wrote some test code to share with you all.  
  
1. Sending mail from GMail with JavaMail  
Because GMail emphasizes security, the Java Mail configuration is a bit more involved. The SMTP server's port is 465 (for SSL/TLS) or 587 (for STARTTLS); in this example we use STARTTLS, a protocol meant to encrypt the connection from client to server so email is sent more securely. GMail also has SMTP AUTH enabled, so we need the user's account and password in order to send.  
And if you have two-step verification turned on, you need to create an "app password" separately; if you don't have two-step verification on, you need to turn on "Allow less secure apps" for it to run correctly—otherwise it will error out.  
  
Partial code:  
  
  
Full code:  
[https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/SendFromGMailUsingJavaMailLab.java](https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/SendFromGMailUsingJavaMailLab.java)  
  
Ref:  
[http://pclevin.blogspot.tw/2014/11/java-mail-gmail-smtp-server.html](http://pclevin.blogspot.tw/2014/11/java-mail-gmail-smtp-server.html)  
[https://support.google.com/mail/answer/78775?hl=zh-Hant](https://support.google.com/mail/answer/78775?hl=zh-Hant)  
  
  
2. Sending mail from Exchange with the EWS API  
This one isn't all that hard either, and the official wiki docs are quite clear. The main things to watch for: because EWS relies on some of Apache's HttpClient-related packages, be sure to include those as well. Also, Exchange is powerful and has AutoDiscover built in; if it's enabled in your environment, you can use it directly like I do in this example, but if not, you'll need to set the URI and some related parameters separately, so keep an eye on that. One more thing: when you use AutoDiscover, you can use a redirect callback—I've included one in the example, so feel free to use it too.  
  
Partial code:  
  
Full code:  
[https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/EwsLab.java](https://github.com/jimc1682000/JavaMailLab/blob/master/src/tw/com/jimmy/lab/EwsLab.java)
