
---

# demo01 安装&起步 [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-demo/tree/master/demo01)

## 安装 
 
#### 全局安装
```
npm install webpack
```

#### 项目本地安装

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

---

# demo02 管理资源 [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-demo/tree/master/demo02)

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
> 请注意，在多数情况下，你也可以进行 [CSS 分离](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)，以便在生产环境中节省加载时间。最重要的是，现有的 loader 可以支持任何你可以想到的 CSS 处理器风格 - [postcss](https://www.webpackjs.com/loaders/postcss-loader), [sass](https://www.webpackjs.com/loaders/sass-loader/) 和 [less](https://www.webpackjs.com/loaders/less-loader) 等。

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


---

# demo03 管理输出 [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-demo/tree/master/demo02)

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


---

# demo04 自动编译代码的简单开发服务器（开发） [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-demo/tree/master/demo04)

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

---

# demo05 模块热替换 [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-demo/tree/master/demo05)

- index.js

```
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

更改 print.js 中 console.log 的输出内容，你将会在浏览器中即可以看到更新。

- print.js

```
 export default function printMe() {
-   console.log('I get called from print.js!');
+   console.log('Updating print.js...')
  }
```

## 启用 HMR

### 方式一：配置 webpack.config.js 文件。

- webpack.config.js

```
const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### 方式二：你可以通过命令来修改 webpack-dev-server 的配置：webpack-dev-server --hotOnly。

```
{
-  "start": "webpack-dev-server --open",
+  "start": "webpack-dev-server --hotOnly",
}
```

## 通过 Node.js API

### 方式三： webpack dev server 和 Node.js API

> 当使用 webpack dev server 和 Node.js API 时，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。例如：

```
new WebpackDevServer(compiler, options)
```

> 想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。webpack-dev-server package 中具有一个叫做 addDevServerEntrypoints 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个小例子：

- dev-server.js

```
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

> 运行 node dev-server.js

### 方式四：如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。

## 问题

模块热替换可能比较难掌握。为了说明这一点，我们回到刚才的示例中。如果你继续点击示例页面上的按钮，你会发现控制台仍在打印这旧的 printMe 功能。

这是因为按钮的 onclick 事件仍然绑定在旧的 printMe 函数上

为了让它与 HMR 正常工作，我们需要使用 module.hot.accept 更新绑定到新的 printMe 函数上：

- index.js

```
import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick 事件绑定原始的 printMe 函数上

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // 重新渲染页面后，component 更新 click 事件处理
+     document.body.appendChild(element);
    })
  }
```

## HMR 修改样式表

```
借助于 style-loader 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签。

npm install --save-dev style-loader css-loader
```

- webpack.config.js

```

  module.exports = {
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader']
+       }
+     ]
+   },
  };
```

## 其他代码和框架

社区还有许多其他 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互

- [React Hot Loader](https://github.com/gaearon/react-hot-loader)：实时调整 react 组件。
- [Vue Loader](https://github.com/vuejs/vue-loader)：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
- [Elm Hot Loader](https://github.com/fluxxu/elm-hot-loader)：支持用于 Elm 程序语言的 HMR。
- [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux)：无需 loader 或插件！只需对 main store 文件进行简单的修改。
- [Angular HMR](https://github.com/gdi2290/angular-hmr)：No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.没有必要使用 loader！只需对主要的 NgModule 文件进行简单的修改，由 HMR API 完全控制。




---

# demo06 tree shaking [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-demo/tree/master/demo06)

## tree shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)

### 将文件标记为无副作用(side-effect-free)
在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。

这种方式是通过 package.json 的 "sideEffects" 属性来实现的。
```

{
  "name": "your-project",
  "sideEffects": false
}
```
> 「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。
```
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```
> 注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：
```
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```
### 压缩输出

通过如上方式，我们已经可以通过 import 和 export 语法，找出那些需要删除的“未使用代码(dead code)”，然而，我们不只是要找出，还需要在 bundle 中删除它们。为此，我们将使用 -p(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。

> 注意，--optimize-minimize 标记也会在 webpack 内部调用 UglifyJsPlugin。

从 webpack 4 开始，也可以通过 "mode" 配置选项轻松切换到压缩输出，只需设置为 "production"。
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ mode: "production"
};
```

> 注意，也可以在命令行接口中使用 --optimize-minimize 标记，来使用 UglifyJSPlugin。

### 结论
为了学会使用 tree shaking，你必须……
- 使用 ES2015 模块语法（即 import 和 export）。
- 在项目 package.json 文件中，添加一个 "sideEffects" 入口。
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。


## 生产环境构建
开发环境(development)和生产环境(production)的构建目标差异很大，我们通常建议为每个环境编写彼此独立的 webpack 配置。

遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

### 配置
```
npm install --save-dev webpack-merge
```
- webpack.common.js
```
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

- webpack.dev.js
```
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```
- webpack.prod.js
```
+ const merge = require('webpack-merge');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   plugins: [
+     new UglifyJSPlugin()
+   ]
+ });
```

### NPM Scripts

- package.json
```
{
  "scripts": {
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
}
```

### Minification
注意，虽然 UglifyJSPlugin 是代码压缩方面比较好的选择，但是还有一些其他可选择项。以下有几个同样很受欢迎的插件：
- BabelMinifyWebpackPlugin
- ClosureCompilerPlugin
如果决定尝试以上这些，只要确保新插件也会按照 tree shake 指南中所陈述的，具有删除未引用代码(dead code)的能力足矣。

### source map
我们鼓励你在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。虽然有如此强大的功能，然而还是应该针对生成环境用途，选择一个构建快速的推荐配置（具体细节请查看 devtool）。对于本指南，我们将在生产环境中使用 source-map 选项，而不是我们在开发环境中用到的 inline-source-map
- webpack.prod.js
```
  module.exports = merge(common, {
+   devtool: 'source-map',
    plugins: [
-     new UglifyJSPlugin()
+     new UglifyJSPlugin({
+       sourceMap: true
+     })
    ]
  });
```
> 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 大小，并降低整体性能。

### 指定环境
许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
- webpack.prod.js
```
+ const webpack = require('webpack');
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
-     })
+     }),
+     new webpack.DefinePlugin({
+       'process.env.NODE_ENV': JSON.stringify('production')
+     })
    ]
  });
```

> 技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 #2537。因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

如果你正在使用像 react 这样的 library，那么在添加此 DefinePlugin 插件后，你应该看到 bundle 大小显著下降。还要注意，任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的：

- src/index.js
```
import { cube } from './math.js';
+
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }

  function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```
### Split CSS
正如在管理资源中最后的 [加载 CSS](https://www.webpackjs.com/guides/asset-management#loading-css) 小节中所提到的，通常最好的做法是使用 ExtractTextPlugin 将 CSS 分离成单独的文件。在[插件文档](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)中有一些很好的实现例子。disable 选项可以和 --env 标记结合使用，以允许在开发中进行内联加载，推荐用于热模块替换和构建速度。

### CLI 替代选项
以上描述也可以通过命令行实现。例如，--optimize-minimize 标记将在后台引用 UglifyJSPlugin。和以上描述的 DefinePlugin 实例相同，--define process.env.NODE_ENV="'production'" 也会做同样的事情。并且，webpack -p 将自动地调用上述这些标记，从而调用需要引入的插件。

这些简便方式虽然都很不错，但是我们通常建议只使用配置方式，因为在这两种场景中下，配置方式能够更好地帮助你了解自己正在做的事情。配置方式还可以让你更方便地控制这两个插件中的其他选项。