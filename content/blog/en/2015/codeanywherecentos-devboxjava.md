---
title: "Installing Java on a Codeanywhere CentOS DevBox"
pubDate: 2015-09-06
description: "1. First sign up for a Codeanywhere account (obviously). 2. Spin up a CentOS DevBox (VM). 2.1 Right-click on DevBox and choose Add DevBox, as shown."
tags: ["Java", "Tutorial", "Linux", "Codeanywhere", "DevBox", "CentOS", "Cloud IDE"]
locale: en
translationOf: codeanywherecentos-devboxjava
aiTranslated: true
---
**1. First sign up for a Codeanywhere account (obviously)**  
  
**2. Spin up a CentOS DevBox (VM)**  
  
  
2.1 Right-click on DevBox and choose Add DevBox, as shown.  

[![](/blog/img/Codeanywhere-20150906-001.webp)](/blog/img/Codeanywhere-20150906-001.webp)

  
2.2 Since we don't need any of the other features here, choose New Stack under Custom Stacks and click Next, as shown.  

[![](/blog/img/Codeanywhere-20150906-002.webp)](/blog/img/Codeanywhere-20150906-002.webp)

  
2.3 Likewise, choose Blank and click Next, as shown.  

[![](/blog/img/Codeanywhere-20150906-003.webp)](/blog/img/Codeanywhere-20150906-003.webp)

  
2.4 Choose CentOS and give it a name, as shown.  

[![](/blog/img/Codeanywhere-20150906-004.webp)](/blog/img/Codeanywhere-20150906-004.webp)

  
2.5 Wait for it to finish. When you see this screen, you're all set!  

[![](/blog/img/Codeanywhere-20150906-005.webp)](/blog/img/Codeanywhere-20150906-005.webp)

  
**3. Install Java**  
Reference:  
[http://tecadmin.net/install-java-8-on-centos-rhel-and-fedora/](http://tecadmin.net/install-java-8-on-centos-rhel-and-fedora/)  
  
I'll also paste the exact commands I ran below:  

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

  
**4. Installation complete! As shown, you can now see the Java information!**  

[![](/blog/img/Codeanywhere-20150906-006.webp)](/blog/img/Codeanywhere-20150906-006.webp)
