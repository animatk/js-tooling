
# Modern JavaScript Tooling

This project implement Webpack, Babel, React from scratch (without `create-react-app`)

### Get Started

To create this environment I follow the next steps.

```
npm init
```
define all parameters that will be set on `package.json` file.

## Webpack

Webpack automatize your building process minify and organize your production enviroment based on your source, to install:

```
npm install --save-dev  webpack webpack-cli   
```

- Create `./src/index.js` file (source code)
- Create `./dist` directory (optional)

> You can run **Webpack** on terminal using `$(npm bin)/webpack` command, it use the default entry file `/src/index.js` and default output `./dist/main.js` to build if `webpack.config.js` is not defined.

### Webpack config file

Create a file `webpack.config.js` file and specify the next

```javascript
const path = require('path');

module.exports = {
    mode: 'production', // "development" (not minified)
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'), //default ./dist/
        filename: 'app.bundle.js' //default main.js
    }
}
```

on `package.json` file you can create a new property inside `scripts` object 
```
"scripts": {
    "build": "webpack",
    ...
},
```

now you can run the `build` script just type the next on your terminal:

```
npm run build 
```

It going to take the `webpack.config.js` file and look the path on `entry` property and set a minified version of this source on the `output` `path` with specified `filename`.


## Babel

With Babel you can transform your modern javascript syntax to ES5, to install:

```
npm i -D @babel/core @babel/cli @babel/preset-env  
```

- Add some ES6 syntax to `./src/index.js` file.

```javascript
const getGreeting = name => `Hello ${name}!`
console.log(getGreeting('Alejandro'))
```

>With `@babel/cli` you can run **Babel** on terminal using `$(npm bin)/babel ./src/index.js --presets=@babel/preset-env` (this result is only prompted on terminal)

> Whitout the `@babel/preset-env` parameter Babel do not transform our code

### Integrate Babel with Webpack

```
npm i -D babel-loader 
```

Then modify the `webpack.config.js` adding `module` object 

```javascript
module.exports = {
    output: {
        ...
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env']
                }
                
            }
        ]
    }
}
```

`module` also contain an object `rules` that is an array where we goin to define specific actions to files on `test` (RegExp) here we define the **babel-loader** library and specify the **babel-env** preset option.


## React

```
npm i -S react react-dom prop-types
```

After install react we going to modify the `./src/index.js` and create new file `./src/App.js` and use `npm run build` to build the project.


```javascript
// App.js
import React from 'react'

class App extends React.Component {
    render() {
        return <h1>Hello World!</h1>
    }
}

export default App
```
On `./src/index.js` we replace all content with the next:

```javascript
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('app'))
```

Then we use `npm run build` to update our production package, note that this shows an error. 

```
ERROR in ./src/index.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/alejandro/Documents/js-tooling/src/index.js: Unexpected token (5:16)

  3 | import App from './App'
  4 | 
> 5 | ReactDOM.render(<App/>, document.getElementById('app'))
    |                 ^
  6 | 
```

The reason is that Babel isn't able to recognise `JXS` language so let's install a new preset to support to this.


```
npm i -D @babel/preset-react
```

We have to add the new preset to out `webpack.config.js` file


```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                ...
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
                
            }
        ]
    }
}
```

### Javascript proposed class syntax Babel support

If we add in our `./src/App.js` a syntax like `state = { ... }` inside our Class when Webpack try to build our code it will show the next error.

```
ERROR in ./src/App.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/alejandro/Documents/js-tooling/src/App.js: Support for the experimental syntax 'classProperties' isn't currently enabled (4:11):

  2 | 
  3 | class App extends React.Component {
> 4 |     state = {
    |           ^
  5 |         count: 0
  6 |     }
  7 |     render() {
```
That is because the syntax `state = {}` is not currently a valid javascript sentence (but is commonly used on ReactJS methodology).

To solve this we need to add a new Babel `plugin` to support this proposed class syntax.

```
npm i -D @babel/plugin-proposal-class-properties
```

After this we add the `plugin` in our `webpack.config.js` file.

```
module.exports = {
    ...
    module: {
        rules: [
            {
                ...
                options: {
                    presets: [...],
                    plugins: ['@babel/plugin-proposal-class-properties']

                }
            }
        ]
    }
}
```



## Webpack watch mode

We can add an aditional `script` (dev) to our `package.json` to build the project everytime we made changes on our source.

```
...
"scripts": {
    "build": "webpack",
    "dev": "webpack --watch --mode development",
    ...
}
```

Now we can use `npm run dev` in our terminal to create a watcher of our source files.

> The parameter `--mode development` compiles the bundle uncompressed

#### NPM scripts

We can call NPM scripts inside this script declarations in order to avoid redundance, for example to create a new `dev:hot` script with additional parameters we can do the next:

```
...
"scripts": {
    "build": "webpack",
    "dev": "webpack --watch --mode development",
    "dev:hot": "webpack --watch --hot --mode development"
    ...
}
```

As you can see we repeat a lot of command between `dev` and `dev:hot` scripts, a way to simplify this:
```
...
"scripts": {
    "build": "webpack",
    "dev": "webpack --watch --mode development",
    "dev:hot": "npm run dev -- --hot"
    ...
}
```

## Webpack development server

Optionally you can add a localhost server to test (I mean optionally because in my case I usually use Firebase hosting) but 1 avantage I found on this module is the auto-refresh (It runs in watch mode automatically)

To install
```
npm install webpack-dev-server --save-dev 
```
Then configure the server `port`, `path`, etc in **webpack.config.js** file

```
const path = require('path')

module.exports = {
  ...
  module: {
    ...
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 5000,
  },
}
```
Finally add the script in **package.json** to run the task
```
"scripts": {
    ...
    "start": "webpack-dev-server --open --host 0.0.0.0",
}
```

## CSS loader 

In order to make Webpack can import and build `CSS` files we need to add new loaders in our package,

```
npm i -D css-loader style-loader 
```

Then set a new rule for this new file types in our `webpack.config.js`

```javascript
module.exports = {
    output: {
        ...
    },
    module: {
        rules: [
            {
             ...
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    }
}
```

### Useful links

- [Webpack CodeSplitting](https://webpack.js.org/guides/code-splitting/) how to split bundle on multiple files and separate vendors from our code.
- [Webpack HTML](https://webpack.js.org/plugins/html-webpack-plugin/) manage your HTML templates in your source and use webpack to build it on your `dist` directory.
- [Webpack Merge](https://webpack.js.org/guides/production/#setup) Create separate `webpack.config.js` files for development/production environment using a base (`common`) file.
- [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) create a quick localhost that we can use in our development process (the host is refreshed when you made changes on your source).
- **Webpack SourceMap** adding this property `devtool: 'source-map'` to our `webpack.config.js` you can debug quickly (use Webpack Merge and set this option only on your development configuration file)
- [Babel-React HotReload](https://www.npmjs.com/package/react-hot-loader) With this plugin you can make changes on your source and watch it in your browser without reloading (preserve React state)
- [Webpack Bundle Analyzer](https://webpack.js.org/guides/code-splitting/#bundle-analysis) With `webpack-bundle-analyzer` and other analysis tools you can optimize your production environment.
- [Webpack externals](https://webpack.js.org/configuration/externals/#root) The externals configuration option provides a way of excluding dependencies from the output bundles. (for example load libraries like React from CDN on production environment using Webpack Merge)
- [ESlint](https://eslint.org/docs/user-guide/getting-started) Evaluate javascript source and maintain standardised code.
- [ESlint loader](https://github.com/webpack-contrib/eslint-loader) integrate eslint/webpack to check evaluate files before generate bundle.
- [ESlint Config Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) popular Javascript Rules to use with ReactJS; Check [ESlint Config Airbnb Base](https://www.npmjs.com/package/eslint-config-airbnb-base) to use without ReactJS
- [Husky](https://github.com/typicode/husky) Generates GIT hooks to run npm task before commit or push changes to repo.