---
title: "Kibana 101"
pubDate: 2026-11-06
description: "從時間範圍、Filter、欄位與 KQL，逐步查找需要的紀錄。"
tags: [維運]
---

<!-- 日期暫採轉存日；正式發文前確認。來源為本人自寫教學，完整原版另存於私人備份。 -->

> **歷史教學草稿。** 本文保留原本的講解順序。原稿有操作環境的資料與截圖；公開版本保留通用介面及架構圖，含實際紀錄的畫面暫不附上。介面位置可能隨版本改變，語法請搭配 [KQL 文件](https://www.elastic.co/docs/reference/query-languages/kql) 閱讀。

## 什麼是Kibana？這就是Kibana

那我們這次的分享就到這邊，謝謝大家。

開玩笑的啦！

大概說明一下，Kibana是一個為Elasticsearch設計的GUI介面，使用他我們可以做到下面的事情：

- 分析、搜尋、操作、視覺化 Elasticsearch 中的資料
- 管理 Elastic Stack 的相關設定

Kibana能幫到我們什麼？

- 將資料視覺化
- 使用Kibana Lens可以用簡單直觀的拖拉完成視覺化
- Dashboards，可以給一個整體的圖表，可以立刻知道系統哪裡有問題，也有預設範本可以使用
- Alert機制：設定閥值來觸發特定動作（Slack通知、寄email等）

## Elastic Stack？他是什麼？

Elastic Stack 是搜尋、資料收集與視覺化等相關產品的組合，並不是每次使用 Elasticsearch 都需要安裝其中所有元件，大家可以參考這張圖

![資料收集、處理、索引與視覺化的元件分工](/blog/img/notion-kibana-101-elastic-stack.webp)

但今天我們主要是要說明Kibana要如何使用，有興趣的話，各位可以再來與我討論Elastic Stack的相關細節

## 關鍵名詞解釋

有幾個名詞需要先說明一下：

- Event： Logs 在 Kibana 中稱為 Events，包含 timestamp 及相關資訊
- Document： 每筆 Log 最後會變成的 JSON object
- Index： Document 的容器，用來整理資料協助工作流程用

## 如何在Kibana中查找資料？

而為了能夠找到我們要的資料，Kibana提供我們幾種方式：

- KQL (Kibana Query Language)
- The Lucene query
- The query DSL (Domain Specific Language)

這邊我們以說明KQL為主

## Kibana功能簡介

![Kibana 的 Discover 與其他分析功能入口](/blog/img/notion-kibana-101-navigation.webp)

- Discover - 使用Kibana來query
- Dashboard - 使用Kibana把圖表放在一個儀表板上
- Canvas - 可以更加客製化顯示的圖表
- Maps - 把資料顯示在地圖上
- Machine Learning - 就是個機器學習
- Graph - 可以畫出很酷的連線圖
- Visualize - 使用Kibana來畫圖表

## 使用Query來找我們要的資料

### 使用Filter過濾

過濾的條件我們可以增加很多組，其中的Operator也有很多選擇，is代表值要完全符合，is not代表要完全不符合（通常用在排除不要的），exists代表有這個欄位存在，因為很多時候Log的資訊可能會缺一些欄位，這時候就很方便了

![Kibana Filter 可選擇的比對運算子](/blog/img/notion-kibana-101-filter-operators.webp)

### 使用時間區段來找

當我們一開始進入畫面的時候，預設會是抓個簡單的時間區間，可能是Last 15 mins之類的，我們可以點選左邊的下拉選單進行選擇，裡面有一些快捷的選項可以直接點選。

另外在最下方我們可看到有一個「Refresh every ...」的選項，這代表他自動多久會重新載入新的資料，這在我們要長期觀察是有異常十分好用

![Kibana 的快速時間範圍與自動刷新選項](/blog/img/notion-kibana-101-quick-time-range.webp)

而如果我們想要拉一個時間區間，有兩種方式，一個是很直覺的直接在時間軸上拖拉想要的範圍

![在時間直方圖上拖曳選取查詢範圍](/blog/img/notion-kibana-101-time-histogram.webp)

再不然我們也可以點一下時間區域的「show dates」來選擇我們要的起始跟結束時間

![設定查詢起點的相對時間](/blog/img/notion-kibana-101-relative-time.webp)

![將查詢終點設定為每次刷新時的現在](/blog/img/notion-kibana-101-end-time-now.webp)

### 只將我們主要關注的欄位顯示在列表上

因為一筆Document可能含有非常多的資訊，包含了原本LOG本身還有經過Filebeat/Elasticsearch parsing過的資料，所以我們可以透過選擇我們要的欄位來看我們想要的資訊

預設會將許多資訊寫在列表上，不方便閱讀，展開該 document 後的資訊量也可能很多。原稿的實際日誌畫面未附於此版。

這個時候我們可以在我們有興趣的欄位右方點選右方倒數第二個選項，就可以將該欄位加入顯示資訊，讓列表只顯示我們選擇的資訊

### 使用Query（KQL）條件來查

但如果我們要再進一步針對這些資訊來查詢的話呢？

這時候我們還可以使用Query（KQL）來進行查找，我們可以直接在裡面輸入我們想要查的資訊，

如：`uwsgi OR stopped`，明確表達想找含有任一關鍵字的紀錄。不要把沒有運算子的兩個詞直接認定為 OR；欄位的 mapping 與分析方式也會影響比對結果。

用uwsgi and stopped 的話則是可以找到同時有uwsgi跟stopped的log

更進一步，我們還可以指定我們要的欄位，例如 `message: (uwsgi AND stopped)`；欄位名稱與比對方式要依自己的資料結構調整。

### 前人存常用Query，後人直接爽用

大家可以點右邊上方有個「Open」的按鈕，裡面有前人寫好常用的Query/Filter，可以快速的找到自己想要的資料

而如果今天各位寫了一個很不錯的Query想要分享給大家，那麼也可以按下Save按鈕，取個好名字上架

### 綜合技

說了這麼多東西，想必大家頭都有點暈了

那就來說說我推薦的使用方式

<u>首先，先使用時間區段來拉出較小的資料，再利用一些filter把一些不需要的資料過濾掉，並點選我們想看的欄位，最後再使用query把我們要的資料拉出來</u>

而如果各位想要再進一步了解KQL要如何使用，可以參考這個link
[https://www.elastic.co/guide/en/kibana/master/kuery-query.html](https://www.elastic.co/guide/en/kibana/master/kuery-query.html)

希望大家都能夠用Kibana用得愉快！

REF

[https://linyencheng.github.io/2020/09/10/elastic-kibana-quick-start/](https://linyencheng.github.io/2020/09/10/elastic-kibana-quick-start/)
