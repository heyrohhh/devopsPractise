#!/bin/bash

file="$1"

git add "$file"

read -p "Write commit : " comm

git commit -m "$comm"

git push -u origin main

echo "--------------------GIT STATUS-------------"

git status

echo " "

git "------------------GIT LOG----------------"

git log -5 --pretty=oneline

echo " "

