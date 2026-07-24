---
title: "Linux Basic Concepts"
pubDate: 2015-10-03
description: "1. The Linux Kernel: Shell/KDE/Application <- Kernel <- Hardware. Technically, Linux is just a kernel."

locale: en
translationOf: linuxlinux-basic-concept
aiTranslated: true
tags: [Linux]
---
## 1. The Linux Kernel

**Shell/KDE/Application** <-> **Kernel** <-> **Hardware**  

Technically, Linux is just a kernel.

A "kernel" refers to the system software that provides a hardware abstraction layer, disk and filesystem control, multitasking, and other functions.

A kernel is not a complete operating system.

A complete operating system based on the Linux kernel is called the Linux operating system.

Ref:

[https://zh.wikipedia.org/wiki/Linux%E5%86%85%E6%A0%B8](https://zh.wikipedia.org/wiki/Linux%E5%86%85%E6%A0%B8)

PS:  
There's no system that never crashes:  
Is Windows the only one that shows a blue screen? No.  
Our great MAC (UNIX) has a crash screen in four languages,  
while LINUX has the Kernel panic.  

## 2. The Linux File System

Windows has FAT16, FAT32, and NTFS, and of course LINUX is no exception.  
LINUX evolved from the early EXT2 -> EXT3 to today's mainstream EXT4,  
along with some more advanced filesystems such as ZFS, XFS, BTRFS, and so on.  
Just like Windows, you can switch filesystems yourself, though it's a bigger undertaking.  
If you're interested, you can look into other related materials for research.  

Ref:  
[http://linux.vbird.org/linux\_basic/0230filesystem.php#harddisk](http://linux.vbird.org/linux_basic/0230filesystem.php#harddisk)  
[Comparing the Linux file formats ext2, ext3, and ext4](http://mistech.pixnet.net/blog/post/166142996-linux-%E6%AA%94%E6%A1%88%E6%A0%BC%E5%BC%8F-ext2-ext3-ext4-%E6%AF%94%E8%BC%83)  

## 3. The Linux Directory Structure (Filesystem Hierarchy Standard, FHS)

Linux directories are basically laid out according to the Filesystem Hierarchy Standard (FHS).  
If you're interested, you can look into it. Basically, there are a few important paths worth remembering:  
a. Root directory ( / )  
b. /etc holds configuration files  
c. /opt holds third-party software or things you compiled yourself  
d. /usr holds native software-related things  
e. /var holds things related to system operation  
f. /home holds each user's home directory, except for root's  
g. /root root's home directory  
h. /usr/bin usually where you put scripts you write yourself  
i. /var/log/ records many important logs  
j. /var/mail/ personal email directory  

Ref:  
[http://linux.vbird.org/linux\_basic/0210filepermission.php#dir](http://linux.vbird.org/linux_basic/0210filepermission.php#dir)  

## 4. Relative Path vs Absolute Path

Absolute path: a file or directory name written starting from the root directory (/), e.g. /home/dmtsai/.bashrc;  
Relative path: a file name written relative to the current path.  
  For example ./home/dmtsai or ../../home/dmtsai/, or ~/test, and so on.  
  In short, anything that doesn't begin with / counts as a relative path.  

Ref:  
[http://linux.vbird.org/linux\_basic/0210filepermission.php#dir](http://linux.vbird.org/linux_basic/0210filepermission.php#dir)  

## 5. Linux File Permission Management (Linux ACL ( Access Control List ) )

When using the ls -l command, we see a permission listing like the one below, which can be split into six blocks:

```
 -   rwx rwx rwx root root
 1    2    3     4     5      6
```

1. If it's a file, it shows "-"; if it's a directory, it shows "d"; if it's a symbolic link, it shows "l".  
2. The owner's permissions  
3. The owning group's permissions  
4. Everyone else's permissions  
5. own-user (the owner)  
6. own-group (the owning group)  

r-Read, whether it can be read; w-Write, whether it can be written; x-Execute, whether it can be executed.  
For a permission set (rwx), we can treat  
x as 2 to the power of 0 (1), w as 2 to the power of 1 (2), and r as 2 to the power of 2 (4).  
So when all permissions are on, it's 4+2+1=7. Give it some thought: what kind of permission is 5?  

## 6. Shell

The Shell is a text interface we use to communicate with the Kernel via commands,  
just like using the Windows GUI to configure and use the system, except everything is done with commands instead.  
Shells come in several kinds:  
  /bin/sh (already replaced by /bin/bash)  
  /bin/bash (the default shell on Linux)  
  /bin/tcsh (integrates C Shell, offering more features)  
  /bin/csh (already replaced by /bin/tcsh)  
The most commonly used—and the default on most Linux systems today—is bash (Bourne-Again SHell). Basically, as long as you can use this one, you're good to go.
