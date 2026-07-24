---
title: "A Rundown of Some Common Cloud IDEs"
pubDate: 2015-09-06
description: "Today I'll introduce a few of the more common cloud IDEs. Since there are more and more of them these days, I've picked the top few based on how convenient I found them for Java development and on the ratings from Slant (What is the best cloud IDE?)."
tags: ["Koding", "Introduction", "Codeanywhere", "Codenvy", "IDE", "Cloud IDE", "Cloud9"]
locale: en
translationOf: idecloud-ide
aiTranslated: true
---
Today I'll introduce a few of the more common cloud IDEs. Since there are more and more of them these days, I've picked the top few based on how convenient I found them for Java development and on the ratings from Slant ( [What is the best cloud IDE? - Slant](http://www.slant.co/topics/713/~what-is-the-best-cloud-ide) ):  
  
  
**1. Codenvy ( [https://codenvy.com/](https://codenvy.com/) )**  
From my few hours of trying it, Codenvy is currently the easiest to set up—it has just about every default environment you could think of. You simply choose what type of project you want to open, and it automatically brings up the corresponding basic template; it even has examples if you want to generate a basic HelloWorld. The flip side is that there's less you can configure yourself—at least for someone like me who likes to type Linux commands directly, not being able to do so feels a bit odd. It also basically requires you to use Ant, Maven, or Google App Engine, which means anyone who just wants to write simple programs, or who doesn't know those tools, will need to spend extra time learning them.  
  
**2. Codeanywhere ( [https://codeanywhere.com/](https://codeanywhere.com/) )**  
Codeanywhere's main selling point is that you get a dedicated app on Android, iPhone, and BlackBerry—its spirit is that you can write code anywhere. One thing to note, though, is that it doesn't give you a native Java environment; instead, you have to install one yourself using the VM it provides (it uses "DevBox" as the keyword). The VM can be either Ubuntu or CentOS. I'll post the steps for installing Java on a Codeanywhere CentOS VM later—it's basically no different from a normal installation—and only after installing can you run Java files. On the whole, the terminal privileges it gives you are pretty much wide open, which is quite handy.  
Ref: [Installing Java on a Codeanywhere CentOS DevBox](http://jimc1682000.blogspot.tw/2015/09/codeanywherecentos-devboxjava.html)  
  
**3. Cloud9 ( [https://c9.io](https://c9.io/)/ )**  
Cloud9's main selling point is that you have full control over the runtime environment, and you can even share these settings directly with others. I believe this offers definite benefits for online collaboration. For Java, though, even though it has JRE preinstalled, you still need to do some configuration of how it runs before you can execute things conveniently—otherwise you'd have to go into the terminal and type commands, which isn't very convenient. I'll write a post introducing all this later. By the way, the environment it uses is Ubuntu.  
Ref: [Setting Up a Cloud9 Java Runner](http://jimc1682000.blogspot.tw/2015/09/cloud9-java-runner.html)  
  
**4. Koding ( [https://koding.com/](https://koding.com/) )**  
Koding's main selling point is that you get a complete VM to play with however you like (oops). Basically, Koding is similar to the others that offer full terminal privileges, but the difference is: normally, even with a fully privileged terminal, once you enter a project you can only see that project's environment—you can't see the contents of other projects, so you can't manage two projects at once and have to do them separately. In Linux terms, it's like the concept of a virtual directory, and you can only see part of it. A complete VM, on the other hand, means you decide how to place your files—it won't stop you—so you can arrange them exactly as you like, and put commonly used LIB files together, which saves a lot of space.  
Finally, Koding also has powerful community sharing features—you can share your code, which is quite handy!  
I'll also post about how to install a LAMP stack later!  
Ref: [Koding Environment Setup Notes](http://jimc1682000.blogspot.tw/2015/09/koding.html)
