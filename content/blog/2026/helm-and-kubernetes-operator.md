---
title: "連兒童都能理解的Helm跟Kubernetes Operator"
pubDate: 2026-11-06
description: "從容器部署談到 Helm 與 Kubernetes Operator，理解套件發布與應用維運的分工。"
tags: [維運]
---

<!-- 日期暫採轉存日；正式發文前確認。來源為本人自寫教學，完整原版另存於私人備份。 -->

> **歷史教學草稿。** 保留原本的故事與比喻；產品能力分級是當時的比較。Operator 能做哪些維運工作，仍取決於實作與驗收，可對照 [Kubernetes Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)。原稿一張外部圖片已失效，所在位置會明列。

## 很久很久以前…

很久很久以前，人們總是很煩惱，因為他們想要把許多「服務」都安裝在一台機器的時候，會有個問題，那就是這些服務的設定，不僅麻煩而且容易衝突，我們想要在機器裡面隔開環境出來，於是「虛擬機」這種東西就被創造出來了。

有了虛擬機，人們就可以把需要的服務裝上去，並且因為有了環境的隔離，所以設定檔不會互相影響，人們以為這樣就可以高枕無憂了，但可惜的是，人們後來發現有些資源是大家都會使用到的，可以不用分隔的那麼完整，這樣子使用起東西起來更加的有效率，於是聰明的工程師保留了共用的資源，把不同的資源用「容器」和其他資源隔開來，而且可以把容器打包起來變成像是光碟一樣的東西，我們把他叫做「映像檔」，方便大家攜帶和傳遞。

## 有了容器，人們就過著幸福快樂的日子嗎？

有了容器之後，人們的確過得比之前開心，但還是有很多的事情需要處理，像是如何把容器放在要使用的地方？還有不同容器使用不同的設定檔要怎麼好好的管理呢？

聰明的工程師又跳了出來，說他想到了一個方式，就像是樂譜能夠讓大家一同演奏一樣，我們把容器擺放的方式、要怎麼設定它等等的東西寫下來，我們將他稱作「docker-compose」好了，於是我們就能夠更簡單的使用容器。

好景不常，因為docker-compose雖然很好用，但如果想使用更大量的容器以及更複雜的設定，又想要他們有更多自行管控的機制，能讓小孩子都可以使用，我們就需要另一個強力的工具才行。

聰明的工程師想了又想，覺得我們可以用容器在機器上運行一個基本的環境，這個環境裡面包含了可以自行管控的機制，還有很多的功能，讓我們可以在上面擺放大量的容器還有設定很多很複雜的東西，甚至還開放別人幫忙建立出更多更強大的功能，而這個東西，我們叫他「Kubernetes」，或是簡稱叫K8S；使用K8S，我們就可以簡單的寫出我們想要做什麼的YAML文件（一種特別格式的文件），然後其他的就交給他了！

## 有了K8S，人們就滿足了嗎？

有了K8S，原本以為人們就滿足了，但科技來自人性、人性源自惰性，人們發現了很多K8S的YAML文件其實都大同小異，只是在關鍵部份小改一下就可以了，於是想說我們能不能利用「範本」+「變數」來讓服務的安裝更加便利，於是「Helm」出現了，他能夠讓大家把K8S的YAML寫成範本，再加上每個不同環境的變數來使用。

正如同人們關注在怎麼讓K8S安裝服務更加便利，另一群人們這時候更希望讓服務安裝後的維運更加簡單，於是「Kubernetes Operator Framework」這時候出現了，有薦於之前有些人雖然很聰明，但他總是閉門造車，雖然他做出來的東西很好，但只要他沒空的話，其他人也沒辦法幫忙他改善或維護，所以我們學聰明了，先訂立個標準，再讓我們根據這個標準做出我們要在服務安裝後怎麼運行之類的，也因為這樣，開始有人把他和其他好用的工具結合在一起，創造出各種可能……

就如同下圖，左手邊的是Helm所注重的，他希望讓大家在安裝服務的時候更加簡單；

而右手邊則是Kubernetes Operator所注重的，他希望讓人們更能夠輕鬆維護每個服務。

![執行容器與擴充 Kubernetes API 的概念比較](/blog/img/notion-helm-and-kubernetes-operator-operator-pattern.webp)

## K8S Operator好像很好用，但……

K8S Operator推出後，人們認為他雖然很好用，但原本建議的方式來操作有點困難，可以用其他方式來替代嗎？

這時候，人們想起了還在使用虛擬機的時候，會使用一種上古神器叫Ansible的工具來協助自己控制一堆機器上的服務設定，語法大家都已經相當熟悉，那麼我們是否能將其用在Kubernetes Operator上面呢？於是就有聰明的工程師把兩者組合起來做了「Ansible Operator」，讓人們還是可以透過Ansible的語法來控制Kubernetes元件，而且原本寫的Ansible腳本也都可以共用了。

另外也有人想要把對機器下指令寫腳本（shell script）的方式用到K8S上，於是他們做出了一個叫「Shell Operator」的東西，讓大家可以像是寫腳本的方式來創建需要的服務環境出來。

## 從此之後大家都過得幸福快樂……？

有了前人的經驗和努力，從此之後，人們雖然可以自行選擇各種想要的工具，來進行各種管控，但也因為太多工具可以選擇了，人們陷入了選擇困難症……

沒關係，就讓我來幫大家解答這個問題吧！

首先我們要知道的是，<u>工具的選擇並不是那麼的單一</u>的，我們是可以同時使用多種工具的，再來是，我們對於工具的使用，也是會根據我們對於其<u>要求的變化或是時間的演進而有所不同</u>，通常會是我們對於環境或是服務的理解更加深刻，而需要更換不同的工具來達成。

我們可以先從這張圖了解到Helm跟Ansible Operator的不同

![原教學的應用維運能力分級示意](/blog/img/notion-helm-and-kubernetes-operator-historical-capabilities.webp)

從上圖我們可以看到，這張當時的能力分級圖用來區分套件部署與應用維運；Helm 本身不會替特定應用實作所有持續監控與維運程序，但不能把圖中的 Level 2 當成所有整合方案的永久上限，對於單純的 Stateless 服務，可以先評估 Kubernetes 的健康檢查與重啟機制是否足以應付需求。

而如果說今天要做到的是佈署比較複雜的Stateful服務，而且要包含他上面所說的備份之類的，就要評估可用的 Operator 或既有維運工具，並核對備份與復原能力；不一定要自行撰寫 Operator，而為了更加方便撰寫，我們也可以使用Ansible Operator，就可以用Ansible的方式來撰寫相關的部份

另外要說的是，兩者是可以一同使用的，我們可以透過Helm來安裝一個Operator方便我們後續處理，如下圖，又或是我們如果寫了一個Operator，但沒有包含後面Lifecycle management，那其實也可以看為類似像Helm的東西

> 原稿此處的外部示意圖已失效（HTTP 410），本次未取得圖片，保留文字說明。

所以我會建議，我們可以一開始先使用Helm作為入門的使用，畢竟我們大部份的服務都是Stateless為主，而DB之類的我們已經有既有的方式可以維運，等到我們更熟悉Kubernetes環境，也更知道我們要怎麼維運lifecycle的時候，再來撰寫相關的Operator，如下圖這樣，漸近式的使用

![以 Helm 部署與 Operator 維運的分工示意](/blog/img/notion-helm-and-kubernetes-operator-day-one-day-two.webp)

下圖有更完整的比較Helm v3跟Ansible Operator的差別：

![原教學中 Helm 3 與 Ansible Operator 的歷史比較](/blog/img/notion-helm-and-kubernetes-operator-historical-comparison.webp)

## 補充說明：Stateless 與 Stateful

Stateless，是所謂的無狀態，也就是互動的雙方都不需要記得事情，打個比方來說，今天老師在發空白考卷，學生只要上前跟老師拿，老師就會給你考卷，他不需要記得你是不是拿過考卷，反正都是空白的，你想拿多少都行

Stateful，是所謂的有狀態，這代表互動雙方需要記得事情，打個比方來說，就是今天老師在發考完且評分完的考卷，每個學生上前拿的時候要報上自己的姓名，老師也要記得學生的姓名給出對應的考卷，並且可能還會跟學生討論一下考試成績是否有進步之類的

有趣的思考：如果學生一直去跟老師拿考卷，而老師考卷不夠呢？

## REF

[https://slides.com/rockwyc992/ansible-operator-20210126](https://slides.com/rockwyc992/ansible-operator-20210126)
[https://cloudblogs.microsoft.com/opensource/2020/04/02/when-to-use-helm-operators-kubernetes-ops/](https://cloudblogs.microsoft.com/opensource/2020/04/02/when-to-use-helm-operators-kubernetes-ops/)

[https://banzaicloud.com/blog/declarative-installer/](https://banzaicloud.com/blog/declarative-installer/)

[https://banzaicloud.com/blog/helm3-the-good-the-bad-and-the-ugly/](https://banzaicloud.com/blog/helm3-the-good-the-bad-and-the-ugly/)

[https://indico.cern.ch/event/829468/attachments/1936132/3210643/Ansible_Operator_CERN_2019.pdf](https://indico.cern.ch/event/829468/attachments/1936132/3210643/Ansible_Operator_CERN_2019.pdf)

[https://blog.pichuang.com.tw/20190407-how-look-like-operator-framework-in-production/](https://blog.pichuang.com.tw/20190407-how-look-like-operator-framework-in-production/)

[https://cloudark.medium.com/kubernetes-operators-and-helm-it-takes-two-to-tango-3ff6dcf65619](https://cloudark.medium.com/kubernetes-operators-and-helm-it-takes-two-to-tango-3ff6dcf65619)

[https://medium.com/operators/operator-pattern-kubernetes-openshift-380ddc6a147c](https://medium.com/operators/operator-pattern-kubernetes-openshift-380ddc6a147c)
