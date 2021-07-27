# BozonPackageDependencyInjectorPlugin
webpack plugin that allows to injects dependencies into the empty package.json that bozon creates in its builds folder

its main purpose is to allow the copy of a list of native modules that are not packed by webpack

## parameters
an object containeing the following properties

 - src (fs.PathLike): the path to the folder containing the source package.json (usually ".")
 - dest (fs.PathLike): the path to the folder containing the destination package.json (usually "build/production")
 - dependencies (string[]): a list of dependencies that must be referenced in the source package 

## usage

```
  const BozonInjecterPlugin = require('./BozonPackageInjecterPlugin');
  const mode = 'production';
  module.exports = {
  main: {
    externals: {
      "node-hid" : 'commonjs node-hid'
    },
    entry: './src/main/index.js',
    plugins:[
      new BozonInjecterPlugin({ src: ".", dest: `./builds/${mode}`, dependencies:[
          'node-hid'
        ]})
    ]
  }
  }
```
