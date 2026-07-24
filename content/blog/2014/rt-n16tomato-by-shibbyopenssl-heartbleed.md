---
title: "[教學] RT-N16(Tomato by shibby)如何解決OpenSSL Heartbleed"
pubDate: 2014-07-03
description: "先說明一下，什麼是OpenSSL Heartbleed好了： 就OpenVPN官網的解釋： 「A vulnerability in OpenSSL, nickn"
tags:
  - "N16"
  - "資訊安全"
  - "教學"
  - "OpenVPN"
  - "Tomato"
  - "Heartbleed"
  - "無線分享器"
  - "Android"
  - "OpenSSL"
---
先說明一下，什麼是OpenSSL Heartbleed好了：  
就OpenVPN官網的解釋：  
「A vulnerability in OpenSSL, nicknamed Heartbleed, was published in April 2014 1. OpenVPN uses OpenSSL as its crypto library by default and thus is affected too.」  

_引用自 - OpenVPN官網_

[_https://community.openvpn.net/openvpn/wiki/heartbleed#OpenSSLvulnerability-Heartbleed_](https://community.openvpn.net/openvpn/wiki/heartbleed#OpenSSLvulnerability-Heartbleed)

簡單來說，就是使用OpenSSL的服務的人，都會遇到該漏洞，而OpenVPN也是使用OpenSSL做為其加密資料庫，所以也受到其影響。  
  
而OpenVPN(Server)影響到的部份，是從1.0.1版一直到1.0.1f；  
Android Client部份，則是一直到4.1.2版本才沒受到影響；  
MACOS X Client是沒受到影響；  
Windows的Client端，則是只有從2.3-rc2-I001到2.3.2-I003的安裝版本都有受影響，  
要如何確定，請到C:\\Program Files\\OpenVPN\\bin資料夾中找到libeay32.dll，再查找其內容，可參考下兩張圖。  

[![](/blog/img/2014-07-03-15.00.36.webp)](/blog/img/2014-07-03-15.00.36.webp)

  

[![](/blog/img/2014-07-03-15.00.43.webp)](/blog/img/2014-07-03-15.00.43.webp)

  
  
Windows要更新的，可以到以下官網進行下載：  

[http://openvpn.net/index.php/download/community-downloads.html](http://openvpn.net/index.php/download/community-downloads.html)

以上資料也引用自OpenVPN官網。  
有興趣了解更多的，可用「CVE-2014-0160」去搜尋，會有許多相關的資料。  
  
而以Tomato by shibby版本而言，是什麼時候才解決掉此問題呢？  
我們來看一下他的Changelog：  

[http://tomato.groov.pl/?page\_id=78](http://tomato.groov.pl/?page_id=78)

查找關鍵字「openssl」之後就可以發現他是在117版本之後才改用1.0.1g……因此在117版本之前的使用者，請儘快更新版本，而且更新金鑰和密碼。  
相關的處理，和進一步了解，可以參考此網頁：  

[http://devco.re/blog/2014/04/11/openssl-heartbleed-how-to-hack-how-to-protect/](http://devco.re/blog/2014/04/11/openssl-heartbleed-how-to-hack-how-to-protect/)

  
  
OK，那麼我們進入正題。  
**第一步**，確認目前使用版本和類別  
在界面左側，有個ABOUT，按下他之後，會顯示如下圖。  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.11.44.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.11.44.webp)

  
可以看到，我的版本是使用「**Tomato Firmware 1.28.0000 MIPSR2-116 K26 USB AIO**」，等一下我們就要找到他的升級版本進行下載。  
  
**第二步**，進行設定檔備份  
注意，設定檔備份雖然可以加快後續恢復，但是也有可能因為版本不同，直接輸入設定檔會造成功能無法使用，請自行進行測試，如不行，重設回原廠預設值。  
按左側界面的Administration，當中有一個Configuration  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.14.50.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.14.50.webp)

  
有個Backup Configuration  
點選備份Backup，此備份檔會下載到你的電腦當中  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.15.16.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.15.16.webp)

  
然後還是建議備份一下你的OPENVPN資料，像是CERT和KEY，以免出了意外……  
  
**第三步**，下載你的韌體  
到Tomato by shibby官方網址進行下載：  

[http://tomato.groov.pl/?page\_id=164](http://tomato.groov.pl/?page_id=164)

以我而言，因為我是ASUS RT-N16，所以我點進K26這個分類，  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.23.03.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.23.03.webp)

  
找出最新的120版本，再找出我要的版本**tomato-K26USB-1.28.RT-MIPSR1-120-AIO**Y  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.23.26.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.23.26.webp)

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.24.58.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-03-15.24.58.webp)

  
  
**第四步**，更新韌體  
在Administration中有個Upgrade  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.22.35.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.22.35.webp)

  
如果你之前曾經開啟JFFS，在此記得先關掉該功能  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.22.43.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.22.43.webp)

  
於JFFS頁籤中**取消勾選**ENABLE，然後點選SAVE  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.23.03.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.23.03.webp)

  
重新進入Upgrade中，可以更新了，點選「選擇檔案」，找出你剛剛下載的更新檔地點，「After flashing, erase all data in NVRAM memory」，此選項可勾可不勾，我個人習慣勾選，以免之後有什麼相容性的問題之類的，最後按下「Upgrade」  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.24.13.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.24.13.webp)

  
更新開始，就等吧~  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.24.29.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.24.29.webp)

  
更新完成，按下Continue  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.29.28.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.29.28.webp)

  
Continue後，基本上設定會全部回原廠值，請將網卡設在192.168.1.10/24，GATEWAY設在192.168.1.1，然後開啟瀏覽器進行設定，連線位置在：http://192.168.1.1，帳號密碼都是admin  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.34.10.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.34.10.webp)

  
將之前備份好的設定檔回復  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.35.05.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.35.05.webp)

  
更新完成  

[![](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.41.10.webp)](/blog/img/25E8-259E-25A2-25E5-25B9-2595-25E6-2588-25AA-25E5-259C-2596-2014-07-04-00.41.10.webp)

  
  
**第五步**，更改CERT跟KEY  
相關重新製作過程，可參考以下網頁：  

[http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1](http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1)

弄好的CERT檔和KEY如下圖，其中有一個Client1.ovpn是使用在Client端的，我們等一下會再介紹他  

[![](/blog/img/2014-07-03-23.25.59.webp)](/blog/img/2014-07-03-23.25.59.webp)

  
**第六步**，更改CLIENT端的設定  
WINDOWS的部份，還是可參考：  

[http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1](http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1)

我這邊來補一下ANDROID的部份~  
1.到Google Play找**OpenVPN Connect**下載  
可參考：  

[https://play.google.com/store/apps/details?id=net.openvpn.openvpn](https://play.google.com/store/apps/details?id=net.openvpn.openvpn)

2.修改Client1.ovpn檔案  
個人建議就算是個人還是使用TUN模式較安全，而且基本上任何防火牆應該都可以繞過，  
不像TAP的話，有些防火牆會繞不過，再來，使用TLS加密較安全，  
像是這次的Heartbleed，使用TLS就比較沒有洩密的問題。  

[![](/blog/img/2014-07-03-23.27.53.webp)](/blog/img/2014-07-03-23.27.53.webp)

  
沒有這個檔案的人，可自行使用「記事本」打上下面我複製出來的文字，並另外新檔，把檔名改成XXX(隨便取).ovpn就行了  
  
\==========下面是檔案內容=============  
client  
\# 使用 TUN 裝置 (routing mode)  
dev tun  
\# vpn server 的 ip address 或是 domain name  
remote xxx.xxx.xxx.xxx  
#上方的xxx.xxx.xxx.xxx請改上你的對外固定IP，或是使用動態DNS服務，像是NO-IP之類的  
port 1194  
#可自行改PORT  
proto udp  
resolv-retry infinite  
nobind  
persist-key  
persist-tun  
ca ca.crt  
\# PKCS12  
cert client1.pem  
key client1.key  
comp-lzo  
verb 3  
\# 如果用TAP模式的話，redirect-gateway要拿掉  
redirect-gateway  
\==========上面是檔案內容=============  
  
其中#號的該行會被註解掉，也就是會被無視掉，所以可以做一些自己的小註解，然後也請各位改上自己的相關資訊，像是IP位置或是TUN/TAP之類的。  
3.將檔案放入Android手機當中  
先將剛剛產出之ca.crt、client1.crt、client1.key、Client1.ovpn、client1.pem放入同一個資料夾中，使用Dropbox或是直接傳入手機當中，請記得存放位置。  
(以SAMSUNG而言，如果是手機內建記憶體，其位置在於/storage/sdcard0；外接SD卡，則是/storage/extSdCard)  
4.開啟OpenVPN Connect  

[![](/blog/img/Screenshot_2014-07-03-23-36-52.webp)](/blog/img/Screenshot_2014-07-03-23-36-52.webp)

  
按下選單鍵，讓其出現選項  

[![](/blog/img/Screenshot_2014-07-03-23-37-55.webp)](/blog/img/Screenshot_2014-07-03-23-37-55.webp)

  
點選Import  

[![](/blog/img/Screenshot_2014-07-03-23-38-22.webp)](/blog/img/Screenshot_2014-07-03-23-38-22.webp)

  
選擇Import Profilie from SD card  

[![](/blog/img/Screenshot_2014-07-03-23-43-40.webp)](/blog/img/Screenshot_2014-07-03-23-43-40.webp)

  
Import完，就可以點選Connect進行連線  

[![](/blog/img/Screenshot_2014-07-03-23-44-25.webp)](/blog/img/Screenshot_2014-07-03-23-44-25.webp)

  
選擇我信任這個程式，按下確認  

[![](/blog/img/Screenshot_2014-07-03-23-45-31.webp)](/blog/img/Screenshot_2014-07-03-23-45-31.webp)

  
連線成功！！(請記得要在外網環境或是使用3G進行測試)  

[![](/blog/img/Screenshot_2014-07-03-23-46-43.webp)](/blog/img/Screenshot_2014-07-03-23-46-43.webp)

  
  
**最後一步**，檢查是否還有OpenSSL Heartbleed問題：  
可使用下面網址的工具檢查：  

[http://www.ithome.com.tw/news/86882](http://www.ithome.com.tw/news/86882)

  
好了，大功告成！！  
有什麼問題，都可以再跟我討論喔！

