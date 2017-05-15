import {parseString} from 'xml2js' ;


export default xml =>
    new Promise(
        (resolve, reject) =>
            parseString(
                xml,
                (err, result) =>
                    err ? reject(err) : resolve(result)
            ) // parseString
    ); // new Promise
