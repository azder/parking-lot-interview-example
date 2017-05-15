/**
 * Created by azder on 2016-03-28.
 */


// if node < 6.0, run with --harmony_rest_parameters flag
// OR
// node ./node_modules/.bin/babel-node --presets=es2015 -- ./server.js


'use strict'; // ALWAYS

// imports begin

import fs from 'fs' ;
import restify from 'restify';
import minimist from 'minimist' ;


import logger from './server/logger';
import fname from './server/fname';

import xparse from './server/xparse' ;
import xtransform from './server/xtransform';

import billed from './server/billed';

// some weird babel bug, couldn't decompose on import
import db from './server/db';
const {load, collections, cars, loted} = db;

// some weird babel bug, couldn't decompose on import
import f from './server/functional';
const {flow, tap, ncurry, compose, nav, map, reduce} = f;

// imports end

const log = logger('[SERVER]');
const log2 = ncurry(2, log);

const args = minimist(process.argv.slice(2));

log('starting with', args, '...');

const filename = fname(args.load);

if (filename) {

    log(`extracting from ${filename}...`);

    // sync load, only do this rarely, like when starting up
    xparse(
        fs.readFileSync(filename, 'utf8')
    )

        .then(
            flow(
                tap(compose(log2('extracted'), JSON.stringify)),
                xtransform,
                tap(log2('transformed')),
                load,
                tap(log2('loaded'))
            )
        ) 

        .catch(err => {
            log(`error loading ${filename}`, {err});
            log('exiting app...');
            process.exit(args.dev ? 0 : 1);
        });

}


// rest begin

const server = restify.createServer();

server.use(restify.queryParser()); // server.use(restify.bodyParser());


server.get('/parkinglots/:id/cars/:time', (req, res) =>
    res.send(
        map(
            billed(new Date(), nav('params.time', req)),
            loted(nav('params.id', req))
        )
    )
);

server.get('/inventory/:time', (req, res) =>
    res.send(
        compose(
            reduce(
                {
                    totalAmountOfCars: 0,
                    value:             0,
                    discountInCents:   0
                },
                (prev, now) => ({
                    totalAmountOfCars: prev.totalAmountOfCars + 1,
                    value:             prev.value + now.value,
                    discountInCents:   prev.discountInCents + now.discountInCents
                })
            ),
            map(billed(new Date(), nav('params.time', req)))
        )
        (cars(nav('params.id', req)))
    )
);

// helper mappings
server.get('/cars/', (req, res) => res.send(cars()));
server.get('/car/:license', (req, res)=> res.send(cars(car => nav('params.license', req) === car.licenseplate)));
server.get('/lot/:id', (req, res)=> res.send(cars(car => nav('params.id', req) === car.parkinglotid)));
server.get('/collections/', (req, res)=> res.send(collections()));

// rest end

// run server
server.listen(8888, () => log('serverListen()', 'listening at', server.url));

export default server;
