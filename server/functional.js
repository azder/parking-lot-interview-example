// taken from https://github.com/azder/es-funx-basic/blob/master/demo/library.js
// and modified with stuff from https://github.com/azder/vanilla/blob/master/lib/functionals.js


'use strict'; // ALWAYS

const nil = value => null === value || void 0 === value;
const either = (left, right) => nil(right) ? left : right;

const curry = (fn, ...args) =>
        args.length >= fn.length
            ? fn(...args) // jshint ignore:line
            : curry.bind(null, fn, ...args)
    ;

// helps when composing variadic functiions like console.log
let ncurry = (n, fn, ...args) =>
    args.length >= n
        ? fn(...args)
        : ncurry.bind(null, n, fn, ...args);

const map = curry((fn, obj)=>obj.map(fn));
const reduce = curry((init, fn, array) => array.reduce(fn, init));

const compose = (...args) => arg => args.reduceRight((x, fn) => fn(x), arg);
const flow = (...args) => arg => args.reduce((x, fn) => fn(x), arg);
const len = xs => xs.length;

const apply = curry((f, args) => f.apply(void 0, args));


const nav = curry((path, object)=> path.split('\.').reduce((o, k)=>nil(o) ? o : o[k], object));

const prop = curry((key, object) => object[key]);
const val = curry((object, key) => object[key]);
const pick = curry((keys, object) => map(val(object), keys));

const put = curry((key, object, value) => {
    object[key] = value;
    return value;
});

const assign = curry((key, value, object) => {
    object[key] = value;
    return object;
});

const objectify = obj => nil(obj) ? {} : obj;

const tap = curry((fn, val) => {
    fn && fn(val);
    return val;
});


export default {
    nil,
    either,
    curry,
    ncurry,
    map,
    reduce,
    compose,
    flow,
    len,
    apply,
    nav,
    val,
    prop,
    pick,
    put,
    assign,
    objectify,
    tap
};

