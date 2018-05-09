#!/bin/bash
TEMP_DIR="cy_tmp"
APP_NAME="vue_cdm_cms"
# test
_DEFAULT_TEST_WORK_DIR='/home/chronic_disease/workspace/chronic_disease'
# biz
_DEFAULT_TEST_BUSINESS_DIR='/home/chronic_disease/workspace/chronic_disease'
# qc server
_DEFAULT_TEST_QC_DIR='/home/chronic_disease/workspace/chronic_disease'
SSH_USER="chronic_disease"
# 默认biz
SSH_IP="10.9.89.126"
MEDWEB_DIR=$_DEFAULT_TEST_QC_DIR
TEST_SERVER="QC"


# 测试服数组列表
TEST_SERVICE=('--qc' '--biz' '--test')

# 测试服判断（最后一个参数）
if [ ${!#} == "--biz" ]; then
	SSH_IP="10.9.89.126"
	TEST_SERVER="BIZ"
	MEDWEB_DIR=$_DEFAULT_TEST_BUSINESS_DIR
elif [ ${!#} == "--test" ]; then
	SSH_IP="10.9.15.68"
	TEST_SERVER="TEST"
	MEDWEB_DIR=$_DEFAULT_TEST_WORK_DIR
else
	SSH_IP="10.9.105.125"
fi

# 当前分支
function git_branch {
   branch="`git branch 2>/dev/null | grep "^\*" | sed -e "s/^\*\ //"`"
   if [ "${branch}" != "" ];then
       if [ "${branch}" = "(no branch)" ];then
           branch="(`git rev-parse --short HEAD`...)"
       fi
       echo "$branch"
   fi
}
CURRENT_BRANCH=$(git_branch)
echo "******************当前分支:"
echo $CURRENT_BRANCH
echo "******************1.测试分支更新******************"
git reset --hard || { echo "command failed ==== "; exit 1; }
git checkout feature/test || { echo "command failed ===="; exit 1; }
git pull origin feature/test || { echo "command failed ===="; exit 1; }
git merge $CURRENT_BRANCH || { echo "command failed ===="; exit 1; }
git push origin || { echo "command failed ===="; exit 1; }

echo "******************2.代码本地 webpack vue 构建开始******************"
#npm install
npm run test || { echo "command failed"; exit 1; }
#npm run test2 || { echo "command failed"; exit 1; }
#npm run build || { echo "command failed"; exit 1; }

echo "******************代码本地编译构建结束******************"

echo "******************3.打包构建后的文件******************"
tar -czf $APP_NAME.tar.gz ./dist || { echo "command failed"; exit 1; }

scp $APP_NAME.tar.gz $SSH_USER@$SSH_IP:$TEMP_DIR || { echo "command failed"; exit 1; }

ssh $SSH_USER@$SSH_IP << EOF
cd
cd cy_tmp
echo '******************4.解压打包文件完毕******************'
tar -xzvf $APP_NAME.tar.gz || { echo "command failed"; exit 1; }

cp -r ./dist/static/* $MEDWEB_DIR/static/ || { echo "command failed"; exit 1; }
cp -r ./dist/index.html $MEDWEB_DIR/templates/pc/ || { echo "command failed"; exit 1; }
echo '******************5.部署静态资源完毕******************'

rm $APP_NAME.tar.gz || { echo "command failed"; exit 1; }
echo '******************6.删除远程目录完毕******************'
EOF

#rm -rf ./dist || { echo "command failed"; exit 1; }
rm $APP_NAME.tar.gz || { echo "command failed"; exit 1; }
git checkout $CURRENT_BRANCH

echo '******************7.发布成功******************'
