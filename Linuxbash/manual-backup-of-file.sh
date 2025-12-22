#!/bin/bash

read -p "Enter file name: " file

path=$(sudo find / -name "$file" 2>/dev/null)
date=$(date +%F)

if [[ -z "$path" ]];then
echo "$path not found"
exit1
fi
#please add path of directory where you want to keep backup file
newpath="/path/of/new/folder"
backup="$newpath/$date"
cp "$path" "$backup"
echo "backup from $path into $backup"



