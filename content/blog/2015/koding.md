---
title: "Koding環境設定筆記"
pubDate: 2015-09-06
description: "先說明一下，在Koding環境當中，有一個Koding Package Manger ( kpm ) 的程式包管理員存在，如果在下面的教學中，有kpm的話會在最"
tags: [雲端開發]
---
先說明一下，在Koding環境當中，有一個Koding Package Manger ( kpm ) 的程式包管理員存在，如果在下面的教學中，有kpm的話會在最上方，用kpm的方式安裝後，就不用再按照下方的分解步驟安裝了，不過如果想要練功夫的話，倒是可以先用分解步驟安裝。  
  
  
**1.裝MySQL**  
`http://learn.koding.com/guides/installing-mysql/`  
**2.裝phpMyAdmin**  
`http://learn.koding.com/guides/install-phpmyadmin/`  
**3.裝Apache Tomcat**  
官方安裝方式：  
`http://learn.koding.com/guides/apache-tomcat-on-koding/`  
非官方安裝方式(分解步驟，另外有多了設定.bashrc的部份)：  
[https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-on-ubuntu-12-04](https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-on-ubuntu-12-04)  
  
**4.裝ftp(****建議安裝vsftpd****，畢竟是****V**ery-**S**ecure-**FTP**\-**D**aemon**)**  
vsftpd  
`http://learn.koding.com/guides/setting-up-ftp-with-vsftpd/`  
ProFTPd  
`http://learn.koding.com/guides/setting-up-ftp-on-koding/`  
  
**5.在本機端安裝FileZilla或是其他FTP客戶端軟體進行測試**  
[http://www.azofreeware.com/2006/11/filezilla-2229.html](http://www.azofreeware.com/2006/11/filezilla-2229.html)  
  
**6.在Tomcat設置虛擬目錄**  
法一、直接修改server.xml  

```xml
<Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log." suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
        <Context workDir="/home/youraccount/Web/java/tomcat_work"
        docBase="/home/youraccount/Web/java/ROOT" reloadable="true" path="">
        </Context>
</Host>
```

法二、在tomcat文件夾的conf\\catalina\\localhost新增xml文件  
[http://www.coolsun.idv.tw/modules/xhnewbb/viewtopic.php?topic\_id=1278](http://www.coolsun.idv.tw/modules/xhnewbb/viewtopic.php?topic_id=1278)  
  
解釋：  
docBase是項目文件夾的web-inf文件夾的上一層目錄  
workDir是指Tomcat解析Jsp轉換為Java文件，並編譯為class存放的文件夾，設置在項目文件夾裡面，可以避免移植到其他地方首次讀取jsp文件需要重新解析 。  
一般建議格式：項目文件夾\\work  
reloadable是指可以重新加載，一般設置為true，方便使用，不需要經常重啟Tomcat。  
ps.上面的workDir和docBase的結尾不要加上/  
  
**7.更改權限讓外界可以讀寫執行**  
sudo chmod 777 /home/youraccount/Web/java/tomcat\_work  
sudo chmod 777 /home/youraccount/Web/java/ROOT  
  
**8.安裝Ungit方便使用Git**  
`http://learn.koding.com/guides/using-github/`  
  
**9.視需求安裝其他套件**  
**NodeJS**  
**`http://learn.koding.com/guides/getting-started-nodejs/`**  
**Using Dropbox with Koding**  
**`http://learn.koding.com/guides/dropbox-for-file-sync/`**  
**VNC Startup Guide**  
**`http://learn.koding.com/guides/vnc-startup-guide/`**  
**Installing PHP**  
**`http://learn.koding.com/guides/installing-php/`**  
**Installing Nginx**  
**`http://learn.koding.com/guides/nginx/`**  
**Getting Started with JSP and Maven**  
**`http://learn.koding.com/guides/getting-started-jsp-maven/`**  
**AngularJS Step-by-Step Setup**  
**`http://learn.koding.com/guides/angularjs-step-by-step/`**  
**Reference:**  
**`http://learn.koding.com/`**

