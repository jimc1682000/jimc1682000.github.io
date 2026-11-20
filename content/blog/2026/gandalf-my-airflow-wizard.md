---
title: "Gandalf，我的Airflow巫師"
pubDate: 2026-11-06
description: "從 DAG、Task 與執行實例理解 Airflow，保留舊版教學的概念與範例。"
tags: [維運]
---

<!-- 日期暫採轉存日；正式發文前確認。來源為本人自寫教學，完整原版另存於私人備份。 -->

> **舊版教學與範例。** 本文依撰寫當時的原稿保留，未更新技術說法、指令或程式範例。請依當時版本閱讀，勿直接作為現行環境的操作指引。

## 為什麼不用Cronjob就行？

### 難以理解

Cronjob設定難以閱讀理解，而且可能因為調整錯誤讓其他排程工作也受到影響

### 難以擴充

如果排程工作會耗盡所有資源，也只能擴充該執行的機器

### 難以相依

排程工作之間也無法有相依性、前後關連，只能夠用錯開時間的方式

### 難以監控

排程工作的LOG難以查找，而且如果錯誤的話也沒有簡單可視化的圖表供大家參考。

### 難以處理

排程工作一但失敗，就失敗了，不會再次重試，或於失敗後進行相對應的處理。

## Airflow設計理念

一個針對Workflow的平台工具，讓其可以更容易理解、執行及監控。

## 技術名詞

### 生活範例(？) - 丁次的肉彈戰車

[video](https://www.youtube.com/embed/7dmGdXpNzMQ?start=3&end=17)

忍法：肉彈戰車

步驟：結印-頭髮變長-向前滾動-攻擊敵人

### DAGs

Directed Acyclic Graph有向無環圖的簡稱，是所有"task"集合，並有組織的表示他們的相依性和關連性。

Airflow DAG使用Python程式碼表示其結構。

![有向無環圖的節點與依賴關係](/blog/img/notion-gandalf-my-airflow-wizard-dag.webp)

#### Default Arguments

將常用變數設定在default_args，他會將其佈署在DAG裡所有Operators。

#### Context Manager

Airflow 1.8之後，可以使用Context Manager的方式來撰寫：

```python
with DAG('my_dag', start_date=datetime(2016, 1, 1)) as dag:
    op = DummyOperator('op')
```

### DAG Runs

DAG Run是DAG的實例，裡面有包含了特定"execution_date"的task instances。

#### execution_date

一個"邏輯"上的時間，這個時間是DAG Run及其所含的task instances將要實現的。

### Task

DAG中代表"一個工作"的單位，即為Task；在DAG圖表中，會顯示為一個節點。

每個Task會是一個Operator的實際執行方式。

#### Relations between Tasks

```python
with DAG('my_dag', start_date=datetime(2016, 1, 1)) as dag:
    task_1 = DummyOperator('task_1')
    task_2 = DummyOperator('task_2')
    task_1 >> task_2 # Define dependencies
```

上述例子中，我們可以說task_1是task_2的上游，也可以說task_2是task_1的下游，因此DAG執行的時候，task_1會先執行，而task_2會等待task_1完成後才執行

### Task Instance (TI)

Task Instance代表了特定時間、特定task、特定DAG下的表現狀況，所以會有"running", "success", "failed", "skipped", "up for retry"等狀況。

### Reminder

DAG+RUN(State, Arg, Time) = DAG_RUN

Task+Instance(State, Arg, Time) = Task Instance(TI)

DAG = Task + Task + ...

DAG_RUN = Task Instance + Task Instance + ...

### Task Lifecycle

![Airflow 任務狀態與排程元件的關係](/blog/img/notion-gandalf-my-airflow-wizard-task-lifecycle.webp)

### Operators

如果說DAG說明了怎麼完成整個workflow，那麼Operators將會是實際上如何執行該task。

目前有以下幾個比較常用的Task(Operator)：

- BashOperator
- PythonOperator
- EmailOperator
- SimpleHttpOperator
- MySqlOperator...

#### Bitshift Composition

我們可以用">>"或"<<"的方式來指定Task的相互關係

```python
op1 >> op2
op1.set_downstream(op2)

op2 << op1
op2.set_upstream(op1)

op1 >> op2 >> op3 << op4
op1.set_downstream(op2)
op2.set_downstream(op3)
op3.set_upstream(op4)
```

我們也可以用LIST的方式來指定關係

```python
op1 >> [op2, op3] >> op4

#is equivalent to:
op1 >> op2 >> op4
op1 >> op3 >> op4
```

### Workflows

DAG + DAG Run + Operator + Task + Task Instance + execution_date == Workflows

### Additional Functionality

#### Hooks

Hooks就是外部平台或資料庫(Hive, S3, MySQL, HDFS...)的一個介面，當你用Python腳本的時候可以很方便的使用他得到一些像是hostname之類的變數

#### Connections

儲存在Airflow Metadata DB裡面對於外部系統Connection的設定，我們可以使用conn_id拿到該connection。

#### XComs

XCom可以讓task之間傳送訊息，可以讓一些共用狀態和更細微的控制更加容易。

XCom有推送pushed(sent)跟拉取pulled(received)兩種方式。

當一個task推送XCom，其他task將可以拿到該XCom，只要使用xcom_push()的方式，那麼就可以隨時隨地推送訊息。

Task使用xcom_pull()的方式來拿取XComs，我們可以選擇性的加上key, task_ids, dag_id來過濾我們要的資訊。

```python
# inside a PythonOperator called 'pushing_task'
def push_function():
    return value

# inside another PythonOperator where provide_context=True
def pull_function(**context):
    value = context['task_instance'].xcom_pull(task_ids='pushing_task')

#It is also possible to pull XCom directly in a template,
#here’s an example of what this may look like:
#SELECT * FROM {{ task_instance.xcom_pull(task_ids='foo', key='table_name') }}
```

### Jinja Templating

可以在DAG裡面使用Jinja Templating的方式拿到一些變數，詳細可參考 [Macros reference](https://airflow.apache.org/docs/stable/macros-ref.html)

```python
# The execution date as YYYY-MM-DD
date = "{{ ds }}"
```

### Trigger Rules

所有的Operator都有一個trigger_rule變數，可以決定哪些task可以被啟動，all_success是預設值，其他對應的值如下：

- all_success(default): 所有父項目都成功
- all_failed: 所有父項目都是"失敗"或是"上游失敗"的狀態
- all_done: 所有父項目都已執行完成(不論成功或失敗)
- one_failed: 只要任一父項目失敗，立馬執行，不等所有父項目完成
- one_success: 只要任一父項目成功，立馬執行，不等所有父項目完成
- none_failed: 所有父項目都沒有失敗("失敗"或"上游失敗")，舉例來說，所有父項目成功或跳過
- none_failed_or_skipped: 所有父項目都沒有失敗且至少一個父項目成功
- none_skipped: 沒有父項目是"跳過"的狀態，例如：所有父項目都是在"成功"，"失敗"或"上游失敗"的狀態
- dummy: 其相依性只是為了顯示，可隨意啟動

## Airflow Architecture

![Airflow 的排程器、執行器與中繼資料庫](/blog/img/notion-gandalf-my-airflow-wizard-architecture.webp)

### Metadata Database

這個DB會儲存task狀態的相關資訊，而這些DB資料更新都是使用SQLAlchemy達成，而因為通過SQLAlchemy抽象化，我們可以讓Airflow乾淨的與DB分離。

### Scheduler

一個process，使用metadata database裡面當中DAG定義與task的狀態來決定哪個task是否需要執行，當然也包含了優先順序，通常scheduler會作為service執行。

### Executor

一個message queuing process，與scheduler高度綁定，executor也會確認worker是否有真正執行排定的task。

目前有多種Executor可以讓我們選擇，LocalExecutor在同一台機器上開多個processes來執行task，CeleryExecutor則是將task運行在worker機器的群集上。

### Workers

實際進行task邏輯的process，由Executor來決定。

### Webserver

提供WEB UI操作介面

## My First DAG

### Install Airflow

REF: [https://airflow.apache.org/docs/stable/installation.html](https://airflow.apache.org/docs/stable/installation.html)

### Setup Airflow and Initial Airflow DB

```bash
# airflow needs a home, ~/airflow is the default,
# but you can lay foundation somewhere else if you prefer
# (optional)
export AIRFLOW_HOME=~/airflow

# install from pypi using pip
pip install apache-airflow

# REMEMBER TO INITIAL AIRFLOW DB!!!
# initialize the database
airflow initdb

# start the web server, default port is 8080
airflow webserver -p 8080

# start the scheduler
airflow scheduler

# visit localhost:8080 in the browser and enable the example dag in the home page
```

### Write a DAG

```python
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'DevOps',
    'description': '[原稿的環境專屬描述已省略]',
    'depend_on_past': False,
    'start_date': datetime(2019, 9, 13),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=3),
}

with DAG('airflow_demo', default_args=default_args, schedule_interval="5 * * * *", catchup=False) as dag:
    print_hello = BashOperator(
        task_id='print_hello',
        bash_command='echo "Hello DAG" '
    )

    print_current_date = BashOperator(
        task_id='print_current_date',
        bash_command='date'
    )

		print_hello >> print_current_date
```

## 我知道Operator很好用，但……

- 我想要有某個套件或第三方lib可以使用
- 我想要使用不同版本的Python or Java
- 我想要把相關的程式都放在一起，方便管理

### 這時候請使用DockerOperator

```python
send_notification = DockerOperator(
        task_id='send_notification',
        image='database_etl:latest',
        volumes=[
            '/opt/conf/config.yaml:/conf/config.yaml'],
        auto_remove=True,
        command='python3 some_folder/some_script.py ',
        network_mode="bridge",
        environment={"PYTHONPATH": "/"},
)
```

## 部署與 Plugin 延伸

> 原稿此處的環境專屬部署流程與 Plugin 範例未收錄於公開草稿，完整內容保留於私人原稿。

## TakeOut

- Cronjob有其缺陷，使用其他排程工具可以有效解決，像是Airflow
- 不止DAG可以細分為Task，執行DAG或Task當下的參數、時間和狀態可以再細分成不同的東西
- 一個好的架構，如同一個好的組織，職責要分明，才能夠不斷成長，就像是Airflow的架構一樣
- 當有太多特殊需求的時候，我們可以統一基本原則，然後用統一的使用方式使用，就像是將東西包成Docker後，使用Airflow DockerOperator來執行
- 一個好的系統，需要支援一定的擴充性，在Airflow上使用了Plugin來達成

## REF

[https://airflow.apache.org/docs/stable/concepts.html](https://airflow.apache.org/docs/stable/concepts.html)

[https://medium.com/@dustinstansbury/understanding-apache-airflows-key-concepts-a96efed52b1a](https://medium.com/@dustinstansbury/understanding-apache-airflows-key-concepts-a96efed52b1a)
