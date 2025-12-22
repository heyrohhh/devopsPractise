#!/bin/bash

read -p "Enter Directory File Path: " dir

if [[ ! -d "$dir"  ]];then
echo "$dir not found"
exit 1
fi
echo "-----------------Find Your $dir content here ---------------------"
ls -la "$dir"
