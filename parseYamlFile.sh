#!/bin/bash

yFile="$1"
ykey="$2"

if [[ -z yFile || -z yKey ]];then
echo "Please enter yaml filename and key"
exit 1
fi

if ! dpkg -l | grep -q "^ii yq";then
echo "we will need yq which is not installed"
echo "we are installing yq"
sudo apt install yq
fi


if [[ ! -f "$yfile" ]];then
echo "invalid directory or file"
exit 1
fi

value=$(yq -r ".$ykey" "$yfile")

if [[ "$value" == "null" ]];then
echo "$ykey not found in : $yfile"
exit
fi

echo "$value"


