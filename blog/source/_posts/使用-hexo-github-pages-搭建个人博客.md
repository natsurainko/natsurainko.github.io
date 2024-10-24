---
title: 使用 hexo + github pages 搭建个人博客
date: 2024-10-23 21:55:53
categories: 开发实践
tags: 
    - hexo
    - github-pages
    - web
---

> [本文参考文章地址](https://mini-pi.github.io/2024/02/28/how-to-make-blog-wedsite/)

## 快速开始

### 创建 GitHub 仓库

创建一个名为 `<username>.github.io` 的仓库，其中 `<username>` 替换为你自己的用户名称  
例如我的仓库 [natsurainko.github.io](https://github.com/natsurainko/natsurainko.github.io)

### 创建分支

在创建的 `<username>.github.io` 仓库下新建一个分支 `source` 用于存放你 `hexo` 的源代码，  
而原分支 `main` 等下将用于 `GitHub Pages` 的部署

### 本地部署 hexo

克隆 `<username>.github.io` 仓库到本地，并切换到 `source` 分支  
在此目录下运行以下命令
``` bash
npm install -g hexo-cli
hexo init blog
cd blog
npm install
```

命令会在仓库目录下新建文件夹 `/blog`  
并初始化 hexo 及其配置文件  
接下来尝试运行这条命令来启动 hexo 本地服务器
``` bash
hexo server
```
成功运行的话就算本地配置成功了  
你可以将现在这部分的代码提交上分支进行保存

### 配置 hexo 主题

引用的帖子里面使用 Next 主题，  
但如你所见，我自己搭建时使用的是 `安知鱼主题` 具体配置步骤可以看[这篇文档](https://docs.anheyu.com/initall.html)  
> 其他 hexo 主题可以看官方[主题浏览页面](https://hexo.io/themes/)

但配置 hexo 主题基本步骤基本都相同，就是  
克隆主题仓库到 `/blog/themes/<theme>` ，其中 `<theme>` 为这个主题的名称  
然后修改文件 `/blog/_config.yml`  
``` yaml
theme: <theme>
```

然后重新运行 `hexo server` 应用主题  

对于每个主题的细节配置，请修改这个文件 `/blog/themes/<theme>/_config.yml`，  
每个主题的 `_config.yml` 并不相同，具体配置不在此赘述

### 修改、添加博客内容

对于个人信息，站点标题之类的配置，请修改文件 `/blog/_config.yml`  
具体参见[官方配置文档](https://hexo.io/docs/configuration.html)

``` yaml
# Site
title: "natsurainko 的博客"
subtitle: "Forever young erver strong ever brave"
description: "这里能看到我的一些开发经历和一些开发教程，<br>希望能对你有所帮助"
keywords:
author: Natsurainko
language: zh
timezone: ''
```

创建一篇新文章或者新的页面，请在 `/blog` 目录下运行这条命令
``` bash
hexo new [layout] <title>
```
具体参见[官方写作文档](https://hexo.io/zh-cn/docs/writing)

### 部署 hexo 到 GitHub Pages

请先修改文件 `/blog/_config.yml`，例如  

``` yaml
deploy:
  type: git
  repo: https://github.com/<username>/<username>.github.io.git
  branch: main
```

再安装部署工具 `hexo-deployer-git`，在 `/blog` 文件夹下运行  
``` bash
npm install hexo-deployer-git --save
```

最后再运行

``` bash
hexo clean      #清除之前生成的东西
hexo generate   #生成静态文章，缩写hexo g
hexo deploy     #部署文章，缩写hexo d
```

> [!CAUTION] 注意
> `hexo deploy` 命令会覆写仓库下 `main` 分支之前所有的提交，  
> 所以最开始不建议将代码文件直接放在 `main` 分支下  
> 且该命令会创建 `/blog/.deploy_git` 文件夹，用于存放之前的提交，  
> 如果删除了这个文件夹，下一次部署的时候之前的提交记录就会丢失

### 至此完成部署

请访问 `http://<username>.github.io` 以访问你的博客