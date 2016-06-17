import es6Module from 'test(not_project_folder)/es6_example.js';
var commonModule = require('./test(not_project_folder)/commonjs_example');

//ES6
var main = () => {

    es6Module();

    commonModule();

    //Dynamic modules loading
    $('.js-load-amd').on('click', ()=> {
        require(['test(not_project_folder)/amd_example.js'], (amd) => {
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