#!/bin/bash
mkdir sort

dateNow=`date +%Y%m%d`
for file in ` ls | grep txt$|cut -d '.' -f 1|uniq`
do
    for file1 in `ls | grep $file | grep txt$`
        do
            cat $file1 >> sort/$file.$dateNow.txt
        done
done

