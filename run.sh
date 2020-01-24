#!/usr/bin/env bash

WHERE="$1"

if [[ $WHERE == "in" ]]; then
    export MONGO_URL="mongodb://archeryuser:8O6OIdvenq@home-in.com:57017/archerydb"
elif [[ $WHERE == "out" ]]; then
    export MONGO_URL="mongodb://archeryuser:8O6OIdvenq@home-out.com:57017/archerydb"
else
    echo "Error: please provide where" >&2
    exit 2
fi
export ROOT_URL="http://juapa-archery.ca:3000"
exec meteor
