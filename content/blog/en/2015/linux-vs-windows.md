---
title: "Linux vs Windows"
pubDate: 2015-10-03
description: "1. What is Linux?"
tags: ["RedHat", "Debian", "Linux", "Fedora", "Registry", "Windows", "CentOS", "OpenSUSE", "Security", "POSIX", "UNIX"]
locale: en
translationOf: linux-vs-windows
aiTranslated: true
---
## 1. What is Linux?

No response—it's just a penguin (oops).  
OK, jokes aside: Linux is actually a free and open-source UNIX-like operating system.  
UNIX is also a computer operating system, characterized by multitasking and multi-user support.  
FreeBSD and macOS are representative examples of UNIX systems. (UNIX = FreeBSD, macOS)  

## 2. POSIX

Speaking of Linux, we have to mention the related POSIX, where POSIX = UNIX + LINUX.

If you want to learn more, take a look at Wikipedia.

POSIX Ref:  
[https://zh.wikipedia.org/wiki/POSIX](https://zh.wikipedia.org/wiki/POSIX)  

## 3. Linux Family

The Linux family tree:  
  1. The Debian family (Debian, Ubuntu (more desktop users), Linux Mint)  
  2. The Fedora family (  
          Fedora (the most new features; RedHat's testing lab),  
          RedHat Enterprise Linux,  
          CentOS (a version built to mirror RedHat Enterprise Linux, relatively more stable))  
  3. OpenSUSE  

PS: Among the various Linux distributions, we sometimes come across so-called LTS versions.  
LTS stands for Long-Term Support—these versions provide longer follow-up maintenance than regular releases,  
such as bug fixes and other updates.  
If you're setting up a more formal service, you should give LTS versions priority.  

Linux Ref: [https://zh.wikipedia.org/wiki/Linux](https://zh.wikipedia.org/wiki/Linux)  

## 4. Everything is File. vs Registry.

In Linux, everything can be viewed as a file,  
with only differences in file permissions and whether it's a directory, executable, and so on. For details, see:  
[https://en.wikipedia.org/wiki/Everything\_is\_a\_file](https://en.wikipedia.org/wiki/Everything_is_a_file)  

In Windows, many settings are stored in the Registry for unified management.  
The Registry stores the relevant settings in a DB-based manner,  
though Windows also originally used file-based management—files like "WIN.INI" and "SYSTEM.INI"  
are leftovers from that older era.  
Downsides of the Registry:  
  1. All settings are centralized, and some things that don't need to load at startup may still be loaded, slowing down the system.  
  2. Users can still modify it by accident.  
Ref:  
[http://www.ithome.com.tw/node/59748](http://www.ithome.com.tw/node/59748)  

## 5. User Is Genius. vs User Is Ordinary People.

Linux assumes users aren't ordinary people, but rather those who understand the system and want more customizability to configure things themselves;  
Windows, on the other hand, assumes many users are just ordinary people, so it provides lots of universal defaults with fewer customizable parts,  

and, as mentioned earlier, some settings can only be changed by going into the Registry, which carries considerable risk.

## 6. Linux, the Most Safe OS ever?

Many people misunderstand Linux to be the safest system in the world, while Windows is the easiest to break into,  
but this is actually a mistaken impression.  
The reality is that because Linux requires a lot of configuration, if it's configured improperly or not configured at all,  
Linux can actually be even less secure.  
Windows, meanwhile, has grown wiser through long affliction, and now handles many of today's viruses more easily.  
So when we use Linux, we absolutely must learn how to configure it properly!
