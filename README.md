### Basic starter kit for Front-End Developers
**Version:** 0.1.6
Added gulp-imagemin, gulp-svg-spritesheet and gulp-autoprefixer.
Fixed production build.

> Global requirements: [Node.js](https://nodejs.org/)

To start project do:

```sh
$ cd "project_root"
```
```sh
$ npm install
```

After installation do:
```sh
$ gulp
```

Production versions of javascript and CSS :
```sh
$ gulp prod:build
```

Project will open [localhost:3000](http://localhost:3000) in your default browser automatically.
Also you can open [localhost:3000](http://localhost:3000) in your browser manually.

<br/>
<br/>
#### Starter kit contains:

+ [Gulp](http://gulpjs.com/) - as a build system
    + [gulp-watch](https://github.com/floatdrop/gulp-watch) - as a file watcher
    + [gulp-sass](https://github.com/dlmanning/gulp-sass) - as a SASS (SCSS) plugin for Gulp
    + [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) - CSS prefixes generator
    + [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) - for more comfortable style debugging
    + [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - image optimization
    + [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith) - image sprite generator
    + [gulp-svg-spritesheet](https://github.com/iamdarrenhall/gulp-svg-spritesheet) - svg sprite generator
    + [gulp-rigger](https://github.com/kuzyk/gulp-rigger) - as HTML template engine
    + [gulp-pug](https://github.com/jamen/gulp-pug) - [Pug](https://github.com/pugjs/pug) as HTML preprocessor
+ [Webpack](https://webpack.github.io/) - as a javascript module bundler.
    + [uglify-js](https://github.com/mishoo/UglifyJS2) - for generating compressed bundle
    + [ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) - for modules, which are required globally
    + [cheap-eval-source-map](http://webpack.github.io/docs/build-performance.html) - for more comfortable javascript debugging
+ [browser-sync](https://github.com/browsersync/browser-sync) - for browser live reload, after the changes have been detected

<br/>
<br/>
##### SCSS structure

Folder | What may include
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

Folder | What may include
------------ | -------------
assets | Libraries, plugins
components | Something like popups, spoilers, tabs, etc.
pages | DOM events, individual module initializations (something like slider)
static | Header & footer events, global modules initializations something like ```Scrollbar.initAll()```
utils | Covers for plugins, etc.

<br/>
<br/>
##### Using png sprites or svg sprites
Just pass:

for png
```@mixin bg($original-icon-name)``` into some SCSS rule
```SCSS
.my-png-icon {
    @include bg($my-png-icon)
}
```
for svg
```@mixin bg-svg($original-icon-name)``` into some SCSS rule
```SCSS
.my-svg-icon {
    @include bg-svg($my-svg-icon)
}
```

<br/>
<br/>
#### Configuration `gulpfile.babel.js`
All task callbacks placed at `_config` directory
