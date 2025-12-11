#!/bin/bash

file="$1"

if [[ ! -f "$file" ]];then
echo "File Not found"
exit 1
fi

git add "$file"

read -p "Write commit : " comm

git commit -m "$comm"

git push -u origin main

echo "--------------------GIT STATUS-------------"

git status

echo " "

git "------------------GIT LOG----------------"

git log --pretty=oneline

echo " "

