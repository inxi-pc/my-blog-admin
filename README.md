# my-blog
Vue.js based blog(admin part)

# Concept
`mvvm framework`
`webpack`
`single page`
`web application`

# Name rule
Var: little camel-case
Function: little camel-case
Package: lower-case, split by '-'
Package Class import & Class: big camel-case
Path: lower-case, split by '_'

Filename: 
1. `api/` `component/` `lib/` `module/` belong to Class type
file name use big camel-case
2. another belong to Package type, use lower-case, split by '-'

# Using tool & version
```javascript
{
  "name": "my-blog",
  "version": "1.0.0",
  "description": "Bingchao Xiong first blog",
  "main": "main.js",
  "dependencies": {
    "vue": "^1.0.26"
  },
  "devDependencies": {
    "babel-core": "^6.13.2",
    "babel-loader": "^6.2.4",
    "babel-plugin-transform-runtime": "^6.12.0",
    "babel-preset-es2015": "^6.13.2",
    "babel-runtime": "^6.11.6",
    "bootstrap": "^3.3.7",
    "css-loader": "^0.23.1",
    "datatables": "^1.10.12",
    "datatables-bootstrap": "0.0.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "gulp": "^3.9.1",
    "imports-loader": "^0.6.5",
    "jquery": "^3.1.0",
    "jquery-ui": "^1.12.0",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "vue-hot-reload-api": "^1.3.3",
    "vue-html-loader": "^1.2.3",
    "vue-loader": "^8.5.3",
    "vue-router": "^0.7.13",
    "vue-style-loader": "^1.0.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1",
    "webpack-stream": "^3.2.0"
  },
  "scripts": {
    "dev": "webpack-dev-server --inline --hot",
    "build": "webpack -p"
  },
  "author": "Owen Xiong",
  "license": "ISC"
}
```

# Build
```shell
npm install
npm run dev

##then open brower, input localhost:8080
```