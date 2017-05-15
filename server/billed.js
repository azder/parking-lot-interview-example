/**
 * Created by azder on 2016-03-31.
 */


'use strict'; // ALWAYS

// some weird babel bug, couldn't decompose on import
import f from './functional';
const {curry} = f;

const PERH = 1.2;
const DISC = 0.10;

export default curry((now, time, car)=> {

    const parked = Date.parse(car.parkingtime);
    const future = (time - 0) * 3600 * 1000 + (now - 0);
    const hours = parseInt((future - parked) / 1000 / 3600);

    const discount = (hours > 3 ? DISC * (hours - 3) : 0);

    const value = PERH * hours - discount;
    const discountInCents = Math.round(100 * discount);

    return {
        brand:        car.brand,
        licensePlate: car.licenseplate,
        parkingTime:  car.parkingtime,
                      value,
                      discountInCents
    };

});
