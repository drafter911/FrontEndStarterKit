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

Project will open [localhost:3000](http://localhost:3000) in your default browser automatically.
Also you can open [localhost:3000](http://localhost:3000) in your browser manually.

#### Starter kit contains:

+ [Gulp](http://gulpjs.com/) - as a build system
    + [gulp-watch](https://github.com/floatdrop/gulp-watch) - as a file watcher
    + [gulp-sass](https://github.com/dlmanning/gulp-sass) - as a SASS (SCSS) plugin for Gulp
    + [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) - for more comfortable style debugging
    + [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith) - image sprite generator
    + [gulp-rigger](https://github.com/kuzyk/gulp-rigger) - as HTML template engine
+ [Webpack](https://webpack.github.io/) - as a javascript module bundler.
    + [uglify-js](https://github.com/mishoo/UglifyJS2) - for generating compressed bundle
    + [ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) - for modules, which are required globally
    + [cheap-eval-source-map](http://webpack.github.io/docs/build-performance.html) - for more comfortable javascript debugging
+ [browser-sync](https://github.com/browsersync/browser-sync) - for browser live reload, after changes have been detected


#### Starter kit structure
