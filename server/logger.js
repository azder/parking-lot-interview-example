/**
 * Created by azder on 2016-03-28.
 */


'use strict'; // ALWAYS


export default tag =>
    (first, ...rest) => {
        console.log.apply(null, [tag, first, ...rest]);
        return first;
    }
