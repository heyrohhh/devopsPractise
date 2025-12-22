#!/bin/bash

prog="$1"

if ! dpkg -l | grep -q "^li $prog"; then
echo "$prog Start installing........."
sudo apt update -y
sudo apt install "$prog"
fi

sudo systemctl start "$prog"
sudo systemctl enable "$prog"

echo "$prog is ready"


