---
title: "[Tutorial] How to Fix OpenSSL Heartbleed on the RT-N16 (Tomato by shibby)"
pubDate: 2014-07-03
description: "First, let me explain what OpenSSL Heartbleed is. In OpenVPN's own words: \"A vulnerability in OpenSSL, nicknamed Heartbleed, was published in April 2014.\" OpenVPN uses OpenSSL as its default crypto library, so it's affected too."
tags:
  - "N16"
  - "Information Security"
  - "Tutorial"
  - "OpenVPN"
  - "Tomato"
  - "Heartbleed"
  - "Wireless Router"
  - "Android"
  - "OpenSSL"
locale: en
translationOf: rt-n16tomato-by-shibbyopenssl-heartbleed
aiTranslated: true
---
First, let me explain what OpenSSL Heartbleed is:  
In OpenVPN's own words on their site:  
"A vulnerability in OpenSSL, nicknamed Heartbleed, was published in April 2014 1. OpenVPN uses OpenSSL as its crypto library by default and thus is affected too."  

_Quoted from — OpenVPN's official site_

[_https://community.openvpn.net/openvpn/wiki/heartbleed#OpenSSLvulnerability-Heartbleed_](https://community.openvpn.net/openvpn/wiki/heartbleed#OpenSSLvulnerability-Heartbleed)

In short, anyone using services that rely on OpenSSL runs into this vulnerability, and since OpenVPN also uses OpenSSL as its crypto library, it's affected too.  
  
As for the OpenVPN (Server) side, the affected versions run from 1.0.1 all the way to 1.0.1f;  
on the Android Client side, it wasn't unaffected until version 4.1.2;  
the MAC OS X Client is unaffected;  
on the Windows Client side, only the installers from 2.3-rc2-I001 to 2.3.2-I003 are affected.  
To confirm, go to the C:\\Program Files\\OpenVPN\\bin folder, find libeay32.dll, and inspect its contents—see the two images below.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7aM2Q_4QXvgW9NnO0y7PMuWmkZA24EWilLceBmnDEu8venClYUoN_JbZkR7xlUdZh5czORMhwW4tPSc0jEMRTJYxXgnC7EslL-hrBEesXKjS9slSKA1_c5m2XxxaWFB_biTVpcM1B2nBj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.36.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7aM2Q_4QXvgW9NnO0y7PMuWmkZA24EWilLceBmnDEu8venClYUoN_JbZkR7xlUdZh5czORMhwW4tPSc0jEMRTJYxXgnC7EslL-hrBEesXKjS9slSKA1_c5m2XxxaWFB_biTVpcM1B2nBj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.36.png)

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyc1tvFHyeSVPHyel_UjEGbFW8DxwX6seRks7Rx5PGJFhWt5g0VhP24WDe1eqypn_Qv092FLhAampKlO2yuiFBkkSIQMnlfAaBuq6a_0_C0PbtR5Pl7zmP9dkynRVDSxINZy3Mk0a_Nmiw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.43.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyc1tvFHyeSVPHyel_UjEGbFW8DxwX6seRks7Rx5PGJFhWt5g0VhP24WDe1eqypn_Qv092FLhAampKlO2yuiFBkkSIQMnlfAaBuq6a_0_C0PbtR5Pl7zmP9dkynRVDSxINZy3Mk0a_Nmiw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.00.43.png)

  
  
Windows users who need to update can download from the official site below:  

[http://openvpn.net/index.php/download/community-downloads.html](http://openvpn.net/index.php/download/community-downloads.html)

The above info is also quoted from OpenVPN's official site.  
If you're interested in learning more, search for "CVE-2014-0160" and you'll find plenty of related material.  
  
So when did the Tomato by shibby build fix this issue?  
Let's look at its Changelog:  

[http://tomato.groov.pl/?page\_id=78](http://tomato.groov.pl/?page_id=78)

Search for the keyword "openssl" and you'll find it only switched to 1.0.1g after version 117… so if you're on a build before 117, please update as soon as possible, and also update your keys and passwords.  
For the relevant handling and further understanding, refer to this page:  

[http://devco.re/blog/2014/04/11/openssl-heartbleed-how-to-hack-how-to-protect/](http://devco.re/blog/2014/04/11/openssl-heartbleed-how-to-hack-how-to-protect/)

  
  
OK, now let's get to the main task.  
**Step 1**: Confirm your current version and build type.  
On the left side of the interface there's an ABOUT; click it and it'll display as shown below.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikpL4qwA1uTKmgcPNYqEzCdNmDT4PQ1CHo2nJP4q-oFXr_XgtP6I8WQ2Zm5rToV9y_8AkK2hCEKAy-QSMhTrFHseOUFJ-VWBZO_h6ZElswJU3Cilh4a6hNsp2FSM6CyNb-Z_aB4QjLx8Ea/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.11.44.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikpL4qwA1uTKmgcPNYqEzCdNmDT4PQ1CHo2nJP4q-oFXr_XgtP6I8WQ2Zm5rToV9y_8AkK2hCEKAy-QSMhTrFHseOUFJ-VWBZO_h6ZElswJU3Cilh4a6hNsp2FSM6CyNb-Z_aB4QjLx8Ea/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.11.44.png)

  
As you can see, my version is "**Tomato Firmware 1.28.0000 MIPSR2-116 K26 USB AIO**"; in a moment we'll find its upgraded build to download.  
  
**Step 2**: Back up your configuration.  
Note: backing up the config can speed up later restoration, but because of version differences, directly importing a config file may cause features to stop working. Please test it yourself; if it doesn't work, reset to factory defaults.  
Click Administration on the left interface; inside there's a Configuration option.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmgF8SB1DAW6RDH5nOj0kNkXUZYZGKpZzHNjoqZJ58y3c2ucIIdStcbFPnuiV8z5Rdj-tYOzVpDzT2UkOPpQ5f_FWSYZ8FRdnoo4kdbrelsjitjCU3OBuHRX-mfSNlayvTTs7Ag1LmiLx7/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.14.50.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmgF8SB1DAW6RDH5nOj0kNkXUZYZGKpZzHNjoqZJ58y3c2ucIIdStcbFPnuiV8z5Rdj-tYOzVpDzT2UkOPpQ5f_FWSYZ8FRdnoo4kdbrelsjitjCU3OBuHRX-mfSNlayvTTs7Ag1LmiLx7/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.14.50.png)

  
There's a Backup Configuration section.  
Click Backup, and this backup file will be downloaded to your computer.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6dkGRXB_j8oYWjfnfI8YR4HiQ0-2WZQv6eSvf_JgsKO5nWJGSDILmoBDnPJtXLJ0RzjXMON62UA3TlpdYgpJ7K2s3u8W0IQMSZxhgpinLgaunV0qGIuudUGh_E9xo5AOmAo7Bq3n0WSAi/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.15.16.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6dkGRXB_j8oYWjfnfI8YR4HiQ0-2WZQv6eSvf_JgsKO5nWJGSDILmoBDnPJtXLJ0RzjXMON62UA3TlpdYgpJ7K2s3u8W0IQMSZxhgpinLgaunV0qGIuudUGh_E9xo5AOmAo7Bq3n0WSAi/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.15.16.png)

  
It's also recommended to back up your OpenVPN data, such as CERT and KEY, just in case something goes wrong…  
  
**Step 3**: Download your firmware.  
Go to the Tomato by shibby official site to download:  

[http://tomato.groov.pl/?page\_id=164](http://tomato.groov.pl/?page_id=164)

In my case, since I have an ASUS RT-N16, I clicked into the K26 category,  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6LN7nJMcZ8axOXDiLKdaVcTa-1L6kXY_cKo7Ynibv1muhLceKudatVKju4ma3_wRGBZweVCXxlkn2-4y_kl98BzQJKyCEgPJoVYGkCYuB2ebnqEiuskiUQqXkAAs0XKhp8N9Ypp9u1eFm/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.03.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6LN7nJMcZ8axOXDiLKdaVcTa-1L6kXY_cKo7Ynibv1muhLceKudatVKju4ma3_wRGBZweVCXxlkn2-4y_kl98BzQJKyCEgPJoVYGkCYuB2ebnqEiuskiUQqXkAAs0XKhp8N9Ypp9u1eFm/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.03.png)

  
Found the latest version 120, then found the build I wanted, **tomato-K26USB-1.28.RT-MIPSR1-120-AIO**Y  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZI3x53td32iv7ja0iivhjWd0SHpcND4x2svneyorCwOrgxpY69ipqW8byfzYK5sbz4CEmSh4KKku5cmPdJ7edVf-HWNxV1AK8gww3vJ7ly2AEjAOZZJoDHvsH2wh0Sq3uqQdV006nS8vj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.26.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZI3x53td32iv7ja0iivhjWd0SHpcND4x2svneyorCwOrgxpY69ipqW8byfzYK5sbz4CEmSh4KKku5cmPdJ7edVf-HWNxV1AK8gww3vJ7ly2AEjAOZZJoDHvsH2wh0Sq3uqQdV006nS8vj/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.23.26.png)

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjD-C3vhzFjy7dKou-L0bg-_GA5tgkeEPdGBjSGwtXeJ5DMNi2iE961Vq3yv8O_mwW954sb9BD_Jk_jtcOvdX-sXVO3IUM_vaqxcOI7g5lK_PR8OyivKNvu3WDEGU_cOujFUbcbR9dHE5xr/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.24.58.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjD-C3vhzFjy7dKou-L0bg-_GA5tgkeEPdGBjSGwtXeJ5DMNi2iE961Vq3yv8O_mwW954sb9BD_Jk_jtcOvdX-sXVO3IUM_vaqxcOI7g5lK_PR8OyivKNvu3WDEGU_cOujFUbcbR9dHE5xr/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+15.24.58.png)

  
  
**Step 4**: Update the firmware.  
Under Administration there's an Upgrade option.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeFhdNxdZfygmkYeyX8NtRicpxmpQbGCrDkFI2Y_uqT4nGvnb-Pwgkt7lQ56eT1sb5JDMsKC7PK1GTCAs87G75WDdXOd82wSb72-OW1XNt5KeBeJepZ3OUiUVYX0cssOhKlykh2_L6UkhG/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.35.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeFhdNxdZfygmkYeyX8NtRicpxmpQbGCrDkFI2Y_uqT4nGvnb-Pwgkt7lQ56eT1sb5JDMsKC7PK1GTCAs87G75WDdXOd82wSb72-OW1XNt5KeBeJepZ3OUiUVYX0cssOhKlykh2_L6UkhG/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.35.png)

  
If you previously enabled JFFS, remember to turn that feature off first here.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSeGGA0EIKS5CY2RGfXEzosZ9A1Fs_tf5pX7Vg7TGNr24GwNwt3nXsj8Fmr432xeufQeidpM13rfnmzJ3q3_21QGx7F_9fVYXtsg1zcO-rDasvreT4IPbTU33vo8V2NSXv3RT5vTdEKhyphenhyphenS/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.43.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSeGGA0EIKS5CY2RGfXEzosZ9A1Fs_tf5pX7Vg7TGNr24GwNwt3nXsj8Fmr432xeufQeidpM13rfnmzJ3q3_21QGx7F_9fVYXtsg1zcO-rDasvreT4IPbTU33vo8V2NSXv3RT5vTdEKhyphenhyphenS/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.22.43.png)

  
On the JFFS tab, **uncheck** ENABLE, then click SAVE.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVu0Pio52kQIpchMH81o7AlqpYfMvUhn0V8K82gj9cN1qNfKTMNofOGtpyt1y2lrbWWyEw9k7lZB4064r8aBV5_aZxdJnKcM0YdYC5YSPgDv3302WB1CD6puooarq0VILr8vt12XCtTZgC/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.23.03.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVu0Pio52kQIpchMH81o7AlqpYfMvUhn0V8K82gj9cN1qNfKTMNofOGtpyt1y2lrbWWyEw9k7lZB4064r8aBV5_aZxdJnKcM0YdYC5YSPgDv3302WB1CD6puooarq0VILr8vt12XCtTZgC/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.23.03.png)

  
Go back into Upgrade and you can now update. Click "Choose File," locate the update file you just downloaded, and for "After flashing, erase all data in NVRAM memory," this option is optional—I personally always check it to avoid compatibility issues later. Finally, click "Upgrade."  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYeYakJHqOc2HeF50wS-6oLQaXYDBw65AxUH0Eee_II0BibVJcdvVMGKMS98e8Z4wN841AVnpHLOamCjwmHrZbliwXF1ezuBMOWEseFdGi2pn_JVuAwYWricPxGJYjOaSVR89eC5b1EzdP/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.13.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYeYakJHqOc2HeF50wS-6oLQaXYDBw65AxUH0Eee_II0BibVJcdvVMGKMS98e8Z4wN841AVnpHLOamCjwmHrZbliwXF1ezuBMOWEseFdGi2pn_JVuAwYWricPxGJYjOaSVR89eC5b1EzdP/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.13.png)

  
The update begins—just wait~  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimKMpcY-G8gYoq6UCPqezN4Vjkp_lhyphenhyphenBBw0xZ46uzSipgsftZjWv35dyBAIi4RTH2j8uPZdGxhJIpK-q8gKh1m6xuWSRv7spd0BqRTpPOvm2ZlJaGCMRALlz_Eo8QvUfRqh7iY95VI_Kmn/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.29.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimKMpcY-G8gYoq6UCPqezN4Vjkp_lhyphenhyphenBBw0xZ46uzSipgsftZjWv35dyBAIi4RTH2j8uPZdGxhJIpK-q8gKh1m6xuWSRv7spd0BqRTpPOvm2ZlJaGCMRALlz_Eo8QvUfRqh7iY95VI_Kmn/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.24.29.png)

  
The update is complete; click Continue.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgufO_o3k-HMjnHbhy7pcIAV5CdGF1KNanlr_bXzs5tOt2cYOebi3YqpngJyRAU11Zt7RaVUmcxF6JYi6ktwUoexJeLFhSi39-OWp_xTCnG0miAES38YrXlsvQ1NAUZmcnuV9IFJIGbhZDw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.29.28.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgufO_o3k-HMjnHbhy7pcIAV5CdGF1KNanlr_bXzs5tOt2cYOebi3YqpngJyRAU11Zt7RaVUmcxF6JYi6ktwUoexJeLFhSi39-OWp_xTCnG0miAES38YrXlsvQ1NAUZmcnuV9IFJIGbhZDw/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.29.28.png)

  
After Continue, all settings basically revert to factory defaults. Please set your NIC to 192.168.1.10/24, the GATEWAY to 192.168.1.1, then open a browser to configure. The connection address is http://192.168.1.1, with both username and password being admin.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBGGNK1fM6U_RfzWbP-EUuf1Lg7GWOm5CAQWE8PZLv6POahCO7IfxkGvWWsaBzhc5kBm9XWF_Jb5pOIYzrhKcR3ajv19m7n-uueiWssWolUs_A-K-aHMCSAoolELPAjSeKx2FjZAzAYvkM/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.34.10.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBGGNK1fM6U_RfzWbP-EUuf1Lg7GWOm5CAQWE8PZLv6POahCO7IfxkGvWWsaBzhc5kBm9XWF_Jb5pOIYzrhKcR3ajv19m7n-uueiWssWolUs_A-K-aHMCSAoolELPAjSeKx2FjZAzAYvkM/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.34.10.png)

  
Restore the configuration file you backed up earlier.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEW77B7JX6csetbgOvR1D76eMcD_LKi8EQGDpubNJJQGm9lsT1kQI7kWEz4fXo6JJi5pG_XGTv1elPczynLtRSfThS6LJ5Lg4XBPT1L0NsBJIsZfl4Xlv9bQh2031i28_Ow9ck8LkG8wpt/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.35.05.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEW77B7JX6csetbgOvR1D76eMcD_LKi8EQGDpubNJJQGm9lsT1kQI7kWEz4fXo6JJi5pG_XGTv1elPczynLtRSfThS6LJ5Lg4XBPT1L0NsBJIsZfl4Xlv9bQh2031i28_Ow9ck8LkG8wpt/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.35.05.png)

  
Update complete.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyOtMXhOKOrOZitAuKU5UmCcFxohLZ_CGb7lxPpGpZGkCBRnSZanYmjWbwoWTQNhyphenhyphenZxv9Ib28jgtLNky08VOFOZIK-Z9GYHMjOArb2JvCBJRId4e9L9T07LWywXJ87h5DpNDBSwKHzBRRY/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.41.10.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyOtMXhOKOrOZitAuKU5UmCcFxohLZ_CGb7lxPpGpZGkCBRnSZanYmjWbwoWTQNhyphenhyphenZxv9Ib28jgtLNky08VOFOZIK-Z9GYHMjOArb2JvCBJRId4e9L9T07LWywXJ87h5DpNDBSwKHzBRRY/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-04+00.41.10.png)

  
  
**Step 5**: Change the CERT and KEY.  
For the re-creation process, refer to the page below:  

[http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1](http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1)

The finished CERT and KEY files are shown below; one of them, Client1.ovpn, is used on the client side, which we'll cover shortly.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiu3HLHuuQRxA76BCQ5H13db_-zl8zf9OY-86ncXZwUqAfcfE74mK8eIr1McGzPUvJFXvMy0srEbFdl_jkrpDYgOCZkj1VOVD-68sIx863WWUbtlx8WKHOERG-IpRwa_WkFF2jPqGMNC65U/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.25.59.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiu3HLHuuQRxA76BCQ5H13db_-zl8zf9OY-86ncXZwUqAfcfE74mK8eIr1McGzPUvJFXvMy0srEbFdl_jkrpDYgOCZkj1VOVD-68sIx863WWUbtlx8WKHOERG-IpRwa_WkFF2jPqGMNC65U/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.25.59.png)

  
**Step 6**: Change the CLIENT-side settings.  
For the WINDOWS part, you can still refer to:  

[http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1](http://www.mobile01.com/topicdetail.php?f=110&t=1987934&p=1)

Here I'll add the ANDROID part~  
1. Go to Google Play and download **OpenVPN Connect**.  
Reference:  

[https://play.google.com/store/apps/details?id=net.openvpn.openvpn](https://play.google.com/store/apps/details?id=net.openvpn.openvpn)

2. Edit the Client1.ovpn file.  
Personally I'd recommend using TUN mode even as an individual—it's more secure, and basically any firewall can be bypassed,  
unlike TAP, which some firewalls can't get past. Also, using TLS encryption is more secure;  
with something like this Heartbleed case, using TLS has fewer leakage concerns.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfwZWTgoQsxLBitHgPuWYl0GD3XGO688fKY9yXAuJZrSnmykNIipMjBk5azbbC1KxyUBNwoHfw3wmkTZYLXTsGamB4KckyH1XSC2Gbvqe2j_7yxqkVgW4WfaDR79CcVAPCDNIk4tr9RWgW/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.27.53.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfwZWTgoQsxLBitHgPuWYl0GD3XGO688fKY9yXAuJZrSnmykNIipMjBk5azbbC1KxyUBNwoHfw3wmkTZYLXTsGamB4KckyH1XSC2Gbvqe2j_7yxqkVgW4WfaDR79CcVAPCDNIk4tr9RWgW/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E6%2588%25AA%25E5%259C%2596+2014-07-03+23.27.53.png)

  
If you don't have this file, you can use "Notepad" to type in the text I've copied below, save it as a new file, and change the filename to XXX(anything).ovpn.  
  
\==========File contents below=============  
client  
\# Use a TUN device (routing mode)  
dev tun  
\# The VPN server's IP address or domain name  
remote xxx.xxx.xxx.xxx  
#Change the xxx.xxx.xxx.xxx above to your public static IP, or use a dynamic DNS service like NO-IP  
port 1194  
#You can change the PORT yourself  
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
\# If using TAP mode, remove redirect-gateway  
redirect-gateway  
\==========File contents above=============  
  
Lines starting with # are commented out—that is, ignored—so you can add your own little notes there. Please also fill in your own relevant info, such as the IP address or TUN/TAP setting.  
3. Put the files onto your Android phone.  
First place the ca.crt, client1.crt, client1.key, Client1.ovpn, and client1.pem you just generated into the same folder, then transfer them to the phone via Dropbox or directly. Remember where you store them.  
(For SAMSUNG, the internal storage is at /storage/sdcard0; an external SD card is at /storage/extSdCard.)  
4. Open OpenVPN Connect.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7UHioHfXlyTY256I5b2xOeBHQWmC69fOlqi4qarroubkCgGP12bxfI_K5TsUpVSC6SMeXJmm4POuHjQZU1G1HHR0Rw2vqeBx5pJy8Nw0hyphenhyphenypGFLoP4sBOvOOj314A2KtFgMuEXXWPN4jW/s1600/Screenshot_2014-07-03-23-36-52.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7UHioHfXlyTY256I5b2xOeBHQWmC69fOlqi4qarroubkCgGP12bxfI_K5TsUpVSC6SMeXJmm4POuHjQZU1G1HHR0Rw2vqeBx5pJy8Nw0hyphenhyphenypGFLoP4sBOvOOj314A2KtFgMuEXXWPN4jW/s1600/Screenshot_2014-07-03-23-36-52.png)

  
Press the menu key to bring up the options.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrCy_A3PgVKoVe1QBIroRwUYYfClBAx3OE_DK89TR0t9jOCD3P91YEmEqpHJQQvHqPYM3tkuqhVX8vTzjGrqrn8t0zsbCfDT4xNkWo6lRubAgNn5_opwRItOHcf1sHU_DSH48Co-epWJyo/s1600/Screenshot_2014-07-03-23-37-55.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrCy_A3PgVKoVe1QBIroRwUYYfClBAx3OE_DK89TR0t9jOCD3P91YEmEqpHJQQvHqPYM3tkuqhVX8vTzjGrqrn8t0zsbCfDT4xNkWo6lRubAgNn5_opwRItOHcf1sHU_DSH48Co-epWJyo/s1600/Screenshot_2014-07-03-23-37-55.png)

  
Tap Import.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZ-ibzCNYPoJFlu3m-Vig9uTg-IwplBKIZowWr-Pc7taMe8vxwJ-V0OlLc_s21UlFpB9rFzUL0LZoi72VQUrT9NIhEZTrKepqn1pMnilpoop2RxRd1fmlZx0MWtx-C3j-9wI8_jRHVmTbw/s1600/Screenshot_2014-07-03-23-38-22.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZ-ibzCNYPoJFlu3m-Vig9uTg-IwplBKIZowWr-Pc7taMe8vxwJ-V0OlLc_s21UlFpB9rFzUL0LZoi72VQUrT9NIhEZTrKepqn1pMnilpoop2RxRd1fmlZx0MWtx-C3j-9wI8_jRHVmTbw/s1600/Screenshot_2014-07-03-23-38-22.png)

  
Select Import Profile from SD card.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqT1v8T5bmH8-ULNjIsesrTgfb9Ja0cLRBATd9ZuFtBBROJU32w6nCYqUdF1g5l4hyphenhyphenZmiNFYIP6njywhnKHsXb0ZcmN2SCioUVItQ5ycv83jnvzztw5rjJnTIrLYCiIA5u54vVD_zM7MUf/s1600/Screenshot_2014-07-03-23-43-40.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqT1v8T5bmH8-ULNjIsesrTgfb9Ja0cLRBATd9ZuFtBBROJU32w6nCYqUdF1g5l4hyphenhyphenZmiNFYIP6njywhnKHsXb0ZcmN2SCioUVItQ5ycv83jnvzztw5rjJnTIrLYCiIA5u54vVD_zM7MUf/s1600/Screenshot_2014-07-03-23-43-40.png)

  
Once imported, you can tap Connect to connect.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitOMNWfonVxdwDATRVCUxqetqw-iYe4lg1TUhBZGXE9Gdz3xwU_rqNofrG-SYXidOGozeAa1_dnsvwHBsOwokm1fqxYhP6jZaa7DQl4ApCFn8N3G8kuYl2HXe5NXOuYRrHtBzl0dy5KaXK/s1600/Screenshot_2014-07-03-23-44-25.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitOMNWfonVxdwDATRVCUxqetqw-iYe4lg1TUhBZGXE9Gdz3xwU_rqNofrG-SYXidOGozeAa1_dnsvwHBsOwokm1fqxYhP6jZaa7DQl4ApCFn8N3G8kuYl2HXe5NXOuYRrHtBzl0dy5KaXK/s1600/Screenshot_2014-07-03-23-44-25.png)

  
Choose to trust this program and press Confirm.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhi30zZFIVlPHPtQypw9qEluVgbqIT5pL18q964kZRiVzAaPDz_PB3J7ZvOFWaXFgt7ZL1MEIXe_whcs62zsplEYstW3PTEKMgD3QMNvPgpGzPD5Coi27K72h7Mb-g-_PmGZ-ihA9Qql6Dw/s1600/Screenshot_2014-07-03-23-45-31.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhi30zZFIVlPHPtQypw9qEluVgbqIT5pL18q964kZRiVzAaPDz_PB3J7ZvOFWaXFgt7ZL1MEIXe_whcs62zsplEYstW3PTEKMgD3QMNvPgpGzPD5Coi27K72h7Mb-g-_PmGZ-ihA9Qql6Dw/s1600/Screenshot_2014-07-03-23-45-31.png)

  
Connection successful!! (Remember to test on an external network or over 3G.)  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhf2-ZKM6HpiPtnVWPusIxrbCxg9nUDpTohXmHzNSK8gJqqua721G8DUPH4rvfrFmk5QggrpEHQzJfrnLUThdbhv3kIDog9bAYhRyYtuxkbGTljkuhGTAJV_yGwn5PrHsAtNWLkvFkHVhgX/s1600/Screenshot_2014-07-03-23-46-43.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhf2-ZKM6HpiPtnVWPusIxrbCxg9nUDpTohXmHzNSK8gJqqua721G8DUPH4rvfrFmk5QggrpEHQzJfrnLUThdbhv3kIDog9bAYhRyYtuxkbGTljkuhGTAJV_yGwn5PrHsAtNWLkvFkHVhgX/s1600/Screenshot_2014-07-03-23-46-43.png)

  
  
**Final step**: Check whether the OpenSSL Heartbleed issue still exists.  
You can use the tool at the URL below to check:  

[http://www.ithome.com.tw/news/86882](http://www.ithome.com.tw/news/86882)

  
Alright, all done!!  
If you have any questions, feel free to discuss with me!
