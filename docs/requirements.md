# Requirements for Example Application

## Assumptions

> New business of income, having multiple parking lots

* The moment you start the app there are no cars on the
parking lots
* When querying your app, the elapsed time in hours (T) is
used. A value of for instance 4 means that 4 hours has
elapsed from the moment the application started
* A car must pay 1.20 Euro per hour, but after 3 hours they get
a discount of 10 Euro cents per hour
* All parking lots hold the same amount of cars, but there is a
max of 23 spaces
4


## Story 1

> As a user I want to load my default set of cars.

With an xml file I should be able to load my car set. Your
program should take 1 parameter: the file to load


Example of the file:

    <cars>
    <car brand="volkswagen" licenseplate="12-abc-34" parkinglotid="1"
    parkingtime="2016-01-25T16:36:31+00:00"/>
    <car brand="bmw" licenseplate="11-ab-22" parkinglotid="1"
    parkingtime="2016-01-25T16:36:31+00:00"/>
    <car brand="audi" licenseplate="33-cb-88" parkinglotid="2"
    parkingtime="2016-01-25T16:36:31+00:00"/>
    </cars>


## Story 2
> As a user I want to get a list of all my cars on a parking lot

 `GET /parkinglots/${id}/cars/${T}` should give me all the
 cars on parkinglot `${id}` and `${T}` amount of hours in the
 future
 example


example output:

    {
        "brand":"volkswagen",
        "licencePlate": "12-abc-34",
        "parkingTime": "2016-01-25T16:36:31+00:00",
        "value": 4.70
        "discountInCents": 10
    },{
        "brand":"bmw",
        "licencePlate": "11-ab-22",
        "parkingTime": "2016-01-25T18:36:31+00:00"
        "value": 3
        "discountInCents": 0
    }


## Story 3
> As a user I want to get a list of all the money i'm making

 `GET /inventory/$(T)` should give me the total inventory of
 all the parking lots

example output:
    
    {
        "totalAmountOfCars": 6,
        "value": 14.70,
        "discountInCents": 50
    }
