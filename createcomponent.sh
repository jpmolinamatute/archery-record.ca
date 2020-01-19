#!/usr/bin/env bash

base="/home/juanpa/Projects/meteor-archery"
path="$1"
component="$2"

if [[ -d "${base}/${path}" ]]; then
    if [[ $path =~ /$ ]]; then
        path="${path%?}"
    fi
    if [[ -n $component ]]; then
        wholepath="${base}/${path}/${component}"
        mkdir -p "$wholepath"
        echo "Creating ${wholepath}/${component}.html"
        echo "<template name=\"${component}\">" >"${wholepath}/${component}.html"
        echo " " >>"${wholepath}/${component}.html"
        echo "</template>" >>"${wholepath}/${component}.html"
        echo "Creating ${wholepath}/${component}.js"
        cat <<-EOF >"${wholepath}/${component}.js"
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './${component}.css';
import './${component}.html';

Template.${component}.events({

});

Template.${component}.helpers({

});
EOF
        echo "Creating ${wholepath}/${component}.css"
        touch "${wholepath}/${component}.css"
    else
        echo "component name is undefined" >&2
        exit 2
    fi

else
    echo "${base}/${path} doesn't exists" >&2
    exit 2
fi

echo "Done!"
exit 0
