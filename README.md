### Basic starter kit for Front-End Developers
> Global requirements: [Node.js](https://nodejs.org/)

To start project do:

```sh
$ cd "project_root"
```
```sh
$ npm i
```

After installation do:
```sh
$ gulp
```

Project will be open [localhost:3000](http://localhost:3000) in your default browser automatically.
Also you can open [localhost:3000](http://localhost:3000) in your browser manually.

#### Starter kit contains:

+ [Gulp](http://gulpjs.com/) - as a build system
+ [Webpack](https://webpack.github.io/) - as a javascript module bundler.
    + [uglify-js](https://github.com/mishoo/UglifyJS2) - for generating compressed bundle
    + [ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) - for modules, which required globally.
