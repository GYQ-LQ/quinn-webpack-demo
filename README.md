# demo01

## 安装

#### 全局安装：

```
npm install webpack
```

#### 项目本地安装：

```
mkdir demo01 && cd demo01
npm init -y
npm install webpack webpack-cli --save-dev
```

## 起步

#### 创建一个 bundle 文件

> 首先，我们稍微调整下目录结构，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载.

```
构建命令：npx webpack
```

#### 使用一个配置文件
