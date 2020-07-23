# demo01 安装&起步

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

#### 使用一个配置文件 webpack.config.js

```
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

> npx webpack --config webpack.config.js
>
> - 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。

#### NPM 脚本(NPM Scripts)

```
// 现在，可以使用 npm run build 命令，来替代我们之前使用的 npx 命令。
{
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack"
    }
}
```

# demo02 管理资源

## 加载 CSS

```
npm install --save-dev style-loader css-loader

const path = require('path');
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

## 加载图片

```
npm install --save-dev file-loader

rules: [{
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        'file-loader'
    ]
}, ];
```

> file-loader 和 url-loader 可以接收并加载任何文件，可以将它们用于任何类型的文件，包括字体

## 加载字体

```
rules: [{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
        'file-loader'
    ]
}, ];
```

## 加载数据

如 JSON、CSV、TSV 和 XML

```
npm install --save-dev csv-loader xml-loader
rules: [{
    test: /\.(csv|tsv)$/,
    use: [
        'csv-loader'
    ]
}, {
    test: /\.xml$/,
    use: [
        'xml-loader'
    ]
}, ];
```

data.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

# demo03 管理输出

## 多入口文件

```
const path = require("path");
module.exports = {
    entry: {
        app: "./src/index.js",
        print: "./src/print.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

## 设定 HtmlWebpackPlugin

npm run build 自动构建生成 /dist/index.html

```
npm install --save-dev html-webpack-plugin

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Title From Config'
     })
   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

## 清理 /dist 文件夹

由于过去的代码示例遗留下来，导致我们的 /dist 文件夹相当杂乱。webpack 会生成文件，然后将这些文件放置在 /dist 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。

通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件。让我们完成这个需求。

```
npm install clean-webpack-plugin --save-dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
	new CleanWebpackPlugin()
],
```

## Manifest

你可能会感兴趣，webpack 及其插件似乎“知道”应该哪些文件生成。答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。如果你对通过其他方式来管理 webpack 的输出更感兴趣，那么首先了解 manifest 是个好的开始。

```
npm install --save-dev webpack-manifest-plugin
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
    // ...
    plugins: [
      new ManifestPlugin()
    ]
};
```

生成文件 manifest.json

```
{
  "app.js": "app.bundle.js",
  "print.js": "print.bundle.js",
  "index.html": "index.html"
}
```

# demo04 自动编译代码的简单开发服务器（开发）

## 使用 source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。

```
module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
   devtool: 'inline-source-map',
};
```

> devtool 此选项控制是否生成，以及如何生成 source map。
> 使用  SourceMapDevToolPlugin  进行更细粒度的配置。查看  source-map-loader  来处理已有的 source map。
> 你可以直接使用  SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin  来替代使用  devtool  选项，因为它有更多的选项。
> 切勿同时使用  devtool  选项和  SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin  插件。devtool  选项在内部添加过这些插件，所以你最终将应用两次插件。

## 选择一个开发工具

每次要编译代码时，手动运行  npm run build  就会变得很麻烦。
webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

### 1. webpack's Watch Mode

使用观察模式 webpack --watch

```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "build": "webpack"
},
```

### 2. webpack-dev-server

使用 webpack-dev-server

- webpack.config.js:

```
npm install --save-dev webpack-dev-server

module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist'
   }
};
```

- package.json

```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
      "build": "webpack"
},
```

### 3. webpack-dev-middleware

webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。接下来是一个 webpack-dev-middleware 配合 express server 的示例

```
npm install --save-dev express webpack-dev-middleware
```

接下来我们需要对 webpack 的配置文件做一些调整，以确保中间件(middleware)功能能够正确启用：

- webpack.config.js

```
  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
  };
```

- server.js

```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

现在，添加一个 npm script，以使我们更方便地运行

- package.json

```
 {
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
+     "server": "node server.js",
      "build": "webpack"
    },
  }
```

npm run server 访问： http://localhost:3000

## 结论：学会了如何自动编译代码，并运行一个简单的开发服务器(development server)！！！
