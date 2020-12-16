var geojsonPathFinder;geojsonPathFinder=(()=>{var e={6:e=>{"use strict";function r(e,r,t,n,o,i,a){a=a||{};var s=r[e];return Object.keys(s).reduce((function(s,u){var c=function(e,r,t,n,o,i,a,s){var u=t[e][r],c=t[r][e],d=[],h=[],f=s.edgeDataSeed;for(s.edgeDataReduceFn&&(f=s.edgeDataReduceFn(f,i[r][e]));!n[r];){var g=t[r];if(!g)break;var l=Object.keys(g).filter((function(r){return r!==e}))[0];if(u+=g[l],a){if(c+=t[l][r],h.indexOf(r)>=0){n[r]=t[r];break}h.push(r)}s.edgeDataReduceFn&&(f=s.edgeDataReduceFn(f,i[r][l])),d.push(o[r]),e=r,r=l}return{vertex:r,weight:u,reverseWeight:c,coordinates:d,reducedEdge:f}}(e,u,r,t,n,o,i,a),d=c.weight,h=c.reverseWeight;if(c.vertex!==e&&((!s.edges[c.vertex]||s.edges[c.vertex]>d)&&(s.edges[c.vertex]=d,s.coordinates[c.vertex]=[n[e]].concat(c.coordinates),s.reducedEdges[c.vertex]=c.reducedEdge),i&&!isNaN(h)&&(!s.incomingEdges[c.vertex]||s.incomingEdges[c.vertex]>h))){s.incomingEdges[c.vertex]=h;var f=[n[e]].concat(c.coordinates);f.reverse(),s.incomingCoordinates[c.vertex]=f}return s}),{edges:{},incomingEdges:{},coordinates:{},incomingCoordinates:{},reducedEdges:{}})}e.exports={compactNode:r,compactGraph:function(e,t,n,o){var i=(o=o||{}).progress,a=Object.keys(e).reduce((function(r,t,n,a){var s=e[t],u=Object.keys(s),c=u.length;return!(void 0!==o.compact&&!o.compact)&&(1===c?!e[u[0]][t]:2===c&&u.filter((function(r){return e[r][t]})).length===c)||(r[t]=s),n%1e3==0&&i&&i("compact:ends",n,a.length),r}),{});return Object.keys(a).reduce((function(s,u,c,d){var h=r(u,e,a,t,n,!1,o);return s.graph[u]=h.edges,s.coordinates[u]=h.coordinates,o.edgeDataReduceFn&&(s.reducedEdges[u]=h.reducedEdges),c%1e3==0&&i&&i("compact:nodes",c,d.length),s}),{graph:{},coordinates:{},reducedEdges:{}})}}},82:(e,r,t)=>{var n=t(842);"function"!=typeof n&&n.default&&"function"==typeof n.default&&(n=n.default),e.exports=function(e,r,t){var o={};o[r]=0;for(var i=new n([[0,[r],r]],(function(e,r){return e[0]-r[0]}));i.length;){var a=i.pop(),s=a[0],u=a[2];if(u===t)return a.slice(0,2);var c=e[u];Object.keys(c).forEach((function(e){var r=s+c[e];if(!(e in o)||r<o[e]){o[e]=r;var t=[r,a[1].concat([e]),e];i.push(t)}}))}return null}},10:(e,r,t)=>{"use strict";var n=t(82),o=t(771),i=t(6),a=t(229),s=t(131).Z,u=t(384);function c(e,r){if(r=r||{},e.compactedVertices||(e=o(e,r)),this._graph=e,this._keyFn=r.keyFn||function(e){return e.join(",")},this._precision=r.precision||1e-5,this._options=r,0===Object.keys(this._graph.compactedVertices).filter((function(e){return"edgeData"!==e})).length)throw new Error("Compacted graph contains no forks (topology has no intersections).")}e.exports=c,c.prototype={findPath:function(e,r){var t=this._keyFn(a(e.geometry.coordinates,this._precision)),o=this._keyFn(a(r.geometry.coordinates,this._precision));if(!this._graph.vertices[t]||!this._graph.vertices[o])return null;this._createPhantom(t),this._createPhantom(o);var i=n(this._graph.compactedVertices,t,o);if(i){var s=i[0];return{path:(i=i[1]).reduce(function(e,r,t,n){return t>0&&(e=e.concat(this._graph.compactedCoordinates[n[t-1]][r])),e}.bind(this),[]).concat([this._graph.sourceVertices[o]]),weight:s,edgeDatas:this._graph.compactedEdges?i.reduce(function(e,r,t,n){return t>0&&e.push({reducedEdge:this._graph.compactedEdges[n[t-1]][r]}),e}.bind(this),[]):void 0}}return null},serialize:function(){return this._graph},findNearestJunction:function(e){var r=[null,Number.MAX_VALUE];return Object.keys(this._graph.vertices).filter(function(e){var r=Object.keys(this._graph.vertices[e]).length;return r>=3||1==r}.bind(this)).forEach(function(t){const n=s(u(e),u(this._graph.sourceVertices[t]));n<r[1]&&(r[1]=n,r[0]=this._graph.sourceVertices[t].slice(0))}.bind(this)),r},_createPhantom:function(e){if(this._graph.compactedVertices[e])return null;var r=i.compactNode(e,this._graph.vertices,this._graph.compactedVertices,this._graph.sourceVertices,this._graph.edgeData,!0,this._options);return this._graph.compactedVertices[e]=r.edges,this._graph.compactedCoordinates[e]=r.coordinates,this._graph.compactedEdges&&(this._graph.compactedEdges[e]=r.reducedEdges),Object.keys(r.incomingEdges).forEach(function(t){this._graph.compactedVertices[t][e]=r.incomingEdges[t],this._graph.compactedCoordinates[t][e]=[this._graph.sourceVertices[t]].concat(r.incomingCoordinates[t].slice(0,-1)),this._graph.compactedEdges&&(this._graph.compactedEdges[t][e]=r.reducedEdges[t])}.bind(this)),e},_removePhantom:function(e){e&&(Object.keys(this._graph.compactedVertices[e]).forEach(function(r){delete this._graph.compactedVertices[r][e]}.bind(this)),Object.keys(this._graph.compactedCoordinates[e]).forEach(function(r){delete this._graph.compactedCoordinates[r][e]}.bind(this)),this._graph.compactedEdges&&Object.keys(this._graph.compactedEdges[e]).forEach(function(r){delete this._graph.compactedEdges[r][e]}.bind(this)),delete this._graph.compactedVertices[e],delete this._graph.compactedCoordinates[e],this._graph.compactedEdges&&delete this._graph.compactedEdges[e])}}},131:(e,r,t)=>{"use strict";var n=t(963),o=t(975);r.Z=function(e,r,t){void 0===t&&(t={});var i=n.getCoord(e),a=n.getCoord(r),s=o.degreesToRadians(a[1]-i[1]),u=o.degreesToRadians(a[0]-i[0]),c=o.degreesToRadians(i[1]),d=o.degreesToRadians(a[1]),h=Math.pow(Math.sin(s/2),2)+Math.pow(Math.sin(u/2),2)*Math.cos(c)*Math.cos(d);return o.radiansToLength(2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h)),t.units)}},975:(e,r)=>{"use strict";function t(e,r,t){void 0===t&&(t={});var n={type:"Feature"};return(0===t.id||t.id)&&(n.id=t.id),t.bbox&&(n.bbox=t.bbox),n.properties=r||{},n.geometry=e,n}function n(e,r,n){return void 0===n&&(n={}),t({type:"Point",coordinates:e},r,n)}function o(e,r,n){void 0===n&&(n={});for(var o=0,i=e;o<i.length;o++){var a=i[o];if(a.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");for(var s=0;s<a[a.length-1].length;s++)if(a[a.length-1][s]!==a[0][s])throw new Error("First and last Position are not equivalent.")}return t({type:"Polygon",coordinates:e},r,n)}function i(e,r,n){if(void 0===n&&(n={}),e.length<2)throw new Error("coordinates must be an array of two or more positions");return t({type:"LineString",coordinates:e},r,n)}function a(e,r){void 0===r&&(r={});var t={type:"FeatureCollection"};return r.id&&(t.id=r.id),r.bbox&&(t.bbox=r.bbox),t.features=e,t}function s(e,r,n){return void 0===n&&(n={}),t({type:"MultiLineString",coordinates:e},r,n)}function u(e,r,n){return void 0===n&&(n={}),t({type:"MultiPoint",coordinates:e},r,n)}function c(e,r,n){return void 0===n&&(n={}),t({type:"MultiPolygon",coordinates:e},r,n)}function d(e,t){void 0===t&&(t="kilometers");var n=r.factors[t];if(!n)throw new Error(t+" units is invalid");return e*n}function h(e,t){void 0===t&&(t="kilometers");var n=r.factors[t];if(!n)throw new Error(t+" units is invalid");return e/n}function f(e){return e%(2*Math.PI)*180/Math.PI}function g(e){return!isNaN(e)&&null!==e&&!Array.isArray(e)&&!/^\s*$/.test(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.earthRadius=6371008.8,r.factors={centimeters:100*r.earthRadius,centimetres:100*r.earthRadius,degrees:r.earthRadius/111325,feet:3.28084*r.earthRadius,inches:39.37*r.earthRadius,kilometers:r.earthRadius/1e3,kilometres:r.earthRadius/1e3,meters:r.earthRadius,metres:r.earthRadius,miles:r.earthRadius/1609.344,millimeters:1e3*r.earthRadius,millimetres:1e3*r.earthRadius,nauticalmiles:r.earthRadius/1852,radians:1,yards:r.earthRadius/1.0936},r.unitsFactors={centimeters:100,centimetres:100,degrees:1/111325,feet:3.28084,inches:39.37,kilometers:.001,kilometres:.001,meters:1,metres:1,miles:1/1609.344,millimeters:1e3,millimetres:1e3,nauticalmiles:1/1852,radians:1/r.earthRadius,yards:1/1.0936},r.areaFactors={acres:247105e-9,centimeters:1e4,centimetres:1e4,feet:10.763910417,inches:1550.003100006,kilometers:1e-6,kilometres:1e-6,meters:1,metres:1,miles:386e-9,millimeters:1e6,millimetres:1e6,yards:1.195990046},r.feature=t,r.geometry=function(e,r,t){switch(void 0===t&&(t={}),e){case"Point":return n(r).geometry;case"LineString":return i(r).geometry;case"Polygon":return o(r).geometry;case"MultiPoint":return u(r).geometry;case"MultiLineString":return s(r).geometry;case"MultiPolygon":return c(r).geometry;default:throw new Error(e+" is invalid")}},r.point=n,r.points=function(e,r,t){return void 0===t&&(t={}),a(e.map((function(e){return n(e,r)})),t)},r.polygon=o,r.polygons=function(e,r,t){return void 0===t&&(t={}),a(e.map((function(e){return o(e,r)})),t)},r.lineString=i,r.lineStrings=function(e,r,t){return void 0===t&&(t={}),a(e.map((function(e){return i(e,r)})),t)},r.featureCollection=a,r.multiLineString=s,r.multiPoint=u,r.multiPolygon=c,r.geometryCollection=function(e,r,n){return void 0===n&&(n={}),t({type:"GeometryCollection",geometries:e},r,n)},r.round=function(e,r){if(void 0===r&&(r=0),r&&!(r>=0))throw new Error("precision must be a positive number");var t=Math.pow(10,r||0);return Math.round(e*t)/t},r.radiansToLength=d,r.lengthToRadians=h,r.lengthToDegrees=function(e,r){return f(h(e,r))},r.bearingToAzimuth=function(e){var r=e%360;return r<0&&(r+=360),r},r.radiansToDegrees=f,r.degreesToRadians=function(e){return e%360*Math.PI/180},r.convertLength=function(e,r,t){if(void 0===r&&(r="kilometers"),void 0===t&&(t="kilometers"),!(e>=0))throw new Error("length must be a positive number");return d(h(e,r),t)},r.convertArea=function(e,t,n){if(void 0===t&&(t="meters"),void 0===n&&(n="kilometers"),!(e>=0))throw new Error("area must be a positive number");var o=r.areaFactors[t];if(!o)throw new Error("invalid original units");var i=r.areaFactors[n];if(!i)throw new Error("invalid final units");return e/o*i},r.isNumber=g,r.isObject=function(e){return!!e&&e.constructor===Object},r.validateBBox=function(e){if(!e)throw new Error("bbox is required");if(!Array.isArray(e))throw new Error("bbox must be an Array");if(4!==e.length&&6!==e.length)throw new Error("bbox must be an Array of 4 or 6 numbers");e.forEach((function(e){if(!g(e))throw new Error("bbox must only contain numbers")}))},r.validateId=function(e){if(!e)throw new Error("id is required");if(-1===["string","number"].indexOf(typeof e))throw new Error("id must be a number or a string")},r.radians2degrees=function(){throw new Error("method has been renamed to `radiansToDegrees`")},r.degrees2radians=function(){throw new Error("method has been renamed to `degreesToRadians`")},r.distanceToDegrees=function(){throw new Error("method has been renamed to `lengthToDegrees`")},r.distanceToRadians=function(){throw new Error("method has been renamed to `lengthToRadians`")},r.radiansToDistance=function(){throw new Error("method has been renamed to `radiansToLength`")},r.bearingToAngle=function(){throw new Error("method has been renamed to `bearingToAzimuth`")},r.convertDistance=function(){throw new Error("method has been renamed to `convertLength`")}},979:(e,r,t)=>{"use strict";function n(e,r,t){if(!e)throw new Error("coordinates is required");if(!Array.isArray(e))throw new Error("coordinates must be an Array");if(e.length<2)throw new Error("coordinates must be at least 2 numbers long");if(!o(e[0])||!o(e[1]))throw new Error("coordinates must contain numbers");return function(e,r,t){if(!i(t=t||{}))throw new Error("options is invalid");var n=t.bbox,o=t.id;if(void 0===e)throw new Error("geometry is required");if(r&&r.constructor!==Object)throw new Error("properties must be an Object");n&&a(n),o&&s(o);var u={type:"Feature"};return o&&(u.id=o),n&&(u.bbox=n),u.properties=r||{},u.geometry=e,u}({type:"Point",coordinates:e},r,t)}function o(e){return!isNaN(e)&&null!==e&&!Array.isArray(e)}function i(e){return!!e&&e.constructor===Object}function a(e){if(!e)throw new Error("bbox is required");if(!Array.isArray(e))throw new Error("bbox must be an Array");if(4!==e.length&&6!==e.length)throw new Error("bbox must be an Array of 4 or 6 numbers");e.forEach((function(e){if(!o(e))throw new Error("bbox must only contain numbers")}))}function s(e){if(!e)throw new Error("id is required");if(-1===["string","number"].indexOf(typeof e))throw new Error("id must be a number or a string")}function u(e,r,t){if(null!==e)for(var n,o,i,a,s,c,d,h,f=0,g=0,l=e.type,m="FeatureCollection"===l,p="Feature"===l,y=m?e.features.length:1,v=0;v<y;v++){s=(h=!!(d=m?e.features[v].geometry:p?e.geometry:e)&&"GeometryCollection"===d.type)?d.geometries.length:1;for(var w=0;w<s;w++){var b=0,E=0;if(null!==(a=h?d.geometries[w]:d)){c=a.coordinates;var _=a.type;switch(f=!t||"Polygon"!==_&&"MultiPolygon"!==_?0:1,_){case null:break;case"Point":if(!1===r(c,g,v,b,E))return!1;g++,b++;break;case"LineString":case"MultiPoint":for(n=0;n<c.length;n++){if(!1===r(c[n],g,v,b,E))return!1;g++,"MultiPoint"===_&&b++}"LineString"===_&&b++;break;case"Polygon":case"MultiLineString":for(n=0;n<c.length;n++){for(o=0;o<c[n].length-f;o++){if(!1===r(c[n][o],g,v,b,E))return!1;g++}"MultiLineString"===_&&b++,"Polygon"===_&&E++}"Polygon"===_&&b++;break;case"MultiPolygon":for(n=0;n<c.length;n++){for("MultiPolygon"===_&&(E=0),o=0;o<c[n].length;o++){for(i=0;i<c[n][o].length-f;i++){if(!1===r(c[n][o][i],g,v,b,E))return!1;g++}E++}b++}break;case"GeometryCollection":for(n=0;n<a.geometries.length;n++)if(!1===u(a.geometries[n],r,t))return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}t.r(r),t.d(r,{default:()=>c});const c=function(e){var r=[];return"FeatureCollection"===e.type?function(e,r){if("Feature"===e.type)r(e,0);else if("FeatureCollection"===e.type)for(var t=0;t<e.features.length&&!1!==r(e.features[t],t);t++);}(e,(function(e){u(e,(function(t){r.push(n(t,e.properties))}))})):u(e,(function(t){r.push(n(t,e.properties))})),function(e,r){if(!i(r=r||{}))throw new Error("options is invalid");var t=r.bbox,n=r.id;if(!e)throw new Error("No features passed");if(!Array.isArray(e))throw new Error("features must be an Array");t&&a(t),n&&s(n);var o={type:"FeatureCollection"};return n&&(o.id=n),t&&(o.bbox=t),o.features=e,o}(r)}},963:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(890);r.getCoord=function(e){if(!e)throw new Error("coord is required");if(!Array.isArray(e)){if("Feature"===e.type&&null!==e.geometry&&"Point"===e.geometry.type)return e.geometry.coordinates;if("Point"===e.type)return e.coordinates}if(Array.isArray(e)&&e.length>=2&&!Array.isArray(e[0])&&!Array.isArray(e[1]))return e;throw new Error("coord must be GeoJSON Point or an Array of numbers")},r.getCoords=function(e){if(Array.isArray(e))return e;if("Feature"===e.type){if(null!==e.geometry)return e.geometry.coordinates}else if(e.coordinates)return e.coordinates;throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array")},r.containsNumber=function e(r){if(r.length>1&&n.isNumber(r[0])&&n.isNumber(r[1]))return!0;if(Array.isArray(r[0])&&r[0].length)return e(r[0]);throw new Error("coordinates must only contain numbers")},r.geojsonType=function(e,r,t){if(!r||!t)throw new Error("type and name required");if(!e||e.type!==r)throw new Error("Invalid input to "+t+": must be a "+r+", given "+e.type)},r.featureOf=function(e,r,t){if(!e)throw new Error("No feature passed");if(!t)throw new Error(".featureOf() requires a name");if(!e||"Feature"!==e.type||!e.geometry)throw new Error("Invalid input to "+t+", Feature with geometry required");if(!e.geometry||e.geometry.type!==r)throw new Error("Invalid input to "+t+": must be a "+r+", given "+e.geometry.type)},r.collectionOf=function(e,r,t){if(!e)throw new Error("No featureCollection passed");if(!t)throw new Error(".collectionOf() requires a name");if(!e||"FeatureCollection"!==e.type)throw new Error("Invalid input to "+t+", FeatureCollection required");for(var n=0,o=e.features;n<o.length;n++){var i=o[n];if(!i||"Feature"!==i.type||!i.geometry)throw new Error("Invalid input to "+t+", Feature with geometry required");if(!i.geometry||i.geometry.type!==r)throw new Error("Invalid input to "+t+": must be a "+r+", given "+i.geometry.type)}},r.getGeom=function(e){return"Feature"===e.type?e.geometry:e},r.getType=function(e,r){return"FeatureCollection"===e.type?"FeatureCollection":"GeometryCollection"===e.type?"GeometryCollection":"Feature"===e.type&&null!==e.geometry?e.geometry.type:e.type}},890:(e,r)=>{"use strict";function t(e,r,t){void 0===t&&(t={});var n={type:"Feature"};return(0===t.id||t.id)&&(n.id=t.id),t.bbox&&(n.bbox=t.bbox),n.properties=r||{},n.geometry=e,n}function n(e,r,n){return void 0===n&&(n={}),t({type:"Point",coordinates:e},r,n)}function o(e,r,n){void 0===n&&(n={});for(var o=0,i=e;o<i.length;o++){var a=i[o];if(a.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");for(var s=0;s<a[a.length-1].length;s++)if(a[a.length-1][s]!==a[0][s])throw new Error("First and last Position are not equivalent.")}return t({type:"Polygon",coordinates:e},r,n)}function i(e,r,n){if(void 0===n&&(n={}),e.length<2)throw new Error("coordinates must be an array of two or more positions");return t({type:"LineString",coordinates:e},r,n)}function a(e,r){void 0===r&&(r={});var t={type:"FeatureCollection"};return r.id&&(t.id=r.id),r.bbox&&(t.bbox=r.bbox),t.features=e,t}function s(e,r,n){return void 0===n&&(n={}),t({type:"MultiLineString",coordinates:e},r,n)}function u(e,r,n){return void 0===n&&(n={}),t({type:"MultiPoint",coordinates:e},r,n)}function c(e,r,n){return void 0===n&&(n={}),t({type:"MultiPolygon",coordinates:e},r,n)}function d(e,t){void 0===t&&(t="kilometers");var n=r.factors[t];if(!n)throw new Error(t+" units is invalid");return e*n}function h(e,t){void 0===t&&(t="kilometers");var n=r.factors[t];if(!n)throw new Error(t+" units is invalid");return e/n}function f(e){return e%(2*Math.PI)*180/Math.PI}function g(e){return!isNaN(e)&&null!==e&&!Array.isArray(e)&&!/^\s*$/.test(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.earthRadius=6371008.8,r.factors={centimeters:100*r.earthRadius,centimetres:100*r.earthRadius,degrees:r.earthRadius/111325,feet:3.28084*r.earthRadius,inches:39.37*r.earthRadius,kilometers:r.earthRadius/1e3,kilometres:r.earthRadius/1e3,meters:r.earthRadius,metres:r.earthRadius,miles:r.earthRadius/1609.344,millimeters:1e3*r.earthRadius,millimetres:1e3*r.earthRadius,nauticalmiles:r.earthRadius/1852,radians:1,yards:r.earthRadius/1.0936},r.unitsFactors={centimeters:100,centimetres:100,degrees:1/111325,feet:3.28084,inches:39.37,kilometers:.001,kilometres:.001,meters:1,metres:1,miles:1/1609.344,millimeters:1e3,millimetres:1e3,nauticalmiles:1/1852,radians:1/r.earthRadius,yards:1/1.0936},r.areaFactors={acres:247105e-9,centimeters:1e4,centimetres:1e4,feet:10.763910417,inches:1550.003100006,kilometers:1e-6,kilometres:1e-6,meters:1,metres:1,miles:386e-9,millimeters:1e6,millimetres:1e6,yards:1.195990046},r.feature=t,r.geometry=function(e,r,t){switch(void 0===t&&(t={}),e){case"Point":return n(r).geometry;case"LineString":return i(r).geometry;case"Polygon":return o(r).geometry;case"MultiPoint":return u(r).geometry;case"MultiLineString":return s(r).geometry;case"MultiPolygon":return c(r).geometry;default:throw new Error(e+" is invalid")}},r.point=n,r.points=function(e,r,t){return void 0===t&&(t={}),a(e.map((function(e){return n(e,r)})),t)},r.polygon=o,r.polygons=function(e,r,t){return void 0===t&&(t={}),a(e.map((function(e){return o(e,r)})),t)},r.lineString=i,r.lineStrings=function(e,r,t){return void 0===t&&(t={}),a(e.map((function(e){return i(e,r)})),t)},r.featureCollection=a,r.multiLineString=s,r.multiPoint=u,r.multiPolygon=c,r.geometryCollection=function(e,r,n){return void 0===n&&(n={}),t({type:"GeometryCollection",geometries:e},r,n)},r.round=function(e,r){if(void 0===r&&(r=0),r&&!(r>=0))throw new Error("precision must be a positive number");var t=Math.pow(10,r||0);return Math.round(e*t)/t},r.radiansToLength=d,r.lengthToRadians=h,r.lengthToDegrees=function(e,r){return f(h(e,r))},r.bearingToAzimuth=function(e){var r=e%360;return r<0&&(r+=360),r},r.radiansToDegrees=f,r.degreesToRadians=function(e){return e%360*Math.PI/180},r.convertLength=function(e,r,t){if(void 0===r&&(r="kilometers"),void 0===t&&(t="kilometers"),!(e>=0))throw new Error("length must be a positive number");return d(h(e,r),t)},r.convertArea=function(e,t,n){if(void 0===t&&(t="meters"),void 0===n&&(n="kilometers"),!(e>=0))throw new Error("area must be a positive number");var o=r.areaFactors[t];if(!o)throw new Error("invalid original units");var i=r.areaFactors[n];if(!i)throw new Error("invalid final units");return e/o*i},r.isNumber=g,r.isObject=function(e){return!!e&&e.constructor===Object},r.validateBBox=function(e){if(!e)throw new Error("bbox is required");if(!Array.isArray(e))throw new Error("bbox must be an Array");if(4!==e.length&&6!==e.length)throw new Error("bbox must be an Array of 4 or 6 numbers");e.forEach((function(e){if(!g(e))throw new Error("bbox must only contain numbers")}))},r.validateId=function(e){if(!e)throw new Error("id is required");if(-1===["string","number"].indexOf(typeof e))throw new Error("id must be a number or a string")},r.radians2degrees=function(){throw new Error("method has been renamed to `radiansToDegrees`")},r.degrees2radians=function(){throw new Error("method has been renamed to `degreesToRadians`")},r.distanceToDegrees=function(){throw new Error("method has been renamed to `lengthToDegrees`")},r.distanceToRadians=function(){throw new Error("method has been renamed to `lengthToRadians`")},r.radiansToDistance=function(){throw new Error("method has been renamed to `radiansToLength`")},r.bearingToAngle=function(){throw new Error("method has been renamed to `bearingToAzimuth`")},r.convertDistance=function(){throw new Error("method has been renamed to `convertLength`")}},842:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});class n{constructor(e=[],r=o){if(this.data=e,this.length=this.data.length,this.compare=r,this.length>0)for(let e=(this.length>>1)-1;e>=0;e--)this._down(e)}push(e){this.data.push(e),this.length++,this._up(this.length-1)}pop(){if(0===this.length)return;const e=this.data[0];return this.length--,this.length>0&&(this.data[0]=this.data[this.length],this._down(0)),this.data.pop(),e}peek(){return this.data[0]}_up(e){const{data:r,compare:t}=this,n=r[e];for(;e>0;){const o=e-1>>1,i=r[o];if(t(n,i)>=0)break;r[e]=i,e=o}r[e]=n}_down(e){const{data:r,compare:t}=this,n=this.length>>1,o=r[e];for(;e<n;){let n=1+(e<<1),i=r[n];const a=n+1;if(a<this.length&&t(r[a],i)<0&&(n=a,i=r[a]),t(i,o)>=0)break;r[e]=i,e=n}r[e]=o}}function o(e,r){return e<r?-1:e>r?1:0}},384:e=>{var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};e.exports=function(e,t){if(!r(e))throw new Error("Coordinates must be an array");if(e.length<2)throw new Error("Coordinates must be at least 2 numbers long");return{type:"Feature",geometry:{type:"Point",coordinates:e},properties:t||{}}}},771:(e,r,t)=>{"use strict";var n=t(879),o=t(6),i=t(131).Z,a=(t(229),t(384));e.exports=function(e,r){var t,s=(r=r||{}).weightFn||function(e,r){return i(a(e),a(r))};"FeatureCollection"===e.type?t=n(e,r):e.edges&&(t=e),e=t.edges.reduce((function(e,n,o,i){var a=n[0],u=n[1],c=n[2],d=s(t.vertices[a],t.vertices[u],c),h=function(t){e.vertices[t]||(e.vertices[t]={},r.edgeDataReduceFn&&(e.edgeData[t]={}))},f=function(t,n,o){e.vertices[t][n]=o,r.edgeDataReduceFn&&(e.edgeData[t][n]=r.edgeDataReduceFn(r.edgeDataSeed,c))};return d&&(h(a),h(u),d instanceof Object?(d.forward&&f(a,u,d.forward),d.backward&&f(u,a,d.backward)):(f(a,u,d),f(u,a,d))),o%1e3==0&&r.progress&&r.progress("edgeweights",o,i.length),e}),{edgeData:{},vertices:{}});var u=o.compactGraph(e.vertices,t.vertices,e.edgeData,r);return{vertices:e.vertices,edgeData:e.edgeData,sourceVertices:t.vertices,compactedVertices:u.graph,compactedCoordinates:u.coordinates,compactedEdges:r.edgeDataReduceFn?u.reducedEdges:null}}},229:e=>{e.exports=function(e,r){return[Math.round(e[0]/r)*r,Math.round(e[1]/r)*r]}},879:(e,r,t)=>{"use strict";var n=t(979),o=t(229);function i(e,r,t){return"FeatureCollection"===e.type?e.features.reduce((function(e,t){return i(t,r,e)}),t):r(t,e)}function a(e){return"LineString"===e.geometry.type}"function"!=typeof n&&n.default&&"function"==typeof n.default&&(n=n.default),e.exports=function(e,r){var t=(r=r||{}).keyFn||function(e){return e.join(",")},s=r.precision||1e-5,u=function(e,r){var t=[];return"FeatureCollection"===e.type&&(t=t.concat(e.features.filter(r))),{type:"FeatureCollection",features:t}}(e,a);return{vertices:n(u).features.reduce((function(e,n,i,a){var u=o(n.geometry.coordinates,s);return e[t(u)]=n.geometry.coordinates,i%1e3==0&&r.progress&&r.progress("topo:vertices",i,a.length),e}),{}),edges:i(u,(function(e,n,i,a){return n.geometry.coordinates.forEach((function(r,i,a){if(i>0){var u=t(o(a[i-1],s)),c=t(o(r,s));e.push([u,c,n.properties])}})),i%1e3==0&&r.progress&&r.progress("topo:edges",i,a.length),e}),[])}}}},r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{}};return e[n](o,o.exports,t),o.exports}return t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(10)})();