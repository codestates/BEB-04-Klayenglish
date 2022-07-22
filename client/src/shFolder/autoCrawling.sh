#!/bin/bash

#현재시간
DATE=$(date +"%Y%m%d")

echo "crawling time is ${DATE}, crontab success."

node /home/parksk/Desktop/blockchain_5/team_klayenglish/BEB-04-Klayenglish/client/src/components/crawling.js