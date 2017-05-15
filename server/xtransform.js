/**
 * Created by azder on 2016-03-31.
 */


'use strict'; // ALWAYS

// some weird babel bug, couldn't decompose on import
import f from './functional.js';
const {prop, map, nav, compose} = f;

export default compose(
    map(prop('$')),
    nav('cars.car')
);

