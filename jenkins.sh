#!/bin/bash

npm install --registry=https://registry.npm.taobao.org

if [ -d "./dist/" ];then
	rm -rf ./dist || { echo "command failed"; exit 1; }
fi

npm run build:prd || { echo "command failed"; exit 1; }

# TODO ADD UNIT TEST