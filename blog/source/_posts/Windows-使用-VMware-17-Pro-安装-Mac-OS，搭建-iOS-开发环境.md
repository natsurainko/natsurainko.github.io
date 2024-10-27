---
title: Windows 使用 VMware 17 Pro 安装 Mac OS，搭建 iOS 开发环境
date: 2024-10-27 22:43:37
categories: 开发实践
tags: 
    - iOS
    - VMware
    - Xcode
top_img: /images/2024-10-28/top-image.png
---

#### 本文参考文章

> [【2023最新版】VMware Workstation Pro v17安装教程+激活秘钥](https://zhuanlan.zhihu.com/p/663874133)  
> [Windows用VM虚拟机安装MacOS Ventura 13.6系统全流程教程](https://zhuanlan.zhihu.com/p/658521465)  

### 前言与其他方案论述

在最开始选择在 Windows 搭建 iOS 开发环境时，尽管 VMware 虚拟机（或是 Hyper-V）运行 Mac OS 的方案已经很多，但我第一选择没有选择它（尽管最后兜了一圈还是绕回来了）

**先来说说 VMware 方案的缺点**  
1. VMware 原生不支持 Mac OS 的安装，是需要使用第三方 Unlocker 之后才能创建 Mac OS 的虚拟机
2. VMware 虚拟机运行的 Mac OS 事实上没办法调用显卡，也没任何方法安装显卡驱动或是借助某些手段间接调用显卡，这使得其对 CPU 的性能要求非常高
3. VMware Tools 对于显示渲染的优化似乎并不好，甚至是负优化。在我测试时安装 VMware Tools 后，反而导致虚拟机容易崩溃，貌似因为反复渲染而导致虚拟机死机

**VMware 方案的优点**
1. VMware（或 Hyper-V 等）虚拟机方便管理与保存虚拟机状态
2. VMware（或 Hyper-V 等）虚拟机能够直接连接物理 USB，从而能从虚拟机调试物理设备（这是最为重要的）

最开始时我首先考虑到了 VMware 虚拟机的缺点，所以一开始采用的是 OSX-KVM 的方案  
具体文章可以参考这两篇  

> [在Windows11 WSL上通过QEMU KVM流畅运行macOS虚拟机（2024）](https://classsoft.net/archives/Smoothly-run-macOS-VMs-on-Windows10--with-WSL-and-QEMU-KVM.html)  
> [在 Windows 上流畅使用 MacOS 虚拟机](https://blog.hal.wang/7afa8fc1/)


**尽管 OSX-KVM 方案确实有它的好处**  
例如：  
1. 由于 Linux 下的 KVM 能够通过虚拟 GPU 硬件，间接调用物理显卡，因此在显示性能上远远超过 VMware 方案
2. 调用 GPU 渲染，因此大大减轻了 CPU 的负载

**但是！在我一遍遍排除万难在 Windows 11 上安装了 Wsl2，又在 Wsl 里面成功配置了 KVM 虚拟机，又成功安装 Mac OS 到了 KVM 虚拟机之后，最终才发现 USB 总线没办法透过两层虚拟机传给 Mac OS，这意味我没办法进行实机调试和安装，最终放弃了这个方案**

> 当然如果只是想在 Windows 上体验 Mac OS，你可以选择此方案，只是稍微有些折腾，但是是可行的（我实测过可以，但过程有些痛苦）

### 安装 VMWare 17 Pro 虚拟机

安装虚拟机和过程在此不赘述，因为相关文章太多了  
这里提供一篇安装步骤参考文章，以及找到的一个城通网盘的 VMWare 17 Pro 下载链接  
*（目前 VMware 被收购之后，下载软件本体变得极为困难，那个破登录、许可证始终搞不好）*  

[【2023最新版】VMware Workstation Pro v17安装教程+激活秘钥](https://zhuanlan.zhihu.com/p/663874133)  
[城通网盘 VMware17](https://545c.com/d/7369060-52756935-0f8a8d)  

### 在 VMware 虚拟机中安装 Mac OS

这里提供 Unlocker GitHub 下载地址，以及两个 Mac OS 的安装镜像，分别是 13 Ventura 和 14 Sonoma  

[[GitHub Releases] Unlocker 4.2.7](https://github.com/DrDonk/unlocker/releases)  
[[mediafire] macOS Ventura ISO for VM by techrechard.com.iso](https://download2390.mediafire.com/6nv18jgzbzkgFHkjejBmYTrFY2R_m_oOB0jswGjQK5WXIa_CPxyeYYiwCxgB3KynQxb0JySfjwrqWEgQpJqIoKvLky_bdcZnOCIdNzCBjo_-7Fqo6yCD0bHjszxpmK1PFFfWGgxSJ4hgB8SsJMlKaGPaLW3Aw4a8i3jNj0jrju52EF4W/dcji26zay7s3p8r/macOS+Ventura+ISO+for+VM+by+techrechard.com.iso)  
[[mediafire] macOS Sonoma ISO by techrechard.com.iso](https://download2438.mediafire.com/0xh6gfoh7vdgDbb5RDXM-9hY8glz8qexIGeY3iurbafC0yfjOxEqCo3JwOmmgwv5TQekTAydtanpqBzRCshZLjvCscoq9RL5hmHMYLotXYddqxQ8Pbw28ejhAeE5abz8659XyJBBO8McEa8XR0t2XTgsJdo_0m412uQ2c7zjuTOJ/vku90kjifs1fmu0/macOS+Sonoma+ISO+by+techrechard.com.iso)  

> 我个人建议选择 14 Sonoma 的镜像安装，  
> 因为这个 13 Ventura 的镜像最高支持的 Xcode 版本是 `Xcode 14.3.1` 而它最多支持到 `iOS 16.4`，  
> 现在最新的都已经是 `iOS 18.1`，像我自己的设备是 `iOS 17.4`，用 Ventura 完全没法开发，  
> 而 `macOS Sonoma 14.5` 则支持最新的 `iOS 18.1`（提供的镜像是 14.0 的需要自己更新系统）  

具体安装请参考这篇文章  
[Windows用VM虚拟机安装MacOS Ventura 13.6系统全流程教程](https://zhuanlan.zhihu.com/p/658521465)

### 配置 Mac OS 虚拟机的序列号

在上一步安装 Mac OS 的步骤教程中，有一步是让你往虚拟机配置文件中添加如下配置
```
board-id.reflectHost = "FALSE"
board-id = "Mac-AA95B1DDAB278B95" 
hw.model.reflectHost = "FALSE" 
hw.model = "MacBookPro19,1" 
serialNumber.reflectHost = "FALSE" 
serialNumber = "C01234567890"
```
这一段配置其实就是在配置虚拟机的序列号，但是很明显上面的序列号代码 `serialNumber` 是乱写的

**为什么要配置序列号代码**  

因为在高版本 Mac OS 登录 App Store 的时候会验证你的机器码（主要包括主板 Id，机器序列号，BIOS 序列号等）  
如果乱写，或是三个对不上的话，是没办法登录 App Store 的  
下面找了一段实测可以使用的机器码

```
board-id.reflectHost = "FALSE"
board-id = "Mac-94245B3640C91C81"
hw.model.reflectHost = "FALSE"
hw.model = "MacBook Pro"
serialNumber.reflectHost = "FALSE"
serialNumber = "C02JJ8B3DH2G"
smbios.reflectHost = "FALSE"
```

当然你也可以使用其他的 *三码工具* 来生成正确的机器码  
例如 [黑苹果自动获取与注入三码的方法，附相关工具，解锁iCloud变白果！](https://blog.csdn.net/Z17362251225/article/details/125891385)  
不过我们只需要拿到生成好的三码，之后写入到上面的配置文件的对应位置，不需要用那些注入工具

### 关于 VMware Tools

我自己在使用的时候发现安装了 `VMware Tools` 之后容易导致虚拟机一些渲染问题  
同时加重了渲染负担，容易导致虚拟机渲染卡死，崩溃等问题  

> **我个人认为是不建议安装的**，尽管不装它也会导致一些问题，比如无法调整分辨率之类的，也请各位酌情考虑是否安装  

### VMware 虚拟机优化

有许多方案从不同的角度对虚拟机进行优化

1. 使用 beamoff， 参考安装 Mac OS 教程流程的第六步
2. 修改最小化动画，参考 [苹果电脑设置应用最小化窗口时动画效果？](https://jingyan.baidu.com/article/3aed632e64f485311180910f.html)
3. 使用 Onyx，参考 [优化不必要的动画，以减少Mac卡顿](https://blog.csdn.net/Deng_Xian_Sheng/article/details/124533828)

### Xcode 开发环境配置

#### 安装 Xcode

请在此处选择合适版本的 Xcode 软件包下载并进行安装  
[More Downloads](https://developer.apple.com/download/all/)

#### 安装 iOS 模拟器

**首先需要强调的是，任何 iOS 真机调试，都需要 iOS 对应版本的模拟器**  
尽管 Xcode 安装时，会自带勾选一个该 Xcode 版本发布时最新的 iOS 版本的模拟器，但是这在大多数情况下都不适合真机调试  
所以更多的你需要安装对应版本的 iOS 模拟器，你可以手动安装，就像下面这篇文章一样，你也可以在连接 iPhone 时，通过连接提示来安装对应的模拟器  

关于手动安装请参考 [Xcode15真机调试iOS17的方法](https://blog.csdn.net/RreamigOfGirls/article/details/138581052)

#### 连接 iPhone 到 Mac OS

直接连接 iPhone 到电脑，在虚拟机已经启动的时候，第一次连接时 iPhone 会提示是否连接此设备到虚拟机，此时点击是即可，或者也可以在 iPhone 已连接到电脑后，在 VMware 虚拟机窗口的右下角，找到一排图标，其中找到手机的图标，右键它打开菜单选择连接

### 完成

**至此完成了整个开发环境的搭建**  
过程十分艰难，我在此也只是概述其中步骤，并之抓了几个注意点阐述，更多的还是需要网上查阅大量的资料，结合自身情况考虑每一步操作

![展示 1](/images/2024-10-28/1.png "属性")
![展示 2](/images/2024-10-28/2.png "Xcode 连接 iPhone")

