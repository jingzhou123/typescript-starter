/// <reference path="../typings/jquery/jquery.d.ts" />

//import * as $ from 'jquery';
import { Utils } from './utils';
import one = require('./other');
import map = require('./map');
import massive = require('./massive');

console.log('massive obj: ', massive);

map.set('123');

Utils.log('Hello, world!');

/*$(document).on('click', e => {
    Utils.log('clicked');
});*/

console.log(one);
