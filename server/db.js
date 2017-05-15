/**
 * Created by azder on 2016-03-28.
 */

'use strict'; // ALWAYS

// imports begin

import Loki from 'lokijs';
import logger from './logger';

// some weird babel bug, couldn't decompose on import
import f from './functional';
const {either} = f;

// imports end


const log = logger('[DB]');

// db setup begin
// module acts as singleton factory

const db = new Loki('parking');

const carsCollection = db.addCollection('cars', {
    indices: [
        'licenseplate', 'parkinglotid', 'parkingtime'
    ]
});

log('created', {db, carsCollection});

// db setup end


const load = carsCollection.insert.bind(carsCollection);
const collections = () => db.listCollections();
const cars = (filter) => carsCollection.where(either(()=>true, filter));

const loted = (id) => {
    return carsCollection.where(car=>car.parkinglotid === id)
};

export default {
    load,
    collections,
    cars,
    loted
};
