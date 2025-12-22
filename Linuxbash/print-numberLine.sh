#!/bin/bash

file="$1"

if [[ ! -f "$file" ]];then
echo "Files not found"
exit 1
fi

text="$(grep -E '[0-9]+' $file)"
echo "$text"
