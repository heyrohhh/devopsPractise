#!/bin/bash

dir="$1"

if [[ -z "$dir" || ! -d "$dir" ]];then
echo "invalid directory"
exit 1
fi

find "$dir" -maxdepth 1 -type f -printf "%s %p\n"|sort -nr | head -n 5 | awk '{print $2, $1}'
