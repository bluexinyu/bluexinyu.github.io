#!/bin/bash
# 部署Hugo测试网站 (方案A)

echo "🚀 部署Hugo测试网站..."

# 推送Hugo测试分支
git push -u origin hugo-test-site

echo "✅ Hugo测试网站已推送！"
echo ""
echo "📋 下一步："
echo "1. GitHub Actions会自动构建Hugo网站（需要5分钟）"
echo "2. 访问 https://bluexinyu.github.io 查看效果"
echo "3. 如果满意，告诉我，我会帮你替换main分支"
echo ""
echo "📊 当前设置："
echo "- 简洁设计，像Li Yuwei网站"
echo "- 下拉导航菜单 (My Research -> Research Overview, CV)"
echo "- 已创建：About, Research, Connect页面"
echo "- 待完善：Publications, Teaching, Methods, Resources"
