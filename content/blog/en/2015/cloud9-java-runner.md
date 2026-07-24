---
title: "Setting Up a Cloud9 Java Runner"
pubDate: 2015-09-13
description: "Today I'll walk you through how to set up a Java Runner on Cloud9. You can also refer directly to the Cloud9 and Stack Overflow tutorials. First, let's create a new workspace."
tags: ["Java", "Introduction", "Jimmy's City", "Cloud IDE", "Cloud9", "HelloWorld"]
locale: en
translationOf: cloud9-java-runner
aiTranslated: true
---
Today I'll walk you through how to set up a Java Runner on Cloud9. You can also refer directly to the Cloud9 and Stack Overflow tutorials: [https://docs.c9.io/v1.0/docs/custom-runners](https://docs.c9.io/v1.0/docs/custom-runners)  
[http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java](http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java)  
  
  
  
First, let's create a new workspace. Feel free to name it whatever you like. Here I chose the "custom" option, since we only want to do a Java example and don't really need anything else, as shown.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjctQL-EAuTYelrqMiM6mXMeNs4ar0090vLrE3e_OHf6CUf45jAyIzz_8AvFm8Fai8yeQGAn3dDyDrikqoVpvpAWc3HyFJXqxiSsS5qU0laVwfknhbivdtJFvEmd-qmhjHh0f8EjY2ydFdy/s640/Cloud9-20150913-001.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjctQL-EAuTYelrqMiM6mXMeNs4ar0090vLrE3e_OHf6CUf45jAyIzz_8AvFm8Fai8yeQGAn3dDyDrikqoVpvpAWc3HyFJXqxiSsS5qU0laVwfknhbivdtJFvEmd-qmhjHh0f8EjY2ydFdy/s1600/Cloud9-20150913-001.png)

  
  
Confirm that the Java environment is actually there:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFT9mLlkVwc-uMHq4agYXYC_ebfAWBVprgPGwgcvqN8IUXCoTSO7bq8M5EZBcrWVlEZhzpHYM4RMPbEA5gN14DnCW9cpeiIijLJ4IcfMh4IKDnIuAfzBBJIkkD1FwDyVNpbh5_HLtylASB/s640/Cloud9-20150913-002.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFT9mLlkVwc-uMHq4agYXYC_ebfAWBVprgPGwgcvqN8IUXCoTSO7bq8M5EZBcrWVlEZhzpHYM4RMPbEA5gN14DnCW9cpeiIijLJ4IcfMh4IKDnIuAfzBBJIkkD1FwDyVNpbh5_HLtylASB/s1600/Cloud9-20150913-002.png)

  
  
Create a src folder and a bin folder:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl5xP7ZxshmXQhLsSYBhgsbpFRL6etAErNTIrm-nCBKjJuE3kLdWSqRy5KFz11QZAp5mYBG8SQefIkjou557qLCLEtlASvEkK6bw9RxC217sO3eOhpKlPUDUz6jKHItGI3LmcOnuKw-cTG/s640/Cloud9-20150913-003.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl5xP7ZxshmXQhLsSYBhgsbpFRL6etAErNTIrm-nCBKjJuE3kLdWSqRy5KFz11QZAp5mYBG8SQefIkjou557qLCLEtlASvEkK6bw9RxC217sO3eOhpKlPUDUz6jKHItGI3LmcOnuKw-cTG/s1600/Cloud9-20150913-003.png)

  
  
Create a new HelloWorld.java file and enter the relevant code:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRqvUQtLPW8QKag8CNyTEmrE7fbPCoFRjbShU9dJnud2SwR5hnkGuIcRfe5lQU2sjXbTxCF2KVZR1KJGqYATnaVBYL5MUqo89eahHarnHNn8poWDJcsFI3bliQr3M_NLbpDEkTgrNwk2Pc/s640/Cloud9-20150913-004.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRqvUQtLPW8QKag8CNyTEmrE7fbPCoFRjbShU9dJnud2SwR5hnkGuIcRfe5lQU2sjXbTxCF2KVZR1KJGqYATnaVBYL5MUqo89eahHarnHNn8poWDJcsFI3bliQr3M_NLbpDEkTgrNwk2Pc/s1600/Cloud9-20150913-004.png)

  
  
Run javac and java quickly to check that it works:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXTeWF-v4cWFUC8jxKZ_-L6Etakni_5GylJrxd_0_6Yqfy9fTPc3Kk1vVsPvaz1mZoc-fl5xO-bEsghNry11uxxO8M3uV-1qgWPzTrqXD0w_0XozNCBu19c361sse0L3lwHlcbNgYIO7We/s640/Cloud9-20150913-005.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXTeWF-v4cWFUC8jxKZ_-L6Etakni_5GylJrxd_0_6Yqfy9fTPc3Kk1vVsPvaz1mZoc-fl5xO-bEsghNry11uxxO8M3uV-1qgWPzTrqXD0w_0XozNCBu19c361sse0L3lwHlcbNgYIO7We/s1600/Cloud9-20150913-005.png)

  
  
If it runs fine, delete HelloWorld.class:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6Xmc81t9Uw0nFnEv1-qqegsmpKLTwhf1AmZAwezvKJwUgPzsk118AjzzrI2kxaw9_7FzkwIQKX4c_MyYuPu6ni3L09KI52sO4MplzMW4_1MMsGpkMbE9HCFye8Go-NKnpB7BCd_IHX9Zz/s640/Cloud9-20150913-006.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6Xmc81t9Uw0nFnEv1-qqegsmpKLTwhf1AmZAwezvKJwUgPzsk118AjzzrI2kxaw9_7FzkwIQKX4c_MyYuPu6ni3L09KI52sO4MplzMW4_1MMsGpkMbE9HCFye8Go-NKnpB7BCd_IHX9Zz/s1600/Cloud9-20150913-006.png)

  
  
Create a new Runner (please ignore the JavaBuilder and JavaRunner that already appear—the original environment doesn't have them):  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfpBUvwlU3X36oZzBMweUH1JEyxLy3BYyeTNc1IVtYGqPgAhkAYKW_iWywiDDfl3dCzIV2cNojul6J_ESH04CmT9cniY8pZeSBIDJ5o54qmDCBAaHSSn42ZH3VWiptB3Php5rpjDioOFH6/s640/Cloud9-20150913-007.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfpBUvwlU3X36oZzBMweUH1JEyxLy3BYyeTNc1IVtYGqPgAhkAYKW_iWywiDDfl3dCzIV2cNojul6J_ESH04CmT9cniY8pZeSBIDJ5o54qmDCBAaHSSn42ZH3VWiptB3Php5rpjDioOFH6/s1600/Cloud9-20150913-007.png)

  
  
Copy the JavaBuilder from the Cloud9 tutorial document and modify the contents of "env":  
"OUT\_DIR": "$project\_path\\\\bin"  
"SRC\_DIR": "src"  
where OUT\_DIR is where your compiled Java class files go,  
and SRC\_DIR is where your source code lives.  
See the image for reference:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZ-sM5E_gZAG8D9PxFZnKX-SNqKU5iLaHVHRjqurzXzURhK4brIJwN2oHC3F80Y7paVXEzeLunMkhTTcTf1FynuqKpPNDAVef2fdqP_7_OfVolWqn7KYsUlQUaeX62ZP9pjSOH2QnMAugu/s640/Cloud9-20150913-008.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZ-sM5E_gZAG8D9PxFZnKX-SNqKU5iLaHVHRjqurzXzURhK4brIJwN2oHC3F80Y7paVXEzeLunMkhTTcTf1FynuqKpPNDAVef2fdqP_7_OfVolWqn7KYsUlQUaeX62ZP9pjSOH2QnMAugu/s1600/Cloud9-20150913-008.png)

  
  
Save this Runner. Here I named it JavaBuilder.run:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHNb4pijrCwQTvSTynsWWyfijtm1lrLcwG2mXmkvL8gcZgulaEyjgnN0D1X0i_mUGv9HoBpweDNNgb3MlD8SnCF9cg3HtGWz8mfGlmwL6F_KoPXH2DPkNdewIh_UUqNHCx9mk_jaIxT8nv/s640/Cloud9-20150913-009.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHNb4pijrCwQTvSTynsWWyfijtm1lrLcwG2mXmkvL8gcZgulaEyjgnN0D1X0i_mUGv9HoBpweDNNgb3MlD8SnCF9cg3HtGWz8mfGlmwL6F_KoPXH2DPkNdewIh_UUqNHCx9mk_jaIxT8nv/s1600/Cloud9-20150913-009.png)

  
  
Next, copy the JavaRunner from the Cloud9 tutorial document and modify the following. In  
"echo $file | sed -r 's/.\*\\\\/src\\\\///g' | sed -r 's/\\\\.java//g'  | sed -r 's/\\\\//\\\\./g' | xargs java", the part  
"'s/.\*\\\\/src\\\\///g'"—the /src is the location of your SRC\_DIR directory.  
"OUT\_DIR": "$project\_path\\\\bin" is where the built files end up, as shown.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwpJh3ndqQ3ulYJgCbBR4Rr2eRaIYn0bIoNdKEzoYiqrn6NR5TkLYODmE7WzGD9GFbuBAIJ8plkUYxcUyqs3yEPSFFDbi3y6KKIULnINug0dFMNk-enWPQc-2kzLnPsURj1-1abwyBg3gG/s640/Cloud9-20150913-010.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwpJh3ndqQ3ulYJgCbBR4Rr2eRaIYn0bIoNdKEzoYiqrn6NR5TkLYODmE7WzGD9GFbuBAIJ8plkUYxcUyqs3yEPSFFDbi3y6KKIULnINug0dFMNk-enWPQc-2kzLnPsURj1-1abwyBg3gG/s1600/Cloud9-20150913-010.png)

  
  
Save this Runner. Here I named it JavaRunner.run:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6E0XO5v31NcAc_Z_rdlVfKJqX4sbjBt0bPIm7b0YS6vB2FwMiwWkpLrUXb6i7g7TfXQ_r-hcShf3mv8i0bV-UGpCSrTKU5I2ef7cOZOugOc-53jke9tGbgBjH_3GDRnsuaWkfL_y6mQtc/s640/Cloud9-20150913-011.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6E0XO5v31NcAc_Z_rdlVfKJqX4sbjBt0bPIm7b0YS6vB2FwMiwWkpLrUXb6i7g7TfXQ_r-hcShf3mv8i0bV-UGpCSrTKU5I2ef7cOZOugOc-53jke9tGbgBjH_3GDRnsuaWkfL_y6mQtc/s1600/Cloud9-20150913-011.png)

  
  
Once both files are closed, we can see two custom runners have been added under the runner section:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgytCQ0HgcwViMo_JhsJimGK8gm01yzo0HuhCpMbJs0Qzb0LIyUpp5mLozro8jBxwcOReEbYVaF9FS1Kj6rvioea3FlEnQ3TxN0KjKEjCL-OOu6A3PML9A5LxseK2zHI59k0z3BIgjL1UHl/s640/Cloud9-20150913-012.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgytCQ0HgcwViMo_JhsJimGK8gm01yzo0HuhCpMbJs0Qzb0LIyUpp5mLozro8jBxwcOReEbYVaF9FS1Kj6rvioea3FlEnQ3TxN0KjKEjCL-OOu6A3PML9A5LxseK2zHI59k0z3BIgjL1UHl/s1600/Cloud9-20150913-012.png)

  
  
Run JavaBuilder first, and we can see HelloWorld.class appear in bin:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH17fMdmOJ-2nZVYBzOSEA_5RWiaTKEjXmqdpwD2UJkKw9DkngbnfTcWPm819scAncdwaFvM9q0V9rGqUT2HyZp0EiZNkVkAETJKKIJ1HEJF6Vef2gXRW5gb07LdlkiC5QvsSO7Nfnnfn1/s640/Cloud9-20150913-013.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH17fMdmOJ-2nZVYBzOSEA_5RWiaTKEjXmqdpwD2UJkKw9DkngbnfTcWPm819scAncdwaFvM9q0V9rGqUT2HyZp0EiZNkVkAETJKKIJ1HEJF6Vef2gXRW5gb07LdlkiC5QvsSO7Nfnnfn1/s1600/Cloud9-20150913-013.png)

  
  
At the bottom right we can switch to a different Runner. Here we switch to JavaRunner to run the file:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNoFYW3VMPYxw_0VhFq-IrHjYy4eaCObhNfKgcIC85oSdkq-8emKhVCuRbTOHap7K78pGUTd3LZPXU7ji_mEs4-w5M-8YKFtlfzne6GNprhsqUAsFFhV1X7zug__4WxfBaxFc8EoGsxVx-/s640/Cloud9-20150913-014.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNoFYW3VMPYxw_0VhFq-IrHjYy4eaCObhNfKgcIC85oSdkq-8emKhVCuRbTOHap7K78pGUTd3LZPXU7ji_mEs4-w5M-8YKFtlfzne6GNprhsqUAsFFhV1X7zug__4WxfBaxFc8EoGsxVx-/s1600/Cloud9-20150913-014.png)

  
  
OK! It runs successfully! All done! From now on we can use these two custom Runners for our development!  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqnSK9h8DwyKGeOr0ZeLMqsbVd8-B3ogRq2OFfL21-GCkWusatTINwKg4152IizIGynrq3ovxDmUc3h8Cp6DjAQai2tnOFY6QJO701Qpae0VGtf9pZsDTMyC0A6OWGUXPUgeRD5pDL6hUJ/s640/Cloud9-20150913-015.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqnSK9h8DwyKGeOr0ZeLMqsbVd8-B3ogRq2OFfL21-GCkWusatTINwKg4152IizIGynrq3ovxDmUc3h8Cp6DjAQai2tnOFY6QJO701Qpae0VGtf9pZsDTMyC0A6OWGUXPUgeRD5pDL6hUJ/s1600/Cloud9-20150913-015.png)
