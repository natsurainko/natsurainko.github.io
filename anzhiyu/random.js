var posts=["2024/10/27/Windows-使用-VMware-17-Pro-安装-Mac-OS，搭建-iOS-开发环境/","2024/10/23/hello-world/","2024/10/23/使用-hexo-github-pages-搭建个人博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };