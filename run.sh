#!/usr/bin/env bash

WHERE="$1"

if [[ $WHERE == "in" ]]; then
    export MONGO_URL="mongodb://archeryuser:8O6OIdvenq@home-in.com:57017/archerydb"
    export ROOT_URL="http://juapa-archery.ca:3000"
elif [[ $WHERE == "out" ]]; then
    export MONGO_URL="mongodb://archeryuser:8O6OIdvenq@home-out.com:57017/archerydb"
    export ROOT_URL="http://juapa-archery.ca:3000"
elif [[ $WHERE == "dev" ]]; then
    export MONGO_URL='mongodb+srv://archeryuser:jUNAKpbW4F7O52QE@cluster0-mcrup.mongodb.net/archery?retryWrites=true&w=majority'
    export ROOT_URL='http://archery-record.ca/dev'
    export PATH="/usr/local/bin:${PATH}"
elif [[ -z $WHERE ]]; then
    echo "Error: please provide where" >&2
    exit 2
else
    echo "Error: $WHERE is an invalid environment" >&2
    exit 2
fi

exec meteor
