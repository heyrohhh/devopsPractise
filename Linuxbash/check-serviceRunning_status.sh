#!/bin/bash

systemctl is-active "$1" > /dev/null 2>&1

if [[ $? -eq 0 ]];then
echo "active"
else
echo "inactive"
fi

