const PathFinder = require('../index.js'),
<<<<<<< HEAD
      geojson = require('./gothenburg.json'),
=======
      geojson = require('./network.json'),
>>>>>>> 74efa38d561b17ee43304e17c27207c1c144a639
      point = require('turf-point'),
      turf = require('@turf/turf'),
      distance = require('@turf/distance').default;

const highwaySpeeds = {
    motorway: 110,
    trunk: 90,
    primary: 80,
    secondary: 70,
    tertiary: 50,
    unclassified: 50,
    road: 50,
    residential: 30,
    service: 30,
    living_street: 20
};

const unknowns = {};

function weightFn(a, b, props) {
    let d = distance(point(a), point(b)) * 1000,
        factor = 0.9,
        type = props.highway,
        forwardSpeed,
        backwardSpeed;

    if (props.maxspeed) {
        forwardSpeed = backwardSpeed = Number(props.maxspeed);
    } else {
        let linkIndex = type.indexOf('_link');

        if (linkIndex >= 0) {
            type = type.substring(0, linkIndex);
            factor *= 0.7;
        }
    
        forwardSpeed = backwardSpeed = highwaySpeeds[type] * factor;
    
        if (!forwardSpeed) {
            unknowns[type] = true;
        }
    }
    
    if (props.oneway && props.oneway !== 'no' || props.junction && props.junction === 'roundabout') {
        backwardSpeed = null;
    }

    return {
        forward: forwardSpeed && (d / (forwardSpeed / 3.6)),
        backward: backwardSpeed && (d / (backwardSpeed / 3.6)),
    };
}

<<<<<<< HEAD
// const pathFinder = new PathFinder(geojson);
console.log(PathFinder.weightFunctions);
// const points = pathFinder.getIsoDistance(point([11.9670375, 57.7035236]), 5000);
=======
 const pathFinder = new PathFinder(geojson);
 const points = pathFinder.findPointsAround(point([8.444600000000001,59.489470000000004]), 5000);
 console.log(points);

// var p = turf.featureCollection([
//   turf.point([10.195312, 43.755225]),
//   turf.point([10.404052, 43.8424511]),
//   turf.point([10.579833, 43.659924]),
//   turf.point([10.360107, 43.516688]),
//   turf.point([10.14038, 43.588348]),
//   turf.point([10.195312, 43.755225])
// ]);
// 
// var hull = turf.convex(p);
// console.log(hull);

// const points = pathFinder.findPath(point([11.995450000000002, 57.71257000000001]), point([11.995450000000002, 57.71257000000001]));

>>>>>>> 74efa38d561b17ee43304e17c27207c1c144a639
