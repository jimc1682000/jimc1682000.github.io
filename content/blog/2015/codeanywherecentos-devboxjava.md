---
title: "在Codeanywhere的CentOS DevBox上安裝Java"
pubDate: 2015-09-06
description: "1.先申請Codeanywhere帳號(廢話 2.開啟一個CentOS的DevBox(VM) 2.1在DevBox上面按右鍵點選Add DevBox，如圖 2."
tags:
  - "Java"
  - "教學"
  - "Linux"
  - "Codeanywhere"
  - "DevBox"
  - "CentOS"
  - "Cloud IDE"
---
**1.先申請Codeanywhere帳號(廢話**  
  
**2.開啟一個CentOS的DevBox(VM)**  
  
  
2.1在DevBox上面按右鍵點選Add DevBox，如圖  

[![](/blog/img/Codeanywhere-20150906-001.webp)](/blog/img/Codeanywhere-20150906-001.webp)

  
2.2在這邊因為我們沒有要其他的功能，選擇Custom Stacks的New Stack後，按Next，如圖  

[![](/blog/img/Codeanywhere-20150906-002.webp)](/blog/img/Codeanywhere-20150906-002.webp)

  
2.3同上，選擇Blank後按Next，如圖  

[![](/blog/img/Codeanywhere-20150906-003.webp)](/blog/img/Codeanywhere-20150906-003.webp)

  
2.4選擇CentOS並命名，如圖  

[![](/blog/img/Codeanywhere-20150906-004.webp)](/blog/img/Codeanywhere-20150906-004.webp)

  
2.5等待他執行完後，看到這個畫面，就大功告成了！  

[![](/blog/img/Codeanywhere-20150906-005.webp)](/blog/img/Codeanywhere-20150906-005.webp)

  
**3.安裝Java**  
可參考：  
[http://tecadmin.net/install-java-8-on-centos-rhel-and-fedora/](http://tecadmin.net/install-java-8-on-centos-rhel-and-fedora/)  
  
我也直接把我打的指令放在下面：  

java -version
cd /opt
sudo  wget --no-cookies --no-check-certificate --header "Cookie: gpw\_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-linux-x64.tar.gz"
sudo tar xzf jdk-8u60-linux-x64.tar.gz
cd /opt/jdk1.8.0\_60/
sudo alternatives --install /usr/bin/jar jar /opt/jdk1.8.0\_60/bin/jar 2
sudo alternatives --install /usr/bin/javac javac /opt/jdk1.8.0\_60/bin/javac 2
sudo alternatives --set jar /opt/jdk1.8.0\_60/bin/jar
sudo alternatives --set javac /opt/jdk1.8.0\_60/bin/javac
java -version

  
**4.安裝完成！如圖，可以看到有Java相關資訊了！**  

[![](/blog/img/Codeanywhere-20150906-006.webp)](/blog/img/Codeanywhere-20150906-006.webp)

