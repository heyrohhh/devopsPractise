#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "give commit message as argument"
    exit 1
fi

msg="$1"

git add "$msg"
read -p "write commit: " com

git commit -m "$com" || { echo "commit failed"; exit 1; }
git push || { echo "push failed"; exit 1; }

echo "STATUS:"
git status

echo
echo "LOG:"
git log --oneline -5

