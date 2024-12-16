## 平台简介

一款后台管理系统，基于若依那套框架改的Nodejs、Python版本，她可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA。这套框架会比若依更简便，更轻量级。

嘉仪，嘉言善行，仪态万方。

嘉仪是一套全部开源的快速开发平台，毫无保留给个人及企业免费使用。

此工程为前端代码，如需后端代码，移步后端代码，后端选其一即可

* 后端NodeJs版本代码，移步[JiaYi-NodeJs](https://gitee.com/auhgnep/JiaYi-NodeJs)
* 后端Python版本代码，移步[JiaYi-Python](https://gitee.com/auhgnep/JiaYi-Python)

## 开发

```bash
# 克隆项目
git clone https://gitee.com/auhgnep/JiaYi-Vue-Element

# 进入项目目录
cd jiayi-vue

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```