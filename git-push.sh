#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "give commit message as argument"
    exit 1
fi

msg="$1"

git add .
git commit -m "$msg" || { echo "commit failed"; exit 1; }
git push || { echo "push failed"; exit 1; }

echo "STATUS:"
git status

echo
echo "LOG:"
git log --oneline -5

