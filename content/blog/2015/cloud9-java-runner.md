---
title: "Cloud9 Java Runner建立"
pubDate: 2015-09-13
description: "今天來跟大家介紹一下Cloud9的Java Runner要如何建立，大家也可以直接參考Cloud9還有Stackoverflow的教學： 首先，我們要先來建立一"
tags:
  - "Java"
  - "介紹"
  - "我的吉米城"
  - "Cloud IDE"
  - "Cloud9"
  - "HelloWorld"
---
今天來跟大家介紹一下Cloud9的Java Runner要如何建立，大家也可以直接參考Cloud9還有Stackoverflow的教學：[https://docs.c9.io/v1.0/docs/custom-runners](https://docs.c9.io/v1.0/docs/custom-runners)  
[http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java](http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java)  
  
  
  
首先，我們要先來建立一個新的workspace，大家可以自行命名，在這邊我選擇用custom的方式，因為我們只是要做Java的例子，不太需要其他東西，如圖  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjctQL-EAuTYelrqMiM6mXMeNs4ar0090vLrE3e_OHf6CUf45jAyIzz_8AvFm8Fai8yeQGAn3dDyDrikqoVpvpAWc3HyFJXqxiSsS5qU0laVwfknhbivdtJFvEmd-qmhjHh0f8EjY2ydFdy/s640/Cloud9-20150913-001.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjctQL-EAuTYelrqMiM6mXMeNs4ar0090vLrE3e_OHf6CUf45jAyIzz_8AvFm8Fai8yeQGAn3dDyDrikqoVpvpAWc3HyFJXqxiSsS5qU0laVwfknhbivdtJFvEmd-qmhjHh0f8EjY2ydFdy/s1600/Cloud9-20150913-001.png)

  
  
確認一下是否真的有java環境：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFT9mLlkVwc-uMHq4agYXYC_ebfAWBVprgPGwgcvqN8IUXCoTSO7bq8M5EZBcrWVlEZhzpHYM4RMPbEA5gN14DnCW9cpeiIijLJ4IcfMh4IKDnIuAfzBBJIkkD1FwDyVNpbh5_HLtylASB/s640/Cloud9-20150913-002.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFT9mLlkVwc-uMHq4agYXYC_ebfAWBVprgPGwgcvqN8IUXCoTSO7bq8M5EZBcrWVlEZhzpHYM4RMPbEA5gN14DnCW9cpeiIijLJ4IcfMh4IKDnIuAfzBBJIkkD1FwDyVNpbh5_HLtylASB/s1600/Cloud9-20150913-002.png)

  
  
分別新增一個src跟bin資料夾：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl5xP7ZxshmXQhLsSYBhgsbpFRL6etAErNTIrm-nCBKjJuE3kLdWSqRy5KFz11QZAp5mYBG8SQefIkjou557qLCLEtlASvEkK6bw9RxC217sO3eOhpKlPUDUz6jKHItGI3LmcOnuKw-cTG/s640/Cloud9-20150913-003.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl5xP7ZxshmXQhLsSYBhgsbpFRL6etAErNTIrm-nCBKjJuE3kLdWSqRy5KFz11QZAp5mYBG8SQefIkjou557qLCLEtlASvEkK6bw9RxC217sO3eOhpKlPUDUz6jKHItGI3LmcOnuKw-cTG/s1600/Cloud9-20150913-003.png)

  
  
新增一個HelloWorld.java檔案，並且打入相關的Code：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRqvUQtLPW8QKag8CNyTEmrE7fbPCoFRjbShU9dJnud2SwR5hnkGuIcRfe5lQU2sjXbTxCF2KVZR1KJGqYATnaVBYL5MUqo89eahHarnHNn8poWDJcsFI3bliQr3M_NLbpDEkTgrNwk2Pc/s640/Cloud9-20150913-004.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRqvUQtLPW8QKag8CNyTEmrE7fbPCoFRjbShU9dJnud2SwR5hnkGuIcRfe5lQU2sjXbTxCF2KVZR1KJGqYATnaVBYL5MUqo89eahHarnHNn8poWDJcsFI3bliQr3M_NLbpDEkTgrNwk2Pc/s1600/Cloud9-20150913-004.png)

  
  
簡單的進行一下javac跟java，看是否可以正常執行：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXTeWF-v4cWFUC8jxKZ_-L6Etakni_5GylJrxd_0_6Yqfy9fTPc3Kk1vVsPvaz1mZoc-fl5xO-bEsghNry11uxxO8M3uV-1qgWPzTrqXD0w_0XozNCBu19c361sse0L3lwHlcbNgYIO7We/s640/Cloud9-20150913-005.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXTeWF-v4cWFUC8jxKZ_-L6Etakni_5GylJrxd_0_6Yqfy9fTPc3Kk1vVsPvaz1mZoc-fl5xO-bEsghNry11uxxO8M3uV-1qgWPzTrqXD0w_0XozNCBu19c361sse0L3lwHlcbNgYIO7We/s1600/Cloud9-20150913-005.png)

  
  
如果可以正常執行，就把HelloWorld.class刪除掉：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6Xmc81t9Uw0nFnEv1-qqegsmpKLTwhf1AmZAwezvKJwUgPzsk118AjzzrI2kxaw9_7FzkwIQKX4c_MyYuPu6ni3L09KI52sO4MplzMW4_1MMsGpkMbE9HCFye8Go-NKnpB7BCd_IHX9Zz/s640/Cloud9-20150913-006.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6Xmc81t9Uw0nFnEv1-qqegsmpKLTwhf1AmZAwezvKJwUgPzsk118AjzzrI2kxaw9_7FzkwIQKX4c_MyYuPu6ni3L09KI52sO4MplzMW4_1MMsGpkMbE9HCFye8Go-NKnpB7BCd_IHX9Zz/s1600/Cloud9-20150913-006.png)

  
  
建立一個新的Runner(請忽略已經出現的JavaBuilder跟JavaRunner，原始的環境是沒有的)：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfpBUvwlU3X36oZzBMweUH1JEyxLy3BYyeTNc1IVtYGqPgAhkAYKW_iWywiDDfl3dCzIV2cNojul6J_ESH04CmT9cniY8pZeSBIDJ5o54qmDCBAaHSSn42ZH3VWiptB3Php5rpjDioOFH6/s640/Cloud9-20150913-007.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfpBUvwlU3X36oZzBMweUH1JEyxLy3BYyeTNc1IVtYGqPgAhkAYKW_iWywiDDfl3dCzIV2cNojul6J_ESH04CmT9cniY8pZeSBIDJ5o54qmDCBAaHSSn42ZH3VWiptB3Php5rpjDioOFH6/s1600/Cloud9-20150913-007.png)

  
  
將Cloud9教學文件裡面的JavaBuilder複製下來，修改"env"的內容  
"OUT\_DIR": "$project\_path\\\\bin"  
"SRC\_DIR": "src"  
其中OUT\_DIR就是你Java Build完之後的class要放的位置  
SRC\_DIR就是你的原始碼放在位置  
可參考圖片：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZ-sM5E_gZAG8D9PxFZnKX-SNqKU5iLaHVHRjqurzXzURhK4brIJwN2oHC3F80Y7paVXEzeLunMkhTTcTf1FynuqKpPNDAVef2fdqP_7_OfVolWqn7KYsUlQUaeX62ZP9pjSOH2QnMAugu/s640/Cloud9-20150913-008.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZ-sM5E_gZAG8D9PxFZnKX-SNqKU5iLaHVHRjqurzXzURhK4brIJwN2oHC3F80Y7paVXEzeLunMkhTTcTf1FynuqKpPNDAVef2fdqP_7_OfVolWqn7KYsUlQUaeX62ZP9pjSOH2QnMAugu/s1600/Cloud9-20150913-008.png)

  
  
將該Runner存下來，在這邊我取名為JavaBuilder.run：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHNb4pijrCwQTvSTynsWWyfijtm1lrLcwG2mXmkvL8gcZgulaEyjgnN0D1X0i_mUGv9HoBpweDNNgb3MlD8SnCF9cg3HtGWz8mfGlmwL6F_KoPXH2DPkNdewIh_UUqNHCx9mk_jaIxT8nv/s640/Cloud9-20150913-009.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHNb4pijrCwQTvSTynsWWyfijtm1lrLcwG2mXmkvL8gcZgulaEyjgnN0D1X0i_mUGv9HoBpweDNNgb3MlD8SnCF9cg3HtGWz8mfGlmwL6F_KoPXH2DPkNdewIh_UUqNHCx9mk_jaIxT8nv/s1600/Cloud9-20150913-009.png)

  
  
另外再將Cloud9教學文件裡面的JavaRunner複製下來，修改以下內容，  
"echo $file | sed -r 's/.\*\\\\/src\\\\///g' | sed -r 's/\\\\.java//g'  | sed -r 's/\\\\//\\\\./g' | xargs java" 當中的  
「's/.\*\\\\/src\\\\///g'」  /src就是你的SRC\_DIR目錄的位置  
"OUT\_DIR": "$project\_path\\\\bin"就是之後Build完之後檔案的位置，如圖  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwpJh3ndqQ3ulYJgCbBR4Rr2eRaIYn0bIoNdKEzoYiqrn6NR5TkLYODmE7WzGD9GFbuBAIJ8plkUYxcUyqs3yEPSFFDbi3y6KKIULnINug0dFMNk-enWPQc-2kzLnPsURj1-1abwyBg3gG/s640/Cloud9-20150913-010.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwpJh3ndqQ3ulYJgCbBR4Rr2eRaIYn0bIoNdKEzoYiqrn6NR5TkLYODmE7WzGD9GFbuBAIJ8plkUYxcUyqs3yEPSFFDbi3y6KKIULnINug0dFMNk-enWPQc-2kzLnPsURj1-1abwyBg3gG/s1600/Cloud9-20150913-010.png)

  
  
將該Runner存下來，在這邊我取名為JavaRunner.run：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6E0XO5v31NcAc_Z_rdlVfKJqX4sbjBt0bPIm7b0YS6vB2FwMiwWkpLrUXb6i7g7TfXQ_r-hcShf3mv8i0bV-UGpCSrTKU5I2ef7cOZOugOc-53jke9tGbgBjH_3GDRnsuaWkfL_y6mQtc/s640/Cloud9-20150913-011.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6E0XO5v31NcAc_Z_rdlVfKJqX4sbjBt0bPIm7b0YS6vB2FwMiwWkpLrUXb6i7g7TfXQ_r-hcShf3mv8i0bV-UGpCSrTKU5I2ef7cOZOugOc-53jke9tGbgBjH_3GDRnsuaWkfL_y6mQtc/s1600/Cloud9-20150913-011.png)

  
  
把兩個檔案都關掉後，我們可以看到在runner的地方新增了兩個我們自定的runner：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgytCQ0HgcwViMo_JhsJimGK8gm01yzo0HuhCpMbJs0Qzb0LIyUpp5mLozro8jBxwcOReEbYVaF9FS1Kj6rvioea3FlEnQ3TxN0KjKEjCL-OOu6A3PML9A5LxseK2zHI59k0z3BIgjL1UHl/s640/Cloud9-20150913-012.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgytCQ0HgcwViMo_JhsJimGK8gm01yzo0HuhCpMbJs0Qzb0LIyUpp5mLozro8jBxwcOReEbYVaF9FS1Kj6rvioea3FlEnQ3TxN0KjKEjCL-OOu6A3PML9A5LxseK2zHI59k0z3BIgjL1UHl/s1600/Cloud9-20150913-012.png)

  
  
先執行JavaBuilder後，我們可以看到在bin出現了HelloWorld.class：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH17fMdmOJ-2nZVYBzOSEA_5RWiaTKEjXmqdpwD2UJkKw9DkngbnfTcWPm819scAncdwaFvM9q0V9rGqUT2HyZp0EiZNkVkAETJKKIJ1HEJF6Vef2gXRW5gb07LdlkiC5QvsSO7Nfnnfn1/s640/Cloud9-20150913-013.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH17fMdmOJ-2nZVYBzOSEA_5RWiaTKEjXmqdpwD2UJkKw9DkngbnfTcWPm819scAncdwaFvM9q0V9rGqUT2HyZp0EiZNkVkAETJKKIJ1HEJF6Vef2gXRW5gb07LdlkiC5QvsSO7Nfnnfn1/s1600/Cloud9-20150913-013.png)

  
  
在右下角我們可以選擇改用其他Runner，我們這邊改成用JavaRunner來run檔案：  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNoFYW3VMPYxw_0VhFq-IrHjYy4eaCObhNfKgcIC85oSdkq-8emKhVCuRbTOHap7K78pGUTd3LZPXU7ji_mEs4-w5M-8YKFtlfzne6GNprhsqUAsFFhV1X7zug__4WxfBaxFc8EoGsxVx-/s640/Cloud9-20150913-014.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNoFYW3VMPYxw_0VhFq-IrHjYy4eaCObhNfKgcIC85oSdkq-8emKhVCuRbTOHap7K78pGUTd3LZPXU7ji_mEs4-w5M-8YKFtlfzne6GNprhsqUAsFFhV1X7zug__4WxfBaxFc8EoGsxVx-/s1600/Cloud9-20150913-014.png)

  
  
OK！成功執行！大功告成！之後我們就可以使用這兩個自訂的Runner來進行相關的開發了！  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqnSK9h8DwyKGeOr0ZeLMqsbVd8-B3ogRq2OFfL21-GCkWusatTINwKg4152IizIGynrq3ovxDmUc3h8Cp6DjAQai2tnOFY6QJO701Qpae0VGtf9pZsDTMyC0A6OWGUXPUgeRD5pDL6hUJ/s640/Cloud9-20150913-015.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqnSK9h8DwyKGeOr0ZeLMqsbVd8-B3ogRq2OFfL21-GCkWusatTINwKg4152IizIGynrq3ovxDmUc3h8Cp6DjAQai2tnOFY6QJO701Qpae0VGtf9pZsDTMyC0A6OWGUXPUgeRD5pDL6hUJ/s1600/Cloud9-20150913-015.png)

