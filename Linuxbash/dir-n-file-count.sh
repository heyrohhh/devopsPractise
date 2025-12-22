#!/bin/bash

dir="$1"

if [[ -z "$dir" ]]; then
    echo "Provide directory path as argument"
    exit 1
fi

if [[ ! -d "$dir" ]]; then
    echo "Directory not found"
    exit 1
fi

count=$(sudo find "$dir" -maxdepth 1 -type f | wc -l)
echo "$count"

