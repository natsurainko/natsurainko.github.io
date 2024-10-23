var posts=["2024/10/23/hello-world/","2024/10/23/使用-hexo-github-pages-搭建个人博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };