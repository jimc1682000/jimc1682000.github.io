---
title: "Exporting and Importing OVA in VirtualBox"
pubDate: 2015-09-13
description: "It's actually quite simple—here I'm just walking you through it once."
tags: ["Virtualbox", "OVA"]
locale: en
translationOf: virtualbox-ova
aiTranslated: true
---
It's actually quite simple—here I'm just walking you through it once.  
  
Export steps:  
  
1. First, you must shut down the machine before you can export it properly.  
  
  
2. Choose "Export Appliance"  

[![](/blog/img/OVA-20150913-001.webp)](/blog/img/OVA-20150913-001.webp)

  
3. Choose the machine you want to export  

[![](/blog/img/OVA-20150913-002.webp)](/blog/img/OVA-20150913-002.webp)

  
4. Export as OVF/OVA. OVF has several versions; here we'll just choose OVF 1.0. You can pick the export location yourself, as shown.  

[![](/blog/img/OVA-20150913-003.webp)](/blog/img/OVA-20150913-003.webp)

  
5. Confirm the relevant information  

[![](/blog/img/OVA-20150913-004.webp)](/blog/img/OVA-20150913-004.webp)

  
Import steps:  
1. Choose "Import Appliance"  

[![](/blog/img/OVA-20150913-001.webp)](/blog/img/OVA-20150913-001.webp)

  
2. Locate the file and import it  

[![](/blog/img/OVA-20150913-006.webp)](/blog/img/OVA-20150913-006.webp)

  
3. Confirm the import information. Here you can choose to reinitialize the MAC address of all network cards, to avoid multiple VMs having the same MAC address. Decide for yourself whether to check it; here we leave it unchecked, since there's only one VM.  

[![](/blog/img/OVA-20150913-007.webp)](/blog/img/OVA-20150913-007.webp)

  
All done!!
