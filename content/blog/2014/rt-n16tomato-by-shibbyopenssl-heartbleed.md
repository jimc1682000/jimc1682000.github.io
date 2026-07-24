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

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7aM2Q_4QXvgW9NnO0y7PMuWmkZA24EWilLceBmnDEu8venClYUoN_JbZkR7xlUdZh5czORMhwW4tPSc0jEMRTJYxXgnC7EslL-hrBEesXKjS9slSKA1_c5m2XxxaWFB_biTVpcM1B2nBj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.36.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7aM2Q_4QXvgW9NnO0y7PMuWmkZA24EWilLceBmnDEu8venClYUoN_JbZkR7xlUdZh5czORMhwW4tPSc0jEMRTJYxXgnC7EslL-hrBEesXKjS9slSKA1_c5m2XxxaWFB_biTVpcM1B2nBj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.36.png)

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyc1tvFHyeSVPHyel_UjEGbFW8DxwX6seRks7Rx5PGJFhWt5g0VhP24WDe1eqypn_Qv092FLhAampKlO2yuiFBkkSIQMnlfAaBuq6a_0_C0PbtR5Pl7zmP9dkynRVDSxINZy3Mk0a_Nmiw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.43.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyc1tvFHyeSVPHyel_UjEGbFW8DxwX6seRks7Rx5PGJFhWt5g0VhP24WDe1eqypn_Qv092FLhAampKlO2yuiFBkkSIQMnlfAaBuq6a_0_C0PbtR5Pl7zmP9dkynRVDSxINZy3Mk0a_Nmiw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.43.png)

  
  
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

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikpL4qwA1uTKmgcPNYqEzCdNmDT4PQ1CHo2nJP4q-oFXr_XgtP6I8WQ2Zm5rToV9y_8AkK2hCEKAy-QSMhTrFHseOUFJ-VWBZO_h6ZElswJU3Cilh4a6hNsp2FSM6CyNb-Z_aB4QjLx8Ea/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.11.44.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikpL4qwA1uTKmgcPNYqEzCdNmDT4PQ1CHo2nJP4q-oFXr_XgtP6I8WQ2Zm5rToV9y_8AkK2hCEKAy-QSMhTrFHseOUFJ-VWBZO_h6ZElswJU3Cilh4a6hNsp2FSM6CyNb-Z_aB4QjLx8Ea/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.11.44.png)

  
可以看到，我的版本是使用「**Tomato Firmware 1.28.0000 MIPSR2-116 K26 USB AIO**」，等一下我們就要找到他的升級版本進行下載。  
  
**第二步**，進行設定檔備份  
注意，設定檔備份雖然可以加快後續恢復，但是也有可能因為版本不同，直接輸入設定檔會造成功能無法使用，請自行進行測試，如不行，重設回原廠預設值。  
按左側界面的Administration，當中有一個Configuration  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmgF8SB1DAW6RDH5nOj0kNkXUZYZGKpZzHNjoqZJ58y3c2ucIIdStcbFPnuiV8z5Rdj-tYOzVpDzT2UkOPpQ5f_FWSYZ8FRdnoo4kdbrelsjitjCU3OBuHRX-mfSNlayvTTs7Ag1LmiLx7/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.14.50.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmgF8SB1DAW6RDH5nOj0kNkXUZYZGKpZzHNjoqZJ58y3c2ucIIdStcbFPnuiV8z5Rdj-tYOzVpDzT2UkOPpQ5f_FWSYZ8FRdnoo4kdbrelsjitjCU3OBuHRX-mfSNlayvTTs7Ag1LmiLx7/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.14.50.png)

  
有個Backup Configuration  
點選備份Backup，此備份檔會下載到你的電腦當中  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6dkGRXB_j8oYWjfnfI8YR4HiQ0-2WZQv6eSvf_JgsKO5nWJGSDILmoBDnPJtXLJ0RzjXMON62UA3TlpdYgpJ7K2s3u8W0IQMSZxhgpinLgaunV0qGIuudUGh_E9xo5AOmAo7Bq3n0WSAi/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.15.16.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6dkGRXB_j8oYWjfnfI8YR4HiQ0-2WZQv6eSvf_JgsKO5nWJGSDILmoBDnPJtXLJ0RzjXMON62UA3TlpdYgpJ7K2s3u8W0IQMSZxhgpinLgaunV0qGIuudUGh_E9xo5AOmAo7Bq3n0WSAi/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.15.16.png)

  
然後還是建議備份一下你的OPENVPN資料，像是CERT和KEY，以免出了意外……  
  
**第三步**，下載你的韌體  
到Tomato by shibby官方網址進行下載：  

[http://tomato.groov.pl/?page\_id=164](http://tomato.groov.pl/?page_id=164)

以我而言，因為我是ASUS RT-N16，所以我點進K26這個分類，  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6LN7nJMcZ8axOXDiLKdaVcTa-1L6kXY_cKo7Ynibv1muhLceKudatVKju4ma3_wRGBZweVCXxlkn2-4y_kl98BzQJKyCEgPJoVYGkCYuB2ebnqEiuskiUQqXkAAs0XKhp8N9Ypp9u1eFm/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.03.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6LN7nJMcZ8axOXDiLKdaVcTa-1L6kXY_cKo7Ynibv1muhLceKudatVKju4ma3_wRGBZweVCXxlkn2-4y_kl98BzQJKyCEgPJoVYGkCYuB2ebnqEiuskiUQqXkAAs0XKhp8N9Ypp9u1eFm/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.03.png)

  
找出最新的120版本，再找出我要的版本**tomato-K26USB-1.28.RT-MIPSR1-120-AIO**Y  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZI3x53td32iv7ja0iivhjWd0SHpcND4x2svneyorCwOrgxpY69ipqW8byfzYK5sbz4CEmSh4KKku5cmPdJ7edVf-HWNxV1AK8gww3vJ7ly2AEjAOZZJoDHvsH2wh0Sq3uqQdV006nS8vj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.26.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZI3x53td32iv7ja0iivhjWd0SHpcND4x2svneyorCwOrgxpY69ipqW8byfzYK5sbz4CEmSh4KKku5cmPdJ7edVf-HWNxV1AK8gww3vJ7ly2AEjAOZZJoDHvsH2wh0Sq3uqQdV006nS8vj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.26.png)

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjD-C3vhzFjy7dKou-L0bg-_GA5tgkeEPdGBjSGwtXeJ5DMNi2iE961Vq3yv8O_mwW954sb9BD_Jk_jtcOvdX-sXVO3IUM_vaqxcOI7g5lK_PR8OyivKNvu3WDEGU_cOujFUbcbR9dHE5xr/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.24.58.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjD-C3vhzFjy7dKou-L0bg-_GA5tgkeEPdGBjSGwtXeJ5DMNi2iE961Vq3yv8O_mwW954sb9BD_Jk_jtcOvdX-sXVO3IUM_vaqxcOI7g5lK_PR8OyivKNvu3WDEGU_cOujFUbcbR9dHE5xr/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.24.58.png)

  
  
**第四步**，更新韌體  
在Administration中有個Upgrade  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeFhdNxdZfygmkYeyX8NtRicpxmpQbGCrDkFI2Y_uqT4nGvnb-Pwgkt7lQ56eT1sb5JDMsKC7PK1GTCAs87G75WDdXOd82wSb72-OW1XNt5KeBeJepZ3OUiUVYX0cssOhKlykh2_L6UkhG/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.35.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeFhdNxdZfygmkYeyX8NtRicpxmpQbGCrDkFI2Y_uqT4nGvnb-Pwgkt7lQ56eT1sb5JDMsKC7PK1GTCAs87G75WDdXOd82wSb72-OW1XNt5KeBeJepZ3OUiUVYX0cssOhKlykh2_L6UkhG/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.35.png)

  
如果你之前曾經開啟JFFS，在此記得先關掉該功能  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSeGGA0EIKS5CY2RGfXEzosZ9A1Fs_tf5pX7Vg7TGNr24GwNwt3nXsj8Fmr432xeufQeidpM13rfnmzJ3q3_21QGx7F_9fVYXtsg1zcO-rDasvreT4IPbTU33vo8V2NSXv3RT5vTdEKhyphenhyphenS/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.43.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSeGGA0EIKS5CY2RGfXEzosZ9A1Fs_tf5pX7Vg7TGNr24GwNwt3nXsj8Fmr432xeufQeidpM13rfnmzJ3q3_21QGx7F_9fVYXtsg1zcO-rDasvreT4IPbTU33vo8V2NSXv3RT5vTdEKhyphenhyphenS/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.43.png)

  
於JFFS頁籤中**取消勾選**ENABLE，然後點選SAVE  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVu0Pio52kQIpchMH81o7AlqpYfMvUhn0V8K82gj9cN1qNfKTMNofOGtpyt1y2lrbWWyEw9k7lZB4064r8aBV5_aZxdJnKcM0YdYC5YSPgDv3302WB1CD6puooarq0VILr8vt12XCtTZgC/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.23.03.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVu0Pio52kQIpchMH81o7AlqpYfMvUhn0V8K82gj9cN1qNfKTMNofOGtpyt1y2lrbWWyEw9k7lZB4064r8aBV5_aZxdJnKcM0YdYC5YSPgDv3302WB1CD6puooarq0VILr8vt12XCtTZgC/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.23.03.png)

  
重新進入Upgrade中，可以更新了，點選「選擇檔案」，找出你剛剛下載的更新檔地點，「After flashing, erase all data in NVRAM memory」，此選項可勾可不勾，我個人習慣勾選，以免之後有什麼相容性的問題之類的，最後按下「Upgrade」  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYeYakJHqOc2HeF50wS-6oLQaXYDBw65AxUH0Eee_II0BibVJcdvVMGKMS98e8Z4wN841AVnpHLOamCjwmHrZbliwXF1ezuBMOWEseFdGi2pn_JVuAwYWricPxGJYjOaSVR89eC5b1EzdP/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.13.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYeYakJHqOc2HeF50wS-6oLQaXYDBw65AxUH0Eee_II0BibVJcdvVMGKMS98e8Z4wN841AVnpHLOamCjwmHrZbliwXF1ezuBMOWEseFdGi2pn_JVuAwYWricPxGJYjOaSVR89eC5b1EzdP/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.13.png)

  
更新開始，就等吧~  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimKMpcY-G8gYoq6UCPqezN4Vjkp_lhyphenhyphenBBw0xZ46uzSipgsftZjWv35dyBAIi4RTH2j8uPZdGxhJIpK-q8gKh1m6xuWSRv7spd0BqRTpPOvm2ZlJaGCMRALlz_Eo8QvUfRqh7iY95VI_Kmn/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.29.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimKMpcY-G8gYoq6UCPqezN4Vjkp_lhyphenhyphenBBw0xZ46uzSipgsftZjWv35dyBAIi4RTH2j8uPZdGxhJIpK-q8gKh1m6xuWSRv7spd0BqRTpPOvm2ZlJaGCMRALlz_Eo8QvUfRqh7iY95VI_Kmn/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.29.png)

  
更新完成，按下Continue  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgufO_o3k-HMjnHbhy7pcIAV5CdGF1KNanlr_bXzs5tOt2cYOebi3YqpngJyRAU11Zt7RaVUmcxF6JYi6ktwUoexJeLFhSi39-OWp_xTCnG0miAES38YrXlsvQ1NAUZmcnuV9IFJIGbhZDw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.29.28.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgufO_o3k-HMjnHbhy7pcIAV5CdGF1KNanlr_bXzs5tOt2cYOebi3YqpngJyRAU11Zt7RaVUmcxF6JYi6ktwUoexJeLFhSi39-OWp_xTCnG0miAES38YrXlsvQ1NAUZmcnuV9IFJIGbhZDw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.29.28.png)

  
Continue後，基本上設定會全部回原廠值，請將網卡設在192.168.1.10/24，GATEWAY設在192.168.1.1，然後開啟瀏覽器進行設定，連線位置在：http://192.168.1.1，帳號密碼都是admin  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBGGNK1fM6U_RfzWbP-EUuf1Lg7GWOm5CAQWE8PZLv6POahCO7IfxkGvWWsaBzhc5kBm9XWF_Jb5pOIYzrhKcR3ajv19m7n-uueiWssWolUs_A-K-aHMCSAoolELPAjSeKx2FjZAzAYvkM/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.34.10.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBGGNK1fM6U_RfzWbP-EUuf1Lg7GWOm5CAQWE8PZLv6POahCO7IfxkGvWWsaBzhc5kBm9XWF_Jb5pOIYzrhKcR3ajv19m7n-uueiWssWolUs_A-K-aHMCSAoolELPAjSeKx2FjZAzAYvkM/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.34.10.png)

  
將之前備份好的設定檔回復  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEW77B7JX6csetbgOvR1D76eMcD_LKi8EQGDpubNJJQGm9lsT1kQI7kWEz4fXo6JJi5pG_XGTv1elPczynLtRSfThS6LJ5Lg4XBPT1L0NsBJIsZfl4Xlv9bQh2031i28_Ow9ck8LkG8wpt/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.35.05.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEW77B7JX6csetbgOvR1D76eMcD_LKi8EQGDpubNJJQGm9lsT1kQI7kWEz4fXo6JJi5pG_XGTv1elPczynLtRSfThS6LJ5Lg4XBPT1L0NsBJIsZfl4Xlv9bQh2031i28_Ow9ck8LkG8wpt/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.35.05.png)

  
更新完成  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyOtMXhOKOrOZitAuKU5UmCcFxohLZ_CGb7lxPpGpZGkCBRnSZanYmjWbwoWTQNhyphenhyphenZxv9Ib28jgtLNky08VOFOZIK-Z9GYHMjOArb2JvCBJRId4e9L9T07LWywXJ87h5DpNDBSwKHzBRRY/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.41.10.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyOtMXhOKOrOZitAuKU5UmCcFxohLZ_CGb7lxPpGpZGkCBRnSZanYmjWbwoWTQNhyphenhyphenZxv9Ib28jgtLNky08VOFOZIK-Z9GYHMjOArb2JvCBJRId4e9L9T07LWywXJ87h5DpNDBSwKHzBRRY/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.41.10.png)

  
  
**第五步**，更改CERT跟KEY  
相關重新製作過程，可參考以下網頁：  

[http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1](http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1)

弄好的CERT檔和KEY如下圖，其中有一個Client1.ovpn是使用在Client端的，我們等一下會再介紹他  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiu3HLHuuQRxA76BCQ5H13db_-zl8zf9OY-86ncXZwUqAfcfE74mK8eIr1McGzPUvJFXvMy0srEbFdl_jkrpDYgOCZkj1VOVD-68sIx863WWUbtlx8WKHOERG-IpRwa_WkFF2jPqGMNC65U/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.25.59.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiu3HLHuuQRxA76BCQ5H13db_-zl8zf9OY-86ncXZwUqAfcfE74mK8eIr1McGzPUvJFXvMy0srEbFdl_jkrpDYgOCZkj1VOVD-68sIx863WWUbtlx8WKHOERG-IpRwa_WkFF2jPqGMNC65U/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.25.59.png)

  
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

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfwZWTgoQsxLBitHgPuWYl0GD3XGO688fKY9yXAuJZrSnmykNIipMjBk5azbbC1KxyUBNwoHfw3wmkTZYLXTsGamB4KckyH1XSC2Gbvqe2j_7yxqkVgW4WfaDR79CcVAPCDNIk4tr9RWgW/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.27.53.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfwZWTgoQsxLBitHgPuWYl0GD3XGO688fKY9yXAuJZrSnmykNIipMjBk5azbbC1KxyUBNwoHfw3wmkTZYLXTsGamB4KckyH1XSC2Gbvqe2j_7yxqkVgW4WfaDR79CcVAPCDNIk4tr9RWgW/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.27.53.png)

  
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

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7UHioHfXlyTY256I5b2xOeBHQWmC69fOlqi4qarroubkCgGP12bxfI_K5TsUpVSC6SMeXJmm4POuHjQZU1G1HHR0Rw2vqeBx5pJy8Nw0hyphenhyphenypGFLoP4sBOvOOj314A2KtFgMuEXXWPN4jW/s1600/Screenshot_2014-07-03-23-36-52.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7UHioHfXlyTY256I5b2xOeBHQWmC69fOlqi4qarroubkCgGP12bxfI_K5TsUpVSC6SMeXJmm4POuHjQZU1G1HHR0Rw2vqeBx5pJy8Nw0hyphenhyphenypGFLoP4sBOvOOj314A2KtFgMuEXXWPN4jW/s1600/Screenshot_2014-07-03-23-36-52.png)

  
按下選單鍵，讓其出現選項  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrCy_A3PgVKoVe1QBIroRwUYYfClBAx3OE_DK89TR0t9jOCD3P91YEmEqpHJQQvHqPYM3tkuqhVX8vTzjGrqrn8t0zsbCfDT4xNkWo6lRubAgNn5_opwRItOHcf1sHU_DSH48Co-epWJyo/s1600/Screenshot_2014-07-03-23-37-55.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrCy_A3PgVKoVe1QBIroRwUYYfClBAx3OE_DK89TR0t9jOCD3P91YEmEqpHJQQvHqPYM3tkuqhVX8vTzjGrqrn8t0zsbCfDT4xNkWo6lRubAgNn5_opwRItOHcf1sHU_DSH48Co-epWJyo/s1600/Screenshot_2014-07-03-23-37-55.png)

  
點選Import  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZ-ibzCNYPoJFlu3m-Vig9uTg-IwplBKIZowWr-Pc7taMe8vxwJ-V0OlLc_s21UlFpB9rFzUL0LZoi72VQUrT9NIhEZTrKepqn1pMnilpoop2RxRd1fmlZx0MWtx-C3j-9wI8_jRHVmTbw/s1600/Screenshot_2014-07-03-23-38-22.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZ-ibzCNYPoJFlu3m-Vig9uTg-IwplBKIZowWr-Pc7taMe8vxwJ-V0OlLc_s21UlFpB9rFzUL0LZoi72VQUrT9NIhEZTrKepqn1pMnilpoop2RxRd1fmlZx0MWtx-C3j-9wI8_jRHVmTbw/s1600/Screenshot_2014-07-03-23-38-22.png)

  
選擇Import Profilie from SD card  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqT1v8T5bmH8-ULNjIsesrTgfb9Ja0cLRBATd9ZuFtBBROJU32w6nCYqUdF1g5l4hyphenhyphenZmiNFYIP6njywhnKHsXb0ZcmN2SCioUVItQ5ycv83jnvzztw5rjJnTIrLYCiIA5u54vVD_zM7MUf/s1600/Screenshot_2014-07-03-23-43-40.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqT1v8T5bmH8-ULNjIsesrTgfb9Ja0cLRBATd9ZuFtBBROJU32w6nCYqUdF1g5l4hyphenhyphenZmiNFYIP6njywhnKHsXb0ZcmN2SCioUVItQ5ycv83jnvzztw5rjJnTIrLYCiIA5u54vVD_zM7MUf/s1600/Screenshot_2014-07-03-23-43-40.png)

  
Import完，就可以點選Connect進行連線  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitOMNWfonVxdwDATRVCUxqetqw-iYe4lg1TUhBZGXE9Gdz3xwU_rqNofrG-SYXidOGozeAa1_dnsvwHBsOwokm1fqxYhP6jZaa7DQl4ApCFn8N3G8kuYl2HXe5NXOuYRrHtBzl0dy5KaXK/s1600/Screenshot_2014-07-03-23-44-25.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitOMNWfonVxdwDATRVCUxqetqw-iYe4lg1TUhBZGXE9Gdz3xwU_rqNofrG-SYXidOGozeAa1_dnsvwHBsOwokm1fqxYhP6jZaa7DQl4ApCFn8N3G8kuYl2HXe5NXOuYRrHtBzl0dy5KaXK/s1600/Screenshot_2014-07-03-23-44-25.png)

  
選擇我信任這個程式，按下確認  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhi30zZFIVlPHPtQypw9qEluVgbqIT5pL18q964kZRiVzAaPDz_PB3J7ZvOFWaXFgt7ZL1MEIXe_whcs62zsplEYstW3PTEKMgD3QMNvPgpGzPD5Coi27K72h7Mb-g-_PmGZ-ihA9Qql6Dw/s1600/Screenshot_2014-07-03-23-45-31.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhi30zZFIVlPHPtQypw9qEluVgbqIT5pL18q964kZRiVzAaPDz_PB3J7ZvOFWaXFgt7ZL1MEIXe_whcs62zsplEYstW3PTEKMgD3QMNvPgpGzPD5Coi27K72h7Mb-g-_PmGZ-ihA9Qql6Dw/s1600/Screenshot_2014-07-03-23-45-31.png)

  
連線成功！！(請記得要在外網環境或是使用3G進行測試)  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhf2-ZKM6HpiPtnVWPusIxrbCxg9nUDpTohXmHzNSK8gJqqua721G8DUPH4rvfrFmk5QggrpEHQzJfrnLUThdbhv3kIDog9bAYhRyYtuxkbGTljkuhGTAJV_yGwn5PrHsAtNWLkvFkHVhgX/s1600/Screenshot_2014-07-03-23-46-43.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhf2-ZKM6HpiPtnVWPusIxrbCxg9nUDpTohXmHzNSK8gJqqua721G8DUPH4rvfrFmk5QggrpEHQzJfrnLUThdbhv3kIDog9bAYhRyYtuxkbGTljkuhGTAJV_yGwn5PrHsAtNWLkvFkHVhgX/s1600/Screenshot_2014-07-03-23-46-43.png)

  
  
**最後一步**，檢查是否還有OpenSSL Heartbleed問題：  
可使用下面網址的工具檢查：  

[http://www.ithome.com.tw/news/86882](http://www.ithome.com.tw/news/86882)

  
好了，大功告成！！  
有什麼問題，都可以再跟我討論喔！

