#!/bin/bash

TEMPLATES_DIR_SOURCE='/data/home/chunyu/workspace/cy-vue/dist/index.html'
TEMPLATES_DIR_TARGET='/home/chunyu/workspace/medweb/templates/cy-vue/'

COMMIT_ID=""$1

# commit_id长度必须为40
if [ ${#COMMIT_ID} -ne 40 ];then
	echo '###################commit_id长度必须为40##################';
	exit;
fi

online_sync_html_from_zhongkong(){
	online_host_arr=('chunyu@db08' 'chunyu@db09' 'chunyu@db11')
	for i in ${online_host_arr[*]}
	do
		echo "#######正在同步 $i 的html文件#######"
        rsync -avp --partial $TEMPLATES_DIR_SOURCE $i:$TEMPLATES_DIR_TARGET || { echo "command failed"; exit 1; }
    done
}

echo "******************0.模块更新******************"
npm install --registry=https://registry.npm.taobao.org || { echo "command failed"; exit 1; }

echo "******************1.分支更新******************"

git reset --hard || { echo "command failed"; exit 1; }
git fetch origin || { echo "command failed"; exit 1; }
git checkout $COMMIT_ID || { echo "command failed"; exit 1; }

echo "******************2.编译开始******************"
if [ -d "./dist/" ];then
	rm -rf ./dist || { echo "command failed"; exit 1; }
fi
npm run build || { echo "command failed"; exit 1; }

echo '******************3.上传静态资源到CDN（七牛）******************'
# 删除CDN缓存
rm -rf .qshell || { echo "command failed"; exit 1; }
# 上传CDN
qshell qupload 4 qiniu.conf || { echo "command failed"; exit 1; }

echo '******************上传静态资源到CDN（七牛）结束******************'

echo '******************4.同步中控机的html到服务器******************'

online_sync_html_from_zhongkong

echo '******************同步中控机的html到服务器结束******************'

echo '******************5.发布成功******************'
