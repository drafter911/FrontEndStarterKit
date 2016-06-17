import es6Module from './test/es6_example.js';
var commonModule = require('./test/commonjs_example');

//ES6
var main = () => {

    es6Module();

    commonModule();

    //Dynamic modules loading
    $('.js-load-amd').on('click', ()=> {
        require(['./test/amd_example.js'], (amd) => {
            amd.run();
        });
    });
};

$(document).ready(()=> {
    main();
});

//ES5
//var main = function () {
//
//    es6Module();
//
//    commonModule();
//
//    //Dynamic modules loading
//    $('.js-load-amd').on('click', ()=> {
//        require(['./test/amd_example.js'], function (amd) => {
//            amd.run();
//        });
//    });
//};
//
//$(document).ready(function () {
//    main();
//});