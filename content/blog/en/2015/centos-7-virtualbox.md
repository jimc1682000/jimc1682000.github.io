---
title: "Notes on Network Configuration in VirtualBox After a CentOS 7 Minimal Install"
pubDate: 2015-09-13
description: "As the title says. You can also refer to these blog posts for the configuration. First, a quick note: if all you want is for the VM to reach the external network without connecting to the physical host, VirtualBox's default NAT already does the job."
tags: ["CentOS", "Virtualbox", "VM", "IP"]
locale: en
translationOf: centos-7-virtualbox
aiTranslated: true
---
As the title says. You can also refer to these blog posts for the configuration:  
[http://www.unixarena.com/2015/04/rhel-7-network-management-nmcli-or-nmtui.html](http://blog.miniasp.com/post/2012/07/30/CentOS-63-Minimal-Installation-and-Configuration-Notes.aspx)  
[http://www.arthurtoday.com/2013/07/ubuntu-guest-enables-nat-and-hostonly-adapter.html](http://www.arthurtoday.com/2013/07/ubuntu-guest-enables-nat-and-hostonly-adapter.html)  
  
First, a quick note on VirtualBox: if all you want is for the VM to reach the external network without connecting to the physical host, the default NAT already does the job;  
if you only want the VM to reach the physical host but not the outside network, you can use the "Host-only" adapter.  
And in general, if you want both the VM and the physical machine to be on the same subnet, you should choose the "Bridged Adapter." Then, if there's a DHCP server (typically your wireless access point or router), they can be on the same subnet: you can talk to your VM, and it can also reach the external network, just like your physical host.  
  
So if you want the VM and the physical machine to be able to reach each other, the "Bridged Adapter" is one option; another is to give the VM two network adapters—one NAT and one "Host-only" adapter. Once both are set up, the VM can reach both inside and outside, though strictly speaking it isn't on the same LAN as the physical host.  
  
The example below uses the second approach—NAT + Host-only adapter. I'll first show how to set up a VM in VirtualBox, then how to configure things in CentOS 7. So let's get started!  
  
  
## 1. VirtualBox configuration

First install VirtualBox (obviously). Click "New," choose Linux as the type and RedHat 64bit as the version. Here I named it CentOS7, as shown. Once set, click Next.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirn5t6Uauj9MeUUkZsTyuAlmuK1aTpeuLmXbKrzF9EvEq7YrSniBtL7UuDBOgIo-rZi0eaqyiOqThWk2VyrpDRgvHzLlAoAE1nuRjS5NRbEaGYD48Gmgr-kZyR7uB-o17Tkdul6V1pil6N/s400/Virtualbox-20150913-001.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirn5t6Uauj9MeUUkZsTyuAlmuK1aTpeuLmXbKrzF9EvEq7YrSniBtL7UuDBOgIo-rZi0eaqyiOqThWk2VyrpDRgvHzLlAoAE1nuRjS5NRbEaGYD48Gmgr-kZyR7uB-o17Tkdul6V1pil6N/s1600/Virtualbox-20150913-001.png)

  
Set the memory size. Here we set it to 1024MB, as shown. Once set, click Next.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhraGBB7csBfV_u20EZePZrqv3Br1q6G6cLPHQgPt3kc97xH2fusB0sJ-EVwLIfGdE1WE_VmT5S1_5u5fa6-Udvs0JiFd5da_hq1oadyPRvsPrzTHJILAXbpIOGPXK57avEmrVWYcm6DGqM/s400/Virtualbox-20150913-002.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhraGBB7csBfV_u20EZePZrqv3Br1q6G6cLPHQgPt3kc97xH2fusB0sJ-EVwLIfGdE1WE_VmT5S1_5u5fa6-Udvs0JiFd5da_hq1oadyPRvsPrzTHJILAXbpIOGPXK57avEmrVWYcm6DGqM/s1600/Virtualbox-20150913-002.png)

  
Now create a virtual hard disk. Here we choose "Create a virtual hard disk now," as shown, and click Create.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEio0NtvDSab1lHqbp7n8wf8rYNV_vQH9kfRBzlqfJxQvB5hN_BPwWU2oJzNKvI4IZqjvLmdLc0IUXxhyXHGiy7yJDcy-GiFoeQGc8M1Cj4myPOxje__KKYalvl_MQUc9j6eE9VhK4S0lxtN/s400/Virtualbox-20150913-003.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEio0NtvDSab1lHqbp7n8wf8rYNV_vQH9kfRBzlqfJxQvB5hN_BPwWU2oJzNKvI4IZqjvLmdLc0IUXxhyXHGiy7yJDcy-GiFoeQGc8M1Cj4myPOxje__KKYalvl_MQUc9j6eE9VhK4S0lxtN/s1600/Virtualbox-20150913-003.png)

  
Set the hard disk file type. Here I'll create a VDI—after all, it's natively supported by VirtualBox, so it may cause fewer problems. That said, feel free to choose another disk format, as shown.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIVD4q4iN89DohqCau2_zQeFaTMiGQjmP6lcF4xLqP7KqCvM-qw_1vkuyHpmzID77RamYKLAJntadcwQh2f9peW1ig7sApQxw7s8kX85XyMCyp2-lDOC-hxCrt7Cgjp1rm0Bzw2dUdXrmy/s400/Virtualbox-20150913-004.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIVD4q4iN89DohqCau2_zQeFaTMiGQjmP6lcF4xLqP7KqCvM-qw_1vkuyHpmzID77RamYKLAJntadcwQh2f9peW1ig7sApQxw7s8kX85XyMCyp2-lDOC-hxCrt7Cgjp1rm0Bzw2dUdXrmy/s1600/Virtualbox-20150913-004.png)

  
Choose dynamic allocation. Dynamic allocation means the space given at the start doesn't immediately consume a fixed amount of disk space like a fixed-size disk would; instead it grows as your disk usage increases (note: it won't shrink, unless you take other actions—which are strongly discouraged and risky), up to the maximum of the fixed size. Here we choose dynamic allocation.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1SjHM0yEULtYGvBhIX1pjKGiuVX3d8xaAjBZUKLgNCumrrEdY3BZCt8r4UsTH-v_t0zo67_QkJPkIvk2MQ9KIe7txZV8ncjNzCt0ZZeMndBqH2laiJgqUPcvZlGFPIXGB8Fj2ce6kmx3-/s400/Virtualbox-20150913-005.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1SjHM0yEULtYGvBhIX1pjKGiuVX3d8xaAjBZUKLgNCumrrEdY3BZCt8r4UsTH-v_t0zo67_QkJPkIvk2MQ9KIe7txZV8ncjNzCt0ZZeMndBqH2laiJgqUPcvZlGFPIXGB8Fj2ce6kmx3-/s1600/Virtualbox-20150913-005.png)

  
Set the disk size to 8G. Since Linux doesn't take up much space, there's no need to make it large; here we just go with the suggested 8G.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgufTh089rIm5SxI7XYfiJgwdV2JR5neG68JgzDDr2YJY89pU_4oFLkWhDBYb8alKNhgFj6PdlQzq6hCQNzQyCdZThjMwPxC8vzy1hZ4PL31tgLQk03eppoyLeLSSD9iW6uT2xOOCSLU6_r/s400/Virtualbox-20150913-006.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgufTh089rIm5SxI7XYfiJgwdV2JR5neG68JgzDDr2YJY89pU_4oFLkWhDBYb8alKNhgFj6PdlQzq6hCQNzQyCdZThjMwPxC8vzy1hZ4PL31tgLQk03eppoyLeLSSD9iW6uT2xOOCSLU6_r/s1600/Virtualbox-20150913-006.png)

  
Once done, we return to the original screen, where we'll see the VM has been created—but before booting we still need a few more settings.  
  
1. Insert the CentOS image you want to install  
Select the VM, click the "Settings" button to enter the settings screen, and click "Storage." Under storage, we'll see two controllers, one IDE and one SATA. The one under IDE is the optical drive; click it, then click the small disc icon on the right, select your ISO file, and insert it.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHGfwwOFmpgzxa3mI75RvQi1WksXwWkPWXT2MwoRrK3WhnwqusLuUg1IpkfbL1luO1G95nodfPJyjOTqt0gSS3iZQDm9UA3RIdjP2__UCjZ9OOndjOl6tTbkPx5P6GQdxgwbH0U4zskx-5/s640/Virtualbox-20150913-007.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHGfwwOFmpgzxa3mI75RvQi1WksXwWkPWXT2MwoRrK3WhnwqusLuUg1IpkfbL1luO1G95nodfPJyjOTqt0gSS3iZQDm9UA3RIdjP2__UCjZ9OOndjOl6tTbkPx5P6GQdxgwbH0U4zskx-5/s1600/Virtualbox-20150913-007.png)

  
2. Configure the second network adapter  
Still in the settings screen, choose "Network." You'll see four adapters. Adapter 1 is already set to NAT, so we don't need to configure it again, as shown.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2Zo7ymF9ljGsegQCmxpm3jlqh_HuGUT8CqF7mrfU6DMvn_qb-mVqXPItLmbT67FgjkpzCNSjHoCUGx17g6jrQsZPM4lulO47hpdmvSDihyphenhyphenXTZmOY-qb_5taBQU7sAv1FCf33joFM6A5qF/s640/Virtualbox-20150913-008.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2Zo7ymF9ljGsegQCmxpm3jlqh_HuGUT8CqF7mrfU6DMvn_qb-mVqXPItLmbT67FgjkpzCNSjHoCUGx17g6jrQsZPM4lulO47hpdmvSDihyphenhyphenXTZmOY-qb_5taBQU7sAv1FCf33joFM6A5qF/s1600/Virtualbox-20150913-008.png)

  
If you want to add the adapter but keep it disconnected for now, you can click Advanced, where there's a "Cable Connected" checkbox—unchecking it is equivalent to unplugging the network cable, as shown.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcCAlBZ35orWnSfWihP-4pUGGMQC7ZdO0G41Y_xKLWcwSPx-tpoksZCnWpPJqxsm7uxy5EF6kA1BUZ3l74nE8ZgTEm0XZo3v6019c09MPa5K02xvHuR5QQzcrNYib5dkELjBQS2JiUg3DH/s640/Virtualbox-20150913-009.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcCAlBZ35orWnSfWihP-4pUGGMQC7ZdO0G41Y_xKLWcwSPx-tpoksZCnWpPJqxsm7uxy5EF6kA1BUZ3l74nE8ZgTEm0XZo3v6019c09MPa5K02xvHuR5QQzcrNYib5dkELjBQS2JiUg3DH/s1600/Virtualbox-20150913-009.png)

  
Switch to Adapter 2, check "Enable Network Adapter," and from the dropdown choose the "Host-only" adapter. It will auto-fill the name—no need to change it. Then click Advanced and, under Promiscuous Mode, choose "Allow All." Once all settings are done, click OK to save.  
(Note: I later tested that choosing "Deny" also let them ping each other fine. After looking into it, I confirmed that "Allow All" is needed when you use a bridged adapter, because at that point you need to receive all kinds of MAC packets for it to work correctly.)  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiG0-yFvCZU57IlDIA80dVPt2GOmRMtX2rrhlaxIG8G3puDZzYR20V6gZ18Sm4_q8jXA74FF2VjEUvbdwtu-Gp7XXzEHef2Og4bX19-N-LLr18GS0aGthIHgQ4r2qFQNYo0KSVxkSFIdPvR/s640/Virtualbox-20150913-010.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiG0-yFvCZU57IlDIA80dVPt2GOmRMtX2rrhlaxIG8G3puDZzYR20V6gZ18Sm4_q8jXA74FF2VjEUvbdwtu-Gp7XXzEHef2Og4bX19-N-LLr18GS0aGthIHgQ4r2qFQNYo0KSVxkSFIdPvR/s1600/Virtualbox-20150913-010.png)

  
## 2. After starting the VM, install CentOS

I won't say much here—there's plenty of info online, and installation now has a GUI, so it's not too hard.  
  
## 3. After installing CentOS, use nmtui (NetManager-TextUI) to configure

Once booted, log in with the root credentials you created during installation (or your own account). Having root privileges makes things easier here, so I'll demo with root.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIk8LfYa6EQ5eXC9Gjtozbozp7Fl7x7wZdJEg4NszQyMqQEkCI5YNoVAFOVyNS5chuW9SRuPhdKUTNRtQ0iyv04WqB18XhPxUI8EuJj03FPzb47OTtfbVhAJq-v9axyG3hNEwF9dKfz6ok/s640/Virtualbox-20150913-011.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIk8LfYa6EQ5eXC9Gjtozbozp7Fl7x7wZdJEg4NszQyMqQEkCI5YNoVAFOVyNS5chuW9SRuPhdKUTNRtQ0iyv04WqB18XhPxUI8EuJj03FPzb47OTtfbVhAJq-v9axyG3hNEwF9dKfz6ok/s1600/Virtualbox-20150913-011.png)

  
First confirm that you can't ping the external network 8.8.8.8, then type "nmtui" to enter the settings page.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiC0uvI2KY1-i0GeuhlrQTerObJWLVl6eIKv2vQohTj4B2lwalqWJ4jEK5HtHcqAojgJ0f0GSdVDGD8rMfkCYZDvwoasoEG6OqwXPCVTkj6SPnn4N7t-cKrNT7ZxIg4IuZh_zJPS6NWlQYr/s640/Virtualbox-20150913-012.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiC0uvI2KY1-i0GeuhlrQTerObJWLVl6eIKv2vQohTj4B2lwalqWJ4jEK5HtHcqAojgJ0f0GSdVDGD8rMfkCYZDvwoasoEG6OqwXPCVTkj6SPnn4N7t-cKrNT7ZxIg4IuZh_zJPS6NWlQYr/s1600/Virtualbox-20150913-012.png)

  
Choose "Edit a connection."  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2_5XT-sKv_1WrJEZl3fCx22pCNEPGmG2AUE7bn3RM3c3qoDoMpcBcw55PUqb2UICDbvzRBSCgAceW3Zfvms0hr3DXtX3ly64NLQ6AMQY7DkxZQ8llRKCIXwF2U86pmxH0vhPaLUoPS1Qh/s640/Virtualbox-20150913-013.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2_5XT-sKv_1WrJEZl3fCx22pCNEPGmG2AUE7bn3RM3c3qoDoMpcBcw55PUqb2UICDbvzRBSCgAceW3Zfvms0hr3DXtX3ly64NLQ6AMQY7DkxZQ8llRKCIXwF2U86pmxH0vhPaLUoPS1Qh/s1600/Virtualbox-20150913-013.png)

  
You'll see two interfaces inside. Select each and enter "<Edit...>".  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZLvYWlfaKOF4VOpz4viPqb97Vmd6NFfzPUaVZ52MFDp9rKFVeQueAXe2YKEGdgF5L9fjBPDjgP3Qq9EHrIPdno7vmH6vhYMFa-S0qLlF014SQHBluSOiw-j1zK1QEPTtXDeL9UrpRWdr-/s640/Virtualbox-20150913-014.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZLvYWlfaKOF4VOpz4viPqb97Vmd6NFfzPUaVZ52MFDp9rKFVeQueAXe2YKEGdgF5L9fjBPDjgP3Qq9EHrIPdno7vmH6vhYMFa-S0qLlF014SQHBluSOiw-j1zK1QEPTtXDeL9UrpRWdr-/s1600/Virtualbox-20150913-014.png)

  
Since we're configuring everything via DHCP, there's no need to set a static IP. Confirm both IPv4 and IPv6 are set to Automatic, then check "Automatically connect," and it will connect to the network automatically after a reboot.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJpKblgiY8II2nG_Gkr3yvMudCTEp2kluEFora5pDk6M0v88ggwZsMTTqzmQl4K-VnHdueSeFxBFcXih7PGVTpr9k3T3iDfALUSmvfB7usMqab5YfaAkI_oCNfCNnV3oxgI3Di-dvAwT2Z/s640/Virtualbox-20150913-015.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJpKblgiY8II2nG_Gkr3yvMudCTEp2kluEFora5pDk6M0v88ggwZsMTTqzmQl4K-VnHdueSeFxBFcXih7PGVTpr9k3T3iDfALUSmvfB7usMqab5YfaAkI_oCNfCNnV3oxgI3Di-dvAwT2Z/s1600/Virtualbox-20150913-015.png)

  
Type "service network restart" to restart the network service so the correct settings take effect.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTqOueeXZeRqdodncE2yIby4ziwHAcaVFEYSDh464xn3mrBsNgL6YnqBJ-CNh8pR1rbrCxZe5PZwQ8TbppIq8Ncqm1cPKGX13ntlyeMQC11upofkg1FtGmv7omXhs2GgNuM68o1s2TPZh6/s640/Virtualbox-20150913-016.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTqOueeXZeRqdodncE2yIby4ziwHAcaVFEYSDh464xn3mrBsNgL6YnqBJ-CNh8pR1rbrCxZe5PZwQ8TbppIq8Ncqm1cPKGX13ntlyeMQC11upofkg1FtGmv7omXhs2GgNuM68o1s2TPZh6/s1600/Virtualbox-20150913-016.png)

  
Release the mouse from the VM (the default should be the right Ctrl key), open CMD, and type "ipconfig /all." You'll see a network interface like the one below, from which you can get the physical host's IP—we'll use it for testing shortly.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBWGwoYnZEXVfc28BSkUF8LzKc1tnH3Rz3XT9nRsKk0m7S_sao-jYRSnKj4NVMMZp9mx5h2uBGI1Brsn0xjLlvm8SrYigpZKzHzmDtONg0lYbOkJXLrILasOW1MROz5goSXETrLP-qMKi3/s640/Virtualbox-20150913-017.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBWGwoYnZEXVfc28BSkUF8LzKc1tnH3Rz3XT9nRsKk0m7S_sao-jYRSnKj4NVMMZp9mx5h2uBGI1Brsn0xjLlvm8SrYigpZKzHzmDtONg0lYbOkJXLrILasOW1MROz5goSXETrLP-qMKi3/s1600/Virtualbox-20150913-017.png)

  
Type "ping 8.8.8.8" and "ping 192.168.56.1" to test connectivity to the outside and to the physical host. By default Linux keeps pinging, so press Ctrl+C to cancel.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvzToejifQ1PEAz0oesP16vfBHXOJ7Xifu77G_5YfHZJ1jwbLqg6EXGL3XodhWI4AAuIC_0ITXy2S4k5nKdq_532h6j8rYdXg_IKligxPEdNJNIZOHy2rreu5BS0TPyLLvyBbuV2DFyKbj/s640/Virtualbox-20150913-018.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvzToejifQ1PEAz0oesP16vfBHXOJ7Xifu77G_5YfHZJ1jwbLqg6EXGL3XodhWI4AAuIC_0ITXy2S4k5nKdq_532h6j8rYdXg_IKligxPEdNJNIZOHy2rreu5BS0TPyLLvyBbuV2DFyKbj/s1600/Virtualbox-20150913-018.png)

  
Type "ip a," and you'll see a 192.168.56.101 on the same subnet as 192.168.56.1. We'll use this IP later to test from the physical host.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizddiBR1i7VrhYlZ5xLuks55NS8pZBEf8wn5c0t51WG-nzMQnOEey4dxfdeizXTMRQ4OWzIswpkMD5uKqXztYouXKMeW0zxFuaESzHb3F4Aw_VBJNEnx_Z3o7dXFQ-Xb0QOxeANwvz57lV/s640/Virtualbox-20150913-019.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizddiBR1i7VrhYlZ5xLuks55NS8pZBEf8wn5c0t51WG-nzMQnOEey4dxfdeizXTMRQ4OWzIswpkMD5uKqXztYouXKMeW0zxFuaESzHb3F4Aw_VBJNEnx_Z3o7dXFQ-Xb0QOxeANwvz57lV/s1600/Virtualbox-20150913-019.png)

  
Release the mouse from the VM, open the CMD from before, and type "ping 192.168.56.101"—it pings through as well.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhojYlpDMiIPO60ULcuuE1WwEsarYPZLdorqEfVe2jkNj9TSwKMXV4PvbjH1Yk4PAxb9oy55J6qPfB5W5lwUcOprvtOMmcuYw5-DvOMwcJzsvmcW_pf8gR3gnB0huUrL61N_ZbczAPrrsLf/s640/Virtualbox-20150913-020.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhojYlpDMiIPO60ULcuuE1WwEsarYPZLdorqEfVe2jkNj9TSwKMXV4PvbjH1Yk4PAxb9oy55J6qPfB5W5lwUcOprvtOMmcuYw5-DvOMwcJzsvmcW_pf8gR3gnB0huUrL61N_ZbczAPrrsLf/s1600/Virtualbox-20150913-020.png)

  
Try connecting over SSH—OK, all done!  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjN-ya12xJ_jR5nInZvCzqp7w1QKJzv-trlfSPsW4Z9yiZ-goNXCpjvQ7Q9m5YulBD0Ia1zPlqGibMLMql5I8bYVnghnd5l6KBpGR1HrvLIiOyDAMdtmO_yjoGC0c804caORW0sUvIWZcyQ/s640/Virtualbox-20150913-021.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjN-ya12xJ_jR5nInZvCzqp7w1QKJzv-trlfSPsW4Z9yiZ-goNXCpjvQ7Q9m5YulBD0Ia1zPlqGibMLMql5I8bYVnghnd5l6KBpGR1HrvLIiOyDAMdtmO_yjoGC0c804caORW0sUvIWZcyQ/s1600/Virtualbox-20150913-021.png)

  
Note: when pinging 192.168.56.1 from the VM, you may get no response. That's likely a Windows Firewall setting—open the firewall settings and enable the ICMPv4 and ICMPv6 responses, as shown.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1xwSjkV3q23gp5CV7xJMGaFofkZ1ZTNdmjBXhnxKQmxRBJFLrgIGDYV5SVwc3aLpCzGR8xhkWC9e_vFkoxU6wk8FT9fChyC-5JQ0rV-ap8iz4xJIUmWh11rvBLA0hZz0PMYDF1UjMQgJi/s640/Virtualbox-20150913-022.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1xwSjkV3q23gp5CV7xJMGaFofkZ1ZTNdmjBXhnxKQmxRBJFLrgIGDYV5SVwc3aLpCzGR8xhkWC9e_vFkoxU6wk8FT9fChyC-5JQ0rV-ap8iz4xJIUmWh11rvBLA0hZz0PMYDF1UjMQgJi/s1600/Virtualbox-20150913-022.png)
