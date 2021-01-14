#!/bin/bash

# How to run
# ./deploy --bucket <google-storage-bucket-path> --location <big-query-location> --dataset <big-query-dataset-id>

bucket=${bucket}
dataset=${dataset}
location=${location}

# parse named parameters
while [ $# -gt 0 ]; do

   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
        # echo $1 $2 // Optional to see the parameter:value result
   fi

  shift
done

# clone repo
git clone https://github.com/francois-baptiste/geojson-path-finder
cd geojson-path-finder

# install packages
npm install

# build
npm install webpack webpack-cli -g
webpack

# copy to gcp
gsutil cp dist/geojson_path_finder.js $bucket

# deploy UDF function to BQ
bq --dataset_id=$dataset --location=$location query < query.sql

# cleanup
cd ..
rm -rf geojson-path-finder
