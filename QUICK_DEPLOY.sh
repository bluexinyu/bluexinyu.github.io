#!/bin/bash
# 快速部署脚本

echo "🚀 开始部署网站..."

# 切换到main分支
git checkout main

# 拉取最新代码
git pull origin main

# 合并feature分支
git merge claude/personal-website-research-page-01PVwPxSo8ghZDX3rLzcnpFW --no-edit

# 推送到GitHub
git push origin main

echo "✅ 部署完成！"
echo "📱 等待5-10分钟后访问：https://bluexinyu.github.io"
