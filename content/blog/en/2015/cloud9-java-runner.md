---
title: "Setting Up a Cloud9 Java Runner"
pubDate: 2015-09-13
description: "Today I'll walk you through how to set up a Java Runner on Cloud9. You can also refer directly to the Cloud9 and Stack Overflow tutorials. First, let's create a new workspace."

locale: en
translationOf: cloud9-java-runner
aiTranslated: true
tags: [Cloud Dev, Java]
---
Today I'll walk you through how to set up a Java Runner on Cloud9. You can also refer directly to the Cloud9 and Stack Overflow tutorials: [https://docs.c9.io/v1.0/docs/custom-runners](https://docs.c9.io/v1.0/docs/custom-runners)  
[http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java](http://stackoverflow.com/questions/28196434/setting-up-cloud9-ide-to-compile-and-run-java)  
  
  
  
First, let's create a new workspace. Feel free to name it whatever you like. Here I chose the "custom" option, since we only want to do a Java example and don't really need anything else, as shown.  

[![](/blog/img/Cloud9-20150913-001.webp)](/blog/img/Cloud9-20150913-001.webp)

  
  
Confirm that the Java environment is actually there:  

[![](/blog/img/Cloud9-20150913-002.webp)](/blog/img/Cloud9-20150913-002.webp)

  
  
Create a src folder and a bin folder:  

[![](/blog/img/Cloud9-20150913-003.webp)](/blog/img/Cloud9-20150913-003.webp)

  
  
Create a new HelloWorld.java file and enter the relevant code:  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-004.webp)

  
  
Run javac and java quickly to check that it works:  

[![](/blog/img/Cloud9-20150913-005.webp)](/blog/img/Cloud9-20150913-005.webp)

  
  
If it runs fine, delete HelloWorld.class:  

[![](/blog/img/Cloud9-20150913-013.webp)](/blog/img/Cloud9-20150913-006.webp)

  
  
Create a new Runner (please ignore the JavaBuilder and JavaRunner that already appear—the original environment doesn't have them):  

[![](/blog/img/Cloud9-20150913-007.webp)](/blog/img/Cloud9-20150913-007.webp)

  
  
Copy the JavaBuilder from the Cloud9 tutorial document and modify the contents of "env":  
"OUT\_DIR": "$project\_path\\\\bin"  
"SRC\_DIR": "src"  
where OUT\_DIR is where your compiled Java class files go,  
and SRC\_DIR is where your source code lives.  
See the image for reference:  

[![](/blog/img/Cloud9-20150913-008.webp)](/blog/img/Cloud9-20150913-008.webp)

  
  
Save this Runner. Here I named it JavaBuilder.run:  

[![](/blog/img/Cloud9-20150913-009.webp)](/blog/img/Cloud9-20150913-009.webp)

  
  
Next, copy the JavaRunner from the Cloud9 tutorial document and modify the following. In  
"echo $file | sed -r 's/.\*\\\\/src\\\\///g' | sed -r 's/\\\\.java//g'  | sed -r 's/\\\\//\\\\./g' | xargs java", the part  
"'s/.\*\\\\/src\\\\///g'"—the /src is the location of your SRC\_DIR directory.  
"OUT\_DIR": "$project\_path\\\\bin" is where the built files end up, as shown.  

[![](/blog/img/Cloud9-20150913-010.webp)](/blog/img/Cloud9-20150913-010.webp)

  
  
Save this Runner. Here I named it JavaRunner.run:  

[![](/blog/img/Cloud9-20150913-011.webp)](/blog/img/Cloud9-20150913-011.webp)

  
  
Once both files are closed, we can see two custom runners have been added under the runner section:  

[![](/blog/img/Cloud9-20150913-012.webp)](/blog/img/Cloud9-20150913-012.webp)

  
  
Run JavaBuilder first, and we can see HelloWorld.class appear in bin:  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-013.webp)

  
  
At the bottom right we can switch to a different Runner. Here we switch to JavaRunner to run the file:  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-013.webp)

  
  
OK! It runs successfully! All done! From now on we can use these two custom Runners for our development!  

[![](/blog/img/Cloud9-20150913-004.webp)](/blog/img/Cloud9-20150913-013.webp)
