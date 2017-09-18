# mmall-fe
网上商城

地址
http://119.23.106.31
或者访问域名
http://aboyl.org
附带了Nginx配置文件，如果要部署到自己的服务器上面可以把Nginx里面的/root/L/project地址以及域名改成自己的就好了
项目名称就是mmall也可以自己取
里面的dist文件通过npm run dist生成,如果是windows系统，则使用npm run dist_win

使用技术
html,css，jQuery技术
使用了CommonJs语法创建模块
使用webpack作为打包工具
使用hogan作为html渲染模版
使用git作为版本控制工具
使用了阿里云云服务器，系统为Centos 7
使用Nginx进行反向代理解决跨域问题
使用shell脚本进行发布
配置了淘宝源


生成项目的方法
1、在自己的机器上安装node.js,Nginx,webpack，配置好环境变量这些
2、创建自己的开发，生产环境文件夹，如本例子中的/root/L/developer和/root/L/project，用来存放不同的项目
3、拉取代码，配置Nginx，可以使用或者参考仓库中的Nginx.conf
4、调用脚本，也可以手动发布，要注意的是要把文件夹改成自己的