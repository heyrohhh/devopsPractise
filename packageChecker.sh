#!/bin/bash

logFile= "pkgInstall.log"
package="/home/heyrohit/Desktop/devopsPractise/package.txt"

touch logFile

if [[ ! -f $package ]];then
echo "$package not found..."
exit 1
fi

while IFS=read PACKAGE_NAME; do
       if [[ -z "$packageName" ]] || [[ "$packageName"=~^# ]];then 
  continue
  fi
 dpkg -s "$packageName" > /dev/null 2=&1

 if [[$? -ne 0 ]];then
 echo "$(date) Missing Package" >> $logFile
 fi
 if sudo apt-get install -y "$packageName" >> $logFile 2>&1;then
 echo "$(date) - success: 'packageName' installed successfully" >> $logFile 2>&1
 else
 echo "$(date) - Failure '$packageName' not Installed" >> $logFile 2>&1
 fi
done < "$package"

echo "---$(date) --- package installation finished ---" >> $logFile
