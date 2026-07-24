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

[![](/blog/img/Virtualbox-20150913-001.webp)](/blog/img/Virtualbox-20150913-001.webp)

  
Set the memory size. Here we set it to 1024MB, as shown. Once set, click Next.  

[![](/blog/img/Virtualbox-20150913-002.webp)](/blog/img/Virtualbox-20150913-002.webp)

  
Now create a virtual hard disk. Here we choose "Create a virtual hard disk now," as shown, and click Create.  

[![](/blog/img/Virtualbox-20150913-003.webp)](/blog/img/Virtualbox-20150913-003.webp)

  
Set the hard disk file type. Here I'll create a VDI—after all, it's natively supported by VirtualBox, so it may cause fewer problems. That said, feel free to choose another disk format, as shown.  

[![](/blog/img/Virtualbox-20150913-004.webp)](/blog/img/Virtualbox-20150913-004.webp)

  
Choose dynamic allocation. Dynamic allocation means the space given at the start doesn't immediately consume a fixed amount of disk space like a fixed-size disk would; instead it grows as your disk usage increases (note: it won't shrink, unless you take other actions—which are strongly discouraged and risky), up to the maximum of the fixed size. Here we choose dynamic allocation.  

[![](/blog/img/Virtualbox-20150913-005.webp)](/blog/img/Virtualbox-20150913-005.webp)

  
Set the disk size to 8G. Since Linux doesn't take up much space, there's no need to make it large; here we just go with the suggested 8G.  

[![](/blog/img/Virtualbox-20150913-006.webp)](/blog/img/Virtualbox-20150913-006.webp)

  
Once done, we return to the original screen, where we'll see the VM has been created—but before booting we still need a few more settings.  
  
1. Insert the CentOS image you want to install  
Select the VM, click the "Settings" button to enter the settings screen, and click "Storage." Under storage, we'll see two controllers, one IDE and one SATA. The one under IDE is the optical drive; click it, then click the small disc icon on the right, select your ISO file, and insert it.  

[![](/blog/img/Virtualbox-20150913-007.webp)](/blog/img/Virtualbox-20150913-007.webp)

  
2. Configure the second network adapter  
Still in the settings screen, choose "Network." You'll see four adapters. Adapter 1 is already set to NAT, so we don't need to configure it again, as shown.  

[![](/blog/img/Virtualbox-20150913-008.webp)](/blog/img/Virtualbox-20150913-008.webp)

  
If you want to add the adapter but keep it disconnected for now, you can click Advanced, where there's a "Cable Connected" checkbox—unchecking it is equivalent to unplugging the network cable, as shown.  

[![](/blog/img/Virtualbox-20150913-009.webp)](/blog/img/Virtualbox-20150913-009.webp)

  
Switch to Adapter 2, check "Enable Network Adapter," and from the dropdown choose the "Host-only" adapter. It will auto-fill the name—no need to change it. Then click Advanced and, under Promiscuous Mode, choose "Allow All." Once all settings are done, click OK to save.  
(Note: I later tested that choosing "Deny" also let them ping each other fine. After looking into it, I confirmed that "Allow All" is needed when you use a bridged adapter, because at that point you need to receive all kinds of MAC packets for it to work correctly.)  

[![](/blog/img/Virtualbox-20150913-010.webp)](/blog/img/Virtualbox-20150913-010.webp)

  
## 2. After starting the VM, install CentOS

I won't say much here—there's plenty of info online, and installation now has a GUI, so it's not too hard.  
  
## 3. After installing CentOS, use nmtui (NetManager-TextUI) to configure

Once booted, log in with the root credentials you created during installation (or your own account). Having root privileges makes things easier here, so I'll demo with root.  

[![](/blog/img/Virtualbox-20150913-011.webp)](/blog/img/Virtualbox-20150913-011.webp)

  
First confirm that you can't ping the external network 8.8.8.8, then type "nmtui" to enter the settings page.  

[![](/blog/img/Virtualbox-20150913-012.webp)](/blog/img/Virtualbox-20150913-012.webp)

  
Choose "Edit a connection."  

[![](/blog/img/Virtualbox-20150913-013.webp)](/blog/img/Virtualbox-20150913-013.webp)

  
You'll see two interfaces inside. Select each and enter "<Edit...>".  

[![](/blog/img/Virtualbox-20150913-014.webp)](/blog/img/Virtualbox-20150913-014.webp)

  
Since we're configuring everything via DHCP, there's no need to set a static IP. Confirm both IPv4 and IPv6 are set to Automatic, then check "Automatically connect," and it will connect to the network automatically after a reboot.  

[![](/blog/img/Virtualbox-20150913-015.webp)](/blog/img/Virtualbox-20150913-015.webp)

  
Type "service network restart" to restart the network service so the correct settings take effect.  

[![](/blog/img/Virtualbox-20150913-016.webp)](/blog/img/Virtualbox-20150913-016.webp)

  
Release the mouse from the VM (the default should be the right Ctrl key), open CMD, and type "ipconfig /all." You'll see a network interface like the one below, from which you can get the physical host's IP—we'll use it for testing shortly.  

[![](/blog/img/Virtualbox-20150913-017.webp)](/blog/img/Virtualbox-20150913-017.webp)

  
Type "ping 8.8.8.8" and "ping 192.168.56.1" to test connectivity to the outside and to the physical host. By default Linux keeps pinging, so press Ctrl+C to cancel.  

[![](/blog/img/Virtualbox-20150913-018.webp)](/blog/img/Virtualbox-20150913-018.webp)

  
Type "ip a," and you'll see a 192.168.56.101 on the same subnet as 192.168.56.1. We'll use this IP later to test from the physical host.  

[![](/blog/img/Virtualbox-20150913-019.webp)](/blog/img/Virtualbox-20150913-019.webp)

  
Release the mouse from the VM, open the CMD from before, and type "ping 192.168.56.101"—it pings through as well.  

[![](/blog/img/Virtualbox-20150913-020.webp)](/blog/img/Virtualbox-20150913-020.webp)

  
Try connecting over SSH—OK, all done!  

[![](/blog/img/Virtualbox-20150913-021.webp)](/blog/img/Virtualbox-20150913-021.webp)

  
Note: when pinging 192.168.56.1 from the VM, you may get no response. That's likely a Windows Firewall setting—open the firewall settings and enable the ICMPv4 and ICMPv6 responses, as shown.  

[![](/blog/img/Virtualbox-20150913-022.webp)](/blog/img/Virtualbox-20150913-022.webp)
