---
title: "Koding Environment Setup Notes"
pubDate: 2015-09-06
description: "A quick note first: the Koding environment has a package manager called Koding Package Manager (kpm). In the guides below, whenever kpm is available it will be listed at the top."

locale: en
translationOf: koding
aiTranslated: true
tags: [Cloud Dev]
---
A quick note first: the Koding environment has a package manager called Koding Package Manager (kpm). In the guides below, whenever kpm is available it will be listed at the top; if you install via kpm, you won't need to follow the step-by-step manual installation below. That said, if you want to hone your skills, feel free to install via the step-by-step method first.  
  
  
**1. Install MySQL**  
[http://learn.koding.com/guides/installing-mysql/](http://learn.koding.com/guides/installing-mysql/)  
**2. Install phpMyAdmin**  
[http://learn.koding.com/guides/install-phpmyadmin/](http://learn.koding.com/guides/install-phpmyadmin/)  
**3. Install Apache Tomcat**  
Official installation method:  
[http://learn.koding.com/guides/apache-tomcat-on-koding/](http://learn.koding.com/guides/apache-tomcat-on-koding/)  
Unofficial installation method (step-by-step, with an extra part for configuring .bashrc):  
[https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-on-ubuntu-12-04](https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-on-ubuntu-12-04)  
  
**4. Install ftp (****I recommend vsftpd****, since it's ****V**ery-**S**ecure-**FTP**\-**D**aemon**)**  
vsftpd  
[http://learn.koding.com/guides/setting-up-ftp-with-vsftpd/](http://learn.koding.com/guides/setting-up-ftp-with-vsftpd/)  
ProFTPd  
[http://learn.koding.com/guides/setting-up-ftp-on-koding/](http://learn.koding.com/guides/setting-up-ftp-on-koding/)  
  
**5. Install FileZilla or another FTP client locally to test**  
[http://www.azofreeware.com/2006/11/filezilla-2229.html](http://www.azofreeware.com/2006/11/filezilla-2229.html)  
  
**6. Set up a virtual directory in Tomcat**  
Method 1: Edit server.xml directly  

```xml
<Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log." suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
        <Context workDir="/home/youraccount/Web/java/tomcat_work"
        docBase="/home/youraccount/Web/java/ROOT" reloadable="true" path="">
        </Context>
</Host>
```

Method 2: Add an xml file under the tomcat folder's conf\\catalina\\localhost  
[http://www.coolsun.idv.tw/modules/xhnewbb/viewtopic.php?topic\_id=1278](http://www.coolsun.idv.tw/modules/xhnewbb/viewtopic.php?topic_id=1278)  
  
Explanation:  
docBase is the directory one level above the project folder's web-inf folder.  
workDir is the folder where Tomcat stores the Java files it parses from JSP and compiles into class files. Setting it inside the project folder avoids having to re-parse the JSP files on first read when you migrate elsewhere.  
The generally recommended format: project-folder\\work  
reloadable means it can be reloaded; it's usually set to true for convenience, so you don't have to restart Tomcat frequently.  
PS: Don't add a trailing / to the end of workDir and docBase above.  
  
**7. Change permissions so the outside world can read, write, and execute**  
sudo chmod 777 /home/youraccount/Web/java/tomcat\_work  
sudo chmod 777 /home/youraccount/Web/java/ROOT  
  
**8. Install Ungit for easier Git usage**  
[http://learn.koding.com/guides/using-github/](http://learn.koding.com/guides/using-github/)  
  
**9. Install other packages as needed**  
**NodeJS**  
**[http://learn.koding.com/guides/getting-started-nodejs/](http://learn.koding.com/guides/getting-started-nodejs/)**  
**Using Dropbox with Koding**  
**[http://learn.koding.com/guides/dropbox-for-file-sync/](http://learn.koding.com/guides/dropbox-for-file-sync/)**  
**VNC Startup Guide**  
**[http://learn.koding.com/guides/vnc-startup-guide/](http://learn.koding.com/guides/vnc-startup-guide/)**  
**Installing PHP**  
**[http://learn.koding.com/guides/installing-php/](http://learn.koding.com/guides/installing-php/)**  
**Installing Nginx**  
**[http://learn.koding.com/guides/nginx/](http://learn.koding.com/guides/nginx/)**  
**Getting Started with JSP and Maven**  
**[http://learn.koding.com/guides/getting-started-jsp-maven/](http://learn.koding.com/guides/getting-started-jsp-maven/)**  
**AngularJS Step-by-Step Setup**  
**[http://learn.koding.com/guides/angularjs-step-by-step/](http://learn.koding.com/guides/angularjs-step-by-step/)**  
**Reference:**  
**[http://learn.koding.com/](http://learn.koding.com/)**
