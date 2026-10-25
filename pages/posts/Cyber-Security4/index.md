---
title: 网络安全学习日记4：DVWA靶场的搭建
date: 2026-8-1
updated: 2026-8-1
categories: 网络安全
tags:
  - 网络安全
  - 捆绑木马
  - 套壳
---

DVWA(Damn Vulnerable Web Application)一个用来进行安全脆弱性鉴定的PHP/MySQL Web 应用，旨在为安全专业人员测试自己的专业技能和工具提供合法的环境，帮助web开发者更好的理解web应用安全防范的过程。

<!-- more -->

1.下载并安装 phpstudy

[https://www.xp.cn/phpstudy](https://www.xp.cn/phpstudy)


2.下载 DVWA 源代码（github）并复制到 phpstudy 的 WWW 目录。（整个单独文件夹复制进去并且把文件夹名字改为dvwa）

3.打开 DVWA 目录里的 config 文件夹，把 config.inc.php.dist 这个文件先备份一份，找到配置选项进去修改一下，

![](https://image.smallaw.cc.cd//img1/cp4-1.png)

修改完后吧后缀 .dist 删掉。

5.在 phpstudy 首页一键启动 WNMP，启动成功后再浏览器输入 127.0.0.1/dvwa，输入你的用户名和密码，登录后点击下方的 create datebase。

6.刷新网页，输入用户名 admin、密码 password，就成功进入靶场页面了。

![](https://image.smallaw.cc.cd//img1/cp4-2.png)