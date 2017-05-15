/**
 * Created by azder on 2016-03-29.
 */


'use strict'; // ALWAYS

import path from 'path';

export default filename =>
    !filename
        ?
        ''
        :
        path.isAbsolute(filename)
            ?
            filename
            :
            path.join(process.cwd(), filename)
;
