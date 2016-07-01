### Basic starter kit for Front-End Developers
**Version:** 0.1.0
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

<br/>
<br/>
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

<br/>
<br/>
##### SCSS structure

Folder | Which may include
------------ | -------------
base | ResetCSS, normalize, layout, fonts, typography
utils | Common styles, helpers, mixins, variables, sprites, etc.
vendors | Libraries, frameworks, etc.
components | Header, footer, hamburger menu, something like "custom checkBox" or "custom select"
pages | Stylesheets for pages
media/smallDesktop/ | Styles for desktop with small resolution
media/phone/ | Styles for mobile
media/tablet/ | Styles for tablet

<br/>
<br/>
##### javascript structure recommendations (without using frameworks)

Folder | Which may include
------------ | -------------
assets | Libraries, plugins
components | Something like popups, spoilers, tabs, etc.
pages | DOM events, individual module initializations (something like slider)
static | Header & footer events, global modules initializations something like ```Scrollbar.initAll()```
utils | Covers for plugins, etc.

<br/>
<br/>
#### Configuration `Gulpfile.js`

```javascript

RELEASE = false,

directories = {
    //...
},

config = {
   //...
};
    
```

+ **RELEASE** (boolean) 
`false` - will be build development version with source maps
`true` - will be build uglified production version
<br/>
+ **directories** (Object)
    + `dist` (string) - root build directory
    + `src` (string) - root source directory
<br/>
+ **config** (Object)
    + `port` (number) - port number, where is application must been started. Default - 3000
    <br/>
    + `browserSync` (Object) - browser-sync parameters
        + `server` (string) local server root directory (the same directory, where is your entry point, such as _index.html_)
    <br/>
    + `html` (Object) - HTML build parameters
        + `dist` (string) - buid directory 
        + `base` (string) - components templates
        + `src` (string) - pages templates
        + `entry` (string) - HTML entry point (_index.html_)
        + `watch` (string) - source path for watching
    <br/>
    + `js` (Object) - javascript build parameters
        + `dist` (string) - buid directory 
        + `watch` (boolean) - if `true`, all js files will be watching 
        + `webpackConfig` (string) - path to **`webpack.config.js`**
        + `webpackParams` (Object) - [Webpack](https://webpack.github.io/) configuration parameters
             + `RELEASE` (boolean) - see **RELEASE**
             + `entry` (string) - javascript entry point (eg: _main.js_)
             + `entry` ([string, string, ..., string]) - source files paths
             + `output` (Object) - js build paths
                + `path` (string) - basic build path
                + `filename` (Object)
                    + `prod` {string) - production bundle name
                    + `dev` {string) - development bundle name
                + `chunksFileName` (Object)
                    + `prod` {string) - production chunks name
                    + `dev` {string) - development chunks name
             + `globalModules` (Object) - global modules initializing, eg:
             `
             globalModules: {
                  $: "jquery"
                  //...
                }
             `