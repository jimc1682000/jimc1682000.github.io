---
title: "CentOS 7 最小安裝後在VirtualBox的網路設定筆記"
pubDate: 2015-09-13
description: "如題，大家也可以參考這些網誌的內容來進行設定： 首先，先說明一下Virtualbox如果只是要讓VM可以連到外部網路，而不需要連線到實體本機的話，那麼直接用他預"
tags: [Linux]
---
如題，大家也可以參考這些網誌的內容來進行設定：  
[http://www.unixarena.com/2015/04/rhel-7-network-management-nmcli-or-nmtui.html](http://blog.miniasp.com/post/2012/07/30/CentOS-63-Minimal-Installation-and-Configuration-Notes.aspx)  
[http://www.arthurtoday.com/2013/07/ubuntu-guest-enables-nat-and-hostonly-adapter.html](http://www.arthurtoday.com/2013/07/ubuntu-guest-enables-nat-and-hostonly-adapter.html)  
  
首先，先說明一下Virtualbox如果只是要讓VM可以連到外部網路，而不需要連線到實體本機的話，那麼直接用他預設的NAT就可以達成了；  
而如果是只要讓VM連到實體本機，不讓VM連到外網的話，則是可以使用「僅限主機」介面卡達成。  
而一般如果要讓VM跟實體機都在同網段的話，那麼應該要選擇「橋接介面卡」，那麼如果有DHCP Server的話(一般而言，應該就是無線基地台、IP分享器)，那麼就可以在同網段，你可以跟你的VM互通，也可以讓他連線到外部網路，就跟你的實體本機一樣。  
  
因此，如果你想要達成讓VM跟實體機可以互連的話，「橋接介面卡」就是一種方法，另一種方法是讓VM有兩張網路介面卡，一張是NAT，另一張則是「僅限主機」介面卡，設定好兩張介面卡後，那麼VM也就可以連內也可以連外，只是嚴格說起來，他跟實體本機並不是在同一個LAN上面就是了。  
  
下面的例子，是使用第二種方式，也就是NAT+僅限主機介面卡來進行設定教學，我會先教如何進行Virtualbox開虛擬機的設定，再教說如何在CentOS 7 進行相關的設定，那麼就讓我們開始吧！  
  
  
一、Virtualbox設定部份  
先安裝好Virtualbox(廢話)，點選「新增」後，選擇類型為Linux，版本為RedHat 64bit，在這邊我命名為CentOS7，如圖，設定好後按下一步  

[![](/blog/img/Virtualbox-20150913-001.webp)](/blog/img/Virtualbox-20150913-001.webp)

  
設定記憶體大小，這邊我們將其設定為1024MB，如圖，設定好後按下一步  

[![](/blog/img/Virtualbox-20150913-002.webp)](/blog/img/Virtualbox-20150913-002.webp)

  
要建立虛擬硬碟，這邊我們選擇「立即建立虛擬硬碟」，如圖，點選建立  

[![](/blog/img/Virtualbox-20150913-003.webp)](/blog/img/Virtualbox-20150913-003.webp)

  
設定硬碟檔案類型，這邊我會建立使用VDI，畢竟是Virtualbox原生支援，可能產生的問題會較少，不過大家還是可以自行選擇要使用其他何種的硬碟，如圖  

[![](/blog/img/Virtualbox-20150913-004.webp)](/blog/img/Virtualbox-20150913-004.webp)

  
選擇動態配置，所謂的動態配置是說一開始給定的空間並不是如同固定大小般，直接吃掉一定大小的硬碟空間，而是會隨著你的硬碟使用空間多少而增長(注意，不會減少空間，除非進行其他動作，但非常不建議，有危險性)，最大就是到固定大小的最大值，這邊我們擇動態配置。  

[![](/blog/img/Virtualbox-20150913-005.webp)](/blog/img/Virtualbox-20150913-005.webp)

  
給定硬碟大小8G，因為Linux不太佔空間，所以不用給太大，這邊我們就按照建議值定8G的空間給他。  

[![](/blog/img/Virtualbox-20150913-006.webp)](/blog/img/Virtualbox-20150913-006.webp)

  
設定好後，我們會回到原本的畫面，但是會看到虛擬機已建立好了，但是我們在開機之前還要再進行一些設定  
  
1.把要安裝的CentOS映像檔放入  
點選VM後，按下「設定值」的按鈕，進入設定畫面，點選「存放裝置」，在存放裝置中，我們會看到兩個控制器，一個是IDE，一個是SATA，IDE當中的，就是光碟機，點選他後，按下右邊有個小光碟圖示，選擇ISO檔後放入  

[![](/blog/img/Virtualbox-20150913-007.webp)](/blog/img/Virtualbox-20150913-007.webp)

  
2.設定第二張網路介面卡  
一樣在設定的畫面中，選擇「網路」，可以看到四個介面卡，介面卡1已經設定好了NAT，我們不需要再另行設定，如圖  

[![](/blog/img/Virtualbox-20150913-008.webp)](/blog/img/Virtualbox-20150913-008.webp)

  
不過如果想要先加上網卡，但先不要連線的話，可以點選進階，裡面有個線路已連接的Checkbox，取消勾選就等於先拔掉網路線，如圖  

[![](/blog/img/Virtualbox-20150913-009.webp)](/blog/img/Virtualbox-20150913-009.webp)

  
切到介面卡2，勾選啟用網路卡，下拉選單到：「僅限主機」介面卡，他自動會帶出名稱，不用改動他，然後點選進階，於混合模式下選擇「允許全部」，完成所有設定後按下確定存檔  
(補充，後來測試選擇「拒絕」也可以正常互ping，查詢之後，才確定要「允許全部」的時機是在你使用橋接介面的時候，因為那個時候要接到各種的MAC封包才可正常執行)  

[![](/blog/img/Virtualbox-20150913-010.webp)](/blog/img/Virtualbox-20150913-010.webp)

  
二、VM啟動後，進行安裝CentOS  
這邊我就不多說了，網路上也都有很多資訊，而且現在安裝都有GUI，所以不會太難  
  
三、安裝CentOS完成，使用nmtui (NetManager-TextUI)來進行設定  
開機完成後，輸入於安裝時建立的root帳密又或是自行建立的帳密登入，這邊要有root權限才比較方便做事，因此我都用root來demo  

[![](/blog/img/Virtualbox-20150913-011.webp)](/blog/img/Virtualbox-20150913-011.webp)

  
先確認無法ping 到外網8.8.8.8並打入「nmtui」進入設定頁面  

[![](/blog/img/Virtualbox-20150913-012.webp)](/blog/img/Virtualbox-20150913-012.webp)

  
選擇「Edit a connection」  

[![](/blog/img/Virtualbox-20150913-013.webp)](/blog/img/Virtualbox-20150913-013.webp)

  
可以看到裡面有兩個介面，分別選擇後進入「<Edit...>」  

[![](/blog/img/Virtualbox-20150913-014.webp)](/blog/img/Virtualbox-20150913-014.webp)

  
因為我們都使用DHCP做設定，所以不需要另外設定固定IP，確認IPV4跟IPV6都是Automatic之後，再將Automatically connect勾選起來，之後重開機就會自動連網  

[![](/blog/img/Virtualbox-20150913-015.webp)](/blog/img/Virtualbox-20150913-015.webp)

  
輸入「service network restart」，重啟網路服務，才能得到正確的設定  

[![](/blog/img/Virtualbox-20150913-016.webp)](/blog/img/Virtualbox-20150913-016.webp)

  
跳出虛擬機(預設應該是右邊的Ctrl)，打開CMD，輸入「ipconfig /all」可以看到一個網路介面如下圖，可以得到實體本機的IP，等等要進行測試使用  

[![](/blog/img/Virtualbox-20150913-017.webp)](/blog/img/Virtualbox-20150913-017.webp)

  
輸入「ping 8.8.8.8」、「ping 192.168.56.1」測試對外和對實體本機的連線，預設Linux會不斷的測試，要按下Ctrl+C來取消  

[![](/blog/img/Virtualbox-20150913-018.webp)](/blog/img/Virtualbox-20150913-018.webp)

  
輸入「ip a」，可以看到有一個跟192.168.56.1同網段的192.168.56.101，之後要在實體本機用此IP進行測試  

[![](/blog/img/Virtualbox-20150913-019.webp)](/blog/img/Virtualbox-20150913-019.webp)

  
跳出虛擬機，打開剛剛的CMD，輸入「ping 192.168.56.101」發現也可以測通  

[![](/blog/img/Virtualbox-20150913-020.webp)](/blog/img/Virtualbox-20150913-020.webp)

  
用SSH連線過去看看，OK，大功告成！  

[![](/blog/img/Virtualbox-20150913-021.webp)](/blog/img/Virtualbox-20150913-021.webp)

  
補充：在從虛擬機ping 192.168.56.1的時候，可能會沒有回應，那可能是Windows Firewall設定的問題，打開防火牆設定後將ICMPv4跟ICMPv6的回應打開就好，如圖  

[![](/blog/img/Virtualbox-20150913-022.webp)](/blog/img/Virtualbox-20150913-022.webp)

