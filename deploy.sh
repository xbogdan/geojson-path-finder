#!/bin/bash

BUCKET=$1

# clone repo
git clone https://github.com/francois-baptiste/geojson-path-finder

cd geojson-path-finder

# install packages
npm install

# build
npm install webpack webpack-cli -g
webpack

# copy to gcp
gsutil cp dist/geojson_path_finder.js $BUCKET

# cleanup
cd ..
rm -rf geojson-path-finder
